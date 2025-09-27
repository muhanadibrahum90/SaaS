// src/components/HowItWorksSection.tsx

// يمكننا إنشاء مكون صغير للبطاقة لجعل الكود أنظف
const StepCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
      <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default function HowItWorksSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container mx-auto px-4">
        {/* --- العنوان الرئيسي للقسم --- */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            كيف يعمل؟
          </h2>
        </div>

        {/* --- شبكة الخطوات الثلاث --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* ملاحظة: الترتيب في الكود معكوس ليظهر صحيحًا في واجهة RTL */}

          {/* الخطوة 1 */}
          <StepCard
            title='"اربط موقعك"'
            description="فقط انسخ والصق سطرًا واحدًا في موقعك."
          />

          {/* الخطوة 2 */}
          <StepCard
            title='"الزحف الذكي"'
            description="سيقوم البوت تلقائيًا بقراءة وفهم كل منتجاتك وصفحاتك."
          />

          {/* الخطوة 3 */}
          <StepCard
            title='"انطلق!"'
            description="في دقائق، يصبح البوت جاهزًا للرد على عملائك 24/7."
          />
        </div>
      </div>
    </section>
  );
}
