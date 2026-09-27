"use client";

import { useEffect, useRef } from "react";

export default function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || 400);
    let height = (canvas.height = canvas.offsetHeight || 400);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 400;
      height = canvas.height = canvas.offsetHeight || 400;
    };

    window.addEventListener("resize", handleResize);

    // Sphère optimisée : 120 points seulement (au lieu de 500+)
    const numPoints = 120;
    const points: { x: number; y: number; z: number }[] = [];
    const radius = Math.min(width, height) * 0.35;

    for (let i = 0; i < numPoints; i++) {
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = 2 * Math.PI * Math.random();

      points.push({
        x: radius * Math.sin(theta) * Math.cos(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(theta),
      });
    }

    let angleX = 0.002;
    let angleY = 0.003;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      ctx.fillStyle = "#0066FF";
      ctx.strokeStyle = "rgba(0, 102, 255, 0.15)";

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Rotation légère
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);

        const y1 = p.y * cosX - p.z * sinX;
        const z1 = p.y * sinX + p.z * cosX;

        const x2 = p.x * cosY + z1 * sinY;
        const z2 = -p.x * sinY + z1 * cosY;

        p.x = x2;
        p.y = y1;
        p.z = z2;

        const scale = 300 / (300 + p.z);
        const x2d = p.x * scale + cx;
        const y2d = p.y * scale + cy;

        const size = Math.max(1, (p.z + radius) / (2 * radius) * 2.5);
        const alpha = Math.max(0.1, (p.z + radius) / (2 * radius));

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full aspect-square max-w-[420px] mx-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none"
      />
    </div>
  );
}
