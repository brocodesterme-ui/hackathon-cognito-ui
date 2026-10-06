import { useEffect, useRef, useState } from "react";

function cssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#16140F";
}

export function Pendulum() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [length, setLength] = useState(1.2);
  const [gravity, setGravity] = useState(9.8);
  const [running, setRunning] = useState(true);
  const state = useRef({ theta: 0.7, omega: 0 });
  const params = useRef({ length, gravity, running });
  params.current = { length, gravity, running };

  const period = 2 * Math.PI * Math.sqrt(length / gravity);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setRunning(false);
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const ink = cssVar("--ink");
    const tomato = cssVar("--tomato");
    const grid = cssVar("--grid");
    let raf = 0;
    let last = performance.now();

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.033);
      last = now;
      const { length: L, gravity: g, running: run } = params.current;
      const s = state.current;
      if (run) {
        for (let i = 0; i < 4; i++) {
          const a = -(g / L) * Math.sin(s.theta);
          s.omega += a * (dt / 4);
          s.theta += s.omega * (dt / 4);
        }
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (canvas.width !== w * dpr) { canvas.width = w * dpr; canvas.height = h * dpr; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = grid; ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 20) { ctx.beginPath(); ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 20) { ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5); ctx.stroke(); }

      const px = w / 2, py = 36;
      const scale = (h - 90) / 2;
      const r = L * scale;
      const bx = px + r * Math.sin(s.theta), by = py + r * Math.cos(s.theta);

      // ceiling
      ctx.strokeStyle = ink; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(px - 60, py); ctx.lineTo(px + 60, py); ctx.stroke();
      for (let i = -60; i < 60; i += 10) { ctx.beginPath(); ctx.moveTo(px + i, py); ctx.lineTo(px + i + 8, py - 8); ctx.lineWidth = 1; ctx.stroke(); }
      // rest line
      ctx.setLineDash([4, 5]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py + r + 20); ctx.stroke(); ctx.setLineDash([]);
      // arc of angle
      ctx.strokeStyle = tomato; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(px, py, 42, Math.PI / 2, Math.PI / 2 - s.theta, s.theta > 0); ctx.stroke();
      // string
      ctx.strokeStyle = ink; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(bx, by); ctx.stroke();
      // bob
      ctx.fillStyle = tomato; ctx.beginPath(); ctx.arc(bx, by, 14, 0, Math.PI * 2); ctx.fill();
      ctx.lineWidth = 2; ctx.stroke();

      ctx.fillStyle = ink;
      ctx.font = "italic 15px Fraunces, serif";
      ctx.fillText(`θ = ${((s.theta * 180) / Math.PI).toFixed(0)}°`, px + 48, py + 34);
      ctx.fillText(`L = ${L.toFixed(1)} m`, px + 10 + (r / 2) * Math.sin(s.theta) + 14, py + (r / 2) * Math.cos(s.theta));
      ctx.font = "12px 'JetBrains Mono', monospace";
      ctx.fillStyle = tomato;
      ctx.fillText("← mass doesn't matter!", Math.min(bx + 22, w - 180), by + 4);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <figure className="card-ink rotate-1 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <span className="tape -rotate-2">Live · try it</span>
        <span className="font-mono text-xs text-muted-foreground">fig. 1 — simple pendulum</span>
      </div>
      <canvas
        ref={canvasRef}
        className="graph-paper mt-3 block h-64 w-full border border-ink sm:h-80"
        role="img"
        aria-label={`Pendulum simulation. Length ${length.toFixed(1)} metres, gravity ${gravity.toFixed(1)} metres per second squared, period ${period.toFixed(2)} seconds.`}
      />
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Slider label="Length" unit="m" min={0.3} max={2} step={0.1} value={length} onChange={setLength} />
        <Slider label="Gravity" unit="m/s²" min={1.6} max={24.8} step={0.1} value={gravity} onChange={setGravity} hint="Moon 1.6 · Earth 9.8 · Jupiter 24.8" />
      </div>
      <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-ink pt-3">
        <p className="font-mono text-sm">
          T = 2π√(L/g) = <span className="marker font-semibold">{period.toFixed(2)} s</span>
        </p>
        <div className="flex gap-2">
          <button className="border border-ink px-3 py-1 font-mono text-xs hover:bg-muted" onClick={() => setRunning((r) => !r)}>
            {running ? "Pause" : "Play"}
          </button>
          <button className="border border-ink px-3 py-1 font-mono text-xs hover:bg-muted" onClick={() => { state.current = { theta: 0.7, omega: 0 }; }}>
            Release
          </button>
        </div>
      </figcaption>
    </figure>
  );
}

function Slider({ label, unit, min, max, step, value, onChange, hint }: {
  label: string; unit: string; min: number; max: number; step: number; value: number; onChange: (v: number) => void; hint?: string;
}) {
  const id = `s-${label}`;
  return (
    <div>
      <label htmlFor={id} className="flex justify-between font-mono text-xs uppercase tracking-wider">
        <span>{label}</span><span>{value.toFixed(1)} {unit}</span>
      </label>
      <input id={id} type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-2 w-full accent-tomato" />
      {hint && <p className="mt-1 font-mono text-[10px] text-muted-foreground">{hint}</p>}
    </div>
  );
}
