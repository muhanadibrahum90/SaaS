// src/components/HeroSection.tsx

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-white text-center py-20 sm:py-24 md:py-32">
      <div className="container mx-auto px-4">
        
        {/* --- العنوان الرئيسي (H1) --- */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-[700] text-gray-900 leading-tight">
          خدمة عملاء أسرع وأسهل
            

          لمتجرك الإلكتروني
        </h1>

        {/* --- العنوان الفرعي (الوصف) --- */}
        <p className="mt-10 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 font-[600]">
          حوّل زوار موقعك إلى عملاء سعداء مع بوت دردشة ذكي يفهم لهجتهم ويرد على استفساراتهم فورًا.
        </p>

        {/* --- زر الدعوة لاتخاذ إجراء (CTA) --- */}
        <div className="mt-10">
          <Link 
            href="/signup" 
            className="bg-[#0065F8] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            ابدأ تجربتك المجانية الآن
          </Link>
        </div>


      </div>
    </section>
  );
}
