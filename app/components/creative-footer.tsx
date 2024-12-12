/* eslint-disable react/no-unescaped-entities */
import React from "react";

export const CreativeFooter: React.FC = () => {
  return (
    <footer className="relative py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <p className="text-center text-base text-stone-600">
          © {new Date().getFullYear()} Vendorly. All rights reserved, just like
          that perfect dress you didn't buy.
        </p>
        <p className="text-center text-sm text-stone-500 mt-2 italic">
          "Fashion is like eating, you shouldn't stick to the same menu." -
          Kenzo Takada
        </p>
      </div>
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-auto"
        viewBox="0 0 1440 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 200L60 183.3C120 166.7 240 133.3 360 116.7C480 100 600 100 720 108.3C840 116.7 960 133.3 1080 141.7C1200 150 1320 150 1380 150L1440 150V200H1380C1320 200 1200 200 1080 200C960 200 840 200 720 200C600 200 480 200 360 200C240 200 120 200 60 200H0Z"
          fill="#FDF2F8"
        />
        <path
          d="M0 200L60 191.7C120 183.3 240 166.7 360 158.3C480 150 600 150 720 158.3C840 166.7 960 183.3 1080 191.7C1200 200 1320 200 1380 200L1440 200V200H1380C1320 200 1200 200 1080 200C960 200 840 200 720 200C600 200 480 200 360 200C240 200 120 200 60 200H0Z"
          fill="#FCE7F3"
        />
      </svg>
    </footer>
  );
};
