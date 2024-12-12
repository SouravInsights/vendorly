"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CreateCollectionDialog } from "@/app/(dashboard)/components/collections/CreateCollectionDialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Collection } from "@/db/schema";

interface CollectionWithCount extends Collection {
  designCount: number;
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<CollectionWithCount[]>([]);

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
            setCollections((prev) => [
              ...prev,
              { ...collection, designCount: 0 },
            ]);
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((collection) => (
          <Link key={collection.id} href={`/collections/${collection.id}`}>
            <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="flex items-start gap-3">
                <div className="text-2xl group-hover:scale-110 transition-transform">
                  {collection.emoji || "📁"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium group-hover:text-pink-600 transition-colors">
                      {collection.name}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {collection.designCount} designs
                    </Badge>
                  </div>
                  {collection.description && (
                    <p className="text-sm text-gray-500 mt-1">
                      {collection.description}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {collections.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">
            No collections yet. Create your first collection!
          </p>
        </Card>
      )}
    </div>
  );
}
