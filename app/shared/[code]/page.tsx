import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { sharedDesigns, designs, meetings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function SharedDesignPage({
  params: { code },
}: {
  params: { code: string };
}) {
  const [sharedDesign] = await db
    .select({
      design: designs,
      shared: sharedDesigns,
      meeting: meetings,
    })
    .from(sharedDesigns)
    .where(eq(sharedDesigns.shareCode, code))
    .innerJoin(designs, eq(sharedDesigns.designId, designs.id))
    .innerJoin(meetings, eq(designs.meetingId, meetings.id));

  if (!sharedDesign) {
    notFound();
  }

  const { design, shared, meeting } = sharedDesign;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white p-4">
      <Card className="max-w-2xl mx-auto overflow-hidden">
        <div className="relative aspect-square">
          <Image
            src={design.imageUrl}
            alt="Design"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="p-6 space-y-4">
          {shared.showPrice && (
            <Badge variant="secondary" className="text-lg">
              ₹{(design.finalPrice / 100).toLocaleString()}
            </Badge>
          )}

          {design.category && (
            <Badge variant="outline">{design.category}</Badge>
          )}

          {shared.showVendor && (
            <div className="text-sm text-gray-500">
              <p>Vendor: {meeting.vendorName}</p>
              <p>Location: {meeting.location}</p>
            </div>
          )}

          {shared.notes && (
            <div className="bg-gray-50 p-4 rounded-lg text-sm">
              {shared.notes}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
