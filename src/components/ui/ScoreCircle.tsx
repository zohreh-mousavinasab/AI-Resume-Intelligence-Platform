interface ScoreCircleProps {
  label: string;
  value: number;
}

export function ScoreCircle({ label, value }: ScoreCircleProps) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative mx-auto h-36 w-36" aria-label={`${label}: ${value}%`} role="img">
      <svg className="-rotate-90" height="144" viewBox="0 0 144 144" width="144">
        <circle className="stroke-ink-100" cx="72" cy="72" fill="none" r={radius} strokeWidth="12" />
        <circle
          className="stroke-terracotta transition-all duration-700"
          cx="72"
          cy="72"
          fill="none"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          strokeWidth="12"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-4xl text-ink-900">{value}</span>
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-light-steel">{label}</span>
      </div>
    </div>
  );
}
