import { BriefcaseBusiness, Download, SearchCheck, Tags } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { MetricCard } from "../components/ui/MetricCard";
import { ProgressBar } from "../components/ui/ProgressBar";
import { LoadingSkeleton } from "../components/ui/LoadingSkeleton";
import { StatePanel } from "../components/ui/StatePanel";
import {
  mockAnalyzeJobDescription,
  mockExtractSkills,
  mockGetJobDescription,
} from "../services/mockJobMatchService";
import { exportJobMatchMarkdown } from "../templates/jobMatchMarkdown";
import type { KeywordHit, SkillCategory, SkillGap } from "../types";
import { downloadTextFile } from "../utils/download";

const textareaClass =
  "form-input min-h-72 resize-y bg-ink-50 p-3 leading-6 dark:bg-ink-800";

function getKeywordCoverage(keywords: KeywordHit[]) {
  const covered = keywords.filter((keyword) => keyword.status === "matched").length;
  return Math.round((covered / keywords.length) * 100);
}

function getSkillCategoryLabel(category: SkillCategory["category"]) {
  return category[0].toUpperCase() + category.slice(1);
}

function getImportanceStyles(importance: SkillGap["importance"]) {
  if (importance === "high") {
    return "bg-risk-100 text-risk-600 dark:bg-ink-800 dark:text-risk-400";
  }

  if (importance === "medium") {
    return "bg-focus-100 text-ink-900 dark:bg-ink-800 dark:text-focus-300";
  }

  return "bg-signal-100 text-signal-700 dark:bg-ink-800 dark:text-signal-300";
}

export function JobMatchPage() {
  const initialJobDescription = mockGetJobDescription();
  const skills = mockExtractSkills();
  const [description, setDescription] = useState(initialJobDescription.description);
  const deferredDescription = useDeferredValue(description);
  const isAnalyzing = deferredDescription !== description;
  const analysis = useMemo(() => mockAnalyzeJobDescription(deferredDescription), [deferredDescription]);
  const keywordCoverage = getKeywordCoverage(analysis.keywords);

  function handleExport() {
    downloadTextFile(
      "job-match-report.md",
      exportJobMatchMarkdown(initialJobDescription, analysis, skills),
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="space-y-4">
        <div className="surface-panel p-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-[26px] leading-none text-ink-900">Job Description Match</h2>
              <p className="mt-2 text-sm text-muted-stone">
                {initialJobDescription.title} at {initialJobDescription.company}
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
          </div>
          <textarea
            className={textareaClass}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Paste job description text here."
            aria-label="Job description"
          />
          {isAnalyzing ? (
            <div className="mt-3 space-y-2" aria-label="Analyzing job description" role="status">
              <LoadingSkeleton className="h-3 w-full" />
              <LoadingSkeleton className="h-3 w-3/4" />
            </div>
          ) : null}
        </div>

        {!description.trim() ? (
          <StatePanel
            title="Add a job description"
            description="Paste a role description to compare keywords and surface missing skills."
          />
        ) : null}

        <section className="surface-panel p-4" aria-busy={isAnalyzing}>
          <div className="mb-4 flex items-center gap-2">
            <SearchCheck className="text-terracotta" size={18} />
            <h2 className="text-base font-semibold text-ink-900 dark:text-white">Keyword Gaps</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {analysis.keywords.map((keyword) => (
              <article key={keyword.keyword} className="rounded-md border border-ink-100 bg-ink-50 p-3 dark:border-ink-700 dark:bg-ink-800">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-ink-900 dark:text-white">{keyword.keyword}</p>
                  <span className="text-sm text-ink-500 dark:text-ink-300">{keyword.count} hits</span>
                </div>
                <p className="mt-2 text-sm capitalize text-ink-500 dark:text-ink-300">{keyword.status}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="surface-panel p-4">
          <div className="mb-4 flex items-center gap-2">
            <Tags className="text-terracotta" size={18} />
            <h2 className="text-base font-semibold text-ink-900 dark:text-white">Extracted Skills</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {skills.extracted.map((group) => (
              <article key={group.category} className="rounded-md border border-ink-100 bg-ink-50 p-3 dark:border-ink-700 dark:bg-ink-800">
                <p className="mb-3 text-sm font-semibold text-ink-900 dark:text-white">
                  {getSkillCategoryLabel(group.category)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-ink-700 dark:bg-ink-900 dark:text-ink-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>

      <aside className="space-y-4">
        <MetricCard label="Match" value={`${analysis.match.score}%`} detail={analysis.match.label} icon={<BriefcaseBusiness size={18} />} />

        <div className="surface-muted p-4">
          <h2 className="text-base font-semibold text-ink-900 dark:text-white">Fit Summary</h2>
          <div className="mt-4 space-y-4">
            <ProgressBar label="Keyword coverage" value={keywordCoverage} />
            <ProgressBar label="Role match" value={analysis.match.score} />
          </div>
        </div>

        <section className="surface-panel p-4">
          <h2 className="text-base font-semibold text-ink-900 dark:text-white">Missing Skills</h2>
          <div className="mt-4 space-y-3">
            {analysis.missingSkills.length > 0 ? (
              analysis.missingSkills.map((skill) => (
                <article key={skill.skill} className="rounded-md border border-ink-100 bg-ink-50 p-3 dark:border-ink-700 dark:bg-ink-800">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-ink-900 dark:text-white">{skill.skill}</p>
                    <span className={`rounded-md px-2 py-1 text-xs font-bold uppercase ${getImportanceStyles(skill.importance)}`}>
                      {skill.importance}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-ink-500 dark:text-ink-300">{skill.recommendation}</p>
                </article>
              ))
            ) : (
              <p className="text-sm leading-6 text-ink-500 dark:text-ink-300">
                No missing skills detected in the current mock analysis.
              </p>
            )}
          </div>
        </section>

        <section className="surface-panel p-4">
          <h2 className="text-base font-semibold text-ink-900 dark:text-white">Recommendations</h2>
          <div className="mt-4 space-y-3">
            {analysis.recommendations.map((recommendation) => (
              <article key={recommendation.id} className="rounded-md border border-ink-100 bg-ink-50 p-3 dark:border-ink-700 dark:bg-ink-800">
                <p className="text-sm font-semibold text-ink-900 dark:text-white">{recommendation.title}</p>
                <p className="mt-2 text-sm leading-6 text-ink-500 dark:text-ink-300">{recommendation.description}</p>
              </article>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}
