import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { LINKS } from "./data";

const ResumeCtx = createContext<() => void>(() => {});
export const useResume = () => useContext(ResumeCtx);

const FILE = LINKS.resume.split("/").pop()!;

// Mobile browsers can't render PDFs inside an iframe, so hand those off to the native viewer.
const canEmbedPdf = () =>
  typeof window !== "undefined" && window.matchMedia("(min-width: 760px) and (hover: hover)").matches;

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const show = useCallback(() => {
    if (!canEmbedPdf()) {
      window.open(LINKS.resume, "_blank", "noopener");
      return;
    }
    setClosing(false);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 280);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <ResumeCtx.Provider value={show}>
      {children}
      {open && (
        <div className={`t-resume ${closing ? "is-closing" : ""}`} onClick={close} role="dialog" aria-modal aria-label="Resume">
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
                <a href={LINKS.resume} download={FILE} className="t-link">
                  download ↓
                </a>
                <a href={LINKS.resume} target="_blank" rel="noopener noreferrer" className="t-link">
                  open ↗
                </a>
                <button onClick={close} className="t-link" aria-label="Close resume">
                  [esc]
                </button>
              </span>
            </div>
            <iframe src={`${LINKS.resume}#view=FitH&toolbar=0&navpanes=0`} title="Syed Darain Hyder — Resume" />
          </div>
        </div>
      )}
    </ResumeCtx.Provider>
  );
}
