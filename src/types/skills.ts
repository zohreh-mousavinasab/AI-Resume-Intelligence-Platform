export interface SkillCategory {
  category: "technical" | "soft" | "tools" | "frameworks" | "platforms";
  skills: string[];
}

export interface MissingSkillRecommendation {
  skill: string;
  category: SkillCategory["category"];
  reason: string;
}

export interface SkillExtractionResult {
  resumeId: string;
  extracted: SkillCategory[];
  missing: MissingSkillRecommendation[];
}
