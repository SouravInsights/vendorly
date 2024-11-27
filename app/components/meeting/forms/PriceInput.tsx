import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PriceInputProps {
  basePrice?: number;
  finalPrice?: number;
  similarMinPrice?: number;
  similarMaxPrice?: number;
  onBaseChange: (value?: number) => void;
  onFinalChange: (value?: number) => void;
  onSimilarMinChange: (value?: number) => void;
  onSimilarMaxChange: (value?: number) => void;
}

export function PriceInput({
  basePrice,
  finalPrice,
  similarMinPrice,
  similarMaxPrice,
  onBaseChange,
  onFinalChange,
  onSimilarMinChange,
  onSimilarMaxChange,
}: PriceInputProps) {
  return (
    <div className="space-y-2">
      <div>
        <Label>Initial Price (₹)</Label>
        <Input
          type="number"
          value={basePrice || ""}
          onChange={(e) =>
            onBaseChange(e.target.value ? Number(e.target.value) : undefined)
          }
          placeholder="Initial quoted price"
        />
      </div>
      <div>
        <Label>Final Price (₹)</Label>
        <Input
          type="number"
          value={finalPrice || ""}
          onChange={(e) =>
            onFinalChange(e.target.value ? Number(e.target.value) : undefined)
          }
          placeholder="After negotiation"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label>Similar Min (₹)</Label>
          <Input
            type="number"
            value={similarMinPrice || ""}
            onChange={(e) =>
              onSimilarMinChange(
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            placeholder="Min"
          />
        </div>
        <div>
          <Label>Similar Max (₹)</Label>
          <Input
            type="number"
            value={similarMaxPrice || ""}
            onChange={(e) =>
              onSimilarMaxChange(
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            placeholder="Max"
          />
        </div>
      </div>
    </div>
  );
}
