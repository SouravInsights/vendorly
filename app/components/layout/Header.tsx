"use client";

import React from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Welcome back!</h2>
        <p className="text-gray-500">Manage your vendors and products</p>
      </div>

      <div className="flex space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:border-pink-300 focus:ring-pink-200 focus:ring-2 focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <Button className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
          <Plus size={18} className="mr-2" /> Add New
        </Button>
      </div>
    </div>
  );
};
