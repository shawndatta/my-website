'use client';

import { useEffect, useRef } from 'react';

const GRID = 80;
const LINE_ALPHA = 0.04;

export default function GridBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d', { alpha: true })!;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = `rgba(255,255,255,${LINE_ALPHA})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0.5; x <= w; x += GRID) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
      for (let y = 0.5; y <= h; y += GRID) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
      ctx.stroke();
    };

    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="fixed inset-0 -z-0 pointer-events-none"
    />
  );
}
