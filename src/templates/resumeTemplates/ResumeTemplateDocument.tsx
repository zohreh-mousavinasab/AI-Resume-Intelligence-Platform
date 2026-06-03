import type { CSSProperties, ReactNode } from "react";
import type { ResumeData } from "../../types";

export type ResumeTemplateVariant =
  | "modern"
  | "minimal"
  | "ats"
  | "executive"
  | "software"
  | "creative"
  | "corporate"
  | "academic";

interface ResumeTemplateDocumentProps {
  resume: ResumeData;
  variant: ResumeTemplateVariant;
}

const variantStyles: Record<ResumeTemplateVariant, {
  accent: string;
  border: string;
  font: string;
  header: string;
  section: string;
  shell: string;
}> = {
  modern: {
    accent: "#5d2a1a",
    border: "#ead8cf",
    font: "ui-sans-serif, system-ui, sans-serif",
    header: "border-b-[3px] border-[#5d2a1a] pb-4",
    section: "border-b border-[#ead8cf] pb-1 text-[#5d2a1a]",
    shell: "bg-white",
  },
  minimal: {
    accent: "#17191c",
    border: "#d5d6d9",
    font: "ui-sans-serif, system-ui, sans-serif",
    header: "border-b border-[#d5d6d9] pb-4",
    section: "border-b border-[#d5d6d9] pb-1 text-[#17191c]",
    shell: "bg-white",
  },
  ats: {
    accent: "#17191c",
    border: "#17191c",
    font: "Arial, sans-serif",
    header: "border-b-2 border-[#17191c] pb-3",
    section: "border-b border-[#17191c] pb-1 text-[#17191c]",
    shell: "bg-white",
  },
  executive: {
    accent: "#263348",
    border: "#cbd3df",
    font: "Georgia, serif",
    header: "border-b-2 border-[#263348] pb-4",
    section: "border-b border-[#cbd3df] pb-1 text-[#263348]",
    shell: "bg-[#fffefa]",
  },
  software: {
    accent: "#0f5f68",
    border: "#c2dde0",
    font: "ui-monospace, SFMono-Regular, Menlo, monospace",
    header: "border-l-4 border-[#0f5f68] pl-4",
    section: "border-b border-[#c2dde0] pb-1 text-[#0f5f68]",
    shell: "bg-[#fbfefe]",
  },
  creative: {
    accent: "#a4452d",
    border: "#efd0c5",
    font: "ui-sans-serif, system-ui, sans-serif",
    header: "rounded-md bg-[#fbe1d1] p-4",
    section: "border-l-4 border-[#a4452d] pl-2 text-[#a4452d]",
    shell: "bg-[#fffdfb]",
  },
  corporate: {
    accent: "#213a5a",
    border: "#d1dbe7",
    font: "ui-sans-serif, system-ui, sans-serif",
    header: "border-t-4 border-[#213a5a] bg-[#f4f7fa] p-4",
    section: "border-b-2 border-[#213a5a] pb-1 text-[#213a5a]",
    shell: "bg-white",
  },
  academic: {
    accent: "#17191c",
    border: "#17191c",
    font: "Georgia, 'Times New Roman', serif",
    header: "border-b border-[#17191c] pb-3 text-center",
    section: "border-b border-[#17191c] pb-1 text-[#17191c]",
    shell: "bg-white",
  },
};

function dateRange(startDate: string, endDate: string, isCurrent = false) {
  return [startDate, endDate || (isCurrent ? "Present" : "")].filter(Boolean).join(" - ");
}

function BulletList({ items }: { items: string[] }) {
  const visibleItems = items.filter(Boolean);

  return visibleItems.length > 0 ? (
    <ul className="mt-1 list-disc space-y-0.5 pl-4">
      {visibleItems.map((item) => <li key={item}>{item}</li>)}
    </ul>
  ) : null;
}

function ResumeSection({ children, title, variant }: { children: ReactNode; title: string; variant: ResumeTemplateVariant }) {
  return (
    <section className="resume-template-section">
      <h3 className={`mb-2 text-[11px] font-bold uppercase tracking-[0.14em] ${variantStyles[variant].section}`}>{title}</h3>
      {children}
    </section>
  );
}

