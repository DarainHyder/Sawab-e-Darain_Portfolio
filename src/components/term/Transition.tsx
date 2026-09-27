import { createContext, useCallback, useContext, useRef, type ReactNode } from "react";
import { GLYPHS, prefersReducedMotion } from "./fx";

type Origin = { x: number; y: number };
type Go = (id: string, origin?: Origin) => void;

const TransitionCtx = createContext<Go>(() => {});
export const useGo = () => useContext(TransitionCtx);

const NAV_OFFSET = 56;
const IN_MS = 420;
const HOLD_MS = 140;
const OUT_MS = 720;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInQuad = (t: number) => t * t;
const clamp01 = (t: number) => Math.max(0, Math.min(1, t));

function scrollToId(id: string, smooth: boolean) {
  const top = id === "top" ? 0 : (document.getElementById(id)?.getBoundingClientRect().top ?? 0) + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: smooth ? "smooth" : ("instant" as ScrollBehavior) });
}

/**
 * Section-to-section transition: a field of glyph cells floods the screen from the
 * click point, the page jumps underneath, then the cells explode outward to reveal it.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const running = useRef(false);

  const go = useCallback<Go>((id, origin) => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion()) {
      scrollToId(id, true);
      return;
    }
    if (running.current) return;
    running.current = true;

    const css = getComputedStyle(document.documentElement);
    const color = (v: string) => css.getPropertyValue(v).trim();
    const BG = color("--t-bg");
    const DIM = color("--t-faint");
    const FG = color("--t-fg");
    const ACC = color("--t-accent");

    const W = window.innerWidth;
    const H = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.display = "block";
    const ctx = canvas.getContext("2d")!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cw = W < 640 ? 12 : 14;
    const ch = W < 640 ? 18 : 20;
    const cols = Math.ceil(W / cw);
    const rows = Math.ceil(H / ch);
    const o = origin ?? { x: W / 2, y: H / 2 };
    const maxD = Math.hypot(Math.max(o.x, W - o.x), Math.max(o.y, H - o.y));
    const center = { x: W / 2, y: H / 2 };
    const maxC = Math.hypot(W / 2, H / 2);

    type Cell = { x: number; y: number; d: number; dc: number; g: string; vx: number; vy: number; hasGlyph: boolean };
    const cells: Cell[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * cw;
        const y = r * ch;
        const dx = x + cw / 2 - center.x;
        const dy = y + ch / 2 - center.y;
        const len = Math.hypot(dx, dy) || 1;
        const speed = 180 + Math.random() * 720;
        cells.push({
          x,
          y,
          d: clamp01(Math.hypot(x - o.x, y - o.y) / maxD * 0.82 + Math.random() * 0.18),
          dc: len / maxC,
          g: GLYPHS[(Math.random() * GLYPHS.length) | 0],
          vx: (dx / len) * speed + (Math.random() - 0.5) * 160,
          vy: (dy / len) * speed + (Math.random() - 0.5) * 160 + 120,
          hasGlyph: Math.random() < 0.5,
        });
      }
    }

    const label = `cd ./${id === "top" ? "~" : id}`;
    ctx.font = `500 ${W < 640 ? 11 : 12}px "JetBrains Mono", ui-monospace, monospace`;
    ctx.textBaseline = "top";
    const labelFont = `500 ${W < 640 ? 14 : 16}px "JetBrains Mono", ui-monospace, monospace`;

    let start = 0;
    let jumped = false;

    const frame = (now: number) => {
      if (!start) start = now;
      const t = now - start;
      ctx.clearRect(0, 0, W, H);

      if (t < IN_MS + HOLD_MS) {
        // flood in
        const p = clamp01(t / IN_MS);
        for (const cell of cells) {
          if (p < cell.d) continue;
          const fresh = p - cell.d < 0.12;
          ctx.fillStyle = BG;
          ctx.fillRect(cell.x, cell.y, cw + 0.5, ch + 0.5);
          if (fresh || cell.hasGlyph) {
            if (fresh && Math.random() < 0.5) cell.g = GLYPHS[(Math.random() * GLYPHS.length) | 0];
            ctx.fillStyle = fresh ? ACC : DIM;
            ctx.fillText(cell.g, cell.x + 2, cell.y + 3);
          }
        }
        if (p >= 1) {
          if (!jumped) {
            jumped = true;
            scrollToId(id, false);
          }
          drawLabel(ctx, label, labelFont, W, H, BG, FG, ACC, clamp01((t - IN_MS) / HOLD_MS));
        }
      } else {
        // explode out, center first
        const p = (t - IN_MS - HOLD_MS) / OUT_MS;
        let alive = false;
        for (const cell of cells) {
          const local = clamp01((p - cell.dc * 0.35) / 0.65);
          if (local >= 1) continue;
          alive = true;
          const e = easeOutCubic(local);
          const s = 1 - 0.7 * e;
          ctx.globalAlpha = 1 - easeInQuad(local);
          const x = cell.x + cell.vx * e * 0.55;
          const y = cell.y + cell.vy * e * 0.55;
          ctx.fillStyle = BG;
          ctx.fillRect(x, y, (cw + 0.5) * s, (ch + 0.5) * s);
          if (cell.hasGlyph && local < 0.6) {
            ctx.fillStyle = local < 0.08 ? ACC : DIM;
            ctx.fillText(cell.g, x + 2, y + 3);
          }
        }
        ctx.globalAlpha = 1;
        if (p < 0.25) drawLabel(ctx, label, labelFont, W, H, BG, FG, ACC, 1 - p / 0.25);
        if (!alive || p >= 1) {
          ctx.clearRect(0, 0, W, H);
          canvas.style.display = "none";
          running.current = false;
          return;
        }
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, []);

  return (
    <TransitionCtx.Provider value={go}>
      {children}
      <canvas ref={canvasRef} className="t-explode" aria-hidden />
    </TransitionCtx.Provider>
  );
}

function drawLabel(
  ctx: CanvasRenderingContext2D,
  text: string,
  font: string,
  W: number,
  H: number,
  bg: string,
  fg: string,
  acc: string,
  alpha: number
) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = font;
  const full = `$ ${text}`;
  const w = ctx.measureText(full).width;
  const x = (W - w) / 2;
  const y = H / 2 - 12;
  ctx.fillStyle = bg;
  ctx.fillRect(x - 20, y - 12, w + 52, 44);
  ctx.fillStyle = acc;
  ctx.fillText("$", x, y);
  ctx.fillStyle = fg;
  ctx.fillText(text, x + ctx.measureText("$ ").width, y);
  ctx.fillStyle = acc;
  ctx.fillRect(x + w + 6, y - 1, 9, 20);
  ctx.restore();
}
