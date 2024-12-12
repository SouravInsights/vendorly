import { NextResponse } from "next/server";
import { db } from "@/db";
import { designsToCollections, collections, designs } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { designId, collectionId } = await request.json();

    // Verify collection ownership
    const collection = await db.query.collections.findFirst({
      where: and(
        eq(collections.id, collectionId),
        eq(collections.userId, userId)
      ),
    });

    if (!collection) {
      return NextResponse.json(
        { success: false, error: "Collection not found or unauthorized" },
        { status: 404 }
      );
    }

    // Verify design ownership
    const design = await db.query.designs.findFirst({
      where: and(eq(designs.id, designId), eq(designs.userId, userId)),
    });

    if (!design) {
      return NextResponse.json(
        { success: false, error: "Design not found or unauthorized" },
        { status: 404 }
      );
    }

    await db.insert(designsToCollections).values({
      designId,
      collectionId,
    });

    return NextResponse.json({
      success: true,
      message: "Design added to collection",
    });
  } catch (error) {
    console.error("Error adding design to collection:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to add design to collection",
      },
      { status: 500 }
    );
  }
}
