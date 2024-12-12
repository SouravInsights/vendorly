/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import {
  Camera,
  Package,
  IndianRupee,
  Search,
  CheckCircle2,
} from "lucide-react";

const JournalPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-serif">Vendorly</h1>
            <div className="flex items-center gap-4">
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-all"
                >
                  Dashboard
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-all">
                    Get Started
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero - Journal Cover */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-white rounded-lg p-8 shadow-sm">
            {/* Decorative tape */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-6 bg-neutral-200/50 rounded-sm transform -rotate-2" />

            <div className="space-y-6 font-serif">
              <p className="text-sm text-neutral-600">Entry #1</p>
              <h1 className="text-3xl md:text-4xl">
                "I have hundreds of designs on my phone... somewhere. Some from
                WhatsApp, some in gallery, some in notes."
              </h1>
              <p className="text-neutral-600">
                Every fashion entrepreneur's daily struggle. The constant juggle
                of photos, prices, and vendor details.
              </p>

              <div className="pt-6 flex flex-wrap gap-4">
                <SignInButton mode="modal">
                  <button className="px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-all">
                    Start Organizing Today
                  </button>
                </SignInButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Notes Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Before Note */}
            <div className="bg-red-50 p-6 rounded-lg border border-red-100 rotate-1">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-lg">📝</span>
                  <p className="text-sm text-red-800">Daily Struggles</p>
                </div>
                <ul className="space-y-3 text-red-900">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <p>
                      Show this design to client... if I can find it in my
                      WhatsApp
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <p>
                      What was the price for that blue lehenga? Check all chats
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <p>Which vendor showed better work at lower prices?</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <p>Need to follow up with that vendor about samples...</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* After Note */}
            <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100 -rotate-1">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-lg">✨</span>
                  <p className="text-sm text-emerald-800">With Vendorly</p>
                </div>
                <ul className="space-y-3 text-emerald-900">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <p>Open app → Tap vendor → Find design → Share</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <p>Every price saved with its design. Always there.</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <p>Compare vendors & prices in one place</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <p>Set reminders, never miss a follow-up</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sketched Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Vendor Meetings */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                  <Camera className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Vendor Meetings</h3>
                  <p className="text-neutral-600 mt-1">
                    Take photos, note prices, save vendor details. Everything
                    connected, organized, searchable.
                  </p>
                </div>
              </div>
            </div>

            {/* Design Collections */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Design Collections</h3>
                  <p className="text-neutral-600 mt-1">
                    Create collections, add designs, share with your team or
                    clients. Your digital design library.
                  </p>
                </div>
              </div>
            </div>

            {/* Price Tracking */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                  <IndianRupee className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Price Tracking</h3>
                  <p className="text-neutral-600 mt-1">
                    Track costs, compare prices across markets, calculate
                    margins. Make informed decisions.
                  </p>
                </div>
              </div>
            </div>

            {/* Smart Search */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Smart Search</h3>
                  <p className="text-neutral-600 mt-1">
                    Find any design by vendor, price range, or category. No more
                    endless scrolling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Final Note */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200">
            <div className="space-y-6 text-center">
              <h2 className="text-2xl font-medium">Ready to get organized?</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <SignInButton mode="modal">
                  <button className="px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-all">
                    Start Free Today
                  </button>
                </SignInButton>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-600">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  No credit card required
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Free forever plan
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="max-w-5xl mx-auto text-center text-neutral-600">
          <p>© {new Date().getFullYear()} Vendorly</p>
        </div>
      </footer>
    </div>
  );
};

export default JournalPage;
