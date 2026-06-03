import { CheckCircle2 } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-ink-100 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 w-full max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-terracotta">Resume workspace</p>
          <p className="mt-1 text-sm font-medium text-ink-900">Build, analyze, and tailor your application</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-muted-stone">
          <CheckCircle2 className="text-terracotta" size={15} strokeWidth={1.8} />
          <span className="hidden sm:inline">Saved locally</span>
        </div>
      </div>
    </header>
  );
}
