"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteConfirmDialog } from "@/components/ui/delete-confirm";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Collection } from "@/db/schema";

interface CollectionDesign {
  id: number;
  imageUrl: string;
  basePrice: number;
  finalPrice: number;
  category: string | null;
  meeting: {
    vendorName: string;
    location: string;
  };
}

interface CollectionWithDesigns extends Collection {
  designs: CollectionDesign[];
}

export default function CollectionPage({ params }: { params: { id: string } }) {
  const [collection, setCollection] = useState<CollectionWithDesigns | null>(
    null
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchCollection();
  }, [params.id]);

  const fetchCollection = async () => {
    const response = await fetch(`/api/collections/${params.id}`);
    const data = await response.json();
    if (data.success) {
      setCollection(data.data);
    }
  };

  const handleRemoveDesign = async (designId: number) => {
    const response = await fetch("/api/collections/remove-design", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collectionId: params.id,
        designId,
      }),
    });

    if (response.ok) {
      fetchCollection();
      toast({
        title: "Design removed",
        description: "Design removed from collection",
      });
    }
  };

  const handleDeleteCollection = async () => {
    const response = await fetch(`/api/collections/${params.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/collections");
      toast({
        title: "Collection deleted",
        description: "Collection has been deleted",
      });
    }
  };

  if (!collection) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/collections")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <span>{collection.emoji || "📁"}</span>
              {collection.name}
            </h1>
            {collection.description && (
              <p className="text-gray-500 mt-1">{collection.description}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="text-red-500"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Collection
          </Button>
        </div>
      </div>

      {collection.designs.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No designs in this collection yet.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {collection.designs.map((design) => (
            <Card key={design.id} className="group overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={design.imageUrl}
                  alt={`Design from ${design.meeting.vendorName}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="w-8 h-8 bg-white/80 hover:bg-white"
                    onClick={() => handleRemoveDesign(design.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <div className="p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-sm">
                      {design.meeting.vendorName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {design.meeting.location}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    ₹{(design.finalPrice / 100).toLocaleString()}
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
      )}

      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteCollection}
        title="Delete Collection"
        description="Are you sure you want to delete this collection? This won't delete the designs, only the collection."
      />
    </div>
  );
}
