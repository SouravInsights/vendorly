// src/app/meeting/layout.tsx
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MeetingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      {/* Back Button */}
      <div className="fixed top-0 left-0 p-4 z-10">
        <Link href="/">
          <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-colors">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
        </Link>
      </div>

      {children}
    </div>
  );
}
