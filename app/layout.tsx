import type { Metadata } from "next";
import { El_Messiri } from "next/font/google";
import "./globals.css";
import { AuthProvider } from './components/AuthProvider';


const elMessiri = El_Messiri({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "My Chatbot SaaS",
  description: "AI chatbot for your website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={elMessiri.className}>
         <AuthProvider> {/* تغليف التطبيق بالمزود */}
          {children}
        </AuthProvider>
      </body>
      
    </html>
  );
}
