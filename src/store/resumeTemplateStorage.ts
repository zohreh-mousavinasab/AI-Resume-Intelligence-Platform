import type { ResumeTemplateId } from "../types";
import { loadFromLocalStorage, saveToLocalStorage } from "./localStorage";
import { storageKeys } from "./storageKeys";

export const defaultResumeTemplate: ResumeTemplateId = "modern-professional";
export const resumeTemplateChangeEvent = "resume-agent:template-change";

export function loadResumeTemplate(): ResumeTemplateId {
  return loadFromLocalStorage(storageKeys.resumeTemplate, defaultResumeTemplate);
}

export function saveResumeTemplate(templateId: ResumeTemplateId): void {
  saveToLocalStorage(storageKeys.resumeTemplate, templateId);
  window.dispatchEvent(new CustomEvent(resumeTemplateChangeEvent, { detail: templateId }));
}
