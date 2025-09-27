// src/components/FeaturesSection.tsx

// مكون صغير للميزة الواحدة لجعل الكود أنظف
const FeatureItem = ({ title, description, reverse = false }: { title: string, description: string, reverse?: boolean }) => {
  // نحدد اتجاه الصف بناءً على خاصية 'reverse'
  const directionClass = reverse ? 'md:flex-row-reverse' : 'md:flex-row';

  return (
    <div className={`flex flex-col ${directionClass} items-center mb-20`}>
      {/* يمكننا إضافة أيقونة أو صورة هنا لاحقًا */}
      <div className="w-full md:w-1/2 p-6">
        <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
          <p className="text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function FeaturesSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container mx-auto px-4">
        
        {/* --- العنوان الرئيسي للقسم --- */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            مميزاتنا
          </h2>
        </div>

        {/* --- قائمة الميزات --- */}
        <div>
          <FeatureItem 
            title="يفهم لهجتك عملائك"
            description="بوتنا مدرب خصيصًا على اللهجة السعودية، ليفهم تعابير عملائك اليومية بدقة ويقدم لهم تجربة طبيعية ومريحة كما لو كانوا يتحدثون مع إنسان."
          />
          <FeatureItem 
            title="إجابات فورية من قلب متجرك"
            description="لا حاجة للتغذية اليدوية. يقوم الزاحف الذكي بفهرسة منتجاتك، أسعارك، وسياساتك تلقائيًا، ليقدم إجابات دقيقة ومحدثة دائمًا."
            reverse={true} // <-- نعكس اتجاه هذه الميزة
          />
          <FeatureItem 
            title="حوّل الفرص الضائعة إلى أرباح"
            description="عندما يبحث عميل عن منتج غير متوفر، يقوم البوت بجمع بياناته ليتم إشعاره عند توفره، مما يمنحك قائمة بالعملاء المحتملين وتحليلات لطلب السوق."
          />
        </div>

      </div>
    </section>
  );
}
