// src/app/api/crawl/route.ts
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { Chroma } from '@langchain/community/vectorstores/chroma';
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";
import { chromium } from 'playwright';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

/**
 * يصنف الرابط بناءً على بنيته ونص الرابط المرافق له.
 * يعطي الأولوية لبنية الرابط (URL structure) أولاً.
 */
function getUrlCategory(url: string, linkText: string = ''): string {
    const lowerUrl = url.toLowerCase();
    const lowerText = linkText.toLowerCase();

    // الأولوية 1: بنية الرابط
    if (lowerUrl.includes('/product/') || lowerUrl.includes('/products/') || lowerUrl.includes('/p/')) return 'product_page';
    if (lowerUrl.includes('/category/') || lowerUrl.includes('/categories/') || lowerUrl.includes('/collections/')) return 'category_page';
    if (lowerUrl.includes('shipping') || lowerUrl.includes('شحن') || lowerUrl.includes('توصيل')) return 'shipping';
    if (lowerUrl.includes('return') || lowerUrl.includes('refund') || lowerUrl.includes('استرجاع') || lowerUrl.includes('استبدال')) return 'returns';
    if (lowerUrl.includes('contact') || lowerUrl.includes('اتصل')) return 'contact';
    if (lowerUrl.includes('faq') || lowerUrl.includes('أسئلة')) return 'faq';
    if (lowerUrl.includes('about') || lowerUrl.includes('من-نحن')) return 'about';

    // الأولوية 2: نص الرابط (إذا لم تكن البنية واضحة)
    if (lowerText.includes('شحن') || lowerText.includes('توصيل')) return 'shipping';
    if (lowerText.includes('استرجاع') || lowerText.includes('استبدال')) return 'returns';
    if (lowerText.includes('اتصل') || lowerText.includes('تواصل')) return 'contact';
    
    return 'general';
}

/**
 * يجلب محتوى الصفحة باستخدام Playwright لضمان تنفيذ JavaScript.
 */
async function fetchPageContent(url: string): Promise<string | null> {
  console.log(`  [Playwright] Launching browser for ${url}`);
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      ignoreHTTPSErrors: true,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    });
    const page = await context.newPage();
    await page.goto(url, {
      waitUntil: 'domcontentloaded', 
      timeout: 60000,
    });
    // انتظار إضافي بسيط لضمان تحميل العناصر الديناميكية
    await page.waitForTimeout(2000);
    const content = await page.content();
    console.log(`  [Playwright] Content loaded successfully for ${url}.`);
    return content;
  } catch (error) {
    console.error(`  [Playwright] Error fetching ${url}:`, error);
    return null;
  } finally {
    if (browser) {
      await browser.close();
      console.log(`  [Playwright] Browser closed for ${url}.`);
    }
  }
}

/**
 * يعالج صفحة واحدة، يستخلص المعلومات المهمة، ويقوم بتخزينها.
 */
async function processAndStoreUrl(url: string, embeddings: HuggingFaceTransformersEmbeddings, categoryHint: string, isStoreNameStored: boolean) {
  console.log(`Processing page: ${url} with category hint: ${categoryHint}`);
  const htmlContent = await fetchPageContent(url);
  if (!htmlContent) {
    console.log(`Skipping ${url} due to fetch error.`);
    return { docsProcessed: 0, storeNameFound: false };
  }

  const $ = cheerio.load(htmlContent);
  const documentsToStore: { pageContent: string; metadata: any }[] = [];
  let storeNameFound = false;

  // 1. استخلاص اسم المتجر (مرة واحدة فقط)
  if (!isStoreNameStored) {
    const storeName = $('title').text().split(/\||-/)[0].trim();
    if (storeName) {
      documentsToStore.push({
        pageContent: `اسم المتجر هو ${storeName}.`,
        metadata: { source: url, category: 'store_name' }
      });
      storeNameFound = true;
    }
  }

  // 2. استخلاص معلومات المنتج (إذا كانت صفحة منتج)
  if (categoryHint === 'product_page') {
    const productName = $('h1').first().text().trim();
    
    if (productName) {
      // محاولة ذكية للعثور على السعر
      let price = $('.price, .product-price, [class*="price"]').first().text().trim();
      if (!price) {
        $('span, div, p').each((i, el) => {
            const text = $(el).text();
            if (text.includes('SAR') || text.includes('ريال') || text.includes('$')) {
                price = text.trim();
                return false; // توقف عند أول سعر
            }
        });
      }

      // استخلاص الوصف
      const description = ($('.description, .product-description, #description').text() || $('meta[name="description"]').attr('content') || '').trim();

      // تجميع معلومات المنتج
      let productInfo = `اسم المنتج: ${productName}.`;
      if (price) {
        productInfo += ` السعر: ${price}.`;
      }
      if (description) {
        productInfo += ` الوصف: ${description.substring(0, 500)}.`;
      }
      
      console.log(`  [Product] Found: ${productName}`);
      documentsToStore.push({
        pageContent: productInfo,
        metadata: { source: url, category: 'product_info' }
      });
    }
  } 
  // 3. استخلاص محتوى الصفحات المتخصصة (سياسات، من نحن، إلخ)
  else if (categoryHint !== 'general' && categoryHint !== 'category_page') {
    console.log(`  Page identified as '${categoryHint}'. Extracting all content.`);
    $('script, style, nav, footer, aside, header').remove();
    let mainContent = ($('main').text() || $('article').text() || $('.content').text() || $('body').text()).replace(/\s\s+/g, ' ').trim();

    if (mainContent.length > 50) {
      const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
      const docs = await textSplitter.createDocuments([mainContent], [{ source: url, category: categoryHint }]);
      documentsToStore.push(...docs);
    }
  }

  // 4. تخزين كل ما تم تجميعه في قاعدة البيانات
  if (documentsToStore.length > 0) {
    await Chroma.fromDocuments(documentsToStore, embeddings, {
      collectionName: 'my-chatbot-collection',
      url: 'http://localhost:8000',
    } );
    console.log(`Stored ${documentsToStore.length} documents from ${url}.`);
    return { docsProcessed: documentsToStore.length, storeNameFound };
  }

  return { docsProcessed: 0, storeNameFound: false };
}

