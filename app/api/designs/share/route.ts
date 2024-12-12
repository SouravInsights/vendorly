import { NextResponse } from "next/server";
import { db } from "@/db";
import { sharedDesigns, designs } from "@/db/schema";
import { nanoid } from "nanoid";
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

    const { designId, showPrice, showVendor, notes, sharedBy } =
      await request.json();

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

    const shareCode = nanoid(10);

    const [shared] = await db
      .insert(sharedDesigns)
      .values({
        designId,
        userId,
        sharedBy: sharedBy || "Anonymous",
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
  } catch (error) {
    console.error("Error sharing design:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create share link",
      },
      { status: 500 }
    );
  }
}
