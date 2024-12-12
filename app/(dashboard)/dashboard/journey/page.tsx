/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, MapPin, Users, ShoppingBag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { MILESTONES, MOTIVATIONAL_QUOTES } from "@/lib/constants";

function MilestoneBadge({
  milestone,
  currentValue,
}: {
  milestone: (typeof MILESTONES)[0];
  currentValue: number;
}) {
  const progress = Math.min((currentValue / milestone.threshold) * 100, 100);
  const isCompleted = currentValue >= milestone.threshold;

  return (
    <Card
      className={`p-4 ${
        isCompleted ? "bg-gradient-to-r from-pink-50 to-purple-50" : ""
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium">{milestone.title}</h3>
          <p className="text-sm text-gray-500">{milestone.description}</p>
        </div>
        {isCompleted && (
          <div className="bg-pink-100 p-2 rounded-full">
            <Trophy className="w-4 h-4 text-pink-500" />
          </div>
        )}
      </div>
      <Progress value={progress} className="h-2" />
      <p className="text-xs text-gray-500 mt-2">
        {currentValue} / {milestone.threshold} completed
      </p>
    </Card>
  );
}

function StatsHighlight({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: any;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center space-x-3">
        <div className="bg-pink-100 p-2 rounded-full">
          <Icon className="w-5 h-5 text-pink-500" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </Card>
  );
}

function RecentAchievement({ title, date }: { title: string; date: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm"
    >
      <div className="bg-yellow-100 p-2 rounded-full">
        <Star className="w-4 h-4 text-yellow-500" />
      </div>
      <div>
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </motion.div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
    </div>
  );
}

export default function JourneyPage() {
  const [stats, setStats] = useState<any>(null);
  const [quote] = useState(
    () =>
      MOTIVATIONAL_QUOTES[
        Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)
      ]
  );

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/stats");
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch {
      console.error("Failed to fetch stats");
    }
  };

  if (!stats) return <LoadingState />;

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-8">
      {/* Header with Motivational Quote */}
      <div>
        <h1 className="text-2xl font-bold">Your Fashion Journey 🌟</h1>
        <p className="text-gray-500 mt-2 italic">{quote}</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <StatsHighlight
          title="Total Meetings"
          value={stats.totalMeetings}
          icon={Users}
        />
        <StatsHighlight
          title="Saved Designs"
          value={stats.totalDesigns}
          icon={ShoppingBag}
        />
      </div>

      {/* Milestones */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Milestones</h2>
        <div className="space-y-4">
          {MILESTONES.map((milestone) => (
            <MilestoneBadge
              key={milestone.id}
              milestone={milestone}
              currentValue={
                milestone.title === "First Steps"
                  ? stats.totalMeetings
                  : milestone.title === "Getting Started"
                  ? stats.totalDesigns
                  : milestone.title === "Building Network"
                  ? stats.uniqueVendors
                  : milestone.title === "Fashion Explorer"
                  ? stats.uniqueLocations
                  : stats.shortlistedDesigns
              }
            />
          ))}
        </div>
      </div>

      {/* Market Coverage */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Market Coverage</h2>
        <Card className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <MapPin className="text-pink-500" />
            <div>
              <h3 className="font-medium">Markets Visited</h3>
              <p className="text-sm text-gray-500">
                You&apos;ve explored {stats.uniqueLocations} different markets
                in Delhi
              </p>
            </div>
          </div>
          <Progress value={(stats.uniqueLocations / 5) * 100} className="h-2" />
        </Card>
      </div>

      {/* Recent Achievements */}
      {stats.recentAchievements?.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Recent Achievements</h2>
          <div className="space-y-2">
            {stats.recentAchievements.map((achievement: any) => (
              <RecentAchievement
                key={achievement.id}
                title={achievement.title}
                date={achievement.date}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
