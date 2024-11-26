import { NextResponse } from "next/server";
import { db } from "@/db";
import { designs, meetings } from "@/db/schema";
import { desc } from "drizzle-orm";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
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
      .leftJoin(meetings, eq(designs.meetingId, meetings.id))
      .orderBy(desc(designs.createdAt));

    return NextResponse.json({
      success: true,
      data: allDesigns,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch designs",
      },
      { status: 500 }
    );
  }
}
