import { Plus, Trash2, WandSparkles } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { ResumeTemplatePreview } from "../components/resume/ResumeTemplatePreview";
import { useResumeTemplate } from "../hooks/useResumeTemplate";
import { SplitWorkspaceLayout } from "../layouts/SplitWorkspaceLayout";
import { loadResume, saveResume } from "../store/resumeStorage";
import type { ResumeData } from "../types";

const inputClass =
  "form-input h-10 px-3";
const textareaClass =
  "form-input min-h-24 resize-y p-3 leading-6";

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function splitLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function joinLines(value: string[]) {
  return value.join("\n");
}

interface FieldLabelProps {
  label: string;
}

function FieldLabel({ label }: FieldLabelProps) {
  return <label className="text-xs font-medium uppercase tracking-[0.12em] text-light-steel">{label}</label>;
}

interface SectionShellProps {
  children: React.ReactNode;
  title: string;
}

function SectionShell({ children, title }: SectionShellProps) {
  return (
    <section className="overflow-hidden rounded-3xl bg-fog">
      <h3 className="border-b border-ink-100 bg-white/60 px-4 py-3 text-sm font-medium text-ink-900">{title}</h3>
      <div className="p-4">
      {children}
      </div>
    </section>
  );
}

export function ResumeBuilderPage() {
  const form = useForm<ResumeData>({
    defaultValues: loadResume(),
    mode: "onChange",
  });

  const { control, register, setValue } = form;
  const resume = useWatch({ control }) as ResumeData;

  const experienceFields = useFieldArray({ control, name: "experience" });
  const educationFields = useFieldArray({ control, name: "education" });
  const projectFields = useFieldArray({ control, name: "projects" });
  const certificationFields = useFieldArray({ control, name: "certifications" });
  const languageFields = useFieldArray({ control, name: "languages" });
  const { selectTemplate, templateId } = useResumeTemplate();

  useEffect(() => {
    if (resume) {
      saveResume(resume);
    }
  }, [resume]);

  return (
    <SplitWorkspaceLayout
      editor={
        <form className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="section-kicker">Live editor</p>
              <h2 className="mt-1 font-display text-[26px] leading-none text-ink-900">Resume Builder</h2>
              <p className="mt-2 text-sm text-muted-stone">Edit once and watch the ATS-ready preview update instantly.</p>
            </div>
            <button
              className="button-primary"
              type="button"
            >
              <WandSparkles size={16} />
              Rewrite
            </button>
          </div>

          <SectionShell title="Personal Information">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <FieldLabel label="Full name" />
                <input className={inputClass} {...register("personalInfo.fullName")} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel label="Headline" />
                <input className={inputClass} {...register("personalInfo.headline")} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel label="Email" />
                <input className={inputClass} type="email" {...register("personalInfo.email")} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel label="Phone" />
                <input className={inputClass} {...register("personalInfo.phone")} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel label="Location" />
                <input className={inputClass} {...register("personalInfo.location")} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel label="Website" />
                <input className={inputClass} {...register("personalInfo.website")} />
              </div>
            </div>
          </SectionShell>

          <SectionShell title="Professional Summary">
            <textarea className={textareaClass} {...register("summary")} />
          </SectionShell>

          <SectionShell title="Skills">
            <textarea
              className={textareaClass}
              value={resume.skills.join(", ")}
              onChange={(event) => {
                setValue(
                  "skills",
                  event.target.value
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter(Boolean),
                  { shouldDirty: true },
                );
              }}
            />
          </SectionShell>

          <SectionShell title="Experience">
            <div className="space-y-4">
              {experienceFields.fields.map((field, index) => (
                <div key={field.id} className="rounded-2xl border border-ink-100 bg-white p-3">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-ink-900 dark:text-white">Experience {index + 1}</p>
                    <IconButton label="Remove experience" onClick={() => experienceFields.remove(index)} />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input className={inputClass} placeholder="Company" {...register(`experience.${index}.company`)} />
                    <input className={inputClass} placeholder="Role" {...register(`experience.${index}.role`)} />
                    <input className={inputClass} placeholder="Location" {...register(`experience.${index}.location`)} />
                    <input className={inputClass} placeholder="Start date" {...register(`experience.${index}.startDate`)} />
                    <input className={inputClass} placeholder="End date" {...register(`experience.${index}.endDate`)} />
                    <label className="flex h-10 items-center gap-2 rounded-2xl border border-ink-100 bg-fog px-3 text-sm text-muted-stone">
                      <input type="checkbox" {...register(`experience.${index}.isCurrent`)} />
                      Current role
                    </label>
                  </div>
                  <textarea
                    className={`${textareaClass} mt-3`}
                    value={joinLines(resume.experience[index]?.bullets ?? [])}
                    onChange={(event) => setValue(`experience.${index}.bullets`, splitLines(event.target.value), { shouldDirty: true })}
                  />
                </div>
              ))}
              <AddButton
                label="Add experience"
                onClick={() =>
                  experienceFields.append({
                    id: createId("exp"),
                    company: "",
                    role: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    isCurrent: false,
                    bullets: [],
                  })
                }
              />
            </div>
          </SectionShell>

          <SectionShell title="Education">
            <div className="space-y-4">
              {educationFields.fields.map((field, index) => (
                <div key={field.id} className="rounded-2xl border border-ink-100 bg-white p-3">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-ink-900 dark:text-white">Education {index + 1}</p>
                    <IconButton label="Remove education" onClick={() => educationFields.remove(index)} />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input className={inputClass} placeholder="Institution" {...register(`education.${index}.institution`)} />
                    <input className={inputClass} placeholder="Degree" {...register(`education.${index}.degree`)} />
                    <input className={inputClass} placeholder="Location" {...register(`education.${index}.location`)} />
                    <input className={inputClass} placeholder="Start date" {...register(`education.${index}.startDate`)} />
                    <input className={inputClass} placeholder="End date" {...register(`education.${index}.endDate`)} />
                  </div>
                  <textarea
                    className={`${textareaClass} mt-3`}
                    value={joinLines(resume.education[index]?.details ?? [])}
                    onChange={(event) => setValue(`education.${index}.details`, splitLines(event.target.value), { shouldDirty: true })}
                  />
                </div>
              ))}
              <AddButton
                label="Add education"
                onClick={() =>
                  educationFields.append({
                    id: createId("edu"),
                    institution: "",
                    degree: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    details: [],
                  })
                }
              />
            </div>
          </SectionShell>

          <SectionShell title="Projects">
            <div className="space-y-4">
              {projectFields.fields.map((field, index) => (
                <div key={field.id} className="rounded-2xl border border-ink-100 bg-white p-3">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-ink-900 dark:text-white">Project {index + 1}</p>
                    <IconButton label="Remove project" onClick={() => projectFields.remove(index)} />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input className={inputClass} placeholder="Project name" {...register(`projects.${index}.name`)} />
                    <input
                      className={inputClass}
                      placeholder="Technologies"
                      value={(resume.projects[index]?.technologies ?? []).join(", ")}
                      onChange={(event) =>
                        setValue(
                          `projects.${index}.technologies`,
                          event.target.value
                            .split(",")
                            .map((item) => item.trim())
                            .filter(Boolean),
                          { shouldDirty: true },
                        )
                      }
                    />
                  </div>
                  <textarea className={`${textareaClass} mt-3`} placeholder="Description" {...register(`projects.${index}.description`)} />
                  <textarea
                    className={`${textareaClass} mt-3`}
                    value={joinLines(resume.projects[index]?.bullets ?? [])}
                    onChange={(event) => setValue(`projects.${index}.bullets`, splitLines(event.target.value), { shouldDirty: true })}
                  />
                </div>
              ))}
              <AddButton
                label="Add project"
                onClick={() =>
                  projectFields.append({
                    id: createId("project"),
                    name: "",
                    description: "",
                    technologies: [],
                    bullets: [],
                  })
                }
              />
            </div>
          </SectionShell>

          <SectionShell title="Certifications">
            <div className="space-y-3">
              {certificationFields.fields.map((field, index) => (
                <div key={field.id} className="grid gap-3 rounded-2xl border border-ink-100 bg-white p-3 sm:grid-cols-[1fr_1fr_120px_auto]">
                  <input className={inputClass} placeholder="Name" {...register(`certifications.${index}.name`)} />
                  <input className={inputClass} placeholder="Issuer" {...register(`certifications.${index}.issuer`)} />
                  <input className={inputClass} placeholder="Date" {...register(`certifications.${index}.date`)} />
                  <IconButton label="Remove certification" onClick={() => certificationFields.remove(index)} />
                </div>
              ))}
              <AddButton
                label="Add certification"
                onClick={() => certificationFields.append({ id: createId("cert"), name: "", issuer: "", date: "" })}
              />
            </div>
          </SectionShell>

          <SectionShell title="Languages">
            <div className="space-y-3">
              {languageFields.fields.map((field, index) => (
                <div key={field.id} className="grid gap-3 rounded-2xl border border-ink-100 bg-white p-3 sm:grid-cols-[1fr_1fr_auto]">
                  <input className={inputClass} placeholder="Language" {...register(`languages.${index}.name`)} />
                  <input className={inputClass} placeholder="Proficiency" {...register(`languages.${index}.proficiency`)} />
                  <IconButton label="Remove language" onClick={() => languageFields.remove(index)} />
                </div>
              ))}
              <AddButton
                label="Add language"
                onClick={() => languageFields.append({ id: createId("lang"), name: "", proficiency: "" })}
              />
            </div>
          </SectionShell>
        </form>
      }
      preview={<ResumeTemplatePreview resume={resume} templateId={templateId} onTemplateChange={selectTemplate} />}
    />
  );
}

interface AddButtonProps {
  label: string;
  onClick: () => void;
}

function AddButton({ label, onClick }: AddButtonProps) {
  return (
    <button
      className="inline-flex h-10 items-center gap-2 rounded-full border border-dashed border-ink-300 bg-white px-4 text-sm font-medium text-muted-stone transition hover:border-terracotta hover:bg-warm-mist hover:text-terracotta"
      type="button"
      onClick={onClick}
    >
      <Plus size={16} />
      {label}
    </button>
  );
}

interface IconButtonProps {
  label: string;
  onClick: () => void;
}

function IconButton({ label, onClick }: IconButtonProps) {
  return (
    <button
      className="icon-button hover:border-risk-400 hover:text-risk-600"
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      <Trash2 size={16} />
    </button>
  );
}
