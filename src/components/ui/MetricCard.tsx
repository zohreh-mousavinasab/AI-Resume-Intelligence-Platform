import type { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: string;
  detail: string;
  icon?: ReactNode;
}

export function MetricCard({ label, value, detail, icon }: MetricCardProps) {
  return (
    <article className="rounded-3xl bg-white p-5 shadow-subtle transition duration-200 hover:-translate-y-0.5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-light-steel">{label}</p>
        {icon ? <span className="flex h-9 w-9 items-center justify-center rounded-full bg-warm-mist text-terracotta">{icon}</span> : null}
      </div>
      <p className="font-display text-4xl text-ink-900">{value}</p>
      <p className="mt-1 text-sm text-muted-stone">{detail}</p>
    </article>
  );
}
