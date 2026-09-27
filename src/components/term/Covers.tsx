import { useId, useMemo, type ReactNode } from "react";

/* Hand-built vector covers, drawn in the site palette (480×300 = 16:10). */

const BG = "#0e0e10";
const DOT = "#2b2b31";
const FAINT = "#3b3b40";
const DIM = "#86868d";
const FG = "#e9e7e2";
const ACC = "#ff5f4a";
const MONO = { fontFamily: '"JetBrains Mono", ui-monospace, monospace' };

const useSvgId = () => useId().replace(/:/g, "");

/** Deterministic PRNG so covers look identical on every render. */
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 480 300" className="t-cover" role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
      <rect width="480" height="300" fill={BG} />
      {children}
    </svg>
  );
}

/* ── adaptive e-learning: a learner's path adapting through a difficulty grid ── */
const COLS = 20;
const ROWS = 10;
const gx = (i: number) => 58 + i * 19;
const gy = (j: number) => 72 + j * 19;
const LEVELS = [9, 9, 8, 8, 7, 7, 6, 7, 8, 7, 6, 5, 5, 4, 4, 3, 3, 2, 1, 1];
const GHOSTS = [
  [9, 8, 8, 7, 6, 6, 5, 5, 4, 4, 3, 3, 3, 2, 2, 2, 1, 1, 0, 0],
  [9, 9, 9, 9, 8, 8, 8, 8, 7, 7, 7, 6, 6, 6, 6, 5, 5, 5, 5, 4],
];
const stair = (levels: number[]) =>
  levels.reduce((d, l, i) => (i === 0 ? `M${gx(0)},${gy(l)}` : `${d} H${gx(i)} V${gy(l)}`), "");

export function ELearningCover() {
  const dip = 6;
  const agents: [string, number, number][] = [
    ["planner", 118, 3],
    ["tutor", 240, dip],
    ["assessor", 362, 13],
  ];
  return (
    <Frame label="Adaptive learning path through a difficulty grid">
      {Array.from({ length: COLS * ROWS }, (_, k) => (
        <circle key={k} cx={gx(k % COLS)} cy={gy(Math.floor(k / COLS))} r="0.9" fill={DOT} />
      ))}
      {GHOSTS.map((g, i) => (
        <path key={i} d={stair(g)} fill="none" stroke={FAINT} strokeWidth="0.8" strokeDasharray="1.5 3" />
      ))}

      {agents.map(([name, x, col]) => (
        <g key={name}>
          <line x1={x} y1={38} x2={gx(col)} y2={gy(LEVELS[col])} stroke={FAINT} strokeWidth="0.6" strokeDasharray="1 2.5" />
          <circle cx={x} cy={34} r="3" fill={BG} stroke={DIM} strokeWidth="0.9" />
          <text x={x + 7} y={37} fontSize="8.5" fill={DIM} style={MONO}>
            {name}
          </text>
        </g>
      ))}

      <path d={stair(LEVELS)} fill="none" stroke={ACC} strokeWidth="1.6" className="cv-draw" pathLength={1} />
      {LEVELS.map((l, i) => (
        <rect key={i} x={gx(i) - 1.8} y={gy(l) - 1.8} width="3.6" height="3.6" fill={i === dip ? BG : ACC} stroke={ACC} strokeWidth="0.8" className="cv-pop" style={{ animationDelay: `${0.25 + i * 0.06}s` }} />
      ))}

      <text x={gx(dip) + 6} y={gy(LEVELS[dip]) + 14} fontSize="8" fill={ACC} style={MONO}>
        ↺ remediate
      </text>
      <circle cx={gx(COLS - 1)} cy={gy(1)} r="7" fill="none" stroke={ACC} strokeWidth="0.8" className="cv-pulse" />
      <text x={gx(COLS - 1) - 34} y={gy(1) - 12} fontSize="8" fill={FG} style={MONO}>
        mastery
      </text>

      <text x={30} y={gy(ROWS - 1)} fontSize="7.5" fill={FAINT} style={MONO} transform={`rotate(-90 30 ${gy(ROWS - 1)})`}>
        difficulty →
      </text>
      <text x={gx(0)} y={276} fontSize="8" fill={DIM} style={MONO}>
        π(state) → next_lesson
      </text>
      <text x={gx(COLS - 1)} y={276} fontSize="8" fill={FAINT} style={MONO} textAnchor="end">
        sessions →
      </text>
    </Frame>
  );
}

