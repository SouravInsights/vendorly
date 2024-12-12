import Image from "next/image";
import { X } from "lucide-react";
import type { DesignInput } from "@/lib/types";
import { PriceInput } from "./forms/PriceInput";
import { CategorySelect } from "./forms/CategorySelect";

export function DesignPreview({
  photo,
  index,
  onRemove,
  onUpdate,
}: {
  photo: DesignInput;
  index: number;
  onRemove: (index: number) => void;
  onUpdate: (index: number, updates: Partial<DesignInput>) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="relative aspect-square">
        <Image
          src={URL.createObjectURL(photo.file)}
          alt={`Design ${index + 1}`}
          fill
          className="object-cover rounded-lg"
        />
        <button
          onClick={() => onRemove(index)}
          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
        >
          <X size={16} />
        </button>
      </div>

      <CategorySelect
        value={photo.category}
        onChange={(category) => onUpdate(index, { category })}
      />

      <PriceInput
        basePrice={photo.basePrice}
        finalPrice={photo.finalPrice}
        similarMinPrice={photo.similarMinPrice}
        similarMaxPrice={photo.similarMaxPrice}
        onBaseChange={(value) => onUpdate(index, { basePrice: value })}
        onFinalChange={(value) => onUpdate(index, { finalPrice: value })}
        onSimilarMinChange={(value) =>
          onUpdate(index, { similarMinPrice: value })
        }
        onSimilarMaxChange={(value) =>
          onUpdate(index, { similarMaxPrice: value })
        }
      />
    </div>
  );
}