export function ResumeTemplateDocument({ resume, variant }: ResumeTemplateDocumentProps) {
  const style = variantStyles[variant];
  const contactLine = [
    resume.personalInfo.email,
    resume.personalInfo.phone,
    resume.personalInfo.location,
    resume.personalInfo.website,
  ].filter(Boolean).join(" | ");

  return (
    <article
      className={`resume-template-document min-h-[980px] p-7 text-[12px] leading-[1.55] text-[#24272a] sm:p-8 ${style.shell}`}
      style={{ "--resume-accent": style.accent, "--resume-border": style.border, fontFamily: style.font } as CSSProperties}
    >
      <header className={style.header}>
        <h2 className={`text-[28px] font-semibold tracking-[-0.04em] text-[#17191c] ${variant === "academic" ? "font-serif" : ""}`}>
          {resume.personalInfo.fullName || "Your Name"}
        </h2>
        <p className="mt-1 text-[13px] font-medium" style={{ color: style.accent }}>
          {resume.personalInfo.headline || "Target role headline"}
        </p>
        <p className="mt-2 text-[10px] leading-4 text-[#666b73]">{contactLine}</p>
      </header>

      <div className="mt-5 space-y-4">
        {resume.summary ? <ResumeSection title="Professional Summary" variant={variant}><p>{resume.summary}</p></ResumeSection> : null}
        {resume.skills.length > 0 ? <ResumeSection title="Skills" variant={variant}><p>{resume.skills.join(" · ")}</p></ResumeSection> : null}
        {resume.experience.length > 0 ? (
          <ResumeSection title="Experience" variant={variant}>
            <div className="space-y-3">
              {resume.experience.map((item) => (
                <div key={item.id} className="resume-template-item">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-bold text-[#17191c]">{item.role || "Role"}</p>
                    <p className="text-[10px] text-[#666b73]">{dateRange(item.startDate, item.endDate, item.isCurrent)}</p>
                  </div>
                  <p className="text-[11px] text-[#666b73]">{[item.company, item.location].filter(Boolean).join(" | ")}</p>
                  <BulletList items={item.bullets} />
                </div>
              ))}
            </div>
          </ResumeSection>
        ) : null}
        {resume.projects.length > 0 ? (
          <ResumeSection title="Projects" variant={variant}>
            <div className="space-y-3">
              {resume.projects.map((project) => (
                <div key={project.id} className="resume-template-item">
                  <p className="font-bold text-[#17191c]">{project.name || "Project"}</p>
                  <p>{project.description}</p>
                  {project.technologies.length > 0 ? <p className="mt-0.5 text-[10px] text-[#666b73]">{project.technologies.join(" · ")}</p> : null}
                  <BulletList items={project.bullets} />
                </div>
              ))}
            </div>
          </ResumeSection>
        ) : null}
        {resume.education.length > 0 ? (
          <ResumeSection title={variant === "academic" ? "Education & Research" : "Education"} variant={variant}>
            <div className="space-y-2">
              {resume.education.map((item) => (
                <div key={item.id} className="resume-template-item">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-bold text-[#17191c]">{item.degree || "Degree"}</p>
                    <p className="text-[10px] text-[#666b73]">{dateRange(item.startDate, item.endDate)}</p>
                  </div>
                  <p className="text-[11px] text-[#666b73]">{[item.institution, item.location].filter(Boolean).join(" | ")}</p>
                  <BulletList items={item.details} />
                </div>
              ))}
            </div>
          </ResumeSection>
        ) : null}
        {resume.certifications.length > 0 ? (
          <ResumeSection title="Certifications" variant={variant}>
            <ul className="space-y-0.5">
              {resume.certifications.map((item) => <li key={item.id}>{item.name}{item.issuer ? `, ${item.issuer}` : ""}{item.date ? ` (${item.date})` : ""}</li>)}
            </ul>
          </ResumeSection>
        ) : null}
        {resume.languages.length > 0 ? (
          <ResumeSection title="Languages" variant={variant}>
            <p>{resume.languages.map((item) => `${item.name}${item.proficiency ? ` (${item.proficiency})` : ""}`).join(" · ")}</p>
          </ResumeSection>
        ) : null}
      </div>
    </article>
  );
}
