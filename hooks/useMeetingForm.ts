import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { MeetingFormData } from "@/lib/types";
import { validatePhoneNumber, formatPhoneNumber } from "@/lib/utils";

export function useMeetingForm() {
  const [formData, setFormData] = useState<MeetingFormData>({
    vendorName: "",
    location: "",
    phoneNumber: "",
    notes: "",
  });
  const { toast } = useToast();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    const isValid = validatePhoneNumber(formattedNumber);

    setFormData((prev) => ({
      ...prev,
      phoneNumber: formattedNumber,
    }));

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

  return {
    formData,
    setFormData,
    handlePhoneChange,
  };
}
