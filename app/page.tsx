import Link from "next/link";
import { Plus, Clock, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-white px-4 py-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hi Farhana! 👋</h1>
          <p className="text-gray-600 mt-1">
            Ready to record your vendor meetings?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4">
          <Link href="/meeting/new">
            <Button className="w-full h-auto p-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Plus className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">New Meeting</div>
                  <div className="text-sm opacity-90">
                    Record vendor details & designs
                  </div>
                </div>
              </div>
            </Button>
          </Link>

          {/* Recent Meetings Preview */}
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-pink-100 p-2 rounded-full">
                <Clock className="h-6 w-6 text-pink-500" />
              </div>
              <div>
                <h2 className="font-semibold">Recent Meetings</h2>
                <p className="text-sm text-gray-500">
                  View your latest vendor interactions
                </p>
              </div>
            </div>
          </Card>

          {/* Design Library Preview */}
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Book className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h2 className="font-semibold">Design Library</h2>
                <p className="text-sm text-gray-500">
                  Browse all your saved designs
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="text-sm text-gray-500">Total Meetings</div>
            <div className="text-2xl font-bold text-gray-800 mt-1">12</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-gray-500">Saved Designs</div>
            <div className="text-2xl font-bold text-gray-800 mt-1">48</div>
          </Card>
        </div>
      </div>
    </main>
  );
}
