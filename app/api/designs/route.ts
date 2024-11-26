export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { db } from "@/db";
import { designs, meetings } from "@/db/schema";
import { desc, eq, sql, isNull } from "drizzle-orm";

export async function GET() {
  try {
    // Use inner join to only get designs with existing meetings
    const allDesigns = await db
      .select({
        id: designs.id,
        imageUrl: designs.imageUrl,
        price: designs.price,
        notes: designs.notes,
        category: designs.category,
        isShortlisted: designs.isShortlisted,
        meeting: {
          id: meetings.id,
          vendorName: meetings.vendorName,
          location: meetings.location,
        },
      })
      .from(designs)
      .innerJoin(meetings, eq(designs.meetingId, meetings.id))
      .orderBy(desc(designs.createdAt));

    // Log for debugging
    console.log("Fetched designs:", allDesigns);

    // Find orphaned designs - using isNull for type safety
    const orphanedDesigns = await db
      .select({
        id: designs.id,
      })
      .from(designs)
      .leftJoin(meetings, eq(designs.meetingId, meetings.id))
      .where(isNull(meetings.id));

    if (orphanedDesigns.length > 0) {
      console.log("Found orphaned designs:", orphanedDesigns);

      // Delete orphaned designs using SQL for type safety
      await db
        .delete(designs)
        .where(sql`${designs.id} = ANY(${orphanedDesigns.map((d) => d.id)})`);

      console.log("Deleted orphaned designs");
    }

    return NextResponse.json({
      success: true,
      data: allDesigns,
    });
  } catch (error) {
    console.error("Error fetching designs:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch designs",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Cleanup endpoint
export async function DELETE() {
  try {
    // Find and delete orphaned designs
    const orphanedDesigns = await db
      .select({
        id: designs.id,
      })
      .from(designs)
      .leftJoin(meetings, eq(designs.meetingId, meetings.id))
      .where(isNull(meetings.id));

    if (orphanedDesigns.length > 0) {
      await db
        .delete(designs)
        .where(sql`${designs.id} = ANY(${orphanedDesigns.map((d) => d.id)})`);

      return NextResponse.json({
        success: true,
        message: `Cleaned up ${orphanedDesigns.length} orphaned designs`,
      });
    }

    return NextResponse.json({
      success: true,
      message: "No orphaned designs found",
    });
  } catch (error) {
    console.error("Error cleaning up designs:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to clean up designs",
      },
      { status: 500 }
    );
  }
}
