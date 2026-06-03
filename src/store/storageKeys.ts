export const storageKeys = {
  resume: "resume-agent:resume",
  atsAnalysis: "resume-agent:ats-analysis",
  jobDescription: "resume-agent:job-description",
  jobMatch: "resume-agent:job-match",
  recruiterInsights: "resume-agent:recruiter-insights",
  sectionScores: "resume-agent:section-scores",
  skills: "resume-agent:skills",
  coverLetter: "resume-agent:cover-letter",
  uiConfig: "resume-agent:ui-config",
  resumeTemplate: "resume-agent:resume-template",
} as const;

export type StorageKey = (typeof storageKeys)[keyof typeof storageKeys];
