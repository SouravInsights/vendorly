import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import type { Collection } from "@/db/schema";

interface CreateCollectionDialogProps {
  onCollectionCreated: (collection: Collection) => void;
}

export function CreateCollectionDialog({
  onCollectionCreated,
}: CreateCollectionDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState("");
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, emoji }),
      });

      const data = await response.json();
      if (data.success) {
        toast({
          title: "Collection created!",
          description: `Created "${name}" collection`,
        });
        onCollectionCreated(data.data);
        setIsOpen(false);
        setName("");
        setDescription("");
        setEmoji("");
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to create collection",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> New Collection
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Collection</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-[auto,1fr] gap-4">
            <Input
              placeholder="📁"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              className="w-16"
            />
            <Input
              placeholder="Collection Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={!name.trim()}
          >
            Create Collection
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
