import { AlertTriangle, CheckCircle2, Download, Gauge, ListChecks, TextSearch } from "lucide-react";
import { ProgressBar } from "../components/ui/ProgressBar";
import { ScoreCircle } from "../components/ui/ScoreCircle";
import { SectionContainer } from "../components/ui/SectionContainer";
import { StatCard } from "../components/ui/StatCard";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { mockAnalyzeResume } from "../services/mockAtsService";
import { exportAtsReportMarkdown } from "../templates/atsReportMarkdown";
import type { AtsFormattingCheck } from "../types";
import { downloadTextFile } from "../utils/download";

const analysis = mockAnalyzeResume();

function getKeywordCoverage() {
  const matched = analysis.keywordDensity.filter((item) => item.status === "matched").length;
  return Math.round((matched / analysis.keywordDensity.length) * 100);
}

function getSectionCompleteness() {
  const complete = analysis.sectionChecks.filter((item) => item.complete).length;
  return Math.round((complete / analysis.sectionChecks.length) * 100);
}

function getFormattingScore() {
  const scoreMap: Record<AtsFormattingCheck["status"], number> = {
    pass: 100,
    warning: 68,
    fail: 32,
  };

  const total = analysis.formattingChecks.reduce((sum, item) => sum + scoreMap[item.status], 0);
  return Math.round(total / analysis.formattingChecks.length);
}

function getStatusStyles(status: AtsFormattingCheck["status"]) {
  if (status === "pass") {
    return "border-signal-300 bg-signal-100 text-signal-700 dark:border-signal-700 dark:bg-ink-800 dark:text-signal-300";
  }

  if (status === "warning") {
    return "border-focus-300 bg-focus-100 text-ink-900 dark:border-focus-500 dark:bg-ink-800 dark:text-focus-300";
  }

  return "border-risk-400 bg-risk-100 text-risk-600 dark:border-risk-600 dark:bg-ink-800 dark:text-risk-400";
}

export function AtsDashboardPage() {
  const keywordCoverage = getKeywordCoverage();
  const sectionCompleteness = getSectionCompleteness();
  const formattingScore = getFormattingScore();
  const keywordTotal = analysis.keywordDensity.reduce((sum, item) => sum + item.count, 0);
  const maxKeywordCount = Math.max(...analysis.keywordDensity.map((item) => item.count), 1);

  function handleExport() {
    downloadTextFile("ats-report.md", exportAtsReportMarkdown(analysis));
  }

  return (
    <DashboardLayout
      summary={
        <div className="space-y-4">
          <section className="surface-muted p-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-ink-900 dark:text-white">ATS Summary</h2>
              <button
                className="icon-button h-9 w-9"
                type="button"
                aria-label="Export ATS report"
                title="Export ATS report"
                onClick={handleExport}
              >
                <Download size={16} />
              </button>
            </div>
            <div className="mt-4 border-b border-ink-100 pb-4 dark:border-ink-700">
              <ScoreCircle label="ATS score" value={analysis.overall.score} />
              <p className="mt-2 text-center text-sm font-semibold text-ink-700 dark:text-ink-100">{analysis.overall.label}</p>
            </div>
            <div className="mt-4 space-y-4">
              <ProgressBar label="Keyword coverage" value={keywordCoverage} />
              <ProgressBar label="Section completeness" value={sectionCompleteness} />
              <ProgressBar label="Formatting" value={formattingScore} />
            </div>
          </section>

          <section className="surface-panel p-4">
            <h2 className="text-base font-semibold text-ink-900 dark:text-white">Recommendations</h2>
            <div className="mt-4 space-y-3">
              {analysis.recommendations.map((recommendation) => (
                <article key={recommendation.id} className="rounded-md border border-ink-100 bg-ink-50 p-3 dark:border-ink-700 dark:bg-ink-800">
                  <p className="text-sm font-semibold text-ink-900 dark:text-white">{recommendation.title}</p>
                  <p className="mt-1 text-sm leading-6 text-ink-500 dark:text-ink-300">{recommendation.description}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="ATS Score" value={`${analysis.overall.score}`} detail={analysis.overall.label} icon={<Gauge size={18} />} />
          <StatCard label="Keywords" value={`${keywordTotal}`} detail="Total keyword hits" icon={<TextSearch size={18} />} />
          <StatCard label="Sections" value={`${analysis.sectionChecks.length}`} detail="Checked for completeness" icon={<ListChecks size={18} />} />
        </div>

        <SectionContainer
          eyebrow="Coverage map"
          title="Keyword Density"
          description="Matched terms, partial coverage, and gaps from mock ATS analysis."
          action={
            <span className="rounded-full bg-warm-mist px-3 py-1 text-sm font-medium text-terracotta">
              {keywordCoverage}% covered
            </span>
          }
        >
          <div className="grid gap-3">
            {analysis.keywordDensity.map((keyword) => (
              <article key={keyword.keyword} className="grid gap-3 rounded-md border border-ink-100 bg-ink-50 p-3 dark:border-ink-700 dark:bg-ink-800 sm:grid-cols-[120px_minmax(0,1fr)_72px] sm:items-center">
                <div>
                  <p className="text-sm font-bold text-ink-900 dark:text-white">{keyword.keyword}</p>
                  <p className="mt-0.5 text-xs capitalize text-ink-500 dark:text-ink-300">{keyword.status}</p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-ink-100">
                  <div
                    className={`h-full rounded-full ${
                      keyword.status === "matched"
                        ? "bg-terracotta"
                        : keyword.status === "partial"
                          ? "bg-focus-500"
                          : "bg-risk-400"
                    }`}
                    style={{ width: `${Math.max((keyword.count / maxKeywordCount) * 100, 5)}%` }}
                  />
                </div>
                <span className="text-right text-xs font-bold tabular-nums text-ink-500 dark:text-ink-300">{keyword.count} hits</span>
              </article>
            ))}
          </div>
        </SectionContainer>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="surface-panel p-4">
            <h2 className="text-base font-semibold text-ink-900 dark:text-white">Section Completeness</h2>
            <div className="mt-4 space-y-4">
              {analysis.sectionChecks.map((section) => (
                <article key={section.section} className="rounded-md border border-ink-100 bg-ink-50 p-3 dark:border-ink-700 dark:bg-ink-800">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-ink-900 dark:text-white">{section.section}</p>
                    {section.complete ? <CheckCircle2 className="text-signal-700 dark:text-signal-300" size={18} /> : <AlertTriangle className="text-risk-600" size={18} />}
                  </div>
                  <ProgressBar label="Section score" value={section.score} />
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-ink-500 dark:text-ink-300">
                    {section.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div className="surface-panel p-4">
            <h2 className="text-base font-semibold text-ink-900 dark:text-white">Formatting Validation</h2>
            <div className="mt-4 space-y-3">
              {analysis.formattingChecks.map((check) => (
                <article key={check.id} className={`rounded-md border p-3 ${getStatusStyles(check.status)}`}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{check.label}</p>
                    <span className="text-xs font-bold uppercase">{check.status}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6">{check.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="surface-panel p-4">
          <h2 className="text-base font-semibold text-ink-900 dark:text-white">Readability</h2>
          <div className="mt-4 max-w-xl">
            <ProgressBar label={analysis.readability.label} value={analysis.readability.score} />
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
