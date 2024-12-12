import React, { useState } from "react";
import Link from "next/link";
import { Scissors } from "lucide-react";

export const InteractiveNametag: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleInteraction = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div
      className="fixed bottom-4 right-4 z-50"
      onMouseEnter={handleInteraction}
      onClick={handleInteraction}
    >
      <div
        className={`
        bg-white p-3 rounded-lg shadow-md border border-stone-200 
        transform transition-all duration-300 
        ${isAnimating ? "scale-110 rotate-3" : "hover:scale-105"}
      `}
      >
        <Link
          href="https://souravinsights.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 group"
        >
          <Scissors
            className={`
            w-6 h-6 text-rose-500 transition-all duration-300
            ${isAnimating ? "rotate-180 scale-110" : "group-hover:rotate-45"}
          `}
          />
          <span className="text-sm font-medium text-stone-700">
            Crafted by{" "}
            <span
              className={`
              text-rose-500 transition-all duration-300
              ${isAnimating ? "text-lg font-bold" : "group-hover:underline"}
            `}
            >
              souravinsights
            </span>
          </span>
        </Link>
      </div>
      <div
        className={`
        absolute inset-0 bg-rose-100 rounded-lg opacity-0 transition-opacity duration-300
        ${isAnimating ? "animate-ping opacity-30" : ""}
      `}
      ></div>
    </div>
  );
};
