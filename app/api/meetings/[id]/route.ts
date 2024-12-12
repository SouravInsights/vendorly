export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { db } from "@/db";
import {
  meetings,
  designs,
  designsToCollections,
  sharedDesigns,
} from "@/db/schema";
import { eq, inArray, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const id = parseInt(params.id);

    // Verify meeting ownership
    const meeting = await db.query.meetings.findFirst({
      where: and(eq(meetings.id, id), eq(meetings.userId, userId)),
    });

    if (!meeting) {
      return NextResponse.json(
        { success: false, error: "Meeting not found or unauthorized" },
        { status: 404 }
      );
    }

    // Find all designs for this meeting
    const relatedDesigns = await db
      .select({ id: designs.id })
      .from(designs)
      .where(eq(designs.meetingId, id));

    const designIds = relatedDesigns.map((d) => d.id);

    if (designIds.length > 0) {
      // Delete shared designs
      await db
        .delete(sharedDesigns)
        .where(inArray(sharedDesigns.designId, designIds));

      // Delete collection relationships
      await db
        .delete(designsToCollections)
        .where(inArray(designsToCollections.designId, designIds));
    }

    // Delete designs
    await db.delete(designs).where(eq(designs.meetingId, id));

    // Delete meeting
    await db
      .delete(meetings)
      .where(and(eq(meetings.id, id), eq(meetings.userId, userId)));

    return NextResponse.json({
      success: true,
      message: "Meeting and associated designs deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting meeting:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to delete meeting",
      },
      { status: 500 }
    );
  }
}
