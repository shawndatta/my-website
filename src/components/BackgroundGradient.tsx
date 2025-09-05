'use client';

export default function BackgroundGradient() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-20"
      style={{
        background: `
          radial-gradient(800px 500px at 15% 10%, rgba(168, 85, 247, 0.12), transparent 60%),
          radial-gradient(900px 600px at 85% 20%, rgba(59, 130, 246, 0.10), transparent 60%),
          radial-gradient(700px 500px at 50% 90%, rgba(236, 72, 153, 0.10), transparent 65%),
          linear-gradient(180deg, #0B0D10 0%, #0B0D10 100%)
        `,
      }}
    />
  );
}
