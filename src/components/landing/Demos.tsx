import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const Molecule = lazy(() => import("./Molecule"));

export function DemoCard({ tag, title, className = "", children }: { tag: string; title: string; className?: string; children: ReactNode }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className={`card-ink flex flex-col p-5 ${className}`}
    >
      <span className="font-mono text-xs uppercase tracking-wider text-tomato">{tag}</span>
      <h3 className="mt-1 text-2xl font-semibold">{title}</h3>
      <div className="mt-4 flex-1">{children}</div>
    </motion.article>
  );
}

/* ---------- Flashcards ---------- */
const cards = [
  { q: "What does a mitochondrion do?", a: "Turns glucose and oxygen into ATP — the cell's usable energy." },
  { q: "Newton's 3rd law, in one line?", a: "Every push gets pushed back equally, in the opposite direction." },
  { q: "Why is the sky blue?", a: "Air scatters short (blue) wavelengths of sunlight much more than red ones." },
];
export function Flashcards() {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();
  const c = cards[i];
  return (
    <div>
      <div className="relative h-44 [perspective:900px]">
        <AnimatePresence mode="wait">
          <motion.button
            key={i}
            initial={{ x: 60, opacity: 0, rotate: 3 }}
            animate={{ x: 0, opacity: 1, rotate: -1 }}
            exit={{ x: -80, opacity: 0, rotate: -6 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
            drag={reduce ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 80) { setFlipped(false); setI((i + 1) % cards.length); } }}
            onClick={() => setFlipped((f) => !f)}
            aria-label={flipped ? `Answer: ${c.a}. Click to see question.` : `Question: ${c.q}. Click to reveal answer.`}
            className="absolute inset-0 h-full w-full"
          >
            <motion.div
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: reduce ? 0 : 0.5 }}
              className="relative h-full w-full [transform-style:preserve-3d]"
            >
              <div className="graph-paper absolute inset-0 flex items-center justify-center border border-ink bg-card p-5 text-center font-display text-xl [backface-visibility:hidden]">
                {c.q}
              </div>
              <div className="absolute inset-0 flex items-center justify-center border border-ink bg-marker p-5 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                {c.a}
              </div>
            </motion.div>
          </motion.button>
        </AnimatePresence>
      </div>
      <div className="mt-3 flex items-center justify-between font-mono text-xs">
        <span>{i + 1}/{cards.length} · tap to flip, swipe for next</span>
        <button className="border border-ink px-2 py-1 hover:bg-muted" onClick={() => { setFlipped(false); setI((i + 1) % cards.length); }}>Next →</button>
      </div>
    </div>
  );
}

