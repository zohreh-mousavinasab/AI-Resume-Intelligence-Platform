import type { ReactNode } from "react";

interface SectionContainerProps {
  action?: ReactNode;
  children: ReactNode;
  description?: string;
  eyebrow?: string;
  title: string;
}

export function SectionContainer({
  action,
  children,
  description,
  eyebrow,
  title,
}: SectionContainerProps) {
  return (
    <section className="surface-panel overflow-hidden">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-ink-100 px-5 py-4">
        <div>
          {eyebrow ? <p className="section-kicker">{eyebrow}</p> : null}
          <h2 className="mt-1 text-lg font-medium text-ink-900">{title}</h2>
          {description ? <p className="mt-1 text-sm leading-5 text-muted-stone">{description}</p> : null}
        </div>
        {action}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}
