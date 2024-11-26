"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight, LayoutDashboard, Users, Package } from "lucide-react";

const navigationItems = [
  {
    name: "Overview",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Vendors",
    path: "/dashboard/vendors",
    icon: Users,
  },
  {
    name: "Products",
    path: "/dashboard/products",
    icon: Package,
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          Farhana&apos;s Hub ✨
        </h1>
        <p className="text-sm text-gray-500 mt-1">Fashion & Dreams</p>
      </div>

      <nav className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center w-full px-4 py-3 rounded-lg text-sm transition-colors",
                "hover:bg-pink-50 hover:text-pink-600",
                isActive ? "bg-pink-50 text-pink-600" : "text-gray-600"
              )}
            >
              <Icon size={18} className="mr-3" />
              <span>{item.name}</span>
              <ChevronRight size={16} className="ml-auto" />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
