import type { ReactNode } from "react";
import { Card } from "./Card";

interface StatCardProps {
  detail: string;
  icon?: ReactNode;
  label: string;
  value: string;
}

export function StatCard({ detail, icon, label, value }: StatCardProps) {
  return (
    <Card className="group p-5 transition duration-200 hover:-translate-y-0.5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-light-steel">{label}</p>
        {icon ? (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-warm-mist text-terracotta transition group-hover:scale-105">
            {icon}
          </span>
        ) : null}
      </div>
      <p className="font-display text-4xl text-ink-900">{value}</p>
      <p className="mt-1 text-sm leading-5 text-muted-stone">{detail}</p>
    </Card>
  );
}
