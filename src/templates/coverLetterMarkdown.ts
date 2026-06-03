import type { CoverLetterData } from "../types";

export function exportCoverLetterMarkdown(coverLetter: CoverLetterData): string {
  return coverLetter.contentMarkdown.trim() + "\n";
}
