/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import {
  Camera,
  Package,
  IndianRupee,
  Search,
  CheckCircle2,
  Phone,
  Store,
} from "lucide-react";

const WorkspacePage = () => {
  const [activeTab, setActiveTab] = useState("designs");

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="font-serif text-xl">Vendorly</h1>
            <div className="flex items-center gap-4">
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition-all"
                >
                  Dashboard
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition-all">
                    Get Started
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Designer's Desk */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Pinboard Style Layout */}
          <div className="relative bg-white rounded-xl p-8 shadow-sm border border-stone-200">
            {/* Decorative pins */}
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-amber-400 rounded-full" />
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-amber-400 rounded-full" />

            <div className="space-y-8">
              <span className="inline-block px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-sm">
                Your Fashion Business Companion
              </span>

              <h1 className="text-4xl md:text-5xl font-serif leading-tight">
                Stop juggling photos & prices.
                <br />
                <span className="text-rose-600">
                  Start building your brand.
                </span>
              </h1>

              <div className="flex flex-wrap items-center gap-6">
                <SignInButton mode="modal">
                  <button className="px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-all">
                    Get Started Free
                  </button>
                </SignInButton>
                <p className="text-stone-600">
                  Join fashion entrepreneurs building better businesses
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workspace Sections */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Workspace Tabs */}
          <div className="flex overflow-x-auto gap-4 mb-8 pb-2">
            {[
              { id: "designs", label: "Design Table", icon: Camera },
              { id: "vendors", label: "Vendor Files", icon: Store },
              { id: "pricing", label: "Price Tags", icon: IndianRupee },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-stone-900 text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Workspace Content */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Problem Card */}
            <div className="relative bg-rose-50 p-6 rounded-xl border border-rose-100">
              {/* Polaroid Style Images */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white p-2 rounded-lg shadow-sm rotate-6">
                <div className="w-full h-full bg-rose-100 rounded-sm" />
              </div>
              <div className="absolute -top-6 -right-8 w-24 h-24 bg-white p-2 rounded-lg shadow-sm -rotate-3">
                <div className="w-full h-full bg-rose-100 rounded-sm" />
              </div>

              <div className="space-y-4">
                {activeTab === "designs" && (
                  <>
                    <h3 className="text-lg font-medium text-rose-900">
                      Before
                    </h3>
                    <p className="text-rose-700">
                      "I'm scrolling through hundreds of photos trying to
                      remember which vendor showed me this design..."
                    </p>
                    <ul className="space-y-2 text-rose-600 text-sm">
                      <li className="flex items-center gap-2">
                        <span>•</span>
                        Photos scattered across WhatsApp & gallery
                      </li>
                      <li className="flex items-center gap-2">
                        <span>•</span>
                        Can't remember which designs are from where
                      </li>
                      <li className="flex items-center gap-2">
                        <span>•</span>
                        Price details lost in chat histories
                      </li>
                    </ul>
                  </>
                )}

                {activeTab === "vendors" && (
                  <>
                    <h3 className="text-lg font-medium text-rose-900">
                      Before
                    </h3>
                    <p className="text-rose-700">
                      "I know I saved that vendor's number somewhere... was it
                      WhatsApp or my notes?"
                    </p>
                    <ul className="space-y-2 text-rose-600 text-sm">
                      <li className="flex items-center gap-2">
                        <span>•</span>
                        Vendor contacts all over the place
                      </li>
                      <li className="flex items-center gap-2">
                        <span>•</span>
                        Can't remember who showed what
                      </li>
                      <li className="flex items-center gap-2">
                        <span>•</span>
                        Missing follow-ups with vendors
                      </li>
                    </ul>
                  </>
                )}

                {activeTab === "pricing" && (
                  <>
                    <h3 className="text-lg font-medium text-rose-900">
                      Before
                    </h3>
                    <p className="text-rose-700">
                      "What was the final price we agreed on? Let me check all
                      our conversations..."
                    </p>
                    <ul className="space-y-2 text-rose-600 text-sm">
                      <li className="flex items-center gap-2">
                        <span>•</span>
                        Price negotiations lost in chats
                      </li>
                      <li className="flex items-center gap-2">
                        <span>•</span>
                        Can't compare prices easily
                      </li>
                      <li className="flex items-center gap-2">
                        <span>•</span>
                        No way to track market rates
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* Solution Card */}
            <div className="relative bg-emerald-50 p-6 rounded-xl border border-emerald-100">
              <div className="space-y-4">
                {activeTab === "designs" && (
                  <>
                    <h3 className="text-lg font-medium text-emerald-900">
                      With Vendorly
                    </h3>
                    <p className="text-emerald-700">
                      Every design photo organized by vendor, with prices and
                      notes attached.
                    </p>
                    <div className="mt-6 space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                          <Camera className="w-5 h-5 text-emerald-600" />
                          <span className="text-sm text-emerald-900">
                            One-tap photo capture during meetings
                          </span>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                          <Package className="w-5 h-5 text-emerald-600" />
                          <span className="text-sm text-emerald-900">
                            Create collections to organize designs
                          </span>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                          <Search className="w-5 h-5 text-emerald-600" />
                          <span className="text-sm text-emerald-900">
                            Find any design in seconds
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "vendors" && (
                  <>
                    <h3 className="text-lg font-medium text-emerald-900">
                      With Vendorly
                    </h3>
                    <p className="text-emerald-700">
                      Complete vendor profiles with their designs, prices, and
                      meeting history.
                    </p>
                    <div className="mt-6 space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-emerald-600" />
                          <span className="text-sm text-emerald-900">
                            All vendor contacts in one place
                          </span>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                          <Store className="w-5 h-5 text-emerald-600" />
                          <span className="text-sm text-emerald-900">
                            Track vendor catalogs & history
                          </span>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span className="text-sm text-emerald-900">
                            Never miss a follow-up
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "pricing" && (
                  <>
                    <h3 className="text-lg font-medium text-emerald-900">
                      With Vendorly
                    </h3>
                    <p className="text-emerald-700">
                      Track every price point and calculate margins instantly.
                    </p>
                    <div className="mt-6 space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                          <IndianRupee className="w-5 h-5 text-emerald-600" />
                          <span className="text-sm text-emerald-900">
                            Complete price history for each design
                          </span>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                          <Search className="w-5 h-5 text-emerald-600" />
                          <span className="text-sm text-emerald-900">
                            Compare prices across markets
                          </span>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span className="text-sm text-emerald-900">
                            Calculate margins instantly
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200">
            <div className="space-y-6 text-center">
              <h2 className="text-2xl font-serif">Start Organizing Today</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <SignInButton mode="modal">
                  <button className="px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-all">
                    Get Started Free
                  </button>
                </SignInButton>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-stone-600">
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
        <div className="max-w-5xl mx-auto text-center text-stone-600">
          <p>© {new Date().getFullYear()} Vendorly</p>
        </div>
      </footer>
    </div>
  );
};

export default WorkspacePage;
