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

    // Check if design exists
    const [design] = await db.select().from(designs).where(eq(designs.id, id));

    if (!design) {
      return NextResponse.json(
        {
          success: false,
          message: "Design not found",
        },
        { status: 404 }
      );
    }

    // Delete the design
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
