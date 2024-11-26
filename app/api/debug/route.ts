export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { db } from "@/db";
import { meetings, designs } from "@/db/schema";

export async function GET() {
  try {
    // Get all meetings with their designs
    const allMeetings = await db.select().from(meetings);

    const allDesigns = await db.select().from(designs);

    return NextResponse.json({
      success: true,
      data: {
        meetings: allMeetings,
        designs: allDesigns,
        meetingsCount: allMeetings.length,
        designsCount: allDesigns.length,
      },
    });
  } catch (error) {
    console.error("Error fetching debug data:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch debug data",
      },
      { status: 500 }
    );
  }
}
