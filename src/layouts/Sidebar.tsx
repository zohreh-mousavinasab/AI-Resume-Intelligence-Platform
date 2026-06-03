import { CheckCircle2, FileText } from "lucide-react";
import type { AppPage, NavigationItem } from "../types/navigation";

interface SidebarProps {
  activePage: AppPage;
  navigationItems: NavigationItem[];
  onPageChange: (page: AppPage) => void;
}

export function Sidebar({ activePage, navigationItems, onPageChange }: SidebarProps) {
  return (
    <aside className="shrink-0 border-b border-ink-100 bg-white lg:sticky lg:top-0 lg:h-screen lg:w-[220px] lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col px-4 py-4 lg:px-4 lg:py-5">
        <div className="flex items-center gap-2.5 px-1">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-900 text-white">
            <FileText size={16} strokeWidth={1.8} />
          </span>
          <div>
            <p className="text-lg font-medium leading-none text-ink-900">CVAgent</p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-terracotta">
              Resume intelligence
            </p>
          </div>
        </div>

        <nav className="mt-4 flex gap-1 overflow-x-auto pb-1 lg:mt-7 lg:grid lg:gap-1 lg:overflow-visible lg:pb-0" aria-label="Primary">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activePage;

            return (
              <button
                key={item.id}
                className={`flex h-9 shrink-0 items-center gap-2 rounded-full px-3 text-left text-sm font-medium transition ${
                  isActive ? "bg-ink-900 text-white" : "text-muted-stone hover:bg-fog hover:text-ink-900"
                }`}
                type="button"
                aria-current={isActive ? "page" : undefined}
                onClick={() => onPageChange(item.id)}
              >
                <Icon size={16} strokeWidth={1.8} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto hidden rounded-3xl bg-warm-mist p-3.5 text-xs leading-5 text-terracotta lg:block">
          <p className="flex items-center gap-2 font-medium">
            <CheckCircle2 size={15} strokeWidth={1.8} />
            Saved locally
          </p>
          <p className="mt-1 text-muted-stone">Your resume draft stays private in this browser.</p>
        </div>
      </div>
    </aside>
  );
}
