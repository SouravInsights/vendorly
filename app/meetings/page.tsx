import { Suspense } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { db } from "@/db";
import { meetings, designs, type Meeting, type Design } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading";

interface MeetingWithDesigns extends Meeting {
  designs: Design[];
}

async function getRecentMeetings(): Promise<MeetingWithDesigns[]> {
  try {
    // First get the meetings
    const recentMeetings = await db
      .select()
      .from(meetings)
      .orderBy(desc(meetings.createdAt))
      .limit(10);

    // Then fetch designs for each meeting
    const meetingsWithDesigns = await Promise.all(
      recentMeetings.map(async (meeting) => {
        const meetingDesigns = await db
          .select()
          .from(designs)
          .where(eq(designs.meetingId, meeting.id));

        return {
          ...meeting,
          designs: meetingDesigns,
        };
      })
    );

    return meetingsWithDesigns;
  } catch (error) {
    console.error("Error fetching meetings:", error);
    return [];
  }
}

export default async function MeetingsPage() {
  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Recent Meetings</h1>

      <Suspense fallback={<LoadingSpinner />}>
        <MeetingsList />
      </Suspense>
    </div>
  );
}

async function MeetingsList() {
  const meetings = await getRecentMeetings();

  if (meetings.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-500">No meetings recorded yet.</p>
        <p className="text-sm text-gray-400 mt-1">
          Record your first vendor meeting to see it here!
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {meetings.map((meeting) => (
        <Card key={meeting.id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{meeting.vendorName}</h3>
              <p className="text-sm text-gray-500">{meeting.location}</p>
              <p className="text-sm text-gray-500 mt-1">
                {format(new Date(meeting.meetingDate), "PPp")}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {meeting.designs.length} designs
            </div>
          </div>

          {/* Design Thumbnails */}
          {meeting.designs.length > 0 && (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {meeting.designs.map((design) => (
                <div
                  key={design.id}
                  className="flex-shrink-0 w-20 h-20 relative rounded-lg overflow-hidden"
                >
                  <Image
                    src={design.imageUrl}
                    alt={`Design from ${meeting.vendorName}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                    priority={false}
                  />
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
