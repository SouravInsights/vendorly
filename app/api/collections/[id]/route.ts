import { NextResponse } from "next/server";
import { db } from "@/db";
import {
  collections,
  designsToCollections,
  designs,
  meetings,
} from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const collection = await db.query.collections.findFirst({
      where: and(
        eq(collections.id, parseInt(params.id)),
        eq(collections.userId, userId)
      ),
    });

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
        meetingId: designs.meetingId,
        meetingVendorName: meetings.vendorName,
        meetingLocation: meetings.location,
      })
      .from(designsToCollections)
      .where(eq(designsToCollections.collectionId, collection.id))
      .innerJoin(designs, eq(designsToCollections.designId, designs.id))
      .leftJoin(meetings, eq(designs.meetingId, meetings.id));

    const transformedDesigns = designsInCollection.map(
      ({ design, meetingId, meetingVendorName, meetingLocation }) => ({
        ...design,
        meeting: meetingId
          ? {
              id: meetingId,
              vendorName: meetingVendorName,
              location: meetingLocation,
            }
          : null,
      })
    );

    return NextResponse.json({
      success: true,
      data: {
        ...collection,
        designs: transformedDesigns,
      },
    });
  } catch (error) {
    console.error("Error fetching collection:", error);
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
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify ownership
    const collection = await db.query.collections.findFirst({
      where: and(
        eq(collections.id, parseInt(params.id)),
        eq(collections.userId, userId)
      ),
    });

    if (!collection) {
      return NextResponse.json(
        { success: false, error: "Collection not found or unauthorized" },
        { status: 404 }
      );
    }

    // Delete all design associations
    await db
      .delete(designsToCollections)
      .where(eq(designsToCollections.collectionId, parseInt(params.id)));

    // Delete the collection
    await db
      .delete(collections)
      .where(
        and(
          eq(collections.id, parseInt(params.id)),
          eq(collections.userId, userId)
        )
      );

    return NextResponse.json({
      success: true,
      message: "Collection deleted",
    });
  } catch (error) {
    console.error("Error deleting collection:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete collection" },
      { status: 500 }
    );
  }
}
