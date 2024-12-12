export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { db } from "@/db";
import { designs, designsToCollections, sharedDesigns } from "@/db/schema";
import { eq, and } from "drizzle-orm";
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

    // Verify design ownership
    const design = await db.query.designs.findFirst({
      where: and(eq(designs.id, id), eq(designs.userId, userId)),
    });

    if (!design) {
      return NextResponse.json(
        {
          success: false,
          error: "Design not found or unauthorized",
        },
        { status: 404 }
      );
    }

    // Delete shared designs
    await db.delete(sharedDesigns).where(eq(sharedDesigns.designId, id));

    // Delete from collections
    await db
      .delete(designsToCollections)
      .where(eq(designsToCollections.designId, id));

    // Delete the design
    await db
      .delete(designs)
      .where(and(eq(designs.id, id), eq(designs.userId, userId)));

    return NextResponse.json({
      success: true,
      message: "Design deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting design:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to delete design",
      },
      { status: 500 }
    );
  }
}
