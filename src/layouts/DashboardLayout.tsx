import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  summary: ReactNode;
}

export function DashboardLayout({ children, summary }: DashboardLayoutProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0">{children}</div>
      <aside className="min-w-0">{summary}</aside>
    </div>
  );
}
