import { seedResume } from "../data/seedData";
import type { ResumeData } from "../types";
import { loadFromLocalStorage, saveToLocalStorage } from "./localStorage";
import { storageKeys } from "./storageKeys";

export function loadResume(): ResumeData {
  return loadFromLocalStorage<ResumeData>(storageKeys.resume, seedResume);
}

export function saveResume(resume: ResumeData): void {
  saveToLocalStorage(storageKeys.resume, resume);
}
