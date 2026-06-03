import type { JobDescriptionData, JobMatchAnalysis, SkillExtractionResult } from "../types";

export function exportJobMatchMarkdown(
  jobDescription: JobDescriptionData,
  analysis: JobMatchAnalysis,
  skills: SkillExtractionResult,
): string {
  const keywordLines = analysis.keywords
    .map((keyword) => `- ${keyword.keyword}: ${keyword.status} (${keyword.count} hits)`)
    .join("\n");
  const missingSkillLines = analysis.missingSkills
    .map((skill) => `- ${skill.skill} (${skill.importance}): ${skill.recommendation}`)
    .join("\n");
  const extractedSkillLines = skills.extracted
    .map((group) => `- ${group.category}: ${group.skills.join(", ")}`)
    .join("\n");
  const recommendationLines = analysis.recommendations
    .map((recommendation) => `- ${recommendation.title}: ${recommendation.description}`)
    .join("\n");

  return [
    "# Job Match Report",
    "",
    `## ${jobDescription.title}`,
    "",
    `Company: ${jobDescription.company}`,
    "",
    "## Match Score",
    "",
    `${analysis.match.score}% - ${analysis.match.label}`,
    "",
    "## Keyword Coverage",
    "",
    keywordLines,
    "",
    "## Missing Skills",
    "",
    missingSkillLines || "- No missing skills detected in the current mock analysis.",
    "",
    "## Extracted Resume Skills",
    "",
    extractedSkillLines,
    "",
    "## Recommendations",
    "",
    recommendationLines,
    "",
  ].join("\n");
}
