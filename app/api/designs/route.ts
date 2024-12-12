// app/api/designs/route.ts
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { db } from "@/db";
import { designs, meetings } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { nanoid } from "nanoid";
import { put } from "@vercel/blob";
import type { DesignCategory } from "@/lib/constants";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

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
        source: designs.source,
        meetingId: designs.meetingId,
        meetingVendorName: meetings.vendorName,
        meetingLocation: meetings.location,
      })
      .from(designs)
      .leftJoin(meetings, eq(designs.meetingId, meetings.id))
      .where(eq(designs.userId, userId))
      .orderBy(desc(designs.createdAt));

    // Transform the data to structure meeting info
    const transformedDesigns = allDesigns.map((design) => {
      const { meetingId, meetingVendorName, meetingLocation, ...designData } =
        design;

      return {
        ...designData,
        meeting: meetingId
          ? {
              id: meetingId,
              vendorName: meetingVendorName,
              location: meetingLocation,
            }
          : null,
      };
    });

    return NextResponse.json({
      success: true,
      data: transformedDesigns,
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

// New POST endpoint for creating designs directly
export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();

    const file = formData.get("design") as File;
    if (!file) {
      return NextResponse.json(
        { success: false, error: "No design image provided" },
        { status: 400 }
      );
    }

    const blob = await put(`designs/${nanoid()}-${file.name}`, file, {
      access: "public",
      addRandomSuffix: true,
    });

    const basePrice = parseInt(formData.get("basePrice")?.toString() || "0");
    const finalPrice = parseInt(formData.get("finalPrice")?.toString() || "0");
    const similarMinPrice = formData.get("similarMinPrice")?.toString();
    const similarMaxPrice = formData.get("similarMaxPrice")?.toString();
    const category = formData
      .get("category")
      ?.toString() as DesignCategory | null;
    const notes = formData.get("notes")?.toString();
    const meetingId = formData.get("meetingId")?.toString();

    const [design] = await db
      .insert(designs)
      .values({
        userId,
        meetingId: meetingId ? parseInt(meetingId) : null,
        imageUrl: blob.url,
        basePrice: basePrice * 100,
        finalPrice: finalPrice * 100,
        similarDesignsMinPrice: similarMinPrice
          ? parseInt(similarMinPrice) * 100
          : null,
        similarDesignsMaxPrice: similarMaxPrice
          ? parseInt(similarMaxPrice) * 100
          : null,
        category: category || null,
        notes: notes || null,
        source: meetingId ? "meeting" : "direct",
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: design,
    });
  } catch (error) {
    console.error("Error creating design:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create design",
      },
      { status: 500 }
    );
  }
}
