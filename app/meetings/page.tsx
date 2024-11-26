import { Suspense } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { db } from "@/db";
import { meetings, designs } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading";
import { Badge } from "@/components/ui/badge";
// import { Indian } from 'lucide-react';

async function getRecentMeetings() {
  // First get all meetings
  const recentMeetings = await db
    .select()
    .from(meetings)
    .orderBy(desc(meetings.createdAt));

  // Then for each meeting, get its designs
  const meetingsWithDesigns = await Promise.all(
    recentMeetings.map(async (meeting) => {
      const designsList = await db
        .select()
        .from(designs)
        .where(eq(designs.meetingId, meeting.id));

      return {
        ...meeting,
        designs: designsList,
      };
    })
  );

  return meetingsWithDesigns;
}

function EmptyState() {
  return (
    <Card className="p-12 text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-pink-100 p-3 rounded-full">
          {/* <Indian className="w-6 h-6 text-pink-500" /> */}
        </div>
      </div>
      <h3 className="text-lg font-medium mb-2">No meetings yet</h3>
      <p className="text-gray-500 mb-4">
        Start by recording your first vendor meeting!
      </p>
    </Card>
  );
}

function MeetingCard({
  meeting,
}: {
  meeting: Awaited<ReturnType<typeof getRecentMeetings>>[0];
}) {
  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium text-lg">{meeting.vendorName}</h3>
            <p className="text-gray-500 text-sm">{meeting.location}</p>
          </div>
          <Badge variant="secondary">
            {meeting.designs.length}{" "}
            {meeting.designs.length === 1 ? "design" : "designs"}
          </Badge>
        </div>

        {meeting.phoneNumber && (
          <p className="text-sm text-gray-500 mb-2">📞 {meeting.phoneNumber}</p>
        )}

        <p className="text-sm text-gray-500">
          📅 {format(new Date(meeting.meetingDate), "PPP")}
        </p>

        {meeting.notes && (
          <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-3 rounded-lg">
            {meeting.notes}
          </p>
        )}
      </div>

      {meeting.designs.length > 0 && (
        <div className="border-t">
          <div className="p-4 overflow-x-auto">
            <div className="flex gap-4">
              {meeting.designs.map((design, index) => (
                <div
                  key={design.id}
                  className="relative flex-shrink-0 w-24 h-24 group"
                >
                  <Image
                    src={design.imageUrl}
                    alt={`Design ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                    sizes="96px"
                  />
                  {design.price && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 rounded-b-lg text-center">
                      ₹{(design.price / 100).toLocaleString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

export default async function MeetingsPage() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Recent Meetings</h1>
        <p className="text-gray-500">Track your vendor interactions</p>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <MeetingsList />
      </Suspense>
    </div>
  );
}

async function MeetingsList() {
  const meetings = await getRecentMeetings();

  if (meetings.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {meetings.map((meeting) => (
        <MeetingCard key={meeting.id} meeting={meeting} />
      ))}
    </div>
  );
}
