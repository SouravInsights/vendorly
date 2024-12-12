"use client";

import { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading";
import { useToast } from "@/hooks/use-toast";
import { DeleteConfirmDialog } from "@/components/ui/delete-confirm";
import { ImageIcon, Trash2 } from "lucide-react";
import { useDashboardContext } from "@/app/(dashboard)/context/DashboardContext";
import { DesignFilters } from "@/app/(dashboard)/components/designs/DesignFilters";
import { ShareDesignDialog } from "../../components/designs/ShareDesignDialog";
import { AddToCollectionDialog } from "../../components/collections/AddToCollectionDialog";

interface Design {
  id: number;
  imageUrl: string;
  finalPrice: number;
  category: string | null;
  createdAt: string;
  isShortlisted: boolean;
  meeting: {
    vendorName: string;
    location: string;
  };
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
      <Link href="/dashboard/meetings/new">
        <Button>Record New Meeting</Button>
      </Link>
    </Card>
  );
}

function DesignCard({
  design,
  onDelete,
}: {
  design: Design;
  onDelete: () => void;
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { toast } = useToast();
  const { refreshData } = useDashboardContext();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/designs/${design.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      toast({
        title: "Design deleted!",
        description: "The design has been removed from your library.",
      });

      // Refresh global stats
      await refreshData();
      // Refresh local designs list
      onDelete();
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete design. Please try again.",
        variant: "destructive",
      });
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  return (
    <Card className="group overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={design.imageUrl}
          alt={`Design from ${design.meeting.vendorName}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <div className="p-3">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="font-medium text-sm">{design.meeting.vendorName}</p>
            <p className="text-xs text-gray-500">{design.meeting.location}</p>
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

      <div className="p-3">
        <div className="flex flex-row flex-wrap gap-2">
          <ShareDesignDialog design={design} />
          <AddToCollectionDialog designId={design.id} />
          <Button
            variant="destructive"
            className="flex w-full self-stretch"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <Trash2 />
            Delete
          </Button>
        </div>
      </div>

      <DeleteConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Design"
        description="Are you sure you want to delete this design? This action cannot be undone."
      />
    </Card>
  );
}

function DesignGrid() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [filteredDesigns, setFilteredDesigns] = useState<Design[]>([]);
  const { toast } = useToast();

  const fetchDesigns = async () => {
    try {
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/designs?t=${timestamp}`, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      const data = await response.json();
      if (data.success) {
        setDesigns(data.data);
        setFilteredDesigns(data.data);
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to load designs. Please refresh the page.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  const handlePriceRangeChange = ({
    min,
    max,
  }: {
    min?: number;
    max?: number;
  }) => {
    let filtered = [...designs];

    if (min !== undefined) {
      filtered = filtered.filter((design) => design.finalPrice >= min);
    }
    if (max !== undefined) {
      filtered = filtered.filter((design) => design.finalPrice <= max);
    }

    setFilteredDesigns(filtered);
  };

  const handleSortChange = (sort: "price_asc" | "price_desc" | "date") => {
    const sorted = [...filteredDesigns];

    switch (sort) {
      case "price_asc":
        sorted.sort((a, b) => a.finalPrice - b.finalPrice);
        break;
      case "price_desc":
        sorted.sort((a, b) => b.finalPrice - a.finalPrice);
        break;
      case "date":
        sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    setFilteredDesigns(sorted);
  };

  if (designs.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      <DesignFilters
        onPriceRangeChange={handlePriceRangeChange}
        onSortChange={handleSortChange}
      />

      {filteredDesigns.length > 0 && (
        <div className="text-sm text-gray-500">
          Showing {filteredDesigns.length} designs
          {filteredDesigns.length !== designs.length &&
            ` (filtered from ${designs.length})`}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDesigns.map((design) => (
          <DesignCard key={design.id} design={design} onDelete={fetchDesigns} />
        ))}
      </div>
    </div>
  );
}

export default function DesignsPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Design Library</h1>
        <p className="text-gray-500">
          Browse and organize your design collection
        </p>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <DesignGrid />
      </Suspense>
    </div>
  );
}
