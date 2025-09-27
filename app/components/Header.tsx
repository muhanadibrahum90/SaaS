import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* --- العمود الأول: الشعار --- */}
        <div>
          <Link
            href="/signup"
            className="bg-[#0065F8] text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            ابدأ مجانًا
          </Link>
        </div>

        {/* --- العمود الثاني: روابط التنقل (لشاشات الكمبيوتر) --- */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-800 hover:text-blue-600 font-[600]">
            الرئيسية
          </Link>
          <Link href="/features" className="text-gray-800 hover:text-blue-600 font-[600]">
            الميزات
          </Link>
          <Link href="/pricing" className="text-gray-800 hover:text-blue-600 font-[600]">
            التسعير
          </Link>
        </nav>

        {/* --- العمود الثالث: زر الإجراء --- */}
        <div className="text-2xl font-bold text-gray-900 font-[700]">
          <Link href="/">
            MAI {/* استبدل هذا بشعارك لاحقًا */}
          </Link>
        </div>
      </div>
    </header>
  );
}
