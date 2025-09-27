// src/components/dashboard/Header.tsx
import { User } from "next-auth";
import SignOutButton from "@/app/components/SignOutButton";

type HeaderProps = {
  user: User | undefined;
};

export default function Header({ user }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      {/* Left side - Bot name selector (placeholder for now) */}
      <div>
        {/* سنضيف قائمة اختيار البوت هنا لاحقًا */}
      </div>

      {/* Right side - User menu and notifications */}
      <div className="flex items-center gap-4">
        <div className="font-medium">{user?.name}</div>
        <SignOutButton />
      </div>
    </header>
  );
}
