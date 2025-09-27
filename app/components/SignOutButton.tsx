"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="px-4 py-2 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
    >
      تسجيل الخروج
    </button>
  );
}
