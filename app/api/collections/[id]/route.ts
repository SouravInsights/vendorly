import { NextResponse } from "next/server";
import { db } from "@/db";
import {
  collections,
  designsToCollections,
  designs,
  meetings,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [collection] = await db
      .select()
      .from(collections)
      .where(eq(collections.id, parseInt(params.id)));

    if (!collection) {
      return NextResponse.json(
        { success: false, error: "Collection not found" },
        { status: 404 }
      );
    }

    // Get all designs in this collection
    const designsInCollection = await db
      .select({
        design: designs,
        meeting: meetings,
      })
      .from(designsToCollections)
      .where(eq(designsToCollections.collectionId, collection.id))
      .innerJoin(designs, eq(designsToCollections.designId, designs.id))
      .innerJoin(meetings, eq(designs.meetingId, meetings.id));

    return NextResponse.json({
      success: true,
      data: {
        ...collection,
        designs: designsInCollection.map(({ design, meeting }) => ({
          ...design,
          meeting: {
            vendorName: meeting.vendorName,
            location: meeting.location,
          },
        })),
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch collection" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // First delete all design associations
    await db
      .delete(designsToCollections)
      .where(eq(designsToCollections.collectionId, parseInt(params.id)));

    // Then delete the collection
    await db.delete(collections).where(eq(collections.id, parseInt(params.id)));

    return NextResponse.json({
      success: true,
      message: "Collection deleted",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to delete collection" },
      { status: 500 }
    );
  }
}
