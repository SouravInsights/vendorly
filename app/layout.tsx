import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/app/components/layout/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { AppProvider } from "@/app/context/AppContext";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vendorly - Fashion Vendor Management",
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
        <AppProvider>
          <Navbar />
          <main className="md:ml-64 min-h-screen pb-20 md:pb-0 pt-16 md:pt-0">
            {children}
          </main>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
