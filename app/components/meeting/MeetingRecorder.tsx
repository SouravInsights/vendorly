"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type {
  DesignInput,
  MeetingFormData,
  ApiResponse,
  MeetingResponse,
} from "@/lib/types";
import { DesignPreview } from "./DesignPreview";

export function MeetingRecorder() {
  const [step, setStep] = useState<"info" | "photos" | "notes">("info");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photos, setPhotos] = useState<DesignInput[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState<MeetingFormData>({
    vendorName: "",
    location: "",
    phoneNumber: "",
    notes: "",
  });

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      setPhotos((prev) => [
        ...prev,
        {
          file: files[0],
          price: undefined,
          notes: "",
          category: undefined,
        },
      ]);
    }
  };

  const updatePhotoDetails = (index: number, updates: Partial<DesignInput>) => {
    setPhotos((prev) => {
      const newPhotos = [...prev];
      newPhotos[index] = { ...newPhotos[index], ...updates };
      return newPhotos;
    });
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      // Validate form data
      if (!formData.vendorName || !formData.location) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      // Create FormData for submission
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("vendorName", formData.vendorName);
      formDataToSubmit.append("location", formData.location);
      formDataToSubmit.append("phoneNumber", formData.phoneNumber);
      formDataToSubmit.append("notes", formData.notes);

      // Add designs
      photos.forEach((photo) => {
        formDataToSubmit.append("designs", photo.file);
        formDataToSubmit.append("prices", photo.price?.toString() || "0");
        formDataToSubmit.append("designNotes", photo.notes || "");
      });

      const response = await fetch("/api/meetings", {
        method: "POST",
        body: formDataToSubmit,
      });

      const data = (await response.json()) as ApiResponse<MeetingResponse>;

      if (!data.success) {
        throw new Error(data.error || "Failed to save meeting");
      }

      toast({
        title: "Meeting saved! 🎉",
        description: "You're doing great at building your network!",
      });

      // Redirect to meetings list
      router.push("/meetings");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Oops! Something went wrong",
        description:
          error instanceof Error ? error.message : "Don't worry, try again!",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white px-4 py-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {["info", "photos", "notes"].map((s) => (
            <div
              key={s}
              className={cn(
                "w-1/3 h-1 rounded-full",
                step === s ? "bg-pink-500" : "bg-gray-200"
              )}
            />
          ))}
        </div>

        {step === "info" && (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">New Meeting 🤝</h1>
            <div>
              <Input
                placeholder="Vendor Name"
                value={formData.vendorName}
                onChange={(e) =>
                  setFormData({ ...formData, vendorName: e.target.value })
                }
              />
            </div>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
              <Input
                className="pl-10"
                placeholder="Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>
            <div>
              <Input
                type="tel"
                placeholder="Phone Number (optional)"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
            </div>
            <Button
              className="w-full"
              onClick={() => setStep("photos")}
              disabled={!formData.vendorName || !formData.location}
            >
              Next
            </Button>
          </div>
        )}
        {step === "photos" && (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Add Designs 📸</h1>

            {/* Photo Grid */}
            <div className="grid grid-cols-2 gap-4">
              {photos.map((photo, index) => (
                <DesignPreview
                  key={index}
                  photo={photo}
                  index={index}
                  onRemove={removePhoto}
                  onUpdate={updatePhotoDetails}
                />
              ))}

              {/* Add Photo Button */}
              <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-pink-300 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handlePhotoCapture}
                />
                <Plus className="h-8 w-8 text-gray-400" />
              </label>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => setStep("info")}>
                Back
              </Button>
              <Button
                className="flex-1"
                onClick={() => setStep("notes")}
                disabled={photos.length === 0}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === "notes" && (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Add Notes 📝</h1>
            <Textarea
              placeholder="Any notes about the meeting..."
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={4}
            />
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => setStep("photos")}
                disabled={isSubmitting}
              >
                Back
              </Button>
              <Button
                className="flex-1"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Meeting"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
