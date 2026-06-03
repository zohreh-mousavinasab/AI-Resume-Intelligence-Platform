import { CheckCircle2 } from "lucide-react";

interface ToastPreviewProps {
  message: string;
}

export function ToastPreview({ message }: ToastPreviewProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-terracotta/25 bg-warm-mist px-3 py-2 text-sm font-medium text-terracotta">
      <CheckCircle2 size={16} />
      <span>{message}</span>
    </div>
  );
}
