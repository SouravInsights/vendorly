/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import {
  Camera,
  Package,
  IndianRupee,
  Calendar,
  ArrowRight,
  MessageSquare,
  Search,
  CheckCircle2,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Vendorly
            </h1>
            <div className="flex items-center gap-4">
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all"
                >
                  Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all">
                    Get Started
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-pink-100 text-pink-700 text-sm font-medium mb-8">
            Finally, a tool made for fashion entrepreneurs
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            "Wait... which vendor showed me that design? And what was the
            price?"
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Sound familiar? Meet Vendorly – because keeping track of designs,
            prices, and vendors shouldn't be harder than building your fashion
            brand.
          </p>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg hover:from-pink-600 hover:to-purple-600 transition-all">
                Start Organizing Today
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-16">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center text-gray-900">
              Meet Farhana's Daily Reality
            </h2>

            <div className="space-y-6">
              <div className="p-6 bg-red-50 rounded-xl">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Camera className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">
                      Design Photos Everywhere
                    </h3>
                    <p className="text-gray-600">
                      "I have hundreds of design photos on my phone. Some from
                      WhatsApp, some in my gallery, some in Notes. Which one was
                      from that vendor in Surat? What was the price we
                      discussed?"
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-red-50 rounded-xl">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <IndianRupee className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">
                      Price & Margin Confusion
                    </h3>
                    <p className="text-gray-600">
                      "This lehenga design is perfect, but what was the final
                      negotiated price? And with my target selling price, will I
                      make enough margin?"
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-red-50 rounded-xl">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">
                      Vendor Follow-ups
                    </h3>
                    <p className="text-gray-600">
                      "I need to follow up with that vendor about the sample...
                      wait, which one was it? Where did I save their number? Did
                      I write down what we discussed?"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center text-gray-900">
              There's a Better Way
            </h2>

            <div className="space-y-6">
              <div className="p-6 bg-emerald-50 rounded-xl">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">
                      One-Tap Meeting Records
                    </h3>
                    <p className="text-gray-600">
                      Open app → Tap 'New Meeting' → Take photos, note prices,
                      save vendor details. Everything connected, organized, and
                      searchable. Just like magic. ✨
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-emerald-50 rounded-xl">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Search className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">
                      Smart Design Library
                    </h3>
                    <p className="text-gray-600">
                      Every design photo organized by vendor, price range, and
                      category. Find any design in seconds. Compare prices,
                      calculate margins, make decisions confidently. 💪
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-emerald-50 rounded-xl">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">
                      Never Miss Follow-ups
                    </h3>
                    <p className="text-gray-600">
                      Set reminders, track sample requests, and keep your vendor
                      conversations organized. Build better relationships, get
                      better deals. 🤝
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Organized?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join other fashion entrepreneurs who are building their brands with
            less stress and better organization.
          </p>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg hover:from-pink-600 hover:to-purple-600 transition-all">
                Start Free Today
              </button>
            </SignInButton>
          </SignedOut>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Free forever plan
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="max-w-6xl mx-auto text-center text-gray-500">
          <p>© {new Date().getFullYear()} Vendorly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
