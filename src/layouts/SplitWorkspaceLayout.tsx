import { GripVertical } from "lucide-react";
import { useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

interface SplitWorkspaceLayoutProps {
  editor: ReactNode;
  preview: ReactNode;
}

export function SplitWorkspaceLayout({ editor, preview }: SplitWorkspaceLayoutProps) {
  const [editorWidth, setEditorWidth] = useState(46);

  function handleResizeStart(event: ReactPointerEvent<HTMLButtonElement>) {
    const container = event.currentTarget.parentElement;

    if (!container) {
      return;
    }

    const resizeContainer = container;

    function handlePointerMove(pointerEvent: PointerEvent) {
      const rect = resizeContainer.getBoundingClientRect();
      const nextWidth = ((pointerEvent.clientX - rect.left) / rect.width) * 100;
      setEditorWidth(Math.min(62, Math.max(34, nextWidth)));
    }

    function handlePointerUp() {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  }

  return (
    <div
      className="grid min-h-[720px] gap-6 xl:grid-cols-[var(--editor-width)_12px_minmax(0,1fr)] xl:gap-3"
      style={{ "--editor-width": `${editorWidth}%` } as CSSProperties}
    >
      <section className="min-w-0 rounded-3xl bg-white p-5 shadow-subtle">
        {editor}
      </section>
      <button
        className="hidden cursor-col-resize items-center justify-center rounded-full text-light-steel transition hover:bg-warm-mist hover:text-terracotta focus-visible:bg-warm-mist xl:flex"
        type="button"
        aria-label="Resize editor and preview panels"
        aria-valuemax={62}
        aria-valuemin={34}
        aria-valuenow={Math.round(editorWidth)}
        role="separator"
        title="Drag to resize panels"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            setEditorWidth((current) => Math.max(34, current - 2));
          }

          if (event.key === "ArrowRight") {
            setEditorWidth((current) => Math.min(62, current + 2));
          }
        }}
        onPointerDown={handleResizeStart}
      >
        <GripVertical size={16} />
      </button>
      <section className="min-w-0 rounded-3xl bg-[linear-gradient(145deg,#f7f7f8_0%,#fbe1d1_180%)] p-4 sm:p-5">
        {preview}
      </section>
    </div>
  );
}
