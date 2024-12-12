"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ImagePlus } from "lucide-react";
import { DESIGN_CATEGORIES } from "@/lib/constants";

export function CreateDesignDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const response = await fetch("/api/designs", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to create design");

      toast({
        title: "Success!",
        description: "Design has been added to your library.",
      });

      setIsOpen(false);
      // You might want to trigger a refresh of the designs list here
    } catch {
      toast({
        title: "Error",
        description: "Failed to add design. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <ImagePlus className="mr-2 h-4 w-4" />
          Add Design
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Design</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="design">Design Image</Label>
            <Input
              id="design"
              type="file"
              name="design"
              accept="image/*"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="basePrice">Base Price (₹)</Label>
            <Input
              id="basePrice"
              type="number"
              name="basePrice"
              min="0"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="finalPrice">Final Price (₹)</Label>
            <Input
              id="finalPrice"
              type="number"
              name="finalPrice"
              min="0"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category"
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select category</option>
              {DESIGN_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <textarea
              id="notes"
              name="notes"
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Design"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
