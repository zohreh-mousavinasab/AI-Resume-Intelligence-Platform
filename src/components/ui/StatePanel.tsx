import { AlertCircle, Info, type LucideIcon } from "lucide-react";

interface StatePanelProps {
  description: string;
  title: string;
  tone?: "info" | "warning";
}

const toneStyles = {
  info: "border-signal-300 bg-signal-100 text-signal-700 dark:border-signal-700 dark:bg-ink-800 dark:text-signal-300",
  warning: "border-focus-300 bg-focus-100 text-ink-900 dark:border-focus-500 dark:bg-ink-800 dark:text-focus-300",
};

const toneIcons: Record<NonNullable<StatePanelProps["tone"]>, LucideIcon> = {
  info: Info,
  warning: AlertCircle,
};

export function StatePanel({ description, title, tone = "info" }: StatePanelProps) {
  const Icon = toneIcons[tone];

  return (
    <div className={`rounded-2xl border p-3 ${toneStyles[tone]}`} role="status">
      <div className="flex items-start gap-2">
        <Icon className="mt-0.5 shrink-0" size={16} />
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-sm leading-6">{description}</p>
        </div>
      </div>
    </div>
  );
}
