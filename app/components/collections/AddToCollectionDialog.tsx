import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Folder } from "lucide-react";
import type { Collection } from "@/db/schema";

interface AddToCollectionDialogProps {
  designId: number;
  onSuccess?: () => void;
}

export function AddToCollectionDialog({
  designId,
  onSuccess,
}: AddToCollectionDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);
  const { toast } = useToast();

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

  const addToCollection = async (collectionId: number) => {
    try {
      const response = await fetch("/api/collections/add-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ designId, collectionId }),
      });

      const data = await response.json();
      if (data.success) {
        toast({
          title: "Added to collection!",
          description: "Design added to collection successfully",
        });
        setIsOpen(false);
        onSuccess?.();
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to add to collection",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex w-full self-stretch">
          <Folder className="w-4 h-4 mr-2" />
          Add to Collection
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Collection</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {collections.length === 0 ? (
            <p className="text-sm text-gray-500">
              No collections yet. Create one first!
            </p>
          ) : (
            collections.map((collection) => (
              <Button
                key={collection.id}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addToCollection(collection.id)}
              >
                {collection.emoji} {collection.name}
              </Button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
