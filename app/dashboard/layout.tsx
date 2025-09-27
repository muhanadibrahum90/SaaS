// src/app/dashboard/layout.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import Header from "@/app/components/dashboard/Header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/sign-in?callbackUrl=/dashboard");
  }

  return (
    <div className="flex h-screen bg-gray-50" dir="rtl">
      {/* الشريط الجانبي تم نقله إلى page.tsx */}
      <div className="flex flex-1 flex-col">
        <Header user={session.user} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
