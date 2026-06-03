import { AlertTriangle, Download, Gauge, TrendingUp, UserSearch } from "lucide-react";
import { MetricCard } from "../components/ui/MetricCard";
import { ProgressBar } from "../components/ui/ProgressBar";
import { mockGetRecruiterInsights } from "../services/mockRecruiterInsightsService";
import { exportRecruiterInsightsMarkdown } from "../templates/recruiterInsightsMarkdown";
import type { RecruiterSignal } from "../types";
import { downloadTextFile } from "../utils/download";

const insights = mockGetRecruiterInsights();

function getSignalStyles(status: RecruiterSignal["status"]) {
  if (status === "strong") {
    return "border-signal-300 bg-signal-100 text-signal-700 dark:border-signal-700 dark:bg-ink-800 dark:text-signal-300";
  }

  if (status === "moderate") {
    return "border-focus-300 bg-focus-100 text-ink-900 dark:border-focus-500 dark:bg-ink-800 dark:text-focus-300";
  }

  return "border-risk-400 bg-risk-100 text-risk-600 dark:border-risk-600 dark:bg-ink-800 dark:text-risk-400";
}

export function RecruiterInsightsPage() {
  function handleExport() {
    downloadTextFile("recruiter-insights-report.md", exportRecruiterInsightsMarkdown(insights));
  }

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <UserSearch className="text-terracotta" size={20} />
            <h2 className="font-display text-[26px] leading-none text-ink-900">Recruiter Insights</h2>
          </div>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
            Scan the signals recruiters notice first and tighten the weaker areas.
          </p>
        </div>
        <button
          className="button-secondary"
          type="button"
          onClick={handleExport}
        >
          <Download size={16} />
          Export
        </button>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          label="Recruiter Score"
          value={`${insights.overall.score}%`}
          detail={insights.overall.label}
          icon={<Gauge size={18} />}
        />
        <MetricCard
          label="Signals"
          value={`${insights.signals.length}`}
          detail="Quality signals reviewed"
          icon={<TrendingUp size={18} />}
        />
        <MetricCard
          label="Warnings"
          value={`${insights.warnings.length}`}
          detail="Priority improvements"
          icon={<AlertTriangle size={18} />}
        />
      </div>

      <section className="surface-panel p-4">
        <p className="section-kicker">Recruiter scan</p>
        <h2 className="mt-1 text-base font-semibold text-ink-900 dark:text-white">Resume Signals</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {insights.signals.map((signal) => (
            <article key={signal.id} className={`rounded-md border p-4 ${getSignalStyles(signal.status)}`}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">{signal.label}</p>
                <span className="text-xs font-bold uppercase">{signal.status}</span>
              </div>
              <ProgressBar label="Signal strength" value={signal.score} />
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm leading-6">
                {signal.evidence.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <section className="surface-panel p-4">
          <h2 className="text-base font-semibold text-ink-900 dark:text-white">Priority Improvements</h2>
          <div className="mt-4 space-y-3">
            {insights.warnings.map((warning) => (
              <article key={warning.id} className="rounded-md border border-risk-400 bg-risk-100 p-3 dark:border-risk-600 dark:bg-ink-800">
                <div className="flex items-center gap-2 text-risk-600 dark:text-risk-400">
                  <AlertTriangle size={16} />
                  <p className="text-sm font-semibold">{warning.title}</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-ink-700 dark:text-ink-100">{warning.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="surface-muted p-4">
          <h2 className="text-base font-semibold text-ink-900 dark:text-white">Action Verb Bank</h2>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">Use precise verbs to strengthen achievement bullets.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {insights.actionVerbs.map((verb) => (
              <span key={verb} className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-ink-700 dark:bg-ink-900 dark:text-ink-100">
                {verb}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
