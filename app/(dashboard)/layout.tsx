import { SignedIn } from "@clerk/nextjs";
import { Navbar } from "@/app/(dashboard)/components/layout/Navbar";
import { DashboardProvider } from "./context/DashboardContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SignedIn>
      <DashboardProvider>
        <Navbar />
        <main className="md:ml-64 min-h-screen pb-20 md:pb-0 pt-16 md:pt-0">
          {children}
        </main>
      </DashboardProvider>
    </SignedIn>
  );
}
