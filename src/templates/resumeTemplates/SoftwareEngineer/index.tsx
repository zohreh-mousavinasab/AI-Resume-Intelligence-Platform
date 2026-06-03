import type { ResumeTemplateProps } from "../../../types";
import { ResumeTemplateDocument } from "../ResumeTemplateDocument";

export function SoftwareEngineer({ resume }: ResumeTemplateProps) {
  return <ResumeTemplateDocument resume={resume} variant="software" />;
}
