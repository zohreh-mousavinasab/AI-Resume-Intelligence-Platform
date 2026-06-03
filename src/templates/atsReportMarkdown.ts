import type { AtsAnalysis } from "../types";

export function exportAtsReportMarkdown(analysis: AtsAnalysis): string {
  const keywordLines = analysis.keywordDensity
    .map((keyword) => `- ${keyword.keyword}: ${keyword.status} (${keyword.count} hits)`)
    .join("\n");
  const sectionLines = analysis.sectionChecks
    .map(
      (section) =>
        `### ${section.section}\n\nScore: ${section.score}%\n\n${section.notes.map((note) => `- ${note}`).join("\n")}`,
    )
    .join("\n\n");
  const formattingLines = analysis.formattingChecks
    .map((check) => `- ${check.label}: ${check.status} - ${check.detail}`)
    .join("\n");
  const recommendationLines = analysis.recommendations
    .map((recommendation) => `- ${recommendation.title}: ${recommendation.description}`)
    .join("\n");

  return [
    "# ATS Report",
    "",
    "## Overall Score",
    "",
    `${analysis.overall.score}% - ${analysis.overall.label}`,
    "",
    "## Readability",
    "",
    `${analysis.readability.score}% - ${analysis.readability.label}`,
    "",
    "## Keyword Density",
    "",
    keywordLines,
    "",
    "## Section Completeness",
    "",
    sectionLines,
    "",
    "## Formatting Validation",
    "",
    formattingLines,
    "",
    "## Recommendations",
    "",
    recommendationLines,
    "",
  ].join("\n");
}
