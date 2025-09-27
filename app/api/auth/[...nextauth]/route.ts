// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/app/lib/auth"; // استيراد الإعدادات من الملف المركزي

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
