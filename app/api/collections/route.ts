import { NextResponse } from "next/server";
import { db } from "@/db";
import { collections } from "@/db/schema";

export async function GET() {
  try {
    const allCollections = await db
      .select()
      .from(collections)
      .orderBy(collections.createdAt);

    return NextResponse.json({
      success: true,
      data: allCollections,
    });
  } catch {
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
    const { name, description, emoji } = await request.json();

    const [collection] = await db
      .insert(collections)
      .values({ name, description, emoji })
      .returning();

    return NextResponse.json({
      success: true,
      data: collection,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create collection",
      },
      { status: 500 }
    );
  }
}
