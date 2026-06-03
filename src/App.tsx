import { useState } from "react";
import type { ReactNode } from "react";
import { BarChart3, BriefcaseBusiness, FilePenLine, FileText, LayoutTemplate, Sparkles, UserSearch } from "lucide-react";
import { AppLayout } from "./layouts/AppLayout";
import { AppErrorBoundary } from "./components/ui/AppErrorBoundary";
import { AtsDashboardPage } from "./pages/AtsDashboardPage";
import { CoverLetterPage } from "./pages/CoverLetterPage";
import { JobMatchPage } from "./pages/JobMatchPage";
import { RecruiterInsightsPage } from "./pages/RecruiterInsightsPage";
import { ResumeBuilderPage } from "./pages/ResumeBuilderPage";
import { RewritePage } from "./pages/RewritePage";
import { TemplatesPage } from "./pages/TemplatesPage";
import type { AppPage, NavigationItem } from "./types/navigation";

const navigationItems: NavigationItem[] = [
  { id: "resume", label: "Builder", icon: FilePenLine },
  { id: "ats", label: "ATS", icon: BarChart3 },
  { id: "match", label: "Match", icon: BriefcaseBusiness },
  { id: "rewrite", label: "Rewrite", icon: Sparkles },
  { id: "insights", label: "Insights", icon: UserSearch },
  { id: "cover-letter", label: "Cover Letter", icon: FileText },
  { id: "templates", label: "Templates", icon: LayoutTemplate },
];

const pageMap: Record<AppPage, ReactNode> = {
  resume: <ResumeBuilderPage />,
  ats: <AtsDashboardPage />,
  match: <JobMatchPage />,
  rewrite: <RewritePage />,
  insights: <RecruiterInsightsPage />,
  "cover-letter": <CoverLetterPage />,
  templates: <TemplatesPage />,
};

export function App() {
  const [activePage, setActivePage] = useState<AppPage>("resume");

  return (
    <AppLayout
      activePage={activePage}
      navigationItems={navigationItems}
      onPageChange={setActivePage}
    >
      <AppErrorBoundary key={activePage}>{pageMap[activePage]}</AppErrorBoundary>
    </AppLayout>
  );
}
