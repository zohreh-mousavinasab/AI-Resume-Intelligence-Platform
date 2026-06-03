import { Download, FileText, RefreshCw, Sparkles } from "lucide-react";
import { useState } from "react";
import { StatePanel } from "../components/ui/StatePanel";
import { seedJobDescription } from "../data/seedData";
import { mockGenerateCoverLetter } from "../services/mockCoverLetterService";
import { loadResume } from "../store/resumeStorage";
import { exportCoverLetterMarkdown } from "../templates/coverLetterMarkdown";
import type { CoverLetterTone } from "../types";
import { downloadTextFile } from "../utils/download";

const tones: Array<{ id: CoverLetterTone; label: string }> = [
  { id: "professional", label: "Professional" },
  { id: "formal", label: "Formal" },
  { id: "friendly", label: "Friendly" },
  { id: "junior", label: "Junior" },
  { id: "senior", label: "Senior" },
];

export function CoverLetterPage() {
  const resume = loadResume();
  const hasCandidateName = Boolean(resume.personalInfo.fullName.trim());
  const [tone, setTone] = useState<CoverLetterTone>("professional");
  const [coverLetter, setCoverLetter] = useState(() =>
    mockGenerateCoverLetter(resume, seedJobDescription, "professional"),
  );

  function handleToneChange(nextTone: CoverLetterTone) {
    setTone(nextTone);
    setCoverLetter(mockGenerateCoverLetter(resume, seedJobDescription, nextTone));
  }

  function handleRegenerate() {
    setCoverLetter(mockGenerateCoverLetter(resume, seedJobDescription, tone));
  }

  function handleExport() {
    downloadTextFile("cover-letter.md", exportCoverLetterMarkdown(coverLetter));
  }

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-terracotta" />
            <h2 className="font-display text-[26px] leading-none text-ink-900">Cover Letter Generator</h2>
          </div>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
            Generate an editable letter from your resume and target role.
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

      <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-4">
          {!hasCandidateName ? (
            <StatePanel
              tone="warning"
              title="Candidate name is missing"
              description="Add your name in the resume builder before exporting the final letter."
            />
          ) : null}
          <section className="surface-muted p-4">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-terracotta" />
              <h3 className="text-base font-semibold text-ink-900 dark:text-white">Letter Tone</h3>
            </div>
            <div className="mt-4 grid gap-2">
              {tones.map((item) => (
                <button
                  key={item.id}
                  className={`h-10 rounded-full px-4 text-left text-sm font-medium transition ${
                    item.id === tone
                      ? "bg-ink-900 text-white"
                      : "border border-ink-100 bg-white text-muted-stone hover:border-terracotta hover:text-terracotta"
                  }`}
                  type="button"
                  aria-pressed={item.id === tone}
                  onClick={() => handleToneChange(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button
              className="button-primary mt-4 w-full"
              type="button"
              onClick={handleRegenerate}
            >
              <RefreshCw size={16} />
              Regenerate
            </button>
          </section>

          <section className="surface-panel p-4">
            <h3 className="text-sm font-semibold text-ink-900 dark:text-white">Source Context</h3>
            <dl className="mt-3 space-y-3 text-sm">
              <div>
                <dt className="text-xs font-bold uppercase text-ink-500 dark:text-ink-300">Candidate</dt>
                <dd className="mt-1 text-ink-900 dark:text-white">{resume.personalInfo.fullName}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase text-ink-500 dark:text-ink-300">Target role</dt>
                <dd className="mt-1 text-ink-900 dark:text-white">{seedJobDescription.title}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase text-ink-500 dark:text-ink-300">Company</dt>
                <dd className="mt-1 text-ink-900 dark:text-white">{seedJobDescription.company}</dd>
              </div>
            </dl>
          </section>
        </aside>

        <section className="surface-panel p-4">
          <label className="text-sm font-semibold text-ink-900 dark:text-white" htmlFor="cover-letter-content">
            Editable Letter
          </label>
          <textarea
            id="cover-letter-content"
            className="form-input mt-3 min-h-[520px] resize-y bg-ink-50 p-4 leading-7 text-ink-700 dark:bg-ink-800 dark:text-ink-100"
            value={coverLetter.contentMarkdown}
            onChange={(event) =>
              setCoverLetter((current) => ({
                ...current,
                contentMarkdown: event.target.value,
              }))
            }
          />
        </section>
      </div>
    </div>
  );
}
