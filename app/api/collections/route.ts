import { NextResponse } from "next/server";
import { db } from "@/db";
import { collections } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const allCollections = await db
      .select()
      .from(collections)
      .where(eq(collections.userId, userId))
      .orderBy(collections.createdAt);

    return NextResponse.json({
      success: true,
      data: allCollections,
    });
  } catch (error) {
    console.error("Error fetching collections:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch collections",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { name, description, emoji } = await request.json();

    const [collection] = await db
      .insert(collections)
      .values({
        userId,
        name,
        description,
        emoji,
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: collection,
    });
  } catch (error) {
    console.error("Error creating collection:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create collection",
      },
      { status: 500 }
    );
  }
}
