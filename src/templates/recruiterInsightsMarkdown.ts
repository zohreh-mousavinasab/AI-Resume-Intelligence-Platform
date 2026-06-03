import type { RecruiterInsights } from "../types";

export function exportRecruiterInsightsMarkdown(insights: RecruiterInsights): string {
  const signalLines = insights.signals
    .map(
      (signal) =>
        `### ${signal.label}\n\nScore: ${signal.score}% (${signal.status})\n\n${signal.evidence
          .map((item) => `- ${item}`)
          .join("\n")}`,
    )
    .join("\n\n");
  const warningLines = insights.warnings
    .map((warning) => `- ${warning.title}: ${warning.description}`)
    .join("\n");
  const actionVerbLines = insights.actionVerbs.map((verb) => `- ${verb}`).join("\n");

  return [
    "# Recruiter Insights Report",
    "",
    "## Overall Score",
    "",
    `${insights.overall.score}% - ${insights.overall.label}`,
    "",
    "## Recruiter Signals",
    "",
    signalLines,
    "",
    "## Recommendations",
    "",
    warningLines,
    "",
    "## Recommended Action Verbs",
    "",
    actionVerbLines,
    "",
  ].join("\n");
}
