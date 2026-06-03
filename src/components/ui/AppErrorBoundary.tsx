import { AlertTriangle, RefreshCw } from "lucide-react";
import { Component, type ErrorInfo, type ReactNode } from "react";

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
}

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Resume Agent page failed to render.", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="rounded-md border border-risk-400 bg-risk-100 p-4 dark:border-risk-600 dark:bg-ink-800">
          <div className="flex items-start gap-3 text-risk-600 dark:text-risk-400">
            <AlertTriangle className="mt-0.5 shrink-0" size={18} />
            <div>
              <h2 className="text-base font-semibold">This workspace could not be displayed.</h2>
              <p className="mt-1 text-sm leading-6 text-ink-700 dark:text-ink-100">
                Reload the current page to restore your locally saved draft.
              </p>
              <button
                className="mt-3 inline-flex h-10 items-center gap-2 rounded-md bg-risk-600 px-3 text-sm font-semibold text-white transition hover:bg-risk-400"
                type="button"
                onClick={() => window.location.reload()}
              >
                <RefreshCw size={16} />
                Reload
              </button>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
