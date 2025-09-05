// Digital clock component at nav bar


"use client";
import { useEffect, useState } from "react";

const pad = (n: number) => n.toString().padStart(2, "0");

export default function DigitalClock({ twelveHour = false }: { twelveHour?: boolean }) {
    // null until mounted to avoid SSR/client time mismatch
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return <span className="tabular-nums font-mono">--:--:--</span>;

  let h = now.getHours();
  const m = pad(now.getMinutes());
  const s = pad(now.getSeconds());
  let suffix = "";
  if (twelveHour) {
    suffix = h >= 12 ? " PM" : " AM";
    h = h % 12 || 12;
  }
  return (
    <span className="tabular-nums font-mono tracking-widest">
      {pad(h)}:{m}:{s}{suffix}
    </span>
  );
}
