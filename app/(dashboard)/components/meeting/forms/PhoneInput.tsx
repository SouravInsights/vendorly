import { Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { formatPhoneNumber, validatePhoneNumber } from "@/lib/utils";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function PhoneInput({ value, onChange }: PhoneInputProps) {
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    const isValid = validatePhoneNumber(formattedNumber);

    onChange(formattedNumber);

    // Only show error if number is complete (10 digits) and invalid
    const digits = formattedNumber.replace(/\D/g, "");
    const withoutCountryCode = digits.startsWith("91")
      ? digits.slice(2)
      : digits;
    if (withoutCountryCode.length === 10 && !isValid) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit Indian mobile number",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <label className="text-sm font-medium mb-1 block">
        Phone Number (Optional)
      </label>
      <div className="relative">
        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          className="pl-10"
          placeholder="Enter mobile number"
          value={value}
          onChange={handleChange}
          type="tel"
          inputMode="numeric"
          maxLength={15} // Length of "+91 12345 12345"
          onKeyPress={(e) => {
            // Allow only numbers and common phone number characters
            if (!/[\d\s+]/.test(e.key)) {
              e.preventDefault();
            }
          }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">Format: +91 XXXXX XXXXX</p>
      {value && !validatePhoneNumber(value) && (
        <p className="text-xs text-red-500 mt-1">
          Please enter a valid Indian mobile number
        </p>
      )}
    </div>
  );
}
