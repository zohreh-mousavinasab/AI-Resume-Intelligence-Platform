interface SkeletonBlockProps {
  className?: string;
}

export function SkeletonBlock({ className = "" }: SkeletonBlockProps) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-ink-100 ${className}`}
      aria-hidden="true"
    />
  );
}
