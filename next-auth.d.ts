// next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  /**
   * يتم إرجاعه بواسطة `useSession`, `getSession` و `getServerSession`
   */
  interface Session {
    user: {
      /** The user's id. */
      id: string;
    } & DefaultSession['user']; // يرث الخصائص الافتراضية (name, email, image)
  }

  /**
   * كائن المستخدم كما هو مخزن في قاعدة البيانات
   */
  interface User extends DefaultUser {
    id: string;
  }
}
