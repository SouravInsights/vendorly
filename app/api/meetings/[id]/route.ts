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
import { eq, inArray } from "drizzle-orm";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    // First, find all designs for this meeting
    const relatedDesigns = await db
      .select({ id: designs.id })
      .from(designs)
      .where(eq(designs.meetingId, id));

    const designIds = relatedDesigns.map((d) => d.id);

    if (designIds.length > 0) {
      // First delete shared designs
      await db
        .delete(sharedDesigns)
        .where(inArray(sharedDesigns.designId, designIds));

      // Then delete collection relationships
      await db
        .delete(designsToCollections)
        .where(inArray(designsToCollections.designId, designIds));
    }

    // Delete all related designs
    await db.delete(designs).where(eq(designs.meetingId, id));

    // Finally delete the meeting
    const [deletedMeeting] = await db
      .delete(meetings)
      .where(eq(meetings.id, id))
      .returning();

    if (!deletedMeeting) {
      return NextResponse.json(
        {
          success: false,
          error: `Meeting with id ${id} not found`,
        },
        { status: 404 }
      );
    }

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
