"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { DesignInput } from "@/lib/types";

interface DesignPreviewProps {
  photo: DesignInput;
  index: number;
  onRemove: (index: number) => void;
  onUpdate: (index: number, updates: Partial<DesignInput>) => void;
}

export function DesignPreview({
  photo,
  index,
  onRemove,
  onUpdate,
}: DesignPreviewProps) {
  const [objectUrl, setObjectUrl] = useState<string>("");

  useEffect(() => {
    const url = URL.createObjectURL(photo.file);
    setObjectUrl(url);

    // Cleanup
    return () => URL.revokeObjectURL(url);
  }, [photo.file]);

  return (
    <div className="relative">
      <div className="aspect-square rounded-lg overflow-hidden relative">
        <Image
          src={objectUrl}
          alt={`Design ${index + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </div>
      <button
        onClick={() => onRemove(index)}
        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
      >
        <X size={16} />
      </button>
      <Input
        type="number"
        placeholder="Price (₹)"
        className="mt-2"
        value={photo.price || ""}
        onChange={(e) => onUpdate(index, { price: Number(e.target.value) })}
      />
    </div>
  );
}
