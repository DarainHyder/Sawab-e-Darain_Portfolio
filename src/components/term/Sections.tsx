import { useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import profileImage from "@/assets/sawabedararin.jpg";
import { ABOUT, CERTS, PROJECTS, REVIEWS, STACK, TOOLS, WORK } from "./data";
import { Scramble, hash7, useInView } from "./fx";
import { Out, Section } from "./Section";
import { COVERS } from "./Covers";

function ProjectCover({ p, lazy = true }: { p: (typeof PROJECTS)[number]; lazy?: boolean }) {
  if (p.cover) {
    const Cover = COVERS[p.cover];
    return <Cover />;
  }
  return <img src={p.image} alt={`${p.title}: live app`} loading={lazy ? "lazy" : undefined} />;
}

export function About() {
  return (
    <Section id="about" index="01" cmd="cat about.md" title="about" ext=".md">
      <div className="t-about">
        {/* lead runs full width so the two columns below balance */}
        <Out i={0} as="p" className="t-lead-p">{ABOUT.intro}</Out>
        <div className="t-about-cols">
          <div className="t-about-text">
            {ABOUT.blocks.map(([heading, text], i) => (
              <Out key={heading} i={i + 1}>
                <h3 className="t-h3"><span className="t-faint">## </span>{heading}</h3>
                <p className="t-p">{text}</p>
              </Out>
            ))}
            <Out i={ABOUT.blocks.length + 1} className="t-comment">
              <span className="t-faint">/*</span>
              <p>
                {ABOUT.quote[0]}
                <span className="t-acc">{ABOUT.quote[1]}</span>
                {ABOUT.quote[2]}
              </p>
              <span className="t-faint">*/</span>
            </Out>
          </div>

          <div className="t-about-side">
            <Out i={1} className="t-window">
              <div className="t-window-bar">
                <span className="t-dots" aria-hidden><i /><i /><i /></span>
                <span className="t-dim">darain.jpg</span>
              </div>
              <div className="t-photo">
                <img src={profileImage} alt="Darain Hyder" loading="lazy" />
              </div>
            </Out>
            <Out i={2} className="t-json" as="div">
              <div><span className="t-dim">{"{"}</span></div>
              {ABOUT.meta.map(([k, v], i) => (
                <div key={k} className="t-json-row">
                  <span className="t-key">"{k}"</span>
                  <span className="t-dim">: </span>
                  <span className="t-str">{v}</span>
                  {i < ABOUT.meta.length - 1 && <span className="t-dim">,</span>}
                </div>
              ))}
              <div><span className="t-dim">{"}"}</span></div>
            </Out>
          </div>
        </div>
      </div>
    </Section>
  );
}

const BAR = 20;
export function Stack() {
  return (
    <Section id="stack" index="02" cmd="tree ~/stack --level" title="stack" ext="/">
      <div className="t-stack">
        {STACK.map((g, gi) => (
          <Out key={g.group} i={gi} className="t-stack-group">
            <div className="t-stack-dir">
              <span className="t-acc">▸</span> {g.group}/
            </div>
            <ul>
              {g.items.map((s, si) => {
                const filled = Math.round((s.level / 100) * BAR);
                return (
                  <li key={s.name}>
                    <span className="t-faint">{si === g.items.length - 1 ? "└── " : "├── "}</span>
                    <span className="t-stack-name">{s.name}</span>
                    <span className="t-bar-track" aria-hidden>
                      <span className="t-faint">{"░".repeat(BAR)}</span>
                      <span className="t-bar-fill" style={{ ["--d" as string]: `${gi * 120 + si * 60}ms` }}>
                        {"█".repeat(filled)}
                      </span>
                    </span>
                    <span className="t-stack-lvl">{s.level}</span>
                  </li>
                );
              })}
            </ul>
          </Out>
        ))}
      </div>
      <Out i={4} className="t-tools">
        <span className="t-dim">also:</span>
        {TOOLS.map((t) => (
          <span key={t} className="t-tag">{t}</span>
        ))}
      </Out>
    </Section>
  );
}

export function Work() {
  return (
    <Section id="work" index="03" cmd="git log --graph experience" title="work" ext=".log">
      <ol className="t-log">
        {WORK.map((w, i) => (
          <Out key={w.role + w.company} i={i} as="li" className="t-log-item">
            <div className="t-log-graph" aria-hidden>
              <span className="t-log-dot">*</span>
            </div>
            <div className="t-log-body">
              <div className="t-log-meta">
                <span className="t-hash">{hash7(w.role + w.company + w.period)}</span>
                {i === 0 && <span className="t-headref">(HEAD → {"current" in w && w.current ? "current" : "latest"})</span>}
                <span className="t-dim">{w.period}</span>
                {"current" in w && w.current ? (
                  <span className="t-live">
                    <i aria-hidden /> now
                  </span>
                ) : (
                  <span className="t-faint">· {w.duration}</span>
                )}
              </div>
              <h3 className="t-log-title">
                {w.role} <span className="t-dim">@</span> <span className="t-acc">{w.company}</span>
              </h3>
              <div className="t-faint t-log-loc">{w.location}</div>
              <p className="t-p">{w.description}</p>
            </div>
          </Out>
        ))}
      </ol>
    </Section>
  );
}

export function Projects() {
  const [open, setOpen] = useState<number | null>(0);
  const [hover, setHover] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  // the cursor preview is portaled to <body>, which only exists in the browser
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const onMove = (e: MouseEvent) => {
    const el = previewRef.current;
    if (el) el.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 90}px)`;
  };

  return (
    <Section id="projects" index="04" cmd="ls -la ./projects" title="projects" ext="/">
      <Out i={0} className="t-ls-head">
        <span className="t-faint">total {PROJECTS.length}</span>
      </Out>
      <ul className="t-ls" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        {PROJECTS.map((p, i) => {
          const isOpen = open === i;
          return (
            <Out key={p.slug} i={i + 1} as="li" className={`t-ls-item ${isOpen ? "is-open" : ""}`}>
              <button
                className="t-ls-row"
                onClick={() => setOpen(isOpen ? null : i)}
                onMouseEnter={() => setHover(i)}
                aria-expanded={isOpen}
              >
                <span className="t-faint t-perm">drwxr-xr-x</span>
                <span className="t-dim">{String(i + 1).padStart(2, "0")}</span>
                <span className="t-ls-name">{p.slug}/</span>
                <span className="t-ls-tech t-faint">{p.tech.slice(0, 3).join(" · ")}</span>
                <span className="t-ls-toggle t-dim">{isOpen ? "−" : "+"}</span>
              </button>
              <div className="t-ls-detail">
                <div className="t-ls-detail-inner">
                  <div className="t-ls-grid">
                    <div>
                      <h3 className="t-ls-title">{p.title}</h3>
                      <p className="t-p">{p.description}</p>
                      <div className="t-tags">
                        {p.tech.map((t) => (
                          <span key={t} className="t-tag">{t}</span>
                        ))}
                      </div>
                      <div className="t-actions">
                        <a href={p.live} target="_blank" rel="noopener noreferrer" className="t-btn is-primary">
                          ./run live ↗
                        </a>
                        <a href={p.code} target="_blank" rel="noopener noreferrer" className="t-btn">
                          git clone ↗
                        </a>
                      </div>
                    </div>
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="t-shot" tabIndex={-1}>
                      <span className="t-shot-bar" aria-hidden>
                        <span className="t-dots">
                          <i />
                          <i />
                          <i />
                        </span>
                        <span className="t-shot-url">{p.live.replace(/^https:\/\/|\/$/g, "")}</span>
                      </span>
                      <span className="t-shot-img">
                        {isOpen && <ProjectCover p={p} />}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </Out>
          );
        })}
      </ul>
      <Out i={PROJECTS.length + 1} className="t-more">
        <a href="https://github.com/DarainHyder" target="_blank" rel="noopener noreferrer" className="t-link">
          more on github.com/DarainHyder ↗
        </a>
      </Out>

      {/* portaled: the section's scroll transform would otherwise trap position:fixed */}
      {mounted &&
        createPortal(
          <div ref={previewRef} className={`t-preview ${hover !== null && hover !== open ? "is-on" : ""}`} aria-hidden>
            {PROJECTS.map((p, i) => (
              <div key={p.slug} className={`t-preview-item ${hover === i ? "is-on" : ""}`}>
                <ProjectCover p={p} lazy={false} />
              </div>
            ))}
          </div>,
          document.body
        )}
    </Section>
  );
}

export function Reviews() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  useEffect(() => {
    if (!inView || paused) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % REVIEWS.length), 7000);
    return () => clearTimeout(t);
  }, [idx, inView, paused]);

  const r = REVIEWS[idx];
  return (
    <Section id="reviews" index="05" cmd="tail -f reviews.log" title="reviews" ext=".log">
      <div ref={ref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <Out i={0} className="t-review">
          <div className="t-review-meta">
            <span className="t-ok">[info]</span>
            <span className="t-dim">project=</span>
            <span>{r.project}</span>
            <span className="t-dim">rating=</span>
            <span className="t-acc">★★★★★</span>
          </div>
          <blockquote className="t-review-text">
            <span className="t-faint">“</span>
            <Scramble key={idx} text={r.text} active={inView} duration={900} />
            <span className="t-faint">”</span>
          </blockquote>
          <div className="t-review-who">
            <span className="t-faint">-- </span>
            {r.name}
            <span className="t-dim"> · {r.role}</span>
          </div>
        </Out>
        <Out i={1} className="t-review-nav">
          <button onClick={() => setIdx((i) => (i - 1 + REVIEWS.length) % REVIEWS.length)} aria-label="Previous review">
            ← prev
          </button>
          <span className="t-review-dots">
            {REVIEWS.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className={i === idx ? "is-on" : ""} aria-label={`Review ${i + 1}`} />
            ))}
          </span>
          <button onClick={() => setIdx((i) => (i + 1) % REVIEWS.length)} aria-label="Next review">
            next →
          </button>
        </Out>
        <Out i={2} className="t-stats">
          {[
            ["satisfaction", "100%"],
            ["projects", "8+"],
            ["avg_rating", "5.0"],
            ["industries", "3+"],
          ].map(([k, v]) => (
            <div key={k}>
              <span className="t-stat-v">{v}</span>
              <span className="t-dim">{k}</span>
            </div>
          ))}
        </Out>
      </div>
    </Section>
  );
}

export function Certs() {
  return (
    <Section id="certs" index="06" cmd="ls ./certs --sort=level" title="certs" ext="/">
      <div className="t-table">
        <Out i={0} className="t-tr t-th">
          <span>year</span>
          <span>title</span>
          <span className="t-hide-sm">issuer</span>
          <span className="t-hide-sm">level</span>
          <span />
        </Out>
        {CERTS.map((c, i) => (
          <Out key={c.title} i={i + 1} className="t-tr">
            <span className="t-dim">{c.year}</span>
            <span className="t-cert-title">
              {c.title}
              <span className="t-cert-skills t-faint">{c.skills.join(" · ")}</span>
            </span>
            <span className="t-dim t-hide-sm">{c.issuer}</span>
            <span className={`t-hide-sm ${c.level === "advanced" ? "t-acc" : "t-dim"}`}>{c.level}</span>
            <span className="t-right">
              {c.url ? (
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="t-link">
                  verify ↗
                </a>
              ) : (
                <span className="t-faint">-</span>
              )}
            </span>
          </Out>
        ))}
      </div>
    </Section>
  );
}
