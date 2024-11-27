import { Button } from "@/components/ui/button";
import { PhoneInput } from "../forms/PhoneInput";
import { LocationInput } from "../LocationInput";
import { Input } from "@/components/ui/input";

interface InfoStepProps {
  vendorName: string;
  location: string;
  phoneNumber: string;
  onVendorNameChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onNext: () => void;
}

export function InfoStep({
  vendorName,
  location,
  phoneNumber,
  onVendorNameChange,
  onLocationChange,
  onPhoneChange,
  onNext,
}: InfoStepProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">New Meeting 🤝</h1>

      {/* Vendor Name */}
      <div>
        <label className="text-sm font-medium mb-1 block">Vendor Name</label>
        <Input
          placeholder="Enter vendor name"
          value={vendorName}
          onChange={(e) => onVendorNameChange(e.target.value)}
        />
      </div>

      {/* Location Selection */}
      <LocationInput value={location} onChange={onLocationChange} />

      {/* Phone Number Input */}
      <PhoneInput value={phoneNumber} onChange={onPhoneChange} />

      <Button
        className="w-full"
        onClick={onNext}
        disabled={!vendorName || !location}
      >
        Next
      </Button>
    </div>
  );
}
