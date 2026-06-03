export type ResumeSectionKey = "experience" | "skills" | "education" | "projects" | "summary";

export interface SectionScore {
  section: ResumeSectionKey;
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

export interface SectionScoreReport {
  resumeId: string;
  sections: SectionScore[];
}
