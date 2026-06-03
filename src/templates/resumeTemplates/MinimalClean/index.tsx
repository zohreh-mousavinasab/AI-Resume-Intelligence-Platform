import type { ResumeTemplateProps } from "../../../types";
import { ResumeTemplateDocument } from "../ResumeTemplateDocument";

export function MinimalClean({ resume }: ResumeTemplateProps) {
  return <ResumeTemplateDocument resume={resume} variant="minimal" />;
}
