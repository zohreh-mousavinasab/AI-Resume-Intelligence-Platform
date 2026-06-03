import type { ResumeTemplateProps } from "../../../types";
import { ResumeTemplateDocument } from "../ResumeTemplateDocument";

export function Academic({ resume }: ResumeTemplateProps) {
  return <ResumeTemplateDocument resume={resume} variant="academic" />;
}
