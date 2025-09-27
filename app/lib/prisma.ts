// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// نعلن عن متغير عام لتخزين نسخة Prisma
declare global {
  var prisma: PrismaClient | undefined;
}

// إذا كان لدينا نسخة موجودة، نستخدمها. وإلا، ننشئ نسخة جديدة.
// في بيئة الإنتاج، سيتم إنشاء نسخة واحدة فقط.
// في بيئة التطوير، هذا يمنع إنشاء نسخ متعددة مع كل إعادة تحميل.
const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;
