import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

export const GLYPHS = "!<>-_\\/[]{}=+*^?#01%&$@~;:";
const randGlyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Fires once when the element scrolls into view. */
export function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/** Decodes `text` from random glyphs, left to right. Re-runs whenever `text` changes while active. */
export function Scramble({
  text,
  active = true,
  duration = 700,
  delay = 0,
  split = 0,
  className,
}: {
  text: string;
  active?: boolean;
  duration?: number;
  delay?: number;
  /** >0 renders each char as a shard that can explode (amplitude multiplier) */
  split?: number;
  className?: string;
}) {
  const seeds = useShardSeeds(text.length, split || 1);
  const [out, setOut] = useState(() => (active && !prefersReducedMotion() ? "" : text));

  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) {
      setOut(text);
      return;
    }
    const chars = [...text];
    // each char locks in at its own time; a little jitter makes the decode feel organic
    const lockAt = chars.map((_, i) => (i / chars.length) * duration * 0.75 + Math.random() * duration * 0.25);
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = now - start - delay;
      if (t < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      let done = true;
      const s = chars
        .map((c, i) => {
          if (c === " ") return " ";
          if (t >= lockAt[i]) return c;
          done = false;
          return t > lockAt[i] - 260 ? randGlyph() : " ";
        })
        .join("");
      setOut(s);
      if (!done) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, active, duration, delay]);

  if (split) {
    const chars = [...out];
    return (
      <span className={className} aria-label={text}>
        {[...text].map((c, i) => (
          <span key={i} aria-hidden className="sh-i" style={seeds[i]}>
            {c === " " ? "\u00a0" : chars[i] ?? "\u00a0"}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  );
}

/** Random flight vectors (as CSS vars) for each shard of an exploding string. */
export function useShardSeeds(n: number, amp = 1) {
  return useMemo(
    () =>
      Array.from({ length: n }, (_, k) => {
        const a = Math.random() * Math.PI * 2;
        const d = (0.5 + Math.random() * 0.8) * amp;
        return {
          "--dx": `${Math.cos(a) * 140 * d}px`,
          "--dy": `${Math.sin(a) * 90 * d - 20 * amp}px`,
          "--r": `${(Math.random() - 0.5) * 120}deg`,
          "--k": k,
        } as CSSProperties;
      }),
    [n, amp]
  );
}

/** Text whose characters fly in to assemble on entry and scatter by the parent's `--s` (0..1). */
export function Shatter({ text, amp = 1, className }: { text: string; amp?: number; className?: string }) {
  const seeds = useShardSeeds(text.length, amp);
  return (
    <span className={className} aria-label={text}>
      {[...text].map((c, i) => (
        <span key={i} aria-hidden className="sh-o" style={seeds[i]}>
          <span className="sh-i">{c === " " ? "\u00a0" : c}</span>
        </span>
      ))}
    </span>
  );
}

/* One shared rAF-throttled scroll loop that drives every scroll-linked effect. */
const jobs = new Set<() => void>();
let frame = 0;
const flush = () => {
  frame = 0;
  jobs.forEach((j) => j());
};
const schedule = () => {
  if (!frame) frame = requestAnimationFrame(flush);
};

/** Runs `fn` on every scroll/resize frame (skipped for reduced motion). */
export function useScrollFx(fn: () => void) {
  const ref = useRef(fn);
  ref.current = fn;
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const job = () => ref.current();
    if (jobs.size === 0) {
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
    }
    jobs.add(job);
    schedule();
    return () => {
      jobs.delete(job);
      if (jobs.size === 0) {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
      }
    };
  }, []);
}

export const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
export const smoothstep = (a: number, b: number, t: number) => {
  const x = clamp01((t - a) / (b - a));
  return x * x * (3 - 2 * x);
};

/** Sets a CSS custom property only when the rounded value changed. */
export function setVar(el: HTMLElement | null, name: string, v: number) {
  if (!el) return;
  const s = v.toFixed(3);
  if (el.style.getPropertyValue(name) !== s) el.style.setProperty(name, s);
}

/** Types `text` out character by character, then calls onDone. */
export function Typed({
  text,
  active = true,
  speed = 34,
  delay = 0,
  caret = false,
  onDone,
  className,
}: {
  text: string;
  active?: boolean;
  speed?: number;
  delay?: number;
  caret?: boolean;
  onDone?: () => void;
  className?: string;
}) {
  const [n, setN] = useState(() => (prefersReducedMotion() ? text.length : 0));
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) {
      setN(text.length);
      doneRef.current?.();
      return;
    }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      i++;
      setN(i);
      if (i < text.length) timer = setTimeout(step, speed * (0.6 + Math.random() * 0.8));
      else doneRef.current?.();
    };
    timer = setTimeout(step, delay);
    return () => clearTimeout(timer);
  }, [text, active, speed, delay]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{text.slice(0, n)}</span>
      {caret && <span className="caret" aria-hidden />}
    </span>
  );
}

/** Stable pseudo commit hash for a string. */
export function hash7(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}
