export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { db } from "@/db";
import { meetings, designs } from "@/db/schema";
import { put } from "@vercel/blob";
import { nanoid } from "nanoid";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import type { DesignCategory } from "@/lib/constants";

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

    // Extract meeting data
    const vendorName = formData.get("vendorName") as string;
    const location = formData.get("location") as string;
    const phoneNumber = (formData.get("phoneNumber") as string) || undefined;
    const notes = (formData.get("notes") as string) || undefined;

    // Create meeting record with userId
    const [newMeeting] = await db
      .insert(meetings)
      .values({
        userId,
        vendorName,
        location,
        phoneNumber: phoneNumber || null,
        notes: notes || null,
      })
      .returning();

    // Handle design files
    const designFiles = formData.getAll("designs") as File[];

    const designPromises = designFiles.map(async (file, index) => {
      const blob = await put(`designs/${nanoid()}-${file.name}`, file, {
        access: "public",
        addRandomSuffix: true,
      });

      const basePrice = parseInt(
        formData.get(`basePrice_${index}`)?.toString() || "0"
      );
      const finalPrice = parseInt(
        formData.get(`finalPrice_${index}`)?.toString() || "0"
      );
      const similarMinPrice = formData
        .get(`similarMinPrice_${index}`)
        ?.toString();
      const similarMaxPrice = formData
        .get(`similarMaxPrice_${index}`)
        ?.toString();
      const category = formData
        .get(`category_${index}`)
        ?.toString() as DesignCategory | null;
      const designNotes = formData.get(`notes_${index}`)?.toString();

      const [design] = await db
        .insert(designs)
        .values({
          userId,
          meetingId: newMeeting.id,
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
          notes: designNotes || null,
          source: "meeting",
        })
        .returning();

      return design;
    });

    const createdDesigns = await Promise.all(designPromises);

    return NextResponse.json({
      success: true,
      message: "Meeting recorded successfully!",
      data: {
        id: newMeeting.id,
        vendorName: newMeeting.vendorName,
        location: newMeeting.location,
        phoneNumber: newMeeting.phoneNumber || undefined,
        notes: newMeeting.notes || undefined,
        designs: createdDesigns,
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

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const allMeetings = await db.query.meetings.findMany({
      where: eq(meetings.userId, userId),
      orderBy: (meetings, { desc }) => [desc(meetings.createdAt)],
      limit: 10,
      with: {
        designs: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: allMeetings,
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
