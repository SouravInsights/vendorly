/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from "react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Camera,
  Package,
  IndianRupee,
  ArrowRight,
  Search,
  CheckCircle2,
  Phone,
  Store,
  ChevronRight,
  ChevronLeft,
  Share2,
} from "lucide-react";
// import {
//   FabricSwatch,
//   MeasuringTape,
//   DesignSketch,
// } from "./components/decorative-elements";
import { CreativeFooter } from "./components/creative-footer";
import { FashionNametag } from "./components/fashion-nametag";
// import { getRandomPosition } from "./utils/decorative-elements";

type ScrollProgressProps = {
  progress: number;
};

const ScrollProgress = ({ progress }: ScrollProgressProps) => (
  <div className="fixed top-16 left-0 w-full h-0.5 bg-stone-100 z-50">
    <div
      className="h-full bg-rose-500/50 transition-all duration-200"
      style={{ width: `${progress}%` }}
    />
  </div>
);

const PatternBackground = () => (
  <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none">
    <svg className="w-full h-full">
      <pattern
        id="graph"
        x="0"
        y="0"
        width="24"
        height="24"
        patternUnits="userSpaceOnUse"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M24 0v24H0V0h24zM1 1v22h22V1H1z" fill="currentColor" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#graph)" />
    </svg>
  </div>
);

type TabButtonProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const TabButton = ({ active, onClick, children }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all 
      ${
        active
          ? "bg-stone-900 text-white shadow-sm"
          : "bg-stone-100 text-stone-600 hover:bg-stone-200"
      }
    `}
  >
    {children}
  </button>
);

const WorkspacePage = () => {
  const [activeTab, setActiveTab] = useState("designs");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  const scrollTabs = (direction: string) => {
    const container = document.getElementById("tabs-container");
    if (container) {
      const scrollAmount = direction === "left" ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // const [decorativePositions, setDecorativePositions] = useState({
  //   hero: {
  //     swatch1: getRandomPosition(),
  //     swatch2: getRandomPosition(),
  //     tape: getRandomPosition(),
  //     sketch: getRandomPosition(),
  //   },
  //   workspace: {
  //     swatch1: getRandomPosition(),
  //     swatch2: getRandomPosition(),
  //     tape: getRandomPosition(),
  //     sketch: getRandomPosition(),
  //   },
  //   features: {
  //     swatch1: getRandomPosition(),
  //     swatch2: getRandomPosition(),
  //     sketch: getRandomPosition(),
  //   },
  //   cta: {
  //     swatch: getRandomPosition(),
  //     tape: getRandomPosition(),
  //   },
  // });

  // // Update positions only when tab changes
  // useEffect(() => {
  //   setDecorativePositions((prev) => ({
  //     ...prev,
  //     workspace: {
  //       swatch1: getRandomPosition(),
  //       swatch2: getRandomPosition(),
  //       tape: getRandomPosition(),
  //       sketch: getRandomPosition(),
  //     },
  //   }));
  // }, [activeTab]);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* 0cred verification */}
      <div className="656af385-a223-405d-bc57-c70878a71199"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-stone-900 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">V</span>
              </div>
              <h1 className="font-serif text-xl">Vendorly</h1>
            </div>
            <div className="flex items-center gap-4">
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="group px-4 py-2 rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition-all"
                >
                  <span className="flex items-center gap-2">
                    Dashboard
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="group px-4 py-2 rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition-all">
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

      <ScrollProgress progress={scrollProgress} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-xl p-8 shadow-sm border border-stone-200">
            <PatternBackground />

            {/* Decorative Elements */}
            <div className="absolute top-0 left-12 w-24 h-24 bg-rose-50 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-12 w-32 h-32 bg-amber-50 rounded-full blur-3xl -z-10" />

            <div className="relative space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-sm"
              >
                Your Fashion Business Companion
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl font-serif leading-tight"
              >
                Every design, price & vendor detail.
                <br />
                <span className="text-rose-600">All in one place.</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap items-center gap-6"
              >
                <SignInButton mode="modal">
                  <button className="group px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-all">
                    <span className="flex items-center gap-2">
                      Start Free
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </SignInButton>
                <p className="text-stone-600">
                  Perfect for fashion entrepreneurs
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Workspace Sections */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Workspace Tabs */}
          <div className="relative flex items-center mb-8">
            {canScrollLeft && (
              <button
                onClick={() => scrollTabs("left")}
                className="absolute -left-4 z-10 p-2 bg-white rounded-full shadow-sm hover:bg-stone-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            <div
              id="tabs-container"
              className="flex overflow-x-auto scrollbar-hide gap-4 mx-4 scroll-smooth"
              onScroll={handleTabScroll}
            >
              <TabButton
                active={activeTab === "designs"}
                onClick={() => setActiveTab("designs")}
              >
                <Camera className="w-4 h-4" />
                Design Catalog
              </TabButton>

              <TabButton
                active={activeTab === "vendors"}
                onClick={() => setActiveTab("vendors")}
              >
                <Store className="w-4 h-4" />
                Vendor Directory
              </TabButton>

              <TabButton
                active={activeTab === "pricing"}
                onClick={() => setActiveTab("pricing")}
              >
                <IndianRupee className="w-4 h-4" />
                Track Pricing
              </TabButton>

              <TabButton
                active={activeTab === "sharing"}
                onClick={() => setActiveTab("sharing")}
              >
                <Share2 className="w-4 h-4" />
                Share Designs
              </TabButton>
            </div>

            {canScrollRight && (
              <button
                onClick={() => scrollTabs("right")}
                className="absolute -right-4 z-10 p-2 bg-white rounded-full shadow-sm hover:bg-stone-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Content Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Problem Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative bg-rose-50 p-6 rounded-xl border border-rose-100"
            >
              <PatternBackground />

              {/* Decorative Polaroids */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white p-2 rounded-lg shadow-sm rotate-6 hidden md:block">
                <div className="w-full h-full bg-rose-100 rounded-sm" />
              </div>
              <div className="absolute -top-6 -right-8 w-24 h-24 bg-white p-2 rounded-lg shadow-sm -rotate-3 hidden md:block">
                <div className="w-full h-full bg-rose-100 rounded-sm" />
              </div>

              <div className="space-y-4">
                {activeTab === "designs" && (
                  <>
                    <h3 className="text-lg font-medium text-rose-900">
                      Currently
                    </h3>
                    <p className="text-rose-700">
                      "I'm scrolling through hundreds of photos trying to
                      remember which vendor showed me this design..."
                    </p>
                    <ul className="space-y-2 text-rose-600 text-sm">
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        Photos scattered across WhatsApp & gallery
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        Can't remember which designs are from where
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        No way to organize collections
                      </li>
                    </ul>
                  </>
                )}

                {activeTab === "vendors" && (
                  <>
                    <h3 className="text-lg font-medium text-rose-900">
                      Currently
                    </h3>
                    <p className="text-rose-700">
                      "That vendor's contact is saved somewhere... maybe in
                      WhatsApp?"
                    </p>
                    <ul className="space-y-2 text-rose-600 text-sm">
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        Vendor contacts all over the place
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        Can't remember who showed what
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        Missing follow-ups with vendors
                      </li>
                    </ul>
                  </>
                )}

                {activeTab === "pricing" && (
                  <>
                    <h3 className="text-lg font-medium text-rose-900">
                      Currently
                    </h3>
                    <p className="text-rose-700">
                      "What was the final price we discussed? Let me check all
                      our chats..."
                    </p>
                    <ul className="space-y-2 text-rose-600 text-sm">
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        Price negotiations lost in chats
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        Can't compare prices easily
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        No way to track market rates
                      </li>
                    </ul>
                  </>
                )}

                {activeTab === "sharing" && (
                  <>
                    <h3 className="text-lg font-medium text-rose-900">
                      Currently
                    </h3>
                    <p className="text-rose-700">
                      "Need to share these designs with the client... time to
                      scroll through all my chats"
                    </p>
                    <ul className="space-y-2 text-rose-600 text-sm">
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        Designs scattered everywhere
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        No control over what clients see
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        Can't organize presentations
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </motion.div>

            {/* Solution Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative bg-emerald-50 p-6 rounded-xl border border-emerald-100"
            >
              <PatternBackground />

              <div className="space-y-4">
                {activeTab === "designs" && (
                  <>
                    <h3 className="text-lg font-medium text-emerald-900">
                      With Vendorly
                    </h3>
                    <p className="text-emerald-700">
                      Every design photo organized and connected to its vendor
                      and price details.
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

                {activeTab === "sharing" && (
                  <>
                    <h3 className="text-lg font-medium text-emerald-900">
                      With Vendorly
                    </h3>
                    <p className="text-emerald-700">
                      Share designs professionally while controlling what
                      information is visible.
                    </p>
                    <div className="mt-6 space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                          <Share2 className="w-5 h-5 text-emerald-600" />
                          <span className="text-sm text-emerald-900">
                            Create shareable collections
                          </span>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span className="text-sm text-emerald-900">
                            Choose what details to share
                          </span>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                          <Search className="w-5 h-5 text-emerald-600" />
                          <span className="text-sm text-emerald-900">
                            Professional presentation mode
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white relative overflow-hidden">
        <PatternBackground />
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-serif">
              Everything You Need
            </h2>
            <p className="text-stone-600">
              Tools designed specifically for fashion businesses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Camera,
                title: "Meeting Recorder",
                description:
                  "Record vendor meetings with photos, prices, and notes - all connected.",
              },
              {
                icon: Package,
                title: "Design Library",
                description:
                  "Your personal fashion catalog - organized, searchable, always accessible.",
              },
              {
                icon: Share2,
                title: "Smart Sharing",
                description:
                  "Share designs professionally while controlling what information is visible.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative p-6 bg-stone-50 rounded-xl border border-stone-200"
              >
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-rose-50 rounded-full blur-2xl" />
                <div className="relative space-y-4">
                  <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-medium">{feature.title}</h3>
                  <p className="text-stone-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-white p-8 rounded-xl shadow-sm border border-stone-200"
          >
            <PatternBackground />

            <div className="space-y-6 text-center relative">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-serif">
                  Start Organizing Today
                </h2>
                <p className="text-stone-600">Turn chaos into clarity</p>
              </div>

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
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <CreativeFooter />

      <FashionNametag />
    </div>
  );
};

export default WorkspacePage;
