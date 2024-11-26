import { NextResponse } from "next/server";
import { db } from "@/db";
import { meetings, designs } from "@/db/schema";
import { count, sql } from "drizzle-orm";

export async function GET() {
  try {
    // Get total meetings count
    const [meetingsCount] = await db.select({ value: count() }).from(meetings);

    // Get total designs count
    const [designsCount] = await db.select({ value: count() }).from(designs);

    // Get unique locations count
    const uniqueLocations = await db
      .select({ location: meetings.location })
      .from(meetings)
      .groupBy(meetings.location);

    // Get unique vendors count
    const uniqueVendors = await db
      .select({ vendorName: meetings.vendorName })
      .from(meetings)
      .groupBy(meetings.vendorName);

    // Get shortlisted designs count
    const [shortlistedCount] = await db
      .select({ value: count() })
      .from(designs)
      .where(sql`${designs.isShortlisted} = true`);

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

    // Log the counts for debugging
    console.log("Stats:", {
      totalMeetings: meetingsCount.value,
      totalDesigns: designsCount.value,
      uniqueLocations: uniqueLocations.length,
      uniqueVendors: uniqueVendors.length,
    });

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
