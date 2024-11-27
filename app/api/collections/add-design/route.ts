import { NextResponse } from "next/server";
import { db } from "@/db";
import { designsToCollections } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const { designId, collectionId } = await request.json();

    await db.insert(designsToCollections).values({
      designId,
      collectionId,
    });

    return NextResponse.json({
      success: true,
      message: "Design added to collection",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to add design to collection",
      },
      { status: 500 }
    );
  }
}
