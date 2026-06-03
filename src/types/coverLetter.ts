export type CoverLetterTone = "professional" | "formal" | "friendly" | "junior" | "senior";

export interface CoverLetterInput {
  resumeId: string;
  jobDescriptionId: string;
  tone: CoverLetterTone;
}

export interface CoverLetterData {
  id: string;
  input: CoverLetterInput;
  contentMarkdown: string;
}
