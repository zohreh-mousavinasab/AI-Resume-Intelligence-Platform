import type { KeywordHit, Recommendation, ScoreBreakdown } from "./common";

export interface AtsSectionCheck {
  section: string;
  score: number;
  complete: boolean;
  notes: string[];
}

export interface AtsFormattingCheck {
  id: string;
  label: string;
  status: "pass" | "warning" | "fail";
  detail: string;
}

export interface AtsAnalysis {
  resumeId: string;
  overall: ScoreBreakdown;
  keywordDensity: KeywordHit[];
  readability: ScoreBreakdown;
  sectionChecks: AtsSectionCheck[];
  formattingChecks: AtsFormattingCheck[];
  recommendations: Recommendation[];
}
