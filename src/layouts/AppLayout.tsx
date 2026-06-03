import type { ReactNode } from "react";
import type { AppPage, NavigationItem } from "../types/navigation";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface AppLayoutProps {
  activePage: AppPage;
  children: ReactNode;
  navigationItems: NavigationItem[];
  onPageChange: (page: AppPage) => void;
}

export function AppLayout({
  activePage,
  children,
  navigationItems,
  onPageChange,
}: AppLayoutProps) {
  return (
    <main className="min-h-screen bg-canvas text-ink-900">
      <div className="min-h-screen lg:flex">
        <Sidebar activePage={activePage} navigationItems={navigationItems} onPageChange={onPageChange} />
        <div className="min-w-0 flex-1">
          <Header />
          <section className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</section>
        </div>
      </div>
    </main>
  );
}
