import { Download, LayoutTemplate } from "lucide-react";
import { getResumeTemplate, resumeTemplates } from "../../templates/resumeTemplates/registry";
import { exportResumeMarkdown } from "../../templates/resumeMarkdown";
import type { ResumeData, ResumeTemplateId } from "../../types";
import { downloadTextFile } from "../../utils/download";

interface ResumeTemplatePreviewProps {
  resume: ResumeData;
  onTemplateChange: (templateId: ResumeTemplateId) => void;
  templateId: ResumeTemplateId;
}

export function ResumeTemplatePreview({ onTemplateChange, resume, templateId }: ResumeTemplatePreviewProps) {
  const template = getResumeTemplate(templateId);
  const Template = template.component;

  function handleMarkdownExport() {
    downloadTextFile("resume.md", exportResumeMarkdown(resume));
  }

  return (
    <div className="relative mx-auto max-w-[760px]">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-terracotta">Resume preview</p>
          <p className="mt-1 text-sm font-medium text-ink-900">{template.name}</p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <label className="relative flex items-center" htmlFor="active-resume-template">
            <LayoutTemplate className="pointer-events-none absolute left-3 text-terracotta" size={15} strokeWidth={1.8} />
            <span className="sr-only">Active template</span>
            <select
              id="active-resume-template"
              className="h-10 max-w-[190px] cursor-pointer appearance-none rounded-full border border-ink-200 bg-white py-0 pl-9 pr-8 text-sm font-medium text-ink-900 outline-none transition hover:border-terracotta focus:border-ink-900 sm:max-w-[220px]"
              value={template.id}
              onChange={(event) => onTemplateChange(event.target.value as ResumeTemplateId)}
            >
              {resumeTemplates.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 text-[10px] text-light-steel">▼</span>
          </label>
          <span className="mx-0.5 hidden h-6 w-px bg-ink-100 sm:block" aria-hidden="true" />
          <button className="icon-button" type="button" aria-label="Export resume as Markdown" title="Export Markdown" onClick={handleMarkdownExport}>
            <Download size={17} />
          </button>
        </div>
      </div>
      <div className="resume-print-area overflow-hidden rounded-sm border border-ink-100 bg-white shadow-paper">
        <Template resume={resume} />
      </div>
    </div>
  );
}
