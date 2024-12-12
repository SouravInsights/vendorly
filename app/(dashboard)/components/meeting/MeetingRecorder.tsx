"use client";

import { useState } from "react";
import { useDashboardContext } from "@/app/(dashboard)/context/DashboardContext";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { MeetingFormData } from "@/lib/types";
import { ProgressSteps } from "./steps/ProgressSteps";
import { InfoStep } from "./steps/InfoStep";
import { DesignsStep } from "./steps/DesignsStep";
import { NotesStep } from "./steps/NotesStep";
import { useDesigns } from "@/hooks/useDesigns";

export function MeetingRecorder() {
  const { refreshData } = useDashboardContext();
  const [step, setStep] = useState<"info" | "photos" | "notes">("info");
  const [formData, setFormData] = useState<MeetingFormData>({
    vendorName: "",
    location: "",
    phoneNumber: "",
    notes: "",
  });
  const { photos, handlePhotoCapture, updatePhotoDetails, removePhoto } =
    useDesigns();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

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

      // Add designs with new fields
      photos.forEach((photo, index) => {
        formDataToSubmit.append(`designs`, photo.file);
        formDataToSubmit.append(
          `basePrice_${index}`,
          photo.basePrice?.toString() || "0"
        );
        formDataToSubmit.append(
          `finalPrice_${index}`,
          photo.finalPrice?.toString() || "0"
        );
        formDataToSubmit.append(
          `similarMinPrice_${index}`,
          photo.similarMinPrice?.toString() || ""
        );
        formDataToSubmit.append(
          `similarMaxPrice_${index}`,
          photo.similarMaxPrice?.toString() || ""
        );
        formDataToSubmit.append(`category_${index}`, photo.category || "");
        formDataToSubmit.append(`notes_${index}`, photo.notes || "");
      });

      const response = await fetch("/api/meetings", {
        method: "POST",
        body: formDataToSubmit,
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Meeting saved! 🎉",
          description: "You're doing great at building your network!",
        });

        await refreshData();
        router.push("/dashboard/meetings");
        router.refresh();
      } else {
        throw new Error(data.error || "Failed to save meeting");
      }
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
        <ProgressSteps currentStep={step} />

        {step === "info" && (
          <InfoStep
            vendorName={formData.vendorName}
            location={formData.location}
            phoneNumber={formData.phoneNumber}
            onVendorNameChange={(value) =>
              setFormData((prev) => ({ ...prev, vendorName: value }))
            }
            onLocationChange={(value) =>
              setFormData((prev) => ({ ...prev, location: value }))
            }
            onPhoneChange={(value) =>
              setFormData((prev) => ({ ...prev, phoneNumber: value }))
            }
            onNext={() => setStep("photos")}
          />
        )}

        {step === "photos" && (
          <DesignsStep
            photos={photos}
            onPhotoCapture={handlePhotoCapture}
            onPhotoUpdate={updatePhotoDetails}
            onPhotoRemove={removePhoto}
            onBack={() => setStep("info")}
            onNext={() => setStep("notes")}
          />
        )}

        {step === "notes" && (
          <NotesStep
            notes={formData.notes}
            onNotesChange={(notes) =>
              setFormData((prev) => ({ ...prev, notes }))
            }
            onBack={() => setStep("photos")}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}
