// src/app/api/test-query/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { Chroma } from '@langchain/community/vectorstores/chroma';
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";
// [تحديث] استيراد ChromaClient من المكتبة الأساسية
import { ChromaClient } from 'chromadb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    const embeddings = new HuggingFaceTransformersEmbeddings({
      modelName: 'Xenova/multilingual-e5-large',
    });

    const collectionName = 'my-chatbot-collection';
    const chromaUrl = 'http://localhost:8000';

    let results;
    let message: string;

    if (query) {
      // --- إذا كان هناك سؤال، استخدم LangChain للبحث ---
      message = `Query successful! Here are the most similar results for: "${query}"`;
      const vectorStore = new Chroma(embeddings, {
        collectionName: collectionName,
        url: chromaUrl,
      });
      results = await vectorStore.similaritySearch(query, 4);

    } else {
      // --- إذا لم يكن هناك سؤال، جلب كل المستندات ---
      message = "No query provided. Fetching all documents from the collection.";

      const client = new ChromaClient({ path: chromaUrl });
      const collection = await client.getCollection({ name: collectionName });

      const count = await collection.count();
      if (count === 0) {
        return NextResponse.json({ message: "The collection is empty." }, { status: 200 });
      }

      // جلب كل المستندات
      const queryResult = await collection.get({
        limit: count,
        offset: 0,
        include: ["metadatas", "documents"],
      });

      results = queryResult.ids.map((id, index) => ({
        pageContent: queryResult.documents?.[index] ?? '',
        metadata: queryResult.metadatas?.[index] ?? {},
      }));
    }

    return NextResponse.json({ 
      message: message,
      results: results 
    }, { status: 200 });

  } catch (error) {
    console.error('Query test failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Failed to query ChromaDB', details: errorMessage }, { status: 500 });
  }
}
