// src/components/dashboard/Sidebar.tsx
"use client";

import { Tab } from "@/app/dashboard/page"; // استيراد النوع من الصفحة

// تعريف الروابط مع مفتاح فريد لكل تبويب
const navLinks: { name: string; tab: Tab }[] = [
  { name: "نظرة عامة", tab: "overview" },
  { name: "التحليلات المتقدمة", tab: "analytics" },
  { name: "المحادثات", tab: "conversations" },
  { name: "إدارة قاعدة المعرفة", tab: "knowledge" },
  { name: "قاعدة العملاء الجديد", tab: "customers" },
];

type SidebarProps = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
};

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-64 flex-shrink-0 bg-white border-l border-gray-200 p-6">
      <div className="text-2xl font-bold text-gray-800 mb-10">
        لوحة القيادة
      </div>
      <nav className="flex flex-col space-y-2">
        {navLinks.map((link) => {
          const isActive = activeTab === link.tab;
          return (
            <button
              key={link.name}
              onClick={() => onTabChange(link.tab)}
              className={`px-4 py-2.5 rounded-lg text-right text-base font-medium transition-colors w-full ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {link.name}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
