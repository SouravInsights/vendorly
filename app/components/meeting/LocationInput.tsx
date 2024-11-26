"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DELHI_MARKETS } from "@/lib/constants";

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function LocationInput({ value, onChange }: LocationInputProps) {
  const [selectedArea, setSelectedArea] = useState("");
  const [showLocationOptions, setShowLocationOptions] = useState(true);

  const handleAreaChange = (newArea: string) => {
    setSelectedArea(newArea);
    const area = DELHI_MARKETS.find((m) => m.area === newArea);
    if (area?.locations.length === 1) {
      onChange(`${area.locations[0]}, ${newArea}`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Toggle Buttons */}
      <div className="flex items-center space-x-2 mb-2">
        <Button
          type="button"
          variant={showLocationOptions ? "default" : "outline"}
          size="sm"
          onClick={() => setShowLocationOptions(true)}
        >
          Delhi Markets
        </Button>
        <Button
          type="button"
          variant={!showLocationOptions ? "default" : "outline"}
          size="sm"
          onClick={() => {
            setShowLocationOptions(false);
            setSelectedArea(""); // Reset area selection when switching to custom
            onChange(""); // Clear the location value
          }}
        >
          Other Location
        </Button>
      </div>

      {showLocationOptions ? (
        // Predefined Markets Selection
        <div className="space-y-3">
          {/* Area Selection */}
          <Select onValueChange={handleAreaChange} value={selectedArea}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select market area" />
            </SelectTrigger>
            <SelectContent>
              {DELHI_MARKETS.map((market) => (
                <SelectGroup key={market.area}>
                  <SelectLabel>{market.area}</SelectLabel>
                  <SelectItem value={market.area}>{market.area}</SelectItem>
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>

          {/* Specific Location Selection */}
          {selectedArea && (
            <Select
              onValueChange={(value) => onChange(`${value}, ${selectedArea}`)}
              value={value.split(", ")[0]}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select specific location" />
              </SelectTrigger>
              <SelectContent>
                {DELHI_MARKETS.find(
                  (m) => m.area === selectedArea
                )?.locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      ) : (
        // Custom Location Input
        <div className="space-y-3">
          <div className="relative">
            <MapPin
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <Input
              className="pl-10"
              placeholder="Enter complete address"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
          <p className="text-xs text-gray-500">
            Please enter the full address including area and landmarks
          </p>
        </div>
      )}
    </div>
  );
}