/* ── image quality assessment: one scene, crisp reference vs. compressed ── */
const IMG = { x: 40, y: 38, w: 400, h: 200 };
const HORIZON = 168;
const SUN = { x: 240, r: 58 };
const SPLIT = 240;
const mix = (a: number[], b: number[], t: number) => a.map((v, i) => v + (b[i] - v) * Math.max(0, Math.min(1, t)));
const reflectHalf = (y: number) => SUN.r - (y - HORIZON) * 0.55;

function scene(x: number, y: number) {
  if (y < HORIZON) {
    if (Math.hypot(x - SUN.x, y - HORIZON) < SUN.r) return mix([255, 95, 74], [255, 176, 150], (y - (HORIZON - SUN.r)) / SUN.r);
    return mix([22, 22, 26], [46, 28, 28], (y - IMG.y) / (HORIZON - IMG.y));
  }
  const d = y - HORIZON;
  if (Math.abs(x - SUN.x) < reflectHalf(y) && Math.floor(d / 5) % 2 === 0) return mix([16, 16, 19], [255, 95, 74], 0.75 * (1 - d / 70));
  return [16, 16, 19];
}

export function IQACover() {
  const id = useSvgId();
  const cells = useMemo(() => {
    const rand = rng(7);
    const s = 10;
    const out: { x: number; y: number; c: string }[] = [];
    for (let y = IMG.y; y < IMG.y + IMG.h; y += s) {
      for (let x = SPLIT; x < IMG.x + IMG.w; x += s) {
        // block-average the scene, then add luma noise and posterize — a heavily compressed JPEG
        const acc = [0, 0, 0];
        for (let sy = 0; sy < 4; sy++)
          for (let sx = 0; sx < 4; sx++) scene(x + (sx + 0.5) * (s / 4), y + (sy + 0.5) * (s / 4)).forEach((v, k) => (acc[k] += v / 16));
        const n = (rand() - 0.5) * 10;
        const [r, g, b] = acc.map((v) => Math.max(0, Math.min(255, Math.round((v + n) / 10) * 10)));
        out.push({ x, y, c: `rgb(${r},${g},${b})` });
      }
    }
    return out;
  }, []);

  const stripes = [];
  for (let d = 0; d < 70; d += 10) {
    const half = reflectHalf(HORIZON + d);
    if (half <= 0) break;
    stripes.push(<rect key={d} x={SUN.x - half} y={HORIZON + d} width={half * 2} height="5" fill={ACC} opacity={0.75 * (1 - d / 70)} />);
  }

  return (
    <Frame label="Image split into crisp reference and compressed halves with quality scores">
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#16161a" />
          <stop offset="1" stopColor="#2e1c1c" />
        </linearGradient>
        <linearGradient id={`${id}sun`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff5f4a" />
          <stop offset="1" stopColor="#ffb096" />
        </linearGradient>
        <clipPath id={`${id}left`}>
          <rect x={IMG.x} y={IMG.y} width={SPLIT - IMG.x} height={IMG.h} />
        </clipPath>
        <clipPath id={`${id}horizon`}>
          <rect x={IMG.x} y={IMG.y} width={IMG.w} height={HORIZON - IMG.y} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id}left)`}>
        <rect x={IMG.x} y={IMG.y} width={IMG.w} height={HORIZON - IMG.y} fill={`url(#${id}sky)`} />
        <rect x={IMG.x} y={HORIZON} width={IMG.w} height={IMG.y + IMG.h - HORIZON} fill="#101013" />
        <circle cx={SUN.x} cy={HORIZON} r={SUN.r} fill={`url(#${id}sun)`} clipPath={`url(#${id}horizon)`} />
        {stripes}
      </g>
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width="10.2" height="10.2" fill={c.c} />
      ))}
      <rect x={IMG.x} y={IMG.y} width={IMG.w} height={IMG.h} fill="none" stroke="#26262b" />

      <g className="cv-scan">
        <line x1={SPLIT} y1={IMG.y - 12} x2={SPLIT} y2={IMG.y + IMG.h + 12} stroke={FG} strokeWidth="0.9" />
        <path d={`M${SPLIT - 4},${IMG.y - 16} h8 l-4,5 z`} fill={FG} />
      </g>

      <text x={IMG.x} y={IMG.y - 10} fontSize="8" fill={DIM} style={MONO}>
        reference
      </text>
      <text x={IMG.x + IMG.w} y={IMG.y - 10} fontSize="8" fill={DIM} style={MONO} textAnchor="end">
        jpeg · q=6
      </text>
      <text x={IMG.x} y={262} fontSize="15" fontWeight="700" fill={FG} style={MONO}>
        0.91
      </text>
      <text x={IMG.x + 42} y={262} fontSize="8" fill={DIM} style={MONO}>
        mos 4.6
      </text>
      <text x={IMG.x + IMG.w} y={262} fontSize="15" fontWeight="700" fill={ACC} style={MONO} textAnchor="end">
        0.27
      </text>
      <text x={IMG.x + IMG.w - 42} y={262} fontSize="8" fill={DIM} style={MONO} textAnchor="end">
        mos 1.4
      </text>
      <text x={SPLIT} y={282} fontSize="7.5" fill={FAINT} style={MONO} textAnchor="middle">
        cnn features → blind quality score
      </text>
    </Frame>
  );
}

