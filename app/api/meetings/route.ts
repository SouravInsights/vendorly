export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { db } from "@/db";
import { meetings, designs } from "@/db/schema";
import { put } from "@vercel/blob";
import { nanoid } from "nanoid";
import type { ApiResponse, MeetingResponse } from "@/lib/types";

export async function POST(
  request: Request
): Promise<NextResponse<ApiResponse<MeetingResponse>>> {
  try {
    const formData = await request.formData();

    // Extract meeting data
    const vendorName = formData.get("vendorName") as string;
    const location = formData.get("location") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const notes = formData.get("notes") as string;

    // Create meeting record
    const [newMeeting] = await db
      .insert(meetings)
      .values({
        vendorName,
        location,
        phoneNumber,
        notes,
      })
      .returning();

    // Handle design files and create design records
    const designFiles = formData.getAll("designs") as File[];
    const designPrices = formData
      .getAll("prices")
      .map((price) => Number(price) || 0);
    const designNotes = formData.getAll("designNotes") as string[];

    const designPromises = designFiles.map(async (file, index) => {
      // Upload file to Vercel Blob
      const blob = await put(`designs/${nanoid()}-${file.name}`, file, {
        access: "public",
        addRandomSuffix: true,
      });

      // Create design record
      return db
        .insert(designs)
        .values({
          meetingId: newMeeting.id,
          imageUrl: blob.url,
          price: designPrices[index] * 100, // Convert to paise
          notes: designNotes[index] || null,
        })
        .returning();
    });

    const createdDesigns = await Promise.all(designPromises);

    return NextResponse.json({
      success: true,
      message: "Meeting recorded successfully!",
      data: {
        ...newMeeting,
        designs: createdDesigns.flat(),
      },
    });
  } catch (error) {
    console.error("Error creating meeting:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create meeting",
      },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<
  NextResponse<ApiResponse<MeetingResponse[]>>
> {
  try {
    const meetings = await db.query.meetings.findMany({
      orderBy: (meetings, { desc }) => [desc(meetings.createdAt)],
      limit: 10,
      with: {
        designs: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: meetings,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch meetings",
      },
      { status: 500 }
    );
  }
}
