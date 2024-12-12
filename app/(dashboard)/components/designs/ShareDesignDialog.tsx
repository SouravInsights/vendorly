import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  } | null;
}

interface ShareDesignDialogProps {
  design: Design;
}

export function ShareDesignDialog({ design }: ShareDesignDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrice, setShowPrice] = useState(true);
  const [showVendor, setShowVendor] = useState(false);
  const [notes, setNotes] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      const response = await fetch("/api/designs/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          designId: design.id,
          showPrice,
          showVendor,
          notes,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setShareUrl(`${window.location.origin}/shared/${data.shareCode}`);
        toast({
          title: "Share link created!",
          description: "Copy the link to share this design",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to create share link",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex w-full self-stretch">
          <Share className="w-4 h-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Design</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label>Show Price</label>
            <Switch checked={showPrice} onCheckedChange={setShowPrice} />
          </div>

          <div className="flex items-center justify-between">
            <label>Show Vendor Details</label>
            <Switch checked={showVendor} onCheckedChange={setShowVendor} />
          </div>

          <div className="space-y-2">
            <label>Add Notes</label>
            <Textarea
              placeholder="Add any notes or comments..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {!shareUrl ? (
            <Button onClick={handleShare} className="w-full">
              Generate Share Link
            </Button>
          ) : (
            <div className="space-y-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="w-full p-2 border rounded"
              />
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  toast({ title: "Link copied!" });
                }}
                className="w-full"
              >
                Copy Link
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
