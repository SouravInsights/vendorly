/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
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

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Vendorly
            </h1>
            <div className="flex items-center gap-4">
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all"
                >
                  Open Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Fashion Business Journey,{" "}
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Simplified
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            From vendor meetings to design collections - organize everything in
            one place. Because running a fashion business shouldn't feel like
            running a marathon.
          </p>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all text-lg">
                Start Your Journey
                <ArrowRight className="h-5 w-5" />
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </section>

      {/* "A Day in the Life" Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Because Your Day Shouldn't Look Like This...
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-start gap-3">
                  <Camera className="w-6 h-6 text-red-500 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Lost in Photos</h3>
                    <p className="text-gray-600">
                      "Wait, which photo was from which vendor? And what was the
                      price for this design? 🤔"
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-start gap-3">
                  <Phone className="w-6 h-6 text-red-500 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Contact Chaos</h3>
                    <p className="text-gray-600">
                      "I know I saved that vendor's number somewhere... was it
                      WhatsApp or Notes? 📱"
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-start gap-3">
                  <IndianRupee className="w-6 h-6 text-red-500 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Price Puzzle</h3>
                    <p className="text-gray-600">
                      "This design looks good, but what was the final negotiated
                      price? 💰"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">One-Tap Organization</h3>
                    <p className="text-gray-600">
                      Capture designs, prices, and vendor details - all
                      connected, all in one place
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Smart Collections</h3>
                    <p className="text-gray-600">
                      Group designs by category, price range, or vendor - find
                      what you need in seconds
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Business Insights</h3>
                    <p className="text-gray-600">
                      Track margins, compare prices, and make informed decisions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need, Nothing You Don't
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Meeting Magic</h3>
              <p className="text-gray-600">
                Record vendor meetings with photos, prices, and notes - all
                organized chronologically
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Design Library</h3>
              <p className="text-gray-600">
                Your personal fashion catalog - categorized, priced, and always
                at your fingertips
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
              <p className="text-gray-600">
                Find any design, vendor, or price point in seconds - no more
                endless scrolling
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Fashion Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join other fashion entrepreneurs who are growing their businesses
            with less stress and better organization.
          </p>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all text-lg">
                Start Free Today
                <ArrowRight className="h-5 w-5" />
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12 px-4">
        <div className="max-w-5xl mx-auto text-center text-gray-600">
          <p>© {new Date().getFullYear()} Vendorly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
