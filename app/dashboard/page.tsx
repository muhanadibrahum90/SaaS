// src/app/dashboard/page.tsx
"use client"; // تحويلها إلى مكون عميل

import { useState } from "react";
import Sidebar from "@/app/components/dashboard/Sidebar"; // سنعدله لاحقًا

// استيراد المكونات التي ستمثل كل تبويب
import OverviewTab from "@/app/components/dashboard/tabs/OverviewTab"; // سننشئه
import AnalyticsTab from "@/app/components/dashboard/tabs/AnalyticsTab"; // سننشئه

// تعريف أنواع التبويبات المتاحة
export type Tab = "overview" | "analytics" | "conversations" | "knowledge" | "customers";

export default function DashboardPage() {
  // حالة لتتبع التبويب النشط حاليًا
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  // دالة لتغيير التبويب، سيتم تمريرها إلى الشريط الجانبي
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  // دالة لعرض المكون المناسب بناءً على التبويب النشط
  const renderActiveTab = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "analytics":
        return <AnalyticsTab />;
      // أضف بقية الحالات هنا لاحقًا
      // case "conversations":
      //   return <ConversationsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="flex h-full">
      {/* 
        الشريط الجانبي الآن لا يقوم بالتنقل، بل يستدعي دالة لتغيير الحالة.
        لقد نقلناه من الـ layout إلى الصفحة نفسها ليتمكنا من التفاعل.
      */}
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      
      <div className="flex-1 p-6 md:p-8">
        {renderActiveTab()}
      </div>
    </div>
  );
}
