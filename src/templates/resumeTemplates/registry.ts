import type { ResumeTemplateDefinition, ResumeTemplateId } from "../../types";
import { Academic } from "./Academic";
import { ATSOptimized } from "./ATSOptimized";
import { Corporate } from "./Corporate";
import { CreativeDesigner } from "./CreativeDesigner";
import { Executive } from "./Executive";
import { MinimalClean } from "./MinimalClean";
import { ModernProfessional } from "./ModernProfessional";
import { SoftwareEngineer } from "./SoftwareEngineer";

export const resumeTemplates: ResumeTemplateDefinition[] = [
  {
    id: "modern-professional",
    name: "Modern Professional",
    description: "Polished hierarchy with a warm editorial accent.",
    useCase: "Best for most jobs",
    accent: "#5d2a1a",
    component: ModernProfessional,
  },
  {
    id: "minimal-clean",
    name: "Minimal Clean",
    description: "Quiet, precise typography with generous white space.",
    useCase: "Best for focused applications",
    accent: "#17191c",
    component: MinimalClean,
  },
  {
    id: "ats-optimized",
    name: "ATS Optimized",
    description: "Single-column structure with conservative formatting.",
    useCase: "Best for ATS systems",
    accent: "#4c4c4c",
    component: ATSOptimized,
  },
  {
    id: "executive",
    name: "Executive",
    description: "Serif-led presentation with an authoritative tone.",
    useCase: "Best for leaders and managers",
    accent: "#263348",
    component: Executive,
  },
  {
    id: "software-engineer",
    name: "Software Engineer",
    description: "Technical character with crisp project readability.",
    useCase: "Best for engineering roles",
    accent: "#0f5f68",
    component: SoftwareEngineer,
  },
  {
    id: "creative-designer",
    name: "Creative Designer",
    description: "Expressive warm blocks while keeping content scannable.",
    useCase: "Best for creative portfolios",
    accent: "#a4452d",
    component: CreativeDesigner,
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Structured business layout with restrained blue accents.",
    useCase: "Best for corporate careers",
    accent: "#213a5a",
    component: Corporate,
  },
  {
    id: "latex-academic",
    name: "LaTeX Academic Resume",
    description: "Research-first serif layout inspired by academic CVs.",
    useCase: "Best for students and researchers",
    accent: "#17191c",
    component: Academic,
  },
];

export function getResumeTemplate(templateId: ResumeTemplateId) {
  return resumeTemplates.find((template) => template.id === templateId) ?? resumeTemplates[0];
}