/* ---------- Quiz ---------- */
const quiz = [
  { q: "A ball is thrown up. At the very top, its velocity is…", opts: ["Zero", "Maximum", "Equal to g"], a: 0, why: "It stops for an instant before falling. Acceleration is still g though." },
  { q: "Which one is NOT a prime number?", opts: ["29", "51", "53"], a: 1, why: "51 = 3 × 17. Sneaky one." },
  { q: "Photosynthesis mainly releases…", opts: ["CO₂", "Nitrogen", "Oxygen"], a: 2, why: "Plants split water and release O₂ as a by-product." },
];
export function Quiz() {
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null]);
  const score = answers.filter((a, i) => a === quiz[i].a).length;
  return (
    <div className="space-y-4">
      {quiz.map((item, qi) => {
        const picked = answers[qi];
        return (
          <fieldset key={qi}>
            <legend className="text-sm font-medium"><span className="font-mono text-tomato">Q{qi + 1}.</span> {item.q}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {item.opts.map((o, oi) => {
                const state = picked === null ? "" : oi === item.a ? "bg-marker" : picked === oi ? "bg-tomato text-paper line-through" : "opacity-50";
                return (
                  <button key={oi} disabled={picked !== null}
                    onClick={() => setAnswers((a) => a.map((v, i) => (i === qi ? oi : v)))}
                    className={`border border-ink px-3 py-1 text-sm hover:bg-muted disabled:cursor-default ${state}`}>
                    {o}
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <p className="mt-2 font-mono text-xs" role="status">
                {picked === item.a ? "✓ Correct. " : "✗ Not quite. "}{item.why}
              </p>
            )}
          </fieldset>
        );
      })}
      <div className="flex items-center justify-between border-t border-dashed border-ink pt-3 font-mono text-xs">
        <span>Score: {score}/3</span>
        <button className="underline" onClick={() => setAnswers([null, null, null])}>Reset</button>
      </div>
    </div>
  );
}

/* ---------- Analogies ---------- */
const analogies = {
  cricket: "Electric current is like runs being scored. Voltage is the bowler's pace pushing things along, and resistance is a tight field — more fielders, fewer runs get through.",
  kitchen: "Electric current is water flowing from a tap. Voltage is how hard the tap is opened, and resistance is a narrow pipe — the thinner it is, the less water comes out.",
  game: "Electric current is players moving through a map. Voltage is the boost pad pushing them forward, and resistance is lag — more lag, fewer players reach the end per second.",
};
export function Analogies() {
  const [k, setK] = useState<keyof typeof analogies>("cricket");
  const labels = { cricket: "Cricket", kitchen: "Kitchen", game: "Mobile game" };
  return (
    <div>
      <p className="font-mono text-xs uppercase">Topic: Ohm's law · Explain it like…</p>
      <div role="tablist" className="mt-2 flex flex-wrap gap-2">
        {(Object.keys(analogies) as (keyof typeof analogies)[]).map((key) => (
          <button key={key} role="tab" aria-selected={k === key} onClick={() => setK(key)}
            className={`border border-ink px-3 py-1 text-sm ${k === key ? "bg-ink text-paper" : "hover:bg-muted"}`}>
            {labels[key]}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={k} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          className="mt-4 font-display text-lg leading-snug" aria-live="polite">
          “{analogies[k]}”
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/* ---------- Brain map ---------- */
type Node = { id: string; x: number; y: number };
const initialNodes: Node[] = [
  { id: "Photosynthesis", x: 150, y: 100 },
  { id: "Sunlight", x: 50, y: 30 },
  { id: "Chlorophyll", x: 255, y: 35 },
  { id: "Water", x: 40, y: 170 },
  { id: "CO₂", x: 150, y: 185 },
  { id: "Glucose", x: 260, y: 165 },
];
const edges: [string, string][] = [
  ["Photosynthesis", "Sunlight"], ["Photosynthesis", "Chlorophyll"], ["Photosynthesis", "Water"],
  ["Photosynthesis", "CO₂"], ["Photosynthesis", "Glucose"], ["Sunlight", "Chlorophyll"], ["Water", "Glucose"],
];
export function BrainMap() {
  const [nodes, setNodes] = useState(initialNodes);
  const [sel, setSel] = useState<string | null>("Sunlight");
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<{ id: string; moved: boolean } | null>(null);
  const pos = (id: string) => nodes.find((n) => n.id === id)!;
  const connected = (id: string) => sel !== null && (id === sel || edges.some(([a, b]) => (a === sel && b === id) || (b === sel && a === id)));
  const move = (id: string, dx: number, dy: number) =>
    setNodes((ns) => ns.map((n) => (n.id === id ? { ...n, x: Math.max(30, Math.min(270, n.x + dx)), y: Math.max(15, Math.min(205, n.y + dy)) } : n)));

  const toLocal = (e: React.PointerEvent) => {
    const r = svgRef.current!.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * 300, y: ((e.clientY - r.top) / r.height) * 220 };
  };

  return (
    <div>
      <svg ref={svgRef} viewBox="0 0 300 220" className="dot-grid w-full touch-none select-none border border-ink"
        onPointerMove={(e) => {
          if (!drag.current) return;
          drag.current.moved = true;
          const p = toLocal(e);
          setNodes((ns) => ns.map((n) => (n.id === drag.current!.id ? { ...n, x: Math.max(30, Math.min(270, p.x)), y: Math.max(15, Math.min(205, p.y)) } : n)));
        }}
        onPointerUp={() => { drag.current = null; }}
        onPointerLeave={() => { drag.current = null; }}
        aria-label="Brain map of photosynthesis. Tab to a node, Enter to highlight connections, arrow keys to move it."
      >
        {edges.map(([a, b]) => {
          const on = sel !== null && (a === sel || b === sel);
          return <line key={a + b} x1={pos(a).x} y1={pos(a).y} x2={pos(b).x} y2={pos(b).y}
            className={on ? "stroke-tomato" : "stroke-ink"} strokeWidth={on ? 2 : 1} strokeDasharray={on ? "" : "3 3"} opacity={sel && !on ? 0.3 : 1} />;
        })}
        {nodes.map((n) => {
          const on = connected(n.id);
          const w = n.id.length * 6.4 + 16;
          return (
            <g key={n.id} tabIndex={0} role="button" aria-pressed={sel === n.id} className="cursor-grab outline-none [&:focus-visible>rect]:stroke-tomato"
              onPointerDown={(e) => { (e.target as Element).setPointerCapture?.(e.pointerId); drag.current = { id: n.id, moved: false }; }}
              onPointerUp={() => { if (drag.current && !drag.current.moved) setSel(n.id === sel ? null : n.id); drag.current = null; }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(n.id === sel ? null : n.id); }
                const d = { ArrowLeft: [-8, 0], ArrowRight: [8, 0], ArrowUp: [0, -8], ArrowDown: [0, 8] }[e.key];
                if (d) { e.preventDefault(); move(n.id, d[0], d[1]); }
              }}>
              <rect x={n.x - w / 2} y={n.y - 11} width={w} height={22} strokeWidth={1.5}
                className={`stroke-ink ${sel === n.id ? "fill-marker" : on ? "fill-card" : "fill-card"}`} opacity={sel && !on ? 0.45 : 1} />
              <text x={n.x} y={n.y + 4} textAnchor="middle" className="fill-ink font-mono text-[10px]">{n.id}</text>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 font-mono text-xs text-muted-foreground">Drag nodes · click to see what connects</p>
    </div>
  );
}

/* ---------- 3D ---------- */
export function Model3D() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect(); } }, { rootMargin: "200px" });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref}>
      <div className="graph-paper border border-ink">
        {show ? (
          <Suspense fallback={<div className="flex h-56 items-center justify-center font-mono text-xs">loading model…</div>}>
            <Molecule />
          </Suspense>
        ) : <div className="h-56" />}
      </div>
      <p className="mt-2 font-mono text-xs text-muted-foreground">H₂O · drag to rotate · tap an atom</p>
    </div>
  );
}

/* ---------- pH simulation ---------- */
export function PHSim() {
  const [ph, setPh] = useState(7);
  const hue = ph < 7 ? 25 + ph * 8 : ph === 7 ? 140 : 150 + (ph - 7) * 20;
  const label = ph < 3 ? "Strong acid — like lemon juice" : ph < 7 ? "Weak acid — like tomato" : ph === 7 ? "Neutral — pure water" : ph < 11 ? "Weak base — like baking soda" : "Strong base — like bleach";
  return (
    <div>
      <div className="flex items-end gap-4">
        <svg viewBox="0 0 80 110" className="h-32 w-24 shrink-0" aria-hidden>
          <path d="M18 4 V 30 L 4 96 Q 2 106 14 106 H 66 Q 78 106 76 96 L 62 30 V 4" className="fill-card stroke-ink" strokeWidth="2" />
          <path d="M11 62 L 4 96 Q 2 106 14 106 H 66 Q 78 106 76 96 L 69 62 Z" style={{ fill: `oklch(0.7 0.16 ${hue})`, transition: "fill .3s" }} />
          <line x1="12" y1="4" x2="68" y2="4" className="stroke-ink" strokeWidth="2" />
        </svg>
        <div className="flex-1">
          <p className="font-mono text-4xl font-semibold">pH {ph}</p>
          <p className="text-sm" aria-live="polite">{label}</p>
        </div>
      </div>
      <label htmlFor="ph" className="mt-4 block font-mono text-xs uppercase">Universal indicator · drag pH</label>
      <input id="ph" type="range" min={0} max={14} step={1} value={ph} onChange={(e) => setPh(+e.target.value)} className="mt-2 w-full accent-tomato" />
      <div className="flex justify-between font-mono text-[10px]"><span>0 acid</span><span>7</span><span>base 14</span></div>
    </div>
  );
}

/* ---------- Gamification ---------- */
const badges = [
  { name: "First poke", xp: 20, d: "M12 2 L15 9 L22 9 L16.5 13.5 L19 21 L12 16.5 L5 21 L7.5 13.5 L2 9 L9 9 Z" },
  { name: "Quiz streak", xp: 30, d: "M4 12 L10 18 L20 6" },
  { name: "Map maker", xp: 50, d: "M6 6 L18 6 L18 18 L6 18 Z M6 12 H18 M12 6 V18" },
];
export function Gamification() {
  const [got, setGot] = useState<boolean[]>([false, false, false]);
  const xp = 140 + badges.reduce((s, b, i) => s + (got[i] ? b.xp : 0), 0);
  const pct = Math.min(100, (xp / 240) * 100);
  return (
    <div>
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 24 32" className="h-12 w-9 shrink-0" aria-hidden>
          <path d="M12 2 C 14 9, 21 12, 20 21 C 19 28, 14 30, 12 30 C 8 30, 4 27, 4 21 C 4 16, 8 14, 9 9 C 11 12, 12 13, 12 15 C 14 12, 13 6, 12 2 Z" className="fill-tomato stroke-ink" strokeWidth="1.5" />
          <path d="M12 30 C 9 30, 8 27, 9 24 C 10 22, 12 21, 12 19 C 14 22, 16 24, 15 27 C 14 29, 13 30, 12 30 Z" className="fill-marker" />
        </svg>
        <div>
          <p className="font-mono text-3xl font-semibold">6 day</p>
          <p className="text-sm">streak · keep it alive tomorrow</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between font-mono text-xs"><span>Level 4</span><span>{xp}/240 XP</span></div>
        <div className="mt-1 h-4 border border-ink bg-card" role="progressbar" aria-valuenow={xp} aria-valuemin={0} aria-valuemax={240}>
          <div className="graph-paper h-full bg-marker transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {badges.map((b, i) => (
          <button key={b.name} onClick={() => setGot((g) => g.map((v, j) => (j === i ? true : v)))} aria-pressed={got[i]}
            className={`flex flex-col items-center gap-1 border border-ink p-2 transition ${got[i] ? "bg-marker shadow-hard-sm -rotate-2" : "border-dashed opacity-60 hover:opacity-100"}`}>
            <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden><path d={b.d} fill="none" className="stroke-ink" strokeWidth="1.8" strokeLinejoin="round" /></svg>
            <span className="font-mono text-[10px] leading-tight">{got[i] ? b.name : "locked"}</span>
            <span className="font-mono text-[10px] text-tomato">+{b.xp}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
