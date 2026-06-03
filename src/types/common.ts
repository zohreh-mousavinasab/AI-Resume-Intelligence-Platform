export type ScoreLevel = "excellent" | "good" | "warning" | "critical";

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: ScoreLevel;
}

export interface ScoreBreakdown {
  score: number;
  label: string;
  level: ScoreLevel;
}

export interface KeywordHit {
  keyword: string;
  count: number;
  status: "matched" | "missing" | "partial";
}
