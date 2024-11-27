"use client";

import { useEffect, useState } from "react";
import { CreateCollectionDialog } from "@/app/components/collections/CreateCollectionDialog";
import { Card } from "@/components/ui/card";
import type { Collection } from "@/db/schema";

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    const response = await fetch("/api/collections");
    const data = await response.json();
    if (data.success) {
      setCollections(data.data);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Collections</h1>
          <p className="text-gray-500">
            Organize your designs into collections
          </p>
        </div>
        <CreateCollectionDialog
          onCollectionCreated={(collection) => {
            setCollections((prev) => [...prev, collection]);
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((collection) => (
          <Card
            key={collection.id}
            className="p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{collection.emoji || "📁"}</div>
              <div>
                <h3 className="font-medium">{collection.name}</h3>
                {collection.description && (
                  <p className="text-sm text-gray-500">
                    {collection.description}
                  </p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
