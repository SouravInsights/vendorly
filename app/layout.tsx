import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "../app/components/layout/Sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ethnic Edge - Vendor Management",
  description: "Manage your fashion business vendors and products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br from-pink-50 to-white`}
      >
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-64">{children}</main>
        </div>
      </body>
    </html>
  );
}
