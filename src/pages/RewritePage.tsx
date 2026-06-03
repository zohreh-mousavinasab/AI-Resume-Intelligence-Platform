import { ArrowRight, Sparkles } from "lucide-react";

export function RewritePage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 border-b border-ink-100 pb-4 dark:border-ink-700">
        <Sparkles className="text-terracotta" size={20} />
        <div>
          <h2 className="font-display text-[26px] leading-none text-ink-900">AI Rewrite</h2>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">Compare a stronger, more specific version before applying changes.</p>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <section className="surface-panel p-4">
          <p className="text-sm font-semibold text-ink-800 dark:text-ink-100">Before</p>
          <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300">
            Responsible for frontend development and worked with teams.
          </p>
        </section>
        <div className="hidden items-center text-ink-400 lg:flex">
          <ArrowRight size={22} />
        </div>
        <section className="rounded-3xl border border-terracotta/25 bg-warm-mist p-4">
          <p className="text-sm font-semibold text-terracotta">After</p>
          <p className="mt-3 text-sm leading-6 text-ink-700 dark:text-ink-100">
            Delivered accessible React features in close partnership with product and design teams.
          </p>
        </section>
      </div>
    </div>
  );
}
