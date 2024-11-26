import { NextResponse } from "next/server";
import { db } from "@/db";
import { meetings, designs } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    // First delete associated designs
    await db.delete(designs).where(eq(designs.meetingId, id));

    // Then delete the meeting
    await db.delete(meetings).where(eq(meetings.id, id));

    return NextResponse.json({
      success: true,
      message: "Meeting deleted successfully",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete meeting",
      },
      { status: 500 }
    );
  }
}
