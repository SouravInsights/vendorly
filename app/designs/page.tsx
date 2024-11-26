import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/db";
import { designs as designsTable, meetings } from "@/db/schema"; // Renamed to avoid conflict
import { desc, eq } from "drizzle-orm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading";
import { Heart, ImageIcon } from "lucide-react";

interface DesignWithMeeting {
  id: number;
  imageUrl: string;
  price: number;
  notes: string | null;
  category: string | null;
  isShortlisted: boolean | null;
  meeting: {
    id: number;
    vendorName: string;
    location: string;
  } | null; // Handle potential null from leftJoin
}

async function getAllDesigns(): Promise<DesignWithMeeting[]> {
  const allDesigns = await db
    .select({
      id: designsTable.id,
      imageUrl: designsTable.imageUrl,
      price: designsTable.price,
      notes: designsTable.notes,
      category: designsTable.category,
      isShortlisted: designsTable.isShortlisted,
      meeting: {
        id: meetings.id,
        vendorName: meetings.vendorName,
        location: meetings.location,
      },
    })
    .from(designsTable)
    .leftJoin(meetings, eq(designsTable.meetingId, meetings.id))
    .orderBy(desc(designsTable.createdAt));

  // Map the results to handle null values
  return allDesigns.map((design) => ({
    ...design,
    isShortlisted: design.isShortlisted ?? false, // Default to false if null
    meeting: design.meeting ?? {
      // Provide default meeting info if null
      id: 0,
      vendorName: "Unknown Vendor",
      location: "Unknown Location",
    },
  }));
}

function EmptyState() {
  return (
    <Card className="p-12 text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-purple-100 p-3 rounded-full">
          <ImageIcon className="w-6 h-6 text-purple-500" />
        </div>
      </div>
      <h3 className="text-lg font-medium mb-2">No designs yet</h3>
      <p className="text-gray-500 mb-4">
        Your design library is empty. Start by recording vendor meetings!
      </p>
      <Link href="/meetings/new">
        <Button>Record New Meeting</Button>
      </Link>
    </Card>
  );
}

function DesignGrid({ designs }: { designs: DesignWithMeeting[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {designs.map((design) => (
        <Card key={design.id} className="overflow-hidden group">
          <div className="relative aspect-square">
            <Image
              src={design.imageUrl}
              alt={`Design ${design.id}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {design.isShortlisted && (
              <div className="absolute top-2 right-2">
                <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
              </div>
            )}
          </div>
          <div className="p-3">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium text-sm">
                  {design.meeting?.vendorName ?? "Unknown Vendor"}
                </p>
                <p className="text-xs text-gray-500">
                  {design.meeting?.location ?? "Unknown Location"}
                </p>
              </div>
              <Badge variant="secondary" className="text-xs">
                ₹{(design.price / 100).toLocaleString()}
              </Badge>
            </div>
            {design.category && (
              <Badge variant="outline" className="text-xs">
                {design.category}
              </Badge>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}

export default async function DesignsPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Design Library</h1>
        <p className="text-gray-500">
          Browse and organize your design collection
        </p>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <DesignsList />
      </Suspense>
    </div>
  );
}

async function DesignsList() {
  const designs = await getAllDesigns();

  if (designs.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      <DesignGrid designs={designs} />
    </div>
  );
}
