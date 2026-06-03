import type { ComponentType } from "react";
import type { ResumeData } from "./resume";

export type ResumeTemplateId =
  | "modern-professional"
  | "minimal-clean"
  | "ats-optimized"
  | "executive"
  | "software-engineer"
  | "creative-designer"
  | "corporate"
  | "latex-academic";

export interface ResumeTemplateProps {
  resume: ResumeData;
}

export interface ResumeTemplateDefinition {
  id: ResumeTemplateId;
  name: string;
  description: string;
  useCase: string;
  accent: string;
  component: ComponentType<ResumeTemplateProps>;
}
