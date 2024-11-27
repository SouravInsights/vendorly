import { NextResponse } from "next/server";
import { db } from "@/db";
import { sharedDesigns } from "@/db/schema";
import { nanoid } from "nanoid";

export async function POST(request: Request) {
  try {
    const { designId, showPrice, showVendor, notes } = await request.json();

    const shareCode = nanoid(10);

    const [shared] = await db
      .insert(sharedDesigns)
      .values({
        designId,
        sharedBy: "farhana", // Hardcoded for now
        shareCode,
        showPrice,
        showVendor,
        notes,
      })
      .returning();

    return NextResponse.json({
      success: true,
      shareCode: shared.shareCode,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create share link",
      },
      { status: 500 }
    );
  }
}
