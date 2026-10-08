import { useEffect, useState, type MouseEvent } from "react";
import { SECTIONS } from "./data";
import { useGo } from "./Transition";
import { useResume } from "./Resume";

export function TopBar() {
  const go = useGo();
  const showResume = useResume();
  const [active, setActive] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      const probe = window.scrollY + window.innerHeight * 0.35;
      let current = "";
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= probe) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const nav = (id: string) => (e: MouseEvent) => {
    setOpen(false);
    go(id, { x: e.clientX, y: e.clientY });
  };

  return (
    <header className="t-bar">
      <div className="t-bar-inner">
        <button className="t-bar-home" onClick={nav("top")} aria-label="Back to top">
          <span className="t-dots" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span className="t-dim">darain@portfolio</span>
          <span className="t-acc">:</span>
          <span>~{active ? `/${active}` : ""}</span>
        </button>

        <nav className="t-bar-nav" aria-label="Sections">
          {SECTIONS.filter((s) => s.id !== "reviews").map((s) => (
            <button key={s.id} onClick={nav(s.id)} className={active === s.id ? "is-active" : ""}>
              {s.label}
            </button>
          ))}
          <button onClick={nav("hire")} className="t-bar-hire">
            hire
          </button>
          <button onClick={showResume} className="t-bar-cta">
            resume.pdf
          </button>
        </nav>

        <button className="t-bar-menu" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          {open ? "[close]" : "[menu]"}
        </button>
      </div>

      {open && (
        <div className="t-bar-sheet">
          {SECTIONS.map((s, i) => (
            <button key={s.id} onClick={nav(s.id)} style={{ ["--i" as string]: i }}>
              <span className="t-dim">{String(i + 1).padStart(2, "0")}</span> cd ./{s.label}
            </button>
          ))}
          <button onClick={nav("hire")} className="t-bar-hire" style={{ ["--i" as string]: SECTIONS.length }}>
            <span className="t-dim">→</span> ./hire --freelance
          </button>
          <button
            onClick={() => {
              setOpen(false);
              showResume();
            }}
            style={{ ["--i" as string]: SECTIONS.length + 1 }}
          >
            <span className="t-dim">↗</span> cat resume.pdf
          </button>
        </div>
      )}

      <div className="t-bar-progress" style={{ transform: `scaleX(${progress})` }} />
    </header>
  );
}
