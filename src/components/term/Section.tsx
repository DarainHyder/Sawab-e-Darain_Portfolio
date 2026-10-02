import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Shatter, Typed, clamp01, setVar, smoothstep, useInView, useScrollFx, useShardSeeds } from "./fx";

const RUN = 56;

/** `── 02 / stack ──` rule whose shards assemble around mid-screen and explode near the edges. */
function Divider({ index, label }: { index: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const seeds = useShardSeeds(RUN * 2, 0.8, label);

  useScrollFx(() => {
    const el = ref.current;
    if (!el) return;
    const vh = window.innerHeight;
    const r = el.getBoundingClientRect();
    const c = r.top + r.height / 2;
    const pivot = vh * 0.55;
    // assembling on the way up from the bottom, exploding as it leaves the top
    const s = c > pivot ? smoothstep(0.3, 1, (c - pivot) / (vh - pivot)) : smoothstep(0.72, 1.05, (pivot - c) / pivot);
    setVar(el, "--s", s);
  });

  const run = (from: number) =>
    seeds.slice(from, from + RUN).map((st, i) => (
      <span key={i} className="sh-i t-div-shard" style={st} />
    ));

  return (
    <div ref={ref} className="t-div" aria-hidden>
      <span className="t-div-run is-l">{run(0)}</span>
      <span className="t-div-label">
        <span className="t-acc">{index}</span> / {label}
      </span>
      <span className="t-div-run is-r">{run(RUN)}</span>
    </div>
  );
}

/** A section rendered as one shell session: typed command, assembling title, staggered output. */
export function Section({
  id,
  index,
  cmd,
  title,
  ext,
  children,
}: {
  id: string;
  index: string;
  cmd: string;
  title: string;
  ext?: string;
  children: ReactNode;
}) {
  const { ref, inView } = useInView<HTMLElement>(0.12);
  const [typed, setTyped] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useScrollFx(() => {
    const el = ref.current;
    const h = titleRef.current;
    if (!el || !h) return;
    const vh = window.innerHeight;
    // body recedes as the section's tail leaves; title shatters as it slides under the top bar
    setVar(el, "--x", clamp01((vh * 0.45 - el.getBoundingClientRect().bottom) / (vh * 0.35)));
    setVar(h, "--s", clamp01((110 - h.getBoundingClientRect().top) / 150));
  });

  return (
    <section id={id} ref={ref} className={`t-sec ${inView ? "is-in" : ""} ${typed ? "is-typed" : ""}`}>
      <Divider index={index} label={title} />
      <div className="t-sec-inner">
        <header className="t-sec-head">
          <div className="t-prompt">
            <span className="t-path">~/darain</span>
            <span className="t-acc"> $ </span>
            <Typed text={cmd} active={inView} speed={30} caret={!typed} onDone={() => setTyped(true)} />
          </div>
          <h2 className="t-title" ref={titleRef}>
            <span className="t-idx">{index}</span>
            <Shatter text={title} amp={0.9} />
            {ext && <span className="t-dim">{ext}</span>}
          </h2>
        </header>
        <div className="t-sec-body">{children}</div>
      </div>
    </section>
  );
}

/** Output line that fades/unblurs in after the section's command finishes typing. */
export function Out({
  i = 0,
  as: Tag = "div",
  className = "",
  style,
  children,
}: {
  i?: number;
  as?: "div" | "li" | "p" | "article";
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <Tag className={`rv ${className}`} style={{ ...style, ["--i" as string]: i }}>
      {children}
    </Tag>
  );
}
