import type { ResumeTemplateProps } from "../../../types";
import { ResumeTemplateDocument } from "../ResumeTemplateDocument";

export function ATSOptimized({ resume }: ResumeTemplateProps) {
  return <ResumeTemplateDocument resume={resume} variant="ats" />;
}