/* ── biomed research helper: semantic search in an embedding space ── */
export function BioMedCover() {
  const { points, query, hits } = useMemo(() => {
    const rand = rng(42);
    const gauss = () => Math.sqrt(-2 * Math.log(rand() || 1e-9)) * Math.cos(2 * Math.PI * rand());
    const clusters = [
      { x: 140, y: 118, s: 30, n: 70 },
      { x: 318, y: 96, s: 26, n: 60 },
      { x: 250, y: 208, s: 34, n: 70 },
      { x: 400, y: 214, s: 20, n: 25 },
    ];
    const pts: { x: number; y: number }[] = [];
    clusters.forEach((c) => {
      for (let i = 0; i < c.n; i++) pts.push({ x: c.x + gauss() * c.s, y: c.y + gauss() * c.s * 0.8 });
    });
    for (let i = 0; i < 30; i++) pts.push({ x: 40 + rand() * 400, y: 40 + rand() * 200 });
    const inside = pts.filter((p) => p.x > 24 && p.x < 456 && p.y > 28 && p.y < 250);
    const q = { x: 300, y: 138 };
    // nearest neighbour in each of six directions, so the rays fan out legibly
    const ranked = Array.from({ length: 6 }, (_, k) =>
      inside
        .map((p) => ({ ...p, d: Math.hypot(p.x - q.x, p.y - q.y), a: Math.atan2(p.y - q.y, p.x - q.x) + Math.PI }))
        .filter((p) => p.d > 26 && Math.floor(p.a / (Math.PI / 3)) % 6 === k)
        .sort((a, b) => a.d - b.d)[0]
    )
      .filter(Boolean)
      .sort((a, b) => a.d - b.d);
    return { points: inside, query: q, hits: ranked };
  }, []);

  const labels: [string, number, number][] = [
    ["oncology", 92, 68],
    ["neuroscience", 300, 52],
    ["cardiology", 200, 262],
    ["genomics", 392, 250],
  ];

  return (
    <Frame label="Query point retrieving nearest papers in an embedding space">
      <circle cx={query.x} cy={query.y} r="44" fill="none" stroke={FAINT} strokeWidth="0.6" strokeDasharray="1.5 3" />
      <circle cx={query.x} cy={query.y} r="82" fill="none" stroke="#26262b" strokeWidth="0.6" strokeDasharray="1.5 3" />

      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="1.15" fill={FAINT} />
      ))}
      {labels.map(([t, x, y]) => (
        <text key={t} x={x} y={y} fontSize="7.5" fill={FAINT} style={MONO}>
          {t}
        </text>
      ))}

      {hits.map((h, i) => (
        <g key={i}>
          <line x1={query.x} y1={query.y} x2={h.x} y2={h.y} stroke={ACC} strokeWidth="0.7" opacity={1 - i * 0.12} className="cv-draw" pathLength={1} style={{ animationDelay: `${0.2 + i * 0.08}s` }} />
          <circle cx={h.x} cy={h.y} r="2.2" fill={ACC} opacity={1 - i * 0.1} />
        </g>
      ))}
      {hits.slice(0, 3).map((h, i) => (
        <text key={i} x={h.x + (h.x >= query.x ? 5 : -5)} y={h.y + 3} fontSize="7" fill={DIM} style={MONO} textAnchor={h.x >= query.x ? "start" : "end"}>
          {(0.94 - i * 0.04).toFixed(2)}
        </text>
      ))}

      <circle cx={query.x} cy={query.y} r="10" fill="none" stroke={ACC} strokeWidth="0.8" className="cv-pulse" />
      <circle cx={query.x} cy={query.y} r="3.4" fill={FG} />

      <text x={40} y={276} fontSize="8.5" fill={FG} style={MONO}>
        <tspan fill={ACC}>q</tspan> "tau aggregation in alzheimer's"
      </text>
      <text x={440} y={276} fontSize="7.5" fill={FAINT} style={MONO} textAnchor="end">
        cosine · k=6
      </text>
    </Frame>
  );
}

export const COVERS = {
  elearning: ELearningCover,
  iqa: IQACover,
  biomed: BioMedCover,
};
export type CoverKey = keyof typeof COVERS;
