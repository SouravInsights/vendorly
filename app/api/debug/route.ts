export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { db } from "@/db";
import { meetings, designs } from "@/db/schema";
import { eq } from "drizzle-orm";
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

    // Get all meetings with their designs for the user
    const allMeetings = await db
      .select()
      .from(meetings)
      .where(eq(meetings.userId, userId));

    const allDesigns = await db
      .select()
      .from(designs)
      .where(eq(designs.userId, userId));

    return NextResponse.json({
      success: true,
      data: {
        meetings: allMeetings,
        designs: allDesigns,
        meetingsCount: allMeetings.length,
        designsCount: allDesigns.length,
        userId,
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
