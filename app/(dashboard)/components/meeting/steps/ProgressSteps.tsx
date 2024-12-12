import { cn } from "@/app/lib/utils";

export function ProgressSteps({
  currentStep,
}: {
  currentStep: "info" | "photos" | "notes";
}) {
  return (
    <div className="flex justify-between mb-8">
      {["info", "photos", "notes"].map((s) => (
        <div
          key={s}
          className={cn(
            "w-1/3 h-1 rounded-full",
            currentStep === s ? "bg-pink-500" : "bg-gray-200"
          )}
        />
      ))}
    </div>
  );
}
