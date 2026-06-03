import { seedJobDescription } from "../data/seedData";
import type { CoverLetterData, CoverLetterTone, JobDescriptionData, ResumeData } from "../types";

const toneOpeners: Record<CoverLetterTone, string> = {
  professional: "I am excited to apply",
  formal: "Please accept my application",
  friendly: "I am glad to apply",
  junior: "I am eager to apply",
  senior: "I am pleased to apply",
};

const toneClosers: Record<CoverLetterTone, string> = {
  professional: "clear frontend craft, thoughtful collaboration, and measurable product execution",
  formal: "disciplined execution, strong technical judgment, and dependable collaboration",
  friendly: "curiosity, care for users, and collaborative energy",
  junior: "a learning mindset, reliable frontend fundamentals, and enthusiasm for product work",
  senior: "technical leadership, product judgment, and a consistent record of delivery",
};

export function mockGenerateCoverLetter(
  resume: ResumeData,
  jobDescription: JobDescriptionData = seedJobDescription,
  tone: CoverLetterTone,
): CoverLetterData {
  const skills = resume.skills.slice(0, 3).join(", ");
  const currentRole = resume.experience[0]?.role || resume.personalInfo.headline;
  const currentCompany = resume.experience[0]?.company;
  const experienceLine = currentCompany
    ? `As a ${currentRole} at ${currentCompany}, I have built ${skills} solutions and contributed to product-focused workflows.`
    : `My experience with ${skills} aligns closely with the role's needs.`;

  return {
    id: `cover-letter-${tone}`,
    input: {
      resumeId: resume.id,
      jobDescriptionId: jobDescription.id,
      tone,
    },
    contentMarkdown: [
      "Dear Hiring Team,",
      "",
      `${toneOpeners[tone]} for the ${jobDescription.title} role at ${jobDescription.company}. ${experienceLine}`,
      "",
      `I would welcome the opportunity to bring ${toneClosers[tone]} to your team.`,
      "",
      "Sincerely,",
      resume.personalInfo.fullName,
    ].join("\n"),
  };
}
