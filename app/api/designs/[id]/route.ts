export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { db } from "@/db";
import { designs } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    await db.delete(designs).where(eq(designs.id, id));

    return NextResponse.json({
      success: true,
      message: "Design deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting design:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete design",
      },
      { status: 500 }
    );
  }
}

// Add shortlist functionality
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const { isShortlisted } = await request.json();

    const [updatedDesign] = await db
      .update(designs)
      .set({ isShortlisted })
      .where(eq(designs.id, id))
      .returning();

    return NextResponse.json({
      success: true,
      data: updatedDesign,
    });
  } catch (error) {
    console.error("Error updating design:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update design",
      },
      { status: 500 }
    );
  }
}
