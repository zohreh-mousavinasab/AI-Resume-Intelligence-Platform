import type { ResumeData } from "../types";

function formatBulletList(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

export function exportResumeMarkdown(resume: ResumeData): string {
  const contactLine = [
    resume.personalInfo.email,
    resume.personalInfo.phone,
    resume.personalInfo.location,
    resume.personalInfo.website,
  ]
    .filter(Boolean)
    .join(" | ");

  const experience = resume.experience
    .map((item) =>
      [
        `### ${item.role} - ${item.company}`,
        "",
        `${item.location} | ${item.startDate} - ${item.endDate || (item.isCurrent ? "Present" : "")}`,
        "",
        formatBulletList(item.bullets),
      ].join("\n"),
    )
    .join("\n\n");
  const projects = resume.projects
    .map((item) =>
      [
        `### ${item.name}`,
        "",
        item.description,
        "",
        item.technologies.length > 0 ? `Technologies: ${item.technologies.join(", ")}` : "",
        "",
        formatBulletList(item.bullets),
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n\n");
  const education = resume.education
    .map((item) =>
      [
        `### ${item.degree} - ${item.institution}`,
        "",
        `${item.location} | ${item.startDate} - ${item.endDate}`,
        "",
        formatBulletList(item.details),
      ].join("\n"),
    )
    .join("\n\n");
  const certifications = resume.certifications
    .map((item) => `- ${item.name}${item.issuer ? `, ${item.issuer}` : ""}${item.date ? ` (${item.date})` : ""}`)
    .join("\n");
  const languages = resume.languages
    .map((item) => `- ${item.name}${item.proficiency ? `: ${item.proficiency}` : ""}`)
    .join("\n");

  return [
    `# ${resume.personalInfo.fullName}`,
    "",
    resume.personalInfo.headline,
    "",
    contactLine,
    "",
    "## Professional Summary",
    "",
    resume.summary,
    "",
    "## Skills",
    "",
    resume.skills.join(", "),
    "",
    "## Experience",
    "",
    experience,
    "",
    "## Projects",
    "",
    projects,
    "",
    "## Education",
    "",
    education,
    "",
    "## Certifications",
    "",
    certifications,
    "",
    "## Languages",
    "",
    languages,
    "",
  ].join("\n");
}
