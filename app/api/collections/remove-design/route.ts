import { NextResponse } from "next/server";
import { db } from "@/db";
import { designsToCollections, collections } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

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

    await db
      .delete(designsToCollections)
      .where(
        and(
          eq(designsToCollections.designId, designId),
          eq(designsToCollections.collectionId, collectionId)
        )
      );

    return NextResponse.json({
      success: true,
      message: "Design removed from collection",
    });
  } catch (error) {
    console.error("Error removing design from collection:", error);
    return NextResponse.json(
      { success: false, error: "Failed to remove design from collection" },
      { status: 500 }
    );
  }
}
