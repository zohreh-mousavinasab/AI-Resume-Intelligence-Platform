interface ProgressBarProps {
  label: string;
  value: number;
}

export function ProgressBar({ label, value }: ProgressBarProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-muted-stone">{label}</span>
        <span className="font-medium tabular-nums text-light-steel">{value}%</span>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-ink-100"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
      >
        <div className="h-full rounded-full bg-terracotta transition-all duration-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
