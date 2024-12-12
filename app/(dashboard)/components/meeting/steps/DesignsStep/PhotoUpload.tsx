import { Plus } from "lucide-react";

interface PhotoUploadProps {
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PhotoUpload({ onUpload }: PhotoUploadProps) {
  return (
    <label className="block aspect-video rounded-lg border-2 border-dashed border-gray-300 hover:border-pink-300 transition-colors cursor-pointer">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={onUpload}
      />
      <div className="h-full flex flex-col items-center justify-center text-gray-500">
        <Plus className="h-8 w-8 mb-2" />
        <span className="text-sm">Add design photo</span>
      </div>
    </label>
  );
}
