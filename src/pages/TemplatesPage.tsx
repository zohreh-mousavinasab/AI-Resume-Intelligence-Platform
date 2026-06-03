import { Check, LayoutTemplate } from "lucide-react";
import { ResumeTemplateDocument } from "../templates/resumeTemplates/ResumeTemplateDocument";
import { resumeTemplates } from "../templates/resumeTemplates/registry";
import { useResumeTemplate } from "../hooks/useResumeTemplate";
import { loadResume } from "../store/resumeStorage";

const thumbnailVariants = ["modern", "minimal", "ats", "executive", "software", "creative", "corporate", "academic"] as const;

export function TemplatesPage() {
  const resume = loadResume();
  const { selectTemplate, templateId } = useResumeTemplate();

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <LayoutTemplate className="text-terracotta" size={20} />
            <p className="section-kicker">Template library</p>
          </div>
          <h2 className="mt-2 font-display text-[32px] leading-none text-ink-900">Choose your resume style</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-stone">
            One resume, eight professional presentations. Switching templates updates the builder preview instantly without changing your content.
          </p>
        </div>
        <span className="rounded-full bg-warm-mist px-4 py-2 text-xs font-medium text-terracotta">8 templates</span>
      </header>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {resumeTemplates.map((template, index) => {
          const isSelected = template.id === templateId;

          return (
            <article
              key={template.id}
              className={`group overflow-hidden rounded-3xl bg-white p-3 transition duration-200 hover:-translate-y-1 ${
                isSelected ? "shadow-subtle ring-2 ring-terracotta" : "shadow-soft hover:shadow-subtle"
              }`}
            >
              <div className="relative h-64 overflow-hidden rounded-2xl bg-fog">
                <div className="pointer-events-none absolute left-1/2 top-3 w-[760px] origin-top -translate-x-1/2 scale-[0.235]">
                  <ResumeTemplateDocument resume={resume} variant={thumbnailVariants[index]} />
                </div>
                {isSelected ? (
                  <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-white shadow-soft">
                    <Check size={16} />
                  </span>
                ) : null}
              </div>
              <div className="p-2 pt-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-medium text-ink-900">{template.name}</h3>
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: template.accent }} />
                </div>
                <p className="mt-1 text-xs font-medium text-terracotta">{template.useCase}</p>
                <p className="mt-2 min-h-10 text-xs leading-5 text-muted-stone">{template.description}</p>
                <button
                  className={`mt-4 w-full ${isSelected ? "button-primary" : "button-secondary"}`}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => selectTemplate(template.id)}
                >
                  {isSelected ? "Selected" : "Use template"}
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
