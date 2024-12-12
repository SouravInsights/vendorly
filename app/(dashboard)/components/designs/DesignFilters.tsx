import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IndianRupee } from "lucide-react";

interface PriceRange {
  min?: number;
  max?: number;
}

interface DesignFiltersProps {
  onPriceRangeChange: (range: PriceRange) => void;
  onSortChange: (sort: "price_asc" | "price_desc" | "date") => void;
}

export function DesignFilters({
  onPriceRangeChange,
  onSortChange,
}: DesignFiltersProps) {
  const [priceRange, setPriceRange] = useState<PriceRange>({});

  const handlePriceChange = (type: "min" | "max", value: string) => {
    const priceInRupees = value ? parseInt(value) : undefined;
    const priceInPaise = priceInRupees ? priceInRupees * 100 : undefined;

    const newRange = {
      ...priceRange,
      [type]: priceInPaise,
    };
    setPriceRange(newRange);
    onPriceRangeChange(newRange);
  };

  const handlePresetRange = (min: number, max: number) => {
    // Convert rupees to paise
    const range = {
      min: min * 100,
      max: max * 100,
    };
    setPriceRange(range);
    onPriceRangeChange(range);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center sm:flex-row gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Price Range (₹)</label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="number"
                placeholder="Min"
                className="pl-9"
                value={priceRange.min ? Math.floor(priceRange.min / 100) : ""}
                onChange={(e) => handlePriceChange("min", e.target.value)}
              />
            </div>
            <span className="text-gray-500">to</span>
            <div className="relative flex-1">
              <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="number"
                placeholder="Max"
                className="pl-9"
                value={priceRange.max ? Math.floor(priceRange.max / 100) : ""}
                onChange={(e) => handlePriceChange("max", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="w-full sm:w-48 space-y-2">
          <label className="text-sm font-medium">Sort By</label>
          <Select onValueChange={onSortChange} defaultValue="date">
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Latest</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setPriceRange({});
            onPriceRangeChange({});
          }}
        >
          Clear Filters
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePresetRange(1000, 5000)}
        >
          ₹1k - ₹5k
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePresetRange(5000, 10000)}
        >
          ₹5k - ₹10k
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePresetRange(10000, 20000)}
        >
          ₹10k - ₹20k
        </Button>
      </div>
    </div>
  );
}
