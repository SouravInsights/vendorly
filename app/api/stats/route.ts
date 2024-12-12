// app/api/stats/route.ts
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { db } from "@/db";
import { meetings, designs } from "@/db/schema";
import { count, sql, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get total meetings count for user
    const [meetingsCount] = await db
      .select({ value: count() })
      .from(meetings)
      .where(eq(meetings.userId, userId));

    // Get total designs count for user
    const [designsCount] = await db
      .select({ value: count() })
      .from(designs)
      .where(eq(designs.userId, userId));

    // Get unique locations count for user
    const uniqueLocations = await db
      .select({ location: meetings.location })
      .from(meetings)
      .where(eq(meetings.userId, userId))
      .groupBy(meetings.location);

    // Get unique vendors count for user
    const uniqueVendors = await db
      .select({ vendorName: meetings.vendorName })
      .from(meetings)
      .where(eq(meetings.userId, userId))
      .groupBy(meetings.vendorName);

    // Get shortlisted designs count for user
    const [shortlistedCount] = await db
      .select({ value: count() })
      .from(designs)
      .where(
        sql`${designs.isShortlisted} = true AND ${designs.userId} = ${userId}`
      );

    // Create achievement messages
    const recentAchievements = [];

    if (meetingsCount.value >= 1) {
      recentAchievements.push({
        id: 1,
        title: "Started Your Journey!",
        description: "Recorded your first meeting",
        date: "🎉",
      });
    }

    if (designsCount.value >= 10) {
      recentAchievements.push({
        id: 2,
        title: "Growing Collection!",
        description: "Saved 10 designs",
        date: "🌟",
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        totalMeetings: meetingsCount.value,
        totalDesigns: designsCount.value,
        uniqueLocations: uniqueLocations.length,
        uniqueVendors: uniqueVendors.length,
        shortlistedDesigns: shortlistedCount?.value ?? 0,
        recentAchievements,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch stats",
      },
      { status: 500 }
    );
  }
}
