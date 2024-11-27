import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface NotesStepProps {
  notes: string;
  onNotesChange: (notes: string) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function NotesStep({
  notes,
  onNotesChange,
  onBack,
  onSubmit,
  isSubmitting,
}: NotesStepProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Add Notes 📝</h1>
      <Textarea
        placeholder="Any general notes about the meeting..."
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        rows={4}
      />
      <div className="flex space-x-4">
        <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
          Back
        </Button>
        <Button className="flex-1" onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Meeting"}
        </Button>
      </div>
    </div>
  );
}
