export interface ThemeSettings {
  defaultMode: "light" | "dark";
  accentColor: string;
}

export interface TemplateSettings {
  resumeTemplate: string;
  reportTemplate: string;
  coverLetterTemplate: string;
}

export interface UiConfig {
  theme: ThemeSettings;
  templates: TemplateSettings;
}
