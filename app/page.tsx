/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from "react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Package,
  IndianRupee,
  Calendar,
  ArrowRight,
  Phone,
  Search,
  CheckCircle2,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ProblemProps {
  icon: LucideIcon;
  problem: string;
  solution: string;
  isActive: boolean;
  onClick: () => void;
}

const InteractiveProblem = ({
  icon: Icon,
  problem,
  solution,
  isActive,
  onClick,
}: ProblemProps) => {
  return (
    <motion.div
      onClick={onClick}
      className={`relative overflow-hidden cursor-pointer rounded-xl transition-all duration-500 ${
        isActive
          ? "bg-violet-900 text-white"
          : "bg-violet-50 hover:bg-violet-100"
      }`}
      whileTap={{ scale: 0.98 }}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-lg ${
              isActive ? "bg-white/10" : "bg-violet-100"
            }`}
          >
            <Icon
              className={`w-6 h-6 ${
                isActive ? "text-white" : "text-violet-500"
              }`}
            />
          </div>
          <div>
            <p
              className={`font-medium ${
                isActive ? "text-white" : "text-gray-900"
              }`}
            >
              {problem}
            </p>
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4"
                >
                  <div className="space-y-2">
                    <div className="h-px bg-white/20" />
                    <p className="text-white/80">{solution}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LandingPage = () => {
  const [activeProblem, setActiveProblem] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const problems = [
    {
      icon: Camera,
      problem: "Hold up... which photo was from which vendor?",
      solution:
        "Instantly organize designs by vendor, with prices and notes attached. No more endless scrolling through your camera roll.",
    },
    {
      icon: Phone,
      problem: "That vendor's number is saved somewhere...",
      solution:
        "Keep all vendor contacts in one place, complete with their design catalogs and meeting history.",
    },
    {
      icon: IndianRupee,
      problem: "What was the final price we discussed?",
      solution:
        "Track every price point, calculate margins instantly, and never lose track of negotiations again.",
    },
    {
      icon: Calendar,
      problem: "Did I follow up about that sample?",
      solution:
        "Set reminders, track sample requests, and manage vendor relationships effortlessly.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-50">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-violet-900">Vendorly</h1>
            <div className="flex items-center gap-4">
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="group px-4 py-2 rounded-lg bg-violet-900 text-white hover:bg-violet-800 transition-all"
                >
                  <span className="flex items-center gap-2">
                    Dashboard
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="group px-4 py-2 rounded-lg bg-violet-900 text-white hover:bg-violet-800 transition-all">
                    <span className="flex items-center gap-2">
                      Get Started
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-violet-100 text-violet-900 text-sm font-medium mb-8">
              Your fashion business deserves better
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Running a fashion business is hard.
              <br />
              <span className="text-violet-900">
                Organizing it shouldn't be.
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              One app to manage your vendors, designs, and pricing. Because you
              should be focused on growing your brand, not searching for that
              one design photo.
            </p>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="group px-6 py-3 rounded-lg bg-violet-900 text-white text-lg hover:bg-violet-800 transition-all">
                  <span className="flex items-center gap-2">
                    Start Organizing Today
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </SignInButton>
            </SignedOut>
          </motion.div>
        </div>
      </section>

      {/* Interactive Problems/Solutions Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {problems.map((problem, index) => (
            <InteractiveProblem
              key={index}
              icon={problem.icon}
              problem={problem.problem}
              solution={problem.solution}
              isActive={activeProblem === index}
              onClick={() =>
                setActiveProblem(activeProblem === index ? null : index)
              }
            />
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-violet-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-violet-200">
              Powerful features that work together seamlessly
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Package,
                title: "Design Library",
                description:
                  "Your personal fashion catalog - organized, searchable, always accessible",
              },
              {
                icon: Search,
                title: "Smart Search",
                description:
                  "Find any design, vendor, or price point in seconds",
              },
              {
                icon: Calendar,
                title: "Meeting Tracker",
                description:
                  "Record vendor meetings with photos, prices, and follow-ups",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl bg-white/10 backdrop-blur-md"
              >
                <feature.icon className="w-8 h-8 mb-4 text-violet-200" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-violet-200">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Get Organized?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join fashion entrepreneurs who are growing their brands with less
            stress and better organization.
          </p>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="group px-8 py-4 rounded-lg bg-violet-900 text-white text-lg hover:bg-violet-800 transition-all">
                <span className="flex items-center gap-2">
                  Start Free Today
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </SignInButton>
          </SignedOut>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Free forever plan
            </span>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4">
        <div className="max-w-6xl mx-auto text-center text-gray-500">
          <p>© {new Date().getFullYear()} Vendorly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
