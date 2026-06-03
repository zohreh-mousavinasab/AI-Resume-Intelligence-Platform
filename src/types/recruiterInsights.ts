import type { Recommendation, ScoreBreakdown } from "./common";

export interface RecruiterSignal {
  id: string;
  label: string;
  score: number;
  status: "strong" | "moderate" | "weak";
  evidence: string[];
}

export interface RecruiterInsights {
  resumeId: string;
  overall: ScoreBreakdown;
  signals: RecruiterSignal[];
  warnings: Recommendation[];
  actionVerbs: string[];
}
