import { useState } from "react";
import type { DesignInput } from "@/lib/types";

export function useDesigns() {
  const [photos, setPhotos] = useState<DesignInput[]>([]);

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      setPhotos((prev) => [
        ...prev,
        {
          file: files[0],
          basePrice: undefined,
          finalPrice: undefined,
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

  return {
    photos,
    handlePhotoCapture,
    updatePhotoDetails,
    removePhoto,
  };
}
