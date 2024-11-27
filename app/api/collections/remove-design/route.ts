import { NextResponse } from "next/server";
import { db } from "@/db";
import { designsToCollections } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { designId, collectionId } = await request.json();

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
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to remove design from collection" },
      { status: 500 }
    );
  }
}
