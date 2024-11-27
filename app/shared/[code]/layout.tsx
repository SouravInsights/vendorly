import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ethnic Edge - Fashion Vendor Management",
  description: "Manage your fashion business vendors and designs",
};

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
