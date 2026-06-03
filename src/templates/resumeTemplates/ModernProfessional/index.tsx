import type { ResumeTemplateProps } from "../../../types";
import { ResumeTemplateDocument } from "../ResumeTemplateDocument";

export function ModernProfessional({ resume }: ResumeTemplateProps) {
  return <ResumeTemplateDocument resume={resume} variant="modern" />;
}
