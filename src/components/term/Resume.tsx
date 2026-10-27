import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { LINKS } from "./data";

const ResumeCtx = createContext<() => void>(() => {});
export const useResume = () => useContext(ResumeCtx);

const FILE = LINKS.resume.split("/").pop()!;

// Desktop browsers show PDFs well in an iframe; phones and tablets often can't (or just download
// the file), so there the pages are drawn with pdf.js instead.
const canEmbedPdf = () =>
  typeof window !== "undefined" && window.matchMedia("(min-width: 760px) and (hover: hover)").matches;

type Mode = "iframe" | "pages";

/** Renders every page of the PDF into canvases sized for this screen. pdf.js loads only when needed. */
function PdfPages({ src }: { src: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    let destroy: (() => void) | undefined;
    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
        const { default: workerSrc } = await import("pdfjs-dist/legacy/build/pdf.worker.min.mjs?url");
        pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
        const task = pdfjs.getDocument(src);
        destroy = () => void task.destroy();
        const doc = await task.promise;
        const host = hostRef.current;
        if (!host || cancelled) return;
        // extra resolution so text stays sharp when pinch-zoomed
        const target = Math.min(host.clientWidth * Math.min(window.devicePixelRatio || 1, 2) * 1.5, 2400);
        for (let n = 1; n <= doc.numPages; n++) {
          const page = await doc.getPage(n);
          const viewport = page.getViewport({ scale: target / page.getViewport({ scale: 1 }).width });
          const canvas = document.createElement("canvas");
          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);
          canvas.className = "t-resume-page";
          canvas.setAttribute("role", "img");
          canvas.setAttribute("aria-label", `Resume, page ${n} of ${doc.numPages}`);
          await page.render({ canvasContext: canvas.getContext("2d")!, viewport }).promise;
          if (cancelled) return;
          host.appendChild(canvas);
        }
        setState("ready");
      } catch (err) {
        console.error("resume render failed:", err);
        if (!cancelled) setState("error");
      }
    })();
    return () => {
      cancelled = true;
      destroy?.();
    };
  }, [src]);

  return (
    <div className="t-resume-scroll">
      {state === "loading" && (
        <div className="t-resume-status">
          <span className="t-acc">$ </span>rendering {FILE}
          <span className="caret" aria-hidden />
        </div>
      )}
      {state === "error" && (
        <div className="t-resume-status">
          <span className="t-err">couldn't render the preview here.</span>{" "}
          <a href={src} target="_blank" rel="noopener noreferrer" className="t-link">
            open {FILE} ↗
          </a>
        </div>
      )}
      <div ref={hostRef} className="t-resume-pages" />
    </div>
  );
}

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode | null>(null);
  const [closing, setClosing] = useState(false);

  const show = useCallback(() => {
    setClosing(false);
    setMode(canEmbedPdf() ? "iframe" : "pages");
  }, []);

  const finishClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setMode(null);
      setClosing(false);
    }, 280);
  }, []);

  // closing goes through history so the phone's Back button closes the viewer instead of leaving the site
  const close = useCallback(() => {
    if (window.history.state?.resume) window.history.back();
    else finishClose();
  }, [finishClose]);

  const open = mode !== null;
  useEffect(() => {
    if (!open) return;
    window.history.pushState({ ...window.history.state, resume: true }, "");
    const onPop = () => finishClose();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("popstate", onPop);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, finishClose]);

  return (
    <ResumeCtx.Provider value={show}>
      {children}
      {mode && (
        <div className={`t-resume is-${mode} ${closing ? "is-closing" : ""}`} onClick={close} role="dialog" aria-modal aria-label="Resume">
          <div className="t-resume-win" onClick={(e) => e.stopPropagation()}>
            <div className="t-resume-bar">
              <span className="t-dots" aria-hidden>
                <i />
                <i />
                <i />
              </span>
              <span className="t-resume-title">
                <span className="t-dim">~/</span>
                {FILE}
              </span>
              <span className="t-resume-actions">
                {mode === "iframe" && (
                  <>
                    <a href={LINKS.resume} download={FILE} className="t-link">
                      download ↓
                    </a>
                    <a href={LINKS.resume} target="_blank" rel="noopener noreferrer" className="t-link">
                      open ↗
                    </a>
                  </>
                )}
                <button onClick={close} className="t-link" aria-label="Close resume">
                  [esc]
                </button>
              </span>
            </div>
            {mode === "iframe" ? (
              <iframe src={`${LINKS.resume}#view=FitH&toolbar=0&navpanes=0`} title="Syed Darain Hyder Kazmi, resume" />
            ) : (
              <>
                <PdfPages src={LINKS.resume} />
                <div className="t-resume-foot">
                  <a href={LINKS.resume} download={FILE} className="t-btn is-primary">
                    download ↓
                  </a>
                  <a href={LINKS.resume} target="_blank" rel="noopener noreferrer" className="t-btn">
                    open ↗
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </ResumeCtx.Provider>
  );
}
