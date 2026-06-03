import type { LucideIcon } from "lucide-react";

export type AppPage =
  | "resume"
  | "ats"
  | "match"
  | "rewrite"
  | "insights"
  | "cover-letter"
  | "templates";

export interface NavigationItem {
  id: AppPage;
  label: string;
  icon: LucideIcon;
}
