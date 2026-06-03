import type { ResumeTemplateProps } from "../../../types";
import { ResumeTemplateDocument } from "../ResumeTemplateDocument";

export function Executive({ resume }: ResumeTemplateProps) {
  return <ResumeTemplateDocument resume={resume} variant="executive" />;
}
