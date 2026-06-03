import type { KeywordHit, Recommendation, ScoreBreakdown } from "./common";

export interface JobDescriptionData {
  id: string;
  title: string;
  company: string;
  description: string;
}

export interface SkillGap {
  skill: string;
  importance: "high" | "medium" | "low";
  recommendation: string;
}

export interface JobMatchAnalysis {
  resumeId: string;
  jobDescriptionId: string;
  match: ScoreBreakdown;
  keywords: KeywordHit[];
  missingSkills: SkillGap[];
  recommendations: Recommendation[];
}
