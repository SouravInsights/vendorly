"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Menu, X, Home, Plus, Clock, Book, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "Home",
    mobileName: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "New Meeting",
    mobileName: "New", // Shorter for mobile
    href: "/meetings/new",
    icon: Plus,
  },
  {
    name: "Recent",
    mobileName: "Recent",
    href: "/meetings",
    icon: Clock,
  },
  {
    name: "Designs",
    mobileName: "Designs",
    href: "/designs",
    icon: Book,
  },
  {
    name: "Journey",
    mobileName: "Journey",
    href: "/journey",
    icon: Trophy,
  },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-white shadow-lg p-6"
      >
        <div className="w-full">
          {/* Logo */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              Ethnic Edge
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Farhana&apos;s Fashion Hub
            </p>
          </motion.div>

          {/* Navigation Links */}
          <div className="space-y-2">
            {navItems.map((item, i) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * (i + 1) }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center w-full px-4 py-3 rounded-lg text-sm transition-colors",
                      "hover:bg-pink-50 hover:text-pink-600",
                      isActive ? "bg-pink-50 text-pink-600" : "text-gray-600"
                    )}
                  >
                    <Icon size={18} className="mr-3" />
                    <span>{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute left-0 w-1 h-8 bg-pink-500 rounded-r-full"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navbar */}
      <div className="md:hidden">
        {/* Top Bar */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-40 px-4 flex items-center justify-between"
        >
          <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            Ethnic Edge
          </h1>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </motion.div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-30 pt-16"
          >
            <div className="p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <motion.div key={item.href} whileTap={{ scale: 0.98 }}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center w-full px-4 py-3 rounded-lg transition-colors",
                        "hover:bg-pink-50 hover:text-pink-600",
                        isActive ? "bg-pink-50 text-pink-600" : "text-gray-600"
                      )}
                    >
                      <Icon size={20} className="mr-3" />
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Bottom Navigation Bar */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t z-40"
        >
          <div className="grid grid-cols-5 h-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    className={cn(
                      "flex flex-col items-center justify-center h-full",
                      isActive ? "text-pink-600" : "text-gray-600"
                    )}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={20} />
                    <span className="text-[10px] mt-1 leading-none">
                      {item.mobileName}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTabMobile"
                        className="absolute bottom-0 w-12 h-0.5 bg-pink-500"
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </>
  );
}
