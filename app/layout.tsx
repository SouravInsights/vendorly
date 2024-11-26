// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "../app/components/layout/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ethnic Edge - Fashion Vendor Management",
  description: "Manage your fashion business vendors and designs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-gray-50")}>
        <Navbar />
        <main className="md:ml-64 min-h-screen pb-20 md:pb-0 pt-16 md:pt-0">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
