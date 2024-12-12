/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Camera, IndianRupee, CheckCircle2, Store } from "lucide-react";

const TechnicalPage = () => {
  return (
    <div className="min-h-screen bg-[#FCFCFC]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="font-mono text-xl">Vendorly</h1>
            <div className="flex items-center gap-4">
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-900 transition-all"
                >
                  Dashboard
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-900 transition-all">
                    Get Started
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-white rounded-lg p-8 md:p-12 border border-neutral-200">
            {/* Technical diagram decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] border-t border-r border-black" />
            <div className="absolute bottom-0 left-0 w-32 h-32 opacity-[0.03] border-b border-l border-black" />
            <div className="absolute top-4 right-4 text-[10px] font-mono opacity-20">
              REF: 001
            </div>

            <div className="relative max-w-2xl">
              <div className="space-y-6">
                <div className="inline-flex items-center px-2 py-1 bg-blue-50 rounded text-xs font-mono text-blue-600">
                  SPEC: FASHION_BUSINESS_MANAGEMENT
                </div>

                <h1 className="font-mono text-4xl md:text-5xl">
                  Pattern for a
                  <br />
                  <span className="text-blue-600">better organized</span>
                  <br />
                  fashion business
                </h1>

                <p className="text-neutral-600 font-mono text-sm leading-loose">
                  SPEC NOTE: Current system involves scattered photos, lost
                  vendor contacts, and forgotten prices. Proposed solution
                  organizes entire workflow into one cohesive system.
                </p>

                <div className="pt-4">
                  <SignInButton mode="modal">
                    <button className="px-6 py-3 bg-blue-950 text-white rounded hover:bg-blue-900 transition-all font-mono">
                      Initialize Project
                    </button>
                  </SignInButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Design Management Spec */}
            <div className="bg-white rounded border border-neutral-200 overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="font-mono text-xs text-neutral-500">
                  MODULE: DESIGN_MANAGEMENT
                </div>
                <div className="space-y-4">
                  <Camera className="h-6 w-6 text-blue-600" />
                  <h3 className="font-mono text-lg">Design Library</h3>
                  <ul className="space-y-2 text-sm font-mono text-neutral-600">
                    <li className="flex items-center gap-2">
                      <span className="text-xs">→</span>
                      Capture designs during meetings
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-xs">→</span>
                      Auto-link to vendor details
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-xs">→</span>
                      Organize into collections
                    </li>
                  </ul>
                </div>
              </div>
              <div className="h-1 bg-blue-600" />
            </div>

            {/* Vendor Management Spec */}
            <div className="bg-white rounded border border-neutral-200 overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="font-mono text-xs text-neutral-500">
                  MODULE: VENDOR_MANAGEMENT
                </div>
                <div className="space-y-4">
                  <Store className="h-6 w-6 text-blue-600" />
                  <h3 className="font-mono text-lg">Vendor Details</h3>
                  <ul className="space-y-2 text-sm font-mono text-neutral-600">
                    <li className="flex items-center gap-2">
                      <span className="text-xs">→</span>
                      Complete contact information
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-xs">→</span>
                      Meeting history tracking
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-xs">→</span>
                      Design catalog management
                    </li>
                  </ul>
                </div>
              </div>
              <div className="h-1 bg-blue-600" />
            </div>

            {/* Price Management Spec */}
            <div className="bg-white rounded border border-neutral-200 overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="font-mono text-xs text-neutral-500">
                  MODULE: PRICE_MANAGEMENT
                </div>
                <div className="space-y-4">
                  <IndianRupee className="h-6 w-6 text-blue-600" />
                  <h3 className="font-mono text-lg">Price Tracking</h3>
                  <ul className="space-y-2 text-sm font-mono text-neutral-600">
                    <li className="flex items-center gap-2">
                      <span className="text-xs">→</span>
                      Track negotiated prices
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-xs">→</span>
                      Compare market rates
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-xs">→</span>
                      Calculate margins
                    </li>
                  </ul>
                </div>
              </div>
              <div className="h-1 bg-blue-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Flow */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="font-mono text-2xl">Implementation Flow</h2>
            </div>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="relative">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-sm text-blue-600">01</span>
                  </div>
                  <div className="space-y-2 pt-1">
                    <h3 className="font-mono text-lg">
                      Record Vendor Meetings
                    </h3>
                    <p className="font-mono text-sm text-neutral-600">
                      Capture designs, prices, and vendor details in one go. No
                      more scattered information.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-sm text-blue-600">02</span>
                  </div>
                  <div className="space-y-2 pt-1">
                    <h3 className="font-mono text-lg">Organize Collections</h3>
                    <p className="font-mono text-sm text-neutral-600">
                      Group designs by category, season, or any way you like.
                      Find anything in seconds.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-sm text-blue-600">03</span>
                  </div>
                  <div className="space-y-2 pt-1">
                    <h3 className="font-mono text-lg">Track & Analyze</h3>
                    <p className="font-mono text-sm text-neutral-600">
                      Monitor prices, compare vendors, and make data-driven
                      decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded border border-neutral-200 p-8 md:p-12">
            <div className="space-y-6 text-center">
              <div className="font-mono text-xs text-neutral-500">
                PROJECT: BUSINESS_TRANSFORMATION
              </div>
              <h2 className="font-mono text-2xl">Ready to Implement?</h2>

              <div className="flex flex-wrap justify-center gap-4">
                <SignInButton mode="modal">
                  <button className="px-6 py-3 bg-blue-950 text-white rounded hover:bg-blue-900 transition-all font-mono">
                    Start Implementation
                  </button>
                </SignInButton>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-neutral-600">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  NO_CREDIT_CARD_REQUIRED
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  FREE_FOREVER_PLAN
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="max-w-5xl mx-auto text-center font-mono text-sm text-neutral-600">
          <p>© {new Date().getFullYear()} Vendorly</p>
        </div>
      </footer>
    </div>
  );
};

export default TechnicalPage;
