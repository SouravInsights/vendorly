export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { db } from "@/db";
import { designs, designsToCollections, sharedDesigns } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    // First delete shared designs
    await db.delete(sharedDesigns).where(eq(sharedDesigns.designId, id));

    // Then delete from designs_to_collections
    await db
      .delete(designsToCollections)
      .where(eq(designsToCollections.designId, id));

    // Finally delete the design
    const [deletedDesign] = await db
      .delete(designs)
      .where(eq(designs.id, id))
      .returning();

    if (!deletedDesign) {
      return NextResponse.json(
        {
          success: false,
          error: `Design with id ${id} not found`,
        },
        { status: 404 }
      );
    }

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
