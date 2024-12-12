import { DesignInput } from "@/lib/types";
import { DesignPreview } from "../../DesignPreview";
import { CategorySelect } from "../../forms/CategorySelect";
import { PriceInput } from "../../forms/PriceInput";
import { Textarea } from "@/components/ui/textarea";

interface DesignCardProps {
  photo: DesignInput;
  index: number;
  onRemove: (index: number) => void;
  onUpdate: (index: number, updates: Partial<DesignInput>) => void;
}

export function DesignCard({
  photo,
  index,
  onRemove,
  onUpdate,
}: DesignCardProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <DesignPreview
        photo={photo}
        index={index}
        onRemove={onRemove}
        onUpdate={onUpdate}
      />

      <div className="mt-4 space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Category</label>
          <CategorySelect
            value={photo.category}
            onChange={(category) => onUpdate(index, { category })}
          />
        </div>

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

        <div>
          <label className="text-sm font-medium mb-1 block">Notes</label>
          <Textarea
            placeholder="Any notes about this design..."
            value={photo.notes}
            onChange={(e) => onUpdate(index, { notes: e.target.value })}
            rows={2}
          />
        </div>
      </div>
    </div>
  );
}
