// src/components/dashboard/tabs/OverviewTab.tsx
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

// ... (انسخ مكونات StatCard, AccuracyCard, SummaryCard, ActivityChartCard من الكود السابق هنا) ...
// ... سأضعها هنا كاملة للسهولة ...

const StatCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
}) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col justify-between">
    <div className="flex justify-between items-start">
      <h3 className="text-gray-600 font-medium">{title}</h3>
      <div className="p-2 bg-gray-100 rounded-lg">
        <Icon className="w-5 h-5 text-gray-500" />
      </div>
    </div>
    <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
  </div>
);
const AccuracyCard = () => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col items-center justify-center">
    <h3 className="text-gray-600 font-medium mb-2">دقة البوت</h3>
    <div className="relative w-24 h-24">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        {/* الخلفية الرمادية */}
        <path
          stroke="currentColor"
          className="text-gray-200"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          strokeWidth="3"
        />
        {/* الدائرة الخضراء */}
        <path
          stroke="currentColor"
          className="text-green-500"
          strokeDasharray="100, 100"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          strokeLinecap="round"
          strokeWidth="4"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-900">100%</span>
      </div>
    </div>
  </div>

);
const SummaryCard = () => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 col-span-1 md:col-span-2">
    <h3 className="text-gray-600 font-medium">ملخص محادثات اليوم</h3>
    <p className="text-gray-800 mt-2">
      هنا سوف يقوم البوت بتوليد ملخص يومي عن المحادثات التي قام بإتمامها حيث
      يقول مثلاً "هناك 22 شخص يعانون من تأخير في الشحن يرجى تحسين و تسريع وسيلة
      الشحن" وهكذا.
    </p>
  </div>
);
const ActivityChartCard = () => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 col-span-1 md:col-span-4">
    <h3 className="text-gray-600 font-medium">أوقات المحادثات</h3>
    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg mt-4">
      <p className="text-gray-500">سيتم عرض الرسم البياني هنا</p>
    </div>
  </div>
);

export default function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">نظرة عامة</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="إجمالي المحادثات"
          value="139"
          icon={ChatBubbleLeftRightIcon}
        />
        <AccuracyCard />
        <SummaryCard />
        <ActivityChartCard />
      </div>
    </div>
  );
}
