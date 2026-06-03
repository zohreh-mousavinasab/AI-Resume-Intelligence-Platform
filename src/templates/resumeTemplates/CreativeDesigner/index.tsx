import type { ResumeTemplateProps } from "../../../types";
import { ResumeTemplateDocument } from "../ResumeTemplateDocument";

export function CreativeDesigner({ resume }: ResumeTemplateProps) {
  return <ResumeTemplateDocument resume={resume} variant="creative" />;
}
