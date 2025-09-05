'use client';

import { useEffect, useRef } from 'react';

/** Tunables */
const GRID = 80;                     // grid spacing
const FONT = 13;                     // number font size
const MOUSE_RADIUS = 70;             // lit strongly near cursor
const TWINKLE_EXCLUDE_RADIUS = 90;   // no idle twinkle inside this
const FADE_SPEED = 1;              // intensity decay per second
const IDLE_TWINKLE_RATE = 0.001;     // pulses per cell per second
const GLOW_BLUR = 100;                // glow blur
const MAX_DRAW_THRESHOLD = 0.005;    // don't draw if dimmer than this

type Cell = {
  x: number; y: number;
  val: number;
  intensity: number; // 0..1
  target: number;    // short-lived twinkle target
};

export default function NumbersOverlay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cellsRef = useRef<Cell[]>([]);
  const sizeRef = useRef({ w: 0, h: 0, cols: 0, rows: 0 });
  const rafRef = useRef<number | null>(null);
  const dprRef = useRef(1);
  const reducedRef = useRef(false);
  const mouseRef = useRef<{ x: number; y: number; has: boolean }>({ x: 0, y: 0, has: false });
  const lastRef = useRef<number>(performance.now());

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion)');
    reducedRef.current = !!mq?.matches;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d', { alpha: true })!;
    dprRef.current = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const fit = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = dprRef.current;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(w / GRID) + 1;
      const rows = Math.ceil(h / GRID) + 1;
      sizeRef.current = { w, h, cols, rows };

      const cells: Cell[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = Math.round(c * GRID) + 0.5;
          const y = Math.round(r * GRID) + 0.5;
          cells.push({ x, y, val: 0, intensity: 0, target: 0 });
        }
      }
      cellsRef.current = cells;
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, has: true };
      if (!reducedRef.current) igniteAround(mouseRef.current.x, mouseRef.current.y);
    };

    const igniteAround = (mx: number, my: number) => {
      const { cols } = sizeRef.current;
      const cells = cellsRef.current;
      const r2 = MOUSE_RADIUS * MOUSE_RADIUS;

      const cmin = Math.max(0, Math.floor((mx - MOUSE_RADIUS) / GRID));
      const cmax = Math.floor((mx + MOUSE_RADIUS) / GRID) + 1;
      const rmin = Math.max(0, Math.floor((my - MOUSE_RADIUS) / GRID));
      const rmax = Math.floor((my + MOUSE_RADIUS) / GRID) + 1;

      for (let r = rmin; r <= rmax; r++) {
        for (let c = cmin; c <= cmax; c++) {
          const idx = r * cols + c;
          const cell = cells[idx];
          if (!cell) continue;
          const dx = cell.x - mx, dy = cell.y - my;
          if (dx * dx + dy * dy <= r2) {
            const closeness = 1 - Math.min(1, Math.hypot(dx, dy) / MOUSE_RADIUS);
            cell.intensity = Math.min(1, Math.max(cell.intensity, 0.6 + 0.4 * closeness));
            // Weighted random: mostly 1-9, sometimes 10-99, rarely 0
            const roll = Math.random();
            cell.val = roll < 0.65 ? randInt(1, 9) : roll < 0.98 ? randInt(10, 99) : 0;
          }
        }
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastRef.current) / 1000); // s
      lastRef.current = now;

      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      const cells = cellsRef.current;
      const fade = FADE_SPEED * dt;

      ctx.save();
      ctx.font = `${FONT}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.globalCompositeOperation = 'lighter';

      const ex2 = TWINKLE_EXCLUDE_RADIUS * TWINKLE_EXCLUDE_RADIUS;
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const hasMouse = mouseRef.current.has;

      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];

        // Idle twinkle always ON, but skip inside exclusion radius
        let allowTwinkle = true;
        if (hasMouse) {
          const dx = cell.x - mx, dy = cell.y - my;
          if (dx * dx + dy * dy <= ex2) allowTwinkle = false;
        }
        if (allowTwinkle && Math.random() < IDLE_TWINKLE_RATE * Math.max(1, 60 * dt)) {
          cell.target = 0.35 + Math.random() * 0.25; // gentle pulse
          if (cell.intensity <= 0.01) {
            const roll = Math.random();
            cell.val = roll < 0.65 ? randInt(1, 9) : roll < 0.98 ? randInt(10, 99) : 0;
          }
        }

        // relax target toward 0
        cell.target = Math.max(0, cell.target - fade);

        // approach target quickly, then decay
        if (cell.intensity < cell.target) {
          cell.intensity = Math.min(cell.target, cell.intensity + fade * 1.2);
        } else {
          cell.intensity = Math.max(0, cell.intensity - fade);
        }

        if (cell.intensity > MAX_DRAW_THRESHOLD) {
          const a = cell.intensity;
          // Indigo-ish glow to match gradient
          ctx.shadowColor = 'rgba(99,102,241,0.9)';
          ctx.shadowBlur = GLOW_BLUR * a;
          ctx.fillStyle = `rgba(99,102,241,${0.25 + 0.75 * a})`;
          ctx.fillText(String(cell.val), cell.x, cell.y + 1);
        }
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(tick);
    };

    const onResize = () => fit();

    fit();
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 -z-20 pointer-events-none"
    />
  );
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
