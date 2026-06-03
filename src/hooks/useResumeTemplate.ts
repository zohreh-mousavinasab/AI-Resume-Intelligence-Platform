import { useEffect, useState } from "react";
import type { ResumeTemplateId } from "../types";
import {
  loadResumeTemplate,
  resumeTemplateChangeEvent,
  saveResumeTemplate,
} from "../store/resumeTemplateStorage";

export function useResumeTemplate() {
  const [templateId, setTemplateId] = useState<ResumeTemplateId>(loadResumeTemplate);

  useEffect(() => {
    function handleTemplateChange(event: Event) {
      setTemplateId((event as CustomEvent<ResumeTemplateId>).detail);
    }

    window.addEventListener(resumeTemplateChangeEvent, handleTemplateChange);
    return () => window.removeEventListener(resumeTemplateChangeEvent, handleTemplateChange);
  }, []);

  function selectTemplate(nextTemplateId: ResumeTemplateId) {
    saveResumeTemplate(nextTemplateId);
    setTemplateId(nextTemplateId);
  }

  return { selectTemplate, templateId };
}
