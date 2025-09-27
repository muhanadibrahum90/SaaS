// src/app/signup/page.tsx
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleIcon } from '../components/icons/GoogleIcon';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        router.push('/dashboard');
        router.refresh(); // توجيه المستخدم لتسجيل الدخول بعد النجاح
      } else {
        const data = await res.json();
        setError(data.message || 'حدث خطأ ما.');
      }
    } catch (err) {
      setError('فشل الاتصال بالخادم.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4" dir="rtl">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
            أنشئ حسابك وابدأ مجاناً
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* حقول الإدخال مع onChange */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">الاسم</label>
            <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">كلمة المرور</label>
            <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <button type="submit" className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
              إنشاء حساب
            </button>
          </div>
        </form>

        {/* بقية الكود (Google button, link to sign-in) */}
        <div className="relative mt-6"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div><div className="relative flex justify-center text-sm"><span className="bg-white px-2 text-gray-500">أو</span></div></div>
        <div className="mt-6"><button type="button" className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"><GoogleIcon className="h-5 w-5" /><span>المتابعة بـ Google</span></button></div>
        <p className="mt-8 text-center text-sm text-gray-600">لدي حساب بالفعل؟{' '}<Link href="/signin" className="font-medium text-blue-600 hover:text-blue-500">تسجيل الدخول</Link></p>
      </div>
    </div>
  );
};

export default SignUpPage;
