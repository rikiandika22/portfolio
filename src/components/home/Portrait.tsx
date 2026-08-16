"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface TrailPoint {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  angle: number;
  stretch: number;
  createdAt: number;
  lifetime: number;
}

export default function Portrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealImgRef = useRef<HTMLImageElement | null>(null);
  const isImgLoadedRef = useRef(false);

  const pointsRef = useRef<TrailPoint[]>([]);
  const lastPosRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const isHoveringRef = useRef(false);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    // 1. Preload reveal image asset
    const img = new window.Image();
    img.src = "/images/profile/profile_photo_reveal.webp";
    img.onload = () => {
      revealImgRef.current = img;
      isImgLoadedRef.current = true;
    };

    // 2. Check touch / coarse pointer or reduced motion
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || isReducedMotion) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to match container size with device pixel ratio
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      ctx.scale(dpr, dpr);
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Animation render loop
    const render = () => {
      const now = performance.now();
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Filter living points
      pointsRef.current = pointsRef.current.filter((p) => {
        const elapsed = now - p.createdAt;
        return elapsed < p.lifetime;
      });

      // Clear previous canvas frame
      ctx.clearRect(0, 0, width, height);

      if (pointsRef.current.length > 0 && revealImgRef.current && isImgLoadedRef.current) {
        ctx.save();

        // Step 1: Draw organic trail mask points
        pointsRef.current.forEach((p) => {
          const progress = (now - p.createdAt) / p.lifetime; // 0 to 1
          // Smooth non-linear fade
          const currentAlpha = p.alpha * Math.max(0, 1 - progress * progress);
          const currentRadius = p.radius * (1 - progress * 0.2);

          if (currentAlpha <= 0.005) return;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.scale(p.stretch, 1 / p.stretch);

          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, currentRadius);
          grad.addColorStop(0, `rgba(0, 0, 0, ${currentAlpha.toFixed(3)})`);
          grad.addColorStop(0.55, `rgba(0, 0, 0, ${(currentAlpha * 0.75).toFixed(3)})`);
          grad.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, currentRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // Step 2: Composite reveal portrait through the organic mask
        ctx.globalCompositeOperation = "source-in";

        const revealImg = revealImgRef.current;
        const imgW = revealImg.naturalWidth || revealImg.width || 3376;
        const imgH = revealImg.naturalHeight || revealImg.height || 6000;
        const imgRatio = imgW / imgH;
        const containerRatio = width / height;

        let renderW = width;
        let renderH = height;
        let renderX = 0;
        let renderY = 0;

        if (containerRatio > imgRatio) {
          renderW = width;
          renderH = width / imgRatio;
          renderX = 0;
          renderY = 0; // object-top
        } else {
          renderH = height;
          renderW = height * imgRatio;
          renderX = (width - renderW) / 2; // center horizontally
          renderY = 0; // object-top
        }

        ctx.drawImage(revealImg, renderX, renderY, renderW, renderH);

        // Reset composite operation
        ctx.globalCompositeOperation = "source-over";
        ctx.restore();
      }

      // Continue animation loop as long as hovering or points still alive
      if (isHoveringRef.current || pointsRef.current.length > 0) {
        animFrameIdRef.current = requestAnimationFrame(render);
      } else {
        animFrameIdRef.current = null;
      }
    };

    const startAnimationLoop = () => {
      if (!animFrameIdRef.current) {
        animFrameIdRef.current = requestAnimationFrame(render);
      }
    };

    const addTrailPoint = (x: number, y: number, vx: number, vy: number, speed: number) => {
      const angle = Math.atan2(vy, vx);
      // Subtle velocity deformation
      const stretch = Math.min(1.3, Math.max(1.0, 1 + speed * 0.012));
      const radius = Math.min(95, Math.max(65, 70 + speed * 0.25));
      const lifetime = 750; // ms

      pointsRef.current.push({
        x,
        y,
        radius,
        alpha: 1,
        angle,
        stretch,
        createdAt: performance.now(),
        lifetime,
      });

      startAnimationLoop();
    };

    const handlePointerEnter = (e: PointerEvent) => {
      isHoveringRef.current = true;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      lastPosRef.current = { x, y, time: performance.now() };

      addTrailPoint(x, y, 0, 0, 0);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = performance.now();

      if (lastPosRef.current) {
        const dx = x - lastPosRef.current.x;
        const dy = y - lastPosRef.current.y;
        const dt = Math.max(1, now - lastPosRef.current.time);
        const dist = Math.hypot(dx, dy);
        const speed = (dist / dt) * 16; // scaled velocity

        // Interpolate points for fast movements to ensure smooth organic brushing without gaps
        const step = 8;
        const numSteps = Math.max(1, Math.floor(dist / step));

        for (let i = 1; i <= numSteps; i++) {
          const t = i / numSteps;
          const px = lastPosRef.current.x + dx * t;
          const py = lastPosRef.current.y + dy * t;
          addTrailPoint(px, py, dx, dy, speed);
        }
      } else {
        addTrailPoint(x, y, 0, 0, 0);
      }

      lastPosRef.current = { x, y, time: now };
    };

    const handlePointerLeave = () => {
      isHoveringRef.current = false;
      lastPosRef.current = null;
      startAnimationLoop();
    };

    container.addEventListener("pointerenter", handlePointerEnter);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      container.removeEventListener("pointerenter", handlePointerEnter);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);

      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      {/* Wrapper container for image and Figma selection-style overlay */}
      <div className="relative inline-block">
        {/* Interactive Image Container with Canvas Mask */}
        <div
          ref={containerRef}
          className="relative overflow-hidden block w-[120px] sm:w-[160px] lg:w-[240px] select-none cursor-pointer"
        >
          {/* Default visible profile image asset */}
          <Image
            src="/images/profile/profile_photo.webp"
            alt="Portrait of Riki Andika Khusna Saputra"
            width={240}
            height={360}
            className="block object-cover object-top w-full h-auto"
            priority
          />

          {/* Interactive Reveal Canvas Mask Layer */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
            aria-hidden="true"
          />
        </div>

        {/* Figma Selection-Style Blue Outline Overlay (2px thickness with gap) */}
        <div
          className="absolute -inset-2 sm:-inset-2.5 lg:-inset-3 pointer-events-none z-10"
          style={{
            borderColor: "var(--color-accent-primary, #2196F3)",
            borderWidth: "2px",
            borderStyle: "solid",
          }}
        >
          {/* Top-left corner handle marker */}
          <div
            className="absolute -top-1.5 -left-1.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-page-background shadow-xs"
            style={{
              borderColor: "var(--color-accent-primary, #2196F3)",
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          />

          {/* Top-right corner handle marker */}
          <div
            className="absolute -top-1.5 -right-1.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-page-background shadow-xs"
            style={{
              borderColor: "var(--color-accent-primary, #2196F3)",
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          />

          {/* Bottom-left corner handle marker */}
          <div
            className="absolute -bottom-1.5 -left-1.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-page-background shadow-xs"
            style={{
              borderColor: "var(--color-accent-primary, #2196F3)",
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          />

          {/* Bottom-right corner handle marker */}
          <div
            className="absolute -bottom-1.5 -right-1.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-page-background shadow-xs"
            style={{
              borderColor: "var(--color-accent-primary, #2196F3)",
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          />
        </div>
      </div>
    </div>
  );
}
