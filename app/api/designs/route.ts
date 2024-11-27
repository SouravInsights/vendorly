import { NextResponse } from "next/server";
import { db } from "@/db";
import { designs, meetings } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const allDesigns = await db
      .select({
        id: designs.id,
        imageUrl: designs.imageUrl,
        basePrice: designs.basePrice,
        finalPrice: designs.finalPrice,
        similarDesignsMinPrice: designs.similarDesignsMinPrice,
        similarDesignsMaxPrice: designs.similarDesignsMaxPrice,
        notes: designs.notes,
        category: designs.category,
        minOrderQuantity: designs.minOrderQuantity,
        sizes: designs.sizes,
        isShortlisted: designs.isShortlisted,
        createdAt: designs.createdAt,
        meeting: {
          id: meetings.id,
          vendorName: meetings.vendorName,
          location: meetings.location,
        },
      })
      .from(designs)
      .innerJoin(meetings, eq(designs.meetingId, meetings.id))
      .orderBy(desc(designs.createdAt));

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
      },
      { status: 500 }
    );
  }
}
