import { NextResponse } from "next/server";
import { db } from "@/db";
import { designs } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    await db.delete(designs).where(eq(designs.id, id));

    return NextResponse.json({
      success: true,
      message: "Design deleted successfully",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete design",
      },
      { status: 500 }
    );
  }
}
