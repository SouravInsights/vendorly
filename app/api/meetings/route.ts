import { NextResponse } from "next/server";
import { db } from "@/db";
import { meetings, designs } from "@/db/schema";
import type { NewMeeting, NewDesign } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const {
      vendorName,
      location,
      phoneNumber,
      notes,
      designs: designsData,
    } = json;

    // Create meeting
    const [newMeeting] = await db
      .insert(meetings)
      .values({
        vendorName,
        location,
        phoneNumber,
        notes,
      } satisfies NewMeeting)
      .returning();

    // Create designs if any
    if (designsData?.length) {
      await db.insert(designs).values(
        designsData.map((design: Partial<NewDesign>) => ({
          meetingId: newMeeting.id,
          imageUrl: design.imageUrl!,
          price: design.price!,
          notes: design.notes,
          category: design.category,
          minOrderQuantity: design.minOrderQuantity,
          sizes: design.sizes,
        }))
      );
    }

    return NextResponse.json(newMeeting);
  } catch (error) {
    console.error("Failed to create meeting:", error);
    return NextResponse.json(
      { error: "Failed to create meeting" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allMeetings = await db
      .select()
      .from(meetings)
      .orderBy(meetings.createdAt);

    return NextResponse.json(allMeetings);
  } catch (error) {
    console.error("Failed to fetch meetings:", error);
    return NextResponse.json(
      { error: "Failed to fetch meetings" },
      { status: 500 }
    );
  }
}
