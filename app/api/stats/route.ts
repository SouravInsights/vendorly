import { NextResponse } from "next/server";
import { db } from "@/db";
import { meetings, designs } from "@/db/schema";
import { count, sql } from "drizzle-orm";

export async function GET() {
  try {
    // Get total meetings and designs
    const [meetingsCount] = await db.select({ value: count() }).from(meetings);

    const [designsCount] = await db.select({ value: count() }).from(designs);

    // Get unique locations and vendors
    const uniqueLocations = await db
      .select({ location: meetings.location })
      .from(meetings)
      .groupBy(meetings.location);

    const uniqueVendors = await db
      .select({ vendorName: meetings.vendorName })
      .from(meetings)
      .groupBy(meetings.vendorName);

    // Get shortlisted designs count
    const [shortlistedCount] = await db
      .select({ value: count() })
      .from(designs)
      .where(sql`${designs.isShortlisted} = true`);

    // Generate achievements
    const recentAchievements = [];

    if (meetingsCount.value >= 1) {
      recentAchievements.push({
        id: 1,
        title: "Started Your Journey!",
        date: "Just now",
      });
    }

    if (designsCount.value >= 10) {
      recentAchievements.push({
        id: 2,
        title: "Design Collection Growing!",
        date: "Keep going!",
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        totalMeetings: meetingsCount.value,
        totalDesigns: designsCount.value,
        uniqueLocations: uniqueLocations.length,
        uniqueVendors: uniqueVendors.length,
        shortlistedDesigns: shortlistedCount.value,
        recentAchievements,
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch stats",
      },
      { status: 500 }
    );
  }
}