/**
 * نقطة الدخول الرئيسية للـ API.
 * يقوم بعملية زحف شاملة لجمع كل الروابط المهمة ثم معالجتها.
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { url: baseUrl } = body;
        if (!baseUrl) { return NextResponse.json({ error: 'URL is required' }, { status: 400 }); }

        const embeddings = new HuggingFaceTransformersEmbeddings({ modelName: 'Xenova/multilingual-e5-large' });
        console.log('Embeddings model loaded.');

        let totalDocumentsProcessed = 0;
        const processedUrls = new Set<string>();
        const urlsToProcess = new Map<string, string>();
        let isStoreNameStored = false;

        console.log(`\n--- Starting Comprehensive Crawl on ${baseUrl} ---`);
        
        const urlsToVisit = new Set([baseUrl]);
        const visitedForLinks = new Set<string>();
        const maxPagesToScanForLinks = 20; // حد أقصى لمنع الزحف اللانهائي

        // 1. مرحلة الاكتشاف: جمع كل الروابط المهمة من الموقع
        while (urlsToVisit.size > 0 && visitedForLinks.size < maxPagesToScanForLinks) {
            const currentUrl = urlsToVisit.values().next().value;
            urlsToVisit.delete(currentUrl);

            if (visitedForLinks.has(currentUrl)) continue;
            visitedForLinks.add(currentUrl);

            console.log(`\n--- Searching for links in: ${currentUrl} ---`);
            const pageContent = await fetchPageContent(currentUrl);
            if (pageContent) {
                const $ = cheerio.load(pageContent);
                $('a').each((i, el) => {
                    const href = $(el).attr('href');
                    if (href) {
                        try {
                            const fullUrl = new URL(href, baseUrl).href;
                            if (new URL(fullUrl).hostname === new URL(baseUrl).hostname) {
                                const category = getUrlCategory(fullUrl, $(el).text());
                                if (!urlsToProcess.has(fullUrl)) {
                                    urlsToProcess.set(fullUrl, category);
                                }
                                if (category === 'category_page' || (category === 'general' && fullUrl === baseUrl)) {
                                    urlsToVisit.add(fullUrl);
                                }
                            }
                        } catch (e) { /* تجاهل */ }
                    }
                });
            }
        }
        
        console.log(`\nFound ${urlsToProcess.size} total unique URLs to process.`);

        // 2. مرحلة المعالجة: المرور على كل الروابط المكتشفة واستخلاص محتواها
        for (const [url, category] of urlsToProcess.entries()) {
            if (processedUrls.has(url)) continue;
            const result = await processAndStoreUrl(url, embeddings, category, isStoreNameStored);
            totalDocumentsProcessed += result.docsProcessed;
            if (result.storeNameFound && !isStoreNameStored) isStoreNameStored = true;
            processedUrls.add(url);
        }

        console.log(`\n--- Comprehensive Crawl Finished ---`);
        return NextResponse.json({ 
            message: 'Comprehensive crawl completed successfully!', 
            documentsProcessed: totalDocumentsProcessed, 
            crawledUrls: Array.from(processedUrls) 
        }, { status: 200 });

    } catch (error) {
        console.error('An error occurred in the crawl API:', error);
        return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
    }
}
