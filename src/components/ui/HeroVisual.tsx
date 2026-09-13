"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; z: number };

/** Répartition uniforme de points sur une sphère (spirale de Fibonacci). */
function fibonacciSphere(count: number): Point[] {
  const points: Point[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    points.push({ x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius });
  }
  return points;
}

/** Cercle 3D défini par deux vecteurs orthonormés (anneau orbital). */
function ring(count: number, tilt: number, spin: number): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < count; i += 1) {
    const a = (i / count) * Math.PI * 2;
    const x = Math.cos(a);
    const y = Math.sin(a) * Math.cos(tilt);
    const z = Math.sin(a) * Math.sin(tilt);
    // rotation supplémentaire autour de Y pour désaxer l'anneau
    points.push({
      x: x * Math.cos(spin) + z * Math.sin(spin),
      y,
      z: -x * Math.sin(spin) + z * Math.cos(spin),
    });
  }
  return points;
}

/**
 * Sphère filaire animée, rendue en canvas 2D (aucune lib 3D, ~15 Ko de JS).
 * - rotation continue
 * - parallaxe douce pilotée par la souris
 * - mise en pause automatique hors du viewport
 */
export default function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    const dots = fibonacciSphere(reduced ? 380 : 760);
    const rings = [
      ring(120, 0.15, 0),
      ring(120, 1.2, 0.6),
      ring(120, -0.9, 2.1),
    ];

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    // Cible et valeur courante de la parallaxe souris (lissage)
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onPointer = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth - 0.5) * 2;
      target.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    let angle = 0;
    let raf = 0;
    let last = performance.now();

    const project = (p: Point, rotY: number, rotX: number, radius: number) => {
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = p.x * cosY + p.z * sinY;
      const z1 = -p.x * sinY + p.z * cosY;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      const depth = 1 / (1.9 - z2 * 0.75); // perspective
      return {
        sx: width / 2 + x1 * radius * depth * 1.9,
        sy: height / 2 + y2 * radius * depth * 1.9,
        z: z2,
        depth,
      };
    };

    const render = (now: number) => {
      const delta = Math.min(48, now - last);
      last = now;
      raf = requestAnimationFrame(render);
      if (!visible) return;

      // lissage de la parallaxe
      current.x += (target.x - current.x) * 0.045;
      current.y += (target.y - current.y) * 0.045;

      angle += (reduced ? 0.00004 : 0.00016) * delta;

      const rotY = angle + current.x * 0.55;
      const rotX = -0.18 + current.y * 0.4;
      const radius = Math.min(width, height) * 0.31;

      ctx.clearRect(0, 0, width, height);

      // --- Anneaux orbitaux -------------------------------------------------
      rings.forEach((points, ringIndex) => {
        const spin = rotY + ringIndex * 0.35;
        ctx.lineWidth = 1;
        for (let i = 0; i < points.length; i += 1) {
          const a = project(points[i], spin, rotX, radius * 1.22);
          const b = project(
            points[(i + 1) % points.length],
            spin,
            rotX,
            radius * 1.22,
          );
          const alpha = 0.06 + ((a.z + 1) / 2) * 0.34;
          ctx.strokeStyle = `rgba(0, 102, 255, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.stroke();
        }
      });

      // --- Nuage de points --------------------------------------------------
      for (let i = 0; i < dots.length; i += 1) {
        const p = project(dots[i], rotY, rotX, radius);
        const front = (p.z + 1) / 2; // 0 = derrière, 1 = devant
        const size = 0.5 + front * 1.55;
        const alpha = 0.07 + front * 0.75;

        // 1 point sur 9 passe en bleu signature pour animer la surface
        ctx.fillStyle =
          i % 9 === 0
            ? `rgba(51, 133, 255, ${alpha})`
            : `rgba(250, 250, 250, ${alpha * 0.62})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Point lumineux en orbite ----------------------------------------
      const satellite = project(
        {
          x: Math.cos(angle * 5.5),
          y: Math.sin(angle * 3.1) * 0.35,
          z: Math.sin(angle * 5.5),
        },
        rotY,
        rotX,
        radius * 1.42,
      );
      const glow = ctx.createRadialGradient(
        satellite.sx,
        satellite.sy,
        0,
        satellite.sx,
        satellite.sy,
        26,
      );
      glow.addColorStop(0, "rgba(0,102,255,0.85)");
      glow.addColorStop(1, "rgba(0,102,255,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(satellite.sx, satellite.sy, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.beginPath();
      ctx.arc(satellite.sx, satellite.sy, 2.1, 0, Math.PI * 2);
      ctx.fill();
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div className="relative aspect-square w-full">
      {/* Halo bleu derrière la sphère */}
      <div className="glow-blue absolute inset-[12%] animate-float rounded-full opacity-40 blur-3xl" />
      {/* Cercles de repère statiques */}
      <div className="absolute inset-[14%] rounded-full border border-line" />
      <div className="absolute inset-[26%] rounded-full border border-line/60" />
      <canvas
        ref={canvasRef}
        className="relative h-full w-full"
        role="img"
        aria-label="Sphère filaire animée représentant l'écosystème digital DSM"
      />
    </div>
  );
}
