import React from "react";
import { Search, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  // Get current time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Get a random motivational message
  const getMotivationalMessage = () => {
    const messages = [
      "You're doing great! Every small step counts 🌟",
      "Building something amazing takes time, and you're on the right path! ✨",
      "Remember: every successful business started exactly where you are now 🚀",
      "Your fashion dreams are valid! Keep going 💫",
      "Small beginnings, big possibilities! 🌱",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            {getGreeting()}, Farhana!{" "}
            <Sparkles className="text-pink-500" size={20} />
          </h2>
          <p className="text-sm text-pink-600 font-medium mt-1">
            {getMotivationalMessage()}
          </p>
        </div>

        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search vendors or products..."
              className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:border-pink-300 focus:ring-pink-200 focus:ring-2 focus:outline-none w-64"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
          <Button className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
            <Plus size={18} className="mr-2" /> Add New
          </Button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg mt-6">
        <h3 className="font-medium text-gray-800">Quick Tip 💡</h3>
        <p className="text-sm text-gray-600 mt-1">
          Start with a few trusted vendors and build relationships. Quality
          partnerships are the foundation of a successful fashion business!
        </p>
      </div>
    </div>
  );
};
