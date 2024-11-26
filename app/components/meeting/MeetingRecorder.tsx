// src/components/meeting/MeetingRecorder.tsx
"use client";

import { useState } from "react";
import { MapPin, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type PhotoData = {
  file: File;
  price?: number;
  notes?: string;
  previewUrl: string;
};

export function MeetingRecorder() {
  const [step, setStep] = useState<"info" | "photos" | "notes">("info");
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    vendorName: "",
    location: "",
    phoneNumber: "",
    notes: "",
  });

  const handlePhotoCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      setPhotos((prev) => [...prev, { file, previewUrl }]);
    }
  };

  const handleSubmit = async () => {
    try {
      // Here we'll handle form submission
      // Including uploading photos and creating meeting record
      toast({
        title: "Meeting saved! 🎉",
        description: "You're doing great at building your network!",
      });
    } catch (err) {
      console.error("Error saving meeting:", err);
      toast({
        title: "Oops! Something went wrong",
        description: "Don't worry, try again!",
        variant: "destructive",
      });
    }
  };

  // Cleanup preview URLs when component unmounts
  const cleanup = () => {
    photos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
  };

  useState(() => cleanup);

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
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden bg-white"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={photo.previewUrl}
                      alt={`Design ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-x-2 bottom-2">
                      <Input
                        type="number"
                        placeholder="Price (₹)"
                        className="bg-white/90"
                        value={photo.price}
                        onChange={(e) => {
                          const newPhotos = [...photos];
                          newPhotos[index].price = Number(e.target.value);
                          setPhotos(newPhotos);
                        }}
                      />
                    </div>
                  </div>
                </div>
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
              <Button variant="outline" onClick={() => setStep("photos")}>
                Back
              </Button>
              <Button className="flex-1" onClick={handleSubmit}>
                Save Meeting
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
