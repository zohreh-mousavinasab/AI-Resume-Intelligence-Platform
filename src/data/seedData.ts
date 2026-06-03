import atsAnalysisJson from "./ats-analysis.json";
import coverLetterJson from "./cover-letter.json";
import jobDescriptionJson from "./job-description.json";
import jobMatchJson from "./job-match.json";
import recruiterInsightsJson from "./recruiter-insights.json";
import resumeJson from "./resume.json";
import sectionScoresJson from "./section-scores.json";
import skillsJson from "./skills.json";
import uiConfigJson from "./ui-config.json";
import type {
  AtsAnalysis,
  CoverLetterData,
  JobDescriptionData,
  JobMatchAnalysis,
  RecruiterInsights,
  ResumeData,
  SectionScoreReport,
  SkillExtractionResult,
  UiConfig,
} from "../types";

export const seedResume = resumeJson as ResumeData;
export const seedAtsAnalysis = atsAnalysisJson as AtsAnalysis;
export const seedJobDescription = jobDescriptionJson as JobDescriptionData;
export const seedJobMatch = jobMatchJson as JobMatchAnalysis;
export const seedRecruiterInsights = recruiterInsightsJson as RecruiterInsights;
export const seedSectionScores = sectionScoresJson as SectionScoreReport;
export const seedSkills = skillsJson as SkillExtractionResult;
export const seedCoverLetter = coverLetterJson as CoverLetterData;
export const seedUiConfig = uiConfigJson as UiConfig;

export const seedData = {
  resume: seedResume,
  atsAnalysis: seedAtsAnalysis,
  jobDescription: seedJobDescription,
  jobMatch: seedJobMatch,
  recruiterInsights: seedRecruiterInsights,
  sectionScores: seedSectionScores,
  skills: seedSkills,
  coverLetter: seedCoverLetter,
  uiConfig: seedUiConfig,
};
