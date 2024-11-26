"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";

import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { DeleteConfirmDialog } from "@/components/ui/delete-confirm";
// import { Indian } from 'lucide-react';

import type { Meeting, Design } from "@/db/schema";

// Define interfaces for our data structures
interface MeetingWithDesigns extends Meeting {
  designs: Design[];
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
  onDelete,
}: {
  meeting: MeetingWithDesigns;
  onDelete: () => void;
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/meetings/${meeting.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      toast({
        title: "Meeting deleted!",
        description: "The meeting and its designs have been removed.",
      });

      onDelete();
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete meeting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setShowDeleteConfirm(false);
    }
  };

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
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={() => setShowDeleteConfirm(true)}
        >
          Delete Meeting
        </Button>
      </div>

      <DeleteConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Meeting"
        description="This will permanently delete this meeting and all associated designs. This action cannot be undone."
      />
    </Card>
  );
}

function MeetingsList() {
  const [meetings, setMeetings] = useState<MeetingWithDesigns[]>([]);
  const { toast } = useToast();

  const fetchMeetings = async () => {
    try {
      const response = await fetch("/api/meetings");
      const data = await response.json();
      if (data.success) {
        setMeetings(data.data);
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to load meetings. Please refresh the page.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  if (meetings.length === 0) {
    return <EmptyState />;
  }
  return (
    <div className="space-y-4">
      {meetings.map((meeting) => (
        <MeetingCard
          key={meeting.id}
          meeting={meeting}
          onDelete={fetchMeetings}
        />
      ))}
    </div>
  );
}

export default function MeetingsPage() {
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
