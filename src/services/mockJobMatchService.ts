import { seedJobDescription, seedJobMatch, seedSkills } from "../data/seedData";
import type { JobDescriptionData, JobMatchAnalysis, SkillExtractionResult } from "../types";

export function mockGetJobDescription(): JobDescriptionData {
  return seedJobDescription;
}

export function mockExtractSkills(): SkillExtractionResult {
  return seedSkills;
}

export function mockAnalyzeJobDescription(description: string): JobMatchAnalysis {
  const normalizedDescription = description.toLowerCase();
  const hasTesting = normalizedDescription.includes("testing") || normalizedDescription.includes("playwright");
  const hasDesignSystems = normalizedDescription.includes("design system");
  const matchBonus = [hasTesting, hasDesignSystems].filter(Boolean).length * 6;
  const score = Math.min(seedJobMatch.match.score + matchBonus, 92);

  return {
    ...seedJobMatch,
    match: {
      ...seedJobMatch.match,
      score,
      label: score >= 85 ? "Excellent role alignment" : seedJobMatch.match.label,
      level: score >= 85 ? "excellent" : seedJobMatch.match.level,
    },
    keywords: seedJobMatch.keywords.map((keyword) => {
      if (keyword.keyword.toLowerCase() !== "testing") {
        return keyword;
      }

      return {
        ...keyword,
        count: hasTesting ? 2 : keyword.count,
        status: hasTesting ? "matched" : keyword.status,
      };
    }),
    missingSkills: hasTesting
      ? seedJobMatch.missingSkills.filter((skill) => skill.skill !== "Frontend testing")
      : seedJobMatch.missingSkills,
  };
}
