import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { LINKS, PROJECTS, SECTIONS } from "./data";
import { Scramble, clamp01, prefersReducedMotion, setVar, useScrollFx } from "./fx";
import { useGo } from "./Transition";
import { useResume } from "./Resume";

const BOOT: ReactNode[] = [
  <>booting <b>darain.sh</b> <span className="t-dim">v2026.09</span></>,
  <><span className="t-ok">[ ok ]</span> loading models <span className="t-faint">.......</span> pytorch · sklearn · hf</>,
  <><span className="t-ok">[ ok ]</span> mounting /projects <span className="t-faint">...</span> {PROJECTS.length} found</>,
  <><span className="t-ok">[ ok ]</span> status <span className="t-faint">...............</span> available for work</>,
];

const COMMANDS: Record<string, string> = {
  help: "list commands",
  about: "who i am",
  stack: "tools & skills",
  work: "experience",
  projects: "things i've built",
  reviews: "what people say",
  certs: "certifications",
  contact: "get in touch",
  resume: "view my resume",
  github: "open github",
  linkedin: "open linkedin",
  clear: "clear the screen",
};

type Line = { kind: "in" | "out" | "err"; text: ReactNode };

export function Hero() {
  const go = useGo();
  const showResume = useResume();
  const [booted, setBooted] = useState(0);
  const [value, setValue] = useState("");
  const [lines, setLines] = useState<Line[]>([]);
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // leaving the landing page: the name shatters and the rest drifts back
  useScrollFx(() => {
    const el = heroRef.current;
    if (!el) return;
    const vh = window.innerHeight;
    setVar(el, "--x", clamp01((vh * 0.9 - el.getBoundingClientRect().bottom) / (vh * 0.6)));
  });

  useEffect(() => {
    if (booted >= BOOT.length) return;
    if (prefersReducedMotion()) return setBooted(BOOT.length);
    const t = setTimeout(() => setBooted((b) => b + 1), booted === 0 ? 250 : 170);
    return () => clearTimeout(t);
  }, [booted]);
  const ready = booted >= BOOT.length;

  // "/" focuses the prompt from anywhere
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "/" || (e.target as HTMLElement)?.closest("input, textarea")) return;
      e.preventDefault();
      inputRef.current?.focus({ preventScroll: true });
      if (window.scrollY > window.innerHeight * 0.6) go("top");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase().replace(/^(cd\s+(\.\/)?|\.\/)/, "");
    const echo: Line = { kind: "in", text: raw };
    const print = (...out: Line[]) => setLines((l) => [...l, echo, ...out].slice(-8));
    if (!cmd) return print();
    if (raw.trim()) setHist((h) => [raw, ...h].slice(0, 20));

    if (cmd === "clear") return setLines([]);
    if (cmd === "help" || cmd === "ls") {
      return print({
        kind: "out",
        text: (
          <span className="t-help">
            {Object.entries(COMMANDS).map(([k, v]) => (
              <span key={k}>
                <button className="t-link" onClick={() => run(k)}>{k}</button>
                <span className="t-dim"> {v}</span>
              </span>
            ))}
          </span>
        ),
      });
    }
    if (cmd === "whoami") return print({ kind: "out", text: "syed darain hyder kazmi · ai/ml engineer · islamabad" });
    if (cmd.startsWith("sudo")) return print({ kind: "err", text: "nice try. permission denied." });
    if (cmd === "resume" || cmd === "cat resume.pdf" || cmd === "resume.pdf") {
      showResume();
      return print({ kind: "out", text: "opening resume.pdf …" });
    }
    const ext: Record<string, string> = { github: LINKS.github, linkedin: LINKS.linkedin };
    if (ext[cmd]) {
      window.open(ext[cmd], "_blank", "noopener");
      return print({ kind: "out", text: `opening ${cmd} ↗` });
    }
    if (cmd === "email" || cmd === "mail") {
      window.location.href = `mailto:${LINKS.email}`;
      return print({ kind: "out", text: `mailto:${LINKS.email}` });
    }
    if (SECTIONS.some((s) => s.id === cmd)) {
      print({ kind: "out", text: `cd ./${cmd}` });
      const r = inputRef.current?.getBoundingClientRect();
      setTimeout(() => go(cmd, r ? { x: r.left + 40, y: r.top + r.height / 2 } : undefined), 120);
      return;
    }
    print({ kind: "err", text: <>command not found: {cmd}. try <button className="t-link" onClick={() => run("help")}>help</button></> });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(value);
      setValue("");
      setHi(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const n = Math.min(hi + 1, hist.length - 1);
      if (n >= 0) {
        setHi(n);
        setValue(hist[n]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const n = hi - 1;
      setHi(n);
      setValue(n >= 0 ? hist[n] : "");
    } else if (e.key === "Tab") {
      const match = Object.keys(COMMANDS).find((k) => value && k.startsWith(value.toLowerCase()));
      if (match) {
        e.preventDefault();
        setValue(match);
      }
    }
  };

  const suggestion = value ? Object.keys(COMMANDS).find((k) => k.startsWith(value.toLowerCase()) && k !== value.toLowerCase()) : undefined;

  return (
    <section className="t-hero" id="top" ref={heroRef}>
      <div className="t-hero-inner">
        <div className="t-boot" aria-hidden>
          {BOOT.slice(0, booted).map((l, i) => (
            <div key={i} className="t-boot-line">{l}</div>
          ))}
        </div>

        <div className={`t-hero-main ${ready ? "is-ready" : ""}`}>
          <div className="t-prompt">
            <span className="t-path">~</span>
            <span className="t-acc"> $ </span>whoami
          </div>
          <h1 className="t-name">
            <Scramble text="Darain Hyder" active={ready} duration={900} split={1.7} />
            <span className="t-name-caret" aria-hidden />
          </h1>
          <p className="t-lede">
            <span className="t-acc">AI/ML engineer</span> who trains models and writes the software that ships them.
            <br className="hidden sm:block" /> Pipelines, APIs and data systems from Islamabad.
          </p>

          <div className="t-shell" onClick={() => inputRef.current?.focus()}>
            {lines.map((l, i) => (
              <div key={i} className={`t-shell-line is-${l.kind}`}>
                {l.kind === "in" ? (
                  <>
                    <span className="t-ok">guest</span>
                    <span className="t-dim">@darain</span>
                    <span className="t-acc"> $ </span>
                    {l.text}
                  </>
                ) : (
                  l.text
                )}
              </div>
            ))}
            <label className="t-shell-input">
              <span className="t-ok">guest</span>
              <span className="t-dim">@darain</span>
              <span className="t-acc"> $ </span>
              <span className="t-shell-field">
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  aria-label="Terminal command"
                  placeholder="type help"
                />
                {suggestion && (
                  <span className="t-ghost" aria-hidden>
                    <span style={{ visibility: "hidden" }}>{value}</span>
                    {suggestion.slice(value.length)}
                  </span>
                )}
              </span>
            </label>
          </div>

          <div className="t-quick">
            <button className="t-btn is-primary t-resume-cta" onClick={showResume}>
              <span className="t-resume-cta-icon" aria-hidden>▤</span> view resume
            </button>
            {["projects", "work", "contact"].map((k) => (
              <button key={k} onClick={() => run(k)}>
                ./{k}
              </button>
            ))}
            <span className="t-faint t-hint">press <kbd>/</kbd> to type</span>
          </div>
        </div>
      </div>

      <button className="t-scroll" onClick={(e) => go("about", { x: e.clientX, y: e.clientY })}>
        <span className="t-dim">scroll</span> ↓
      </button>
    </section>
  );
}
