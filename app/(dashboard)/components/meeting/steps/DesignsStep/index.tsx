import { DesignInput } from "@/lib/types";
import { DesignCard } from "./DesignCard";
import { PhotoUpload } from "./PhotoUpload";
import { Button } from "@/components/ui/button";

interface DesignsStepProps {
  photos: DesignInput[];
  onPhotoCapture: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhotoUpdate: (index: number, updates: Partial<DesignInput>) => void;
  onPhotoRemove: (index: number) => void;
  onBack: () => void;
  onNext: () => void;
}

export function DesignsStep({
  photos,
  onPhotoCapture,
  onPhotoUpdate,
  onPhotoRemove,
  onBack,
  onNext,
}: DesignsStepProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add Designs 📸</h1>

      <div className="space-y-6">
        {photos.map((photo, index) => (
          <DesignCard
            key={index}
            photo={photo}
            index={index}
            onRemove={onPhotoRemove}
            onUpdate={onPhotoUpdate}
          />
        ))}

        <PhotoUpload onUpload={onPhotoCapture} />
      </div>

      <div className="flex space-x-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          className="flex-1"
          onClick={onNext}
          disabled={photos.length === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
