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
  seed: number;
}

interface TrailingNode {
  x: number;
  y: number;
  radiusFactor: number;
  lerpRate: number;
}

export default function Portrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealImgRef = useRef<HTMLImageElement | null>(null);
  const isImgLoadedRef = useRef(false);

  // Pointer & Physics State
  const targetPosRef = useRef<{ x: number; y: number } | null>(null);
  const centerPosRef = useRef<{ x: number; y: number } | null>(null);
  const prevPosRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastTrailSpawnPosRef = useRef<{ x: number; y: number } | null>(null);

  // Dynamic Secondary Trailing Nodes for organic liquid inertia
  const trailingNodesRef = useRef<TrailingNode[]>([
    { x: 0, y: 0, radiusFactor: 0.75, lerpRate: 0.28 },
    { x: 0, y: 0, radiusFactor: 0.55, lerpRate: 0.22 },
    { x: 0, y: 0, radiusFactor: 0.38, lerpRate: 0.18 },
  ]);

  // Trail Points Array
  const trailPointsRef = useRef<TrailPoint[]>([]);

  // Hover & Transition State
  const isHoveringRef = useRef(false);
  const enterScaleRef = useRef(0);
  const leaveOpacityRef = useRef(1);
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
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      ctx.scale(dpr, dpr);
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Helper: Draw an organic liquid spline blob
    const drawOrganicBlob = (
      x: number,
      y: number,
      radius: number,
      angle: number,
      stretch: number,
      time: number,
      alpha: number,
      seed: number
    ) => {
      if (alpha <= 0.005 || radius <= 2) return;

      const numVertices = 16;
      const pts: { x: number; y: number }[] = [];

      const clampedStretch = Math.max(1.0, Math.min(1.35, stretch));
      const perpStretch = 1 / Math.sqrt(clampedStretch);

      // Generate harmonic undulating perimeter vertices
      for (let k = 0; k < numVertices; k++) {
        const phi = (Math.PI * 2 * k) / numVertices;
        // Subtle harmonic waves (amplitude 2px to 5px)
        const wave =
          Math.sin(2 * phi + time * 1.8 + seed) * 3.5 +
          Math.cos(3 * phi - time * 1.4 + seed * 1.2) * 2.2 +
          Math.sin(5 * phi + time * 2.5 + seed * 0.7) * 1.2;

        const vertexRadius = Math.max(4, radius + wave);
        const u = vertexRadius * Math.cos(phi) * clampedStretch;
        const v = vertexRadius * Math.sin(phi) * perpStretch;

        // Rotate along motion vector and translate
        const px = x + u * Math.cos(angle) - v * Math.sin(angle);
        const py = y + u * Math.sin(angle) + v * Math.cos(angle);

        pts.push({ x: px, y: py });
      }

      // Smooth spline interpolation through midpoints
      const mid0 = {
        x: (pts[numVertices - 1].x + pts[0].x) / 2,
        y: (pts[numVertices - 1].y + pts[0].y) / 2,
      };

      ctx.beginPath();
      ctx.moveTo(mid0.x, mid0.y);
      for (let i = 0; i < numVertices; i++) {
        const nextMid = {
          x: (pts[i].x + pts[(i + 1) % numVertices].x) / 2,
          y: (pts[i].y + pts[(i + 1) % numVertices].y) / 2,
        };
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, nextMid.x, nextMid.y);
      }
      ctx.closePath();

      // Soft feathered radial gradient fill
      const maxGradientRadius = radius * clampedStretch * 1.1;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, maxGradientRadius);
      grad.addColorStop(0, `rgba(0, 0, 0, ${alpha.toFixed(3)})`);
      grad.addColorStop(0.45, `rgba(0, 0, 0, ${(alpha * 0.92).toFixed(3)})`);
      grad.addColorStop(0.72, `rgba(0, 0, 0, ${(alpha * 0.6).toFixed(3)})`);
      grad.addColorStop(0.9, `rgba(0, 0, 0, ${(alpha * 0.22).toFixed(3)})`);
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = grad;
      ctx.fill();
    };

    // Main animation render loop
    const render = () => {
      const now = performance.now();
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Handle Enter scale interpolation (smooth expansion on pointer enter)
      if (isHoveringRef.current) {
        enterScaleRef.current += (1 - enterScaleRef.current) * 0.16;
        leaveOpacityRef.current = 1;
      } else {
        // Handle Leave opacity fade out (smooth collapse on pointer leave)
        leaveOpacityRef.current = Math.max(0, leaveOpacityRef.current - 0.035);
      }

      // Filter living trail points
      trailPointsRef.current = trailPointsRef.current.filter((p) => {
        const elapsed = now - p.createdAt;
        return elapsed < p.lifetime;
      });

      // Clear previous canvas frame
      ctx.clearRect(0, 0, width, height);

      const hasActiveHover = isHoveringRef.current && centerPosRef.current !== null;
      const hasLivingTrails = trailPointsRef.current.length > 0;
      const effectiveAlpha = isHoveringRef.current ? 1 : leaveOpacityRef.current;

      if ((hasActiveHover || hasLivingTrails) && effectiveAlpha > 0.005 && isImgLoadedRef.current && revealImgRef.current) {
        ctx.save();

        const time = now * 0.002;

        // Step 1: Draw historical trail points
        trailPointsRef.current.forEach((p) => {
          const progress = (now - p.createdAt) / p.lifetime; // 0 to 1
          const trailAlpha = p.alpha * Math.max(0, 1 - progress * progress) * effectiveAlpha;
          const trailRadius = p.radius * (1 - progress * 0.3);

          drawOrganicBlob(
            p.x,
            p.y,
            trailRadius,
            p.angle,
            p.stretch,
            time,
            trailAlpha,
            p.seed
          );
        });

        // Step 2: Draw main liquid blob and trailing nodes if hovering
        if (targetPosRef.current && centerPosRef.current) {
          // Lerp center position towards target for fluid inertia
          const lerpFactor = 0.2;
          centerPosRef.current.x += (targetPosRef.current.x - centerPosRef.current.x) * lerpFactor;
          centerPosRef.current.y += (targetPosRef.current.y - centerPosRef.current.y) * lerpFactor;

          const cx = centerPosRef.current.x;
          const cy = centerPosRef.current.y;

          // Compute instantaneous velocity & direction
          let vx = 0;
          let vy = 0;
          let speed = 0;

          if (prevPosRef.current) {
            const dt = Math.max(1, now - prevPosRef.current.time);
            vx = (cx - prevPosRef.current.x) / dt;
            vy = (cy - prevPosRef.current.y) / dt;
            speed = Math.hypot(vx, vy) * 16;
          }
          prevPosRef.current = { x: cx, y: cy, time: now };

          const motionAngle = Math.atan2(vy, vx);
          const velocityStretch = 1 + Math.min(0.35, speed * 0.015);
          const baseRadius = (76 + Math.min(16, speed * 0.28)) * enterScaleRef.current;

          // Update and draw secondary trailing nodes (spring inertia)
          let prevNodePos = { x: cx, y: cy };
          trailingNodesRef.current.forEach((node, idx) => {
            node.x += (prevNodePos.x - node.x) * node.lerpRate;
            node.y += (prevNodePos.y - node.y) * node.lerpRate;
            prevNodePos = { x: node.x, y: node.y };

            const nodeRadius = baseRadius * node.radiusFactor;
            const nodeAlpha = 0.9 * effectiveAlpha;

            drawOrganicBlob(
              node.x,
              node.y,
              nodeRadius,
              motionAngle,
              1 + (velocityStretch - 1) * 0.7,
              time + idx * 0.8,
              nodeAlpha,
              idx * 3.7
            );
          });

          // Draw main liquid blob at center position
          drawOrganicBlob(
            cx,
            cy,
            baseRadius,
            motionAngle,
            velocityStretch,
            time,
            1.0 * effectiveAlpha,
            0
          );

          // Check distance threshold to spawn trail points
          if (isHoveringRef.current) {
            if (!lastTrailSpawnPosRef.current) {
              lastTrailSpawnPosRef.current = { x: cx, y: cy };
            } else {
              const ddx = cx - lastTrailSpawnPosRef.current.x;
              const ddy = cy - lastTrailSpawnPosRef.current.y;
              const distSinceLast = Math.hypot(ddx, ddy);

              const spawnDistanceThreshold = 16;
              if (distSinceLast >= spawnDistanceThreshold) {
                const steps = Math.min(4, Math.floor(distSinceLast / spawnDistanceThreshold));
                for (let s = 1; s <= steps; s++) {
                  const t = s / steps;
                  const spawnX = lastTrailSpawnPosRef.current.x + ddx * t;
                  const spawnY = lastTrailSpawnPosRef.current.y + ddy * t;

                  if (trailPointsRef.current.length > 25) {
                    trailPointsRef.current.shift();
                  }

                  trailPointsRef.current.push({
                    x: spawnX,
                    y: spawnY,
                    radius: baseRadius * 0.7,
                    alpha: 0.85,
                    angle: motionAngle,
                    stretch: Math.min(1.25, velocityStretch),
                    createdAt: now,
                    lifetime: 750, // ms
                    seed: Math.random() * 10,
                  });
                }
                lastTrailSpawnPosRef.current = { x: cx, y: cy };
              }
            }
          }
        }

        // Step 3: Composite reveal portrait cleanly through the organic liquid mask
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

      // Continue animation loop if hovering, trails still alive, or leave transition active
      if (isHoveringRef.current || trailPointsRef.current.length > 0 || leaveOpacityRef.current > 0.005) {
        animFrameIdRef.current = requestAnimationFrame(render);
      } else {
        // Clean reset
        ctx.clearRect(0, 0, width, height);
        animFrameIdRef.current = null;
        targetPosRef.current = null;
        centerPosRef.current = null;
        prevPosRef.current = null;
        lastTrailSpawnPosRef.current = null;
        enterScaleRef.current = 0;
        leaveOpacityRef.current = 1;
        trailPointsRef.current = [];
      }
    };

    const startAnimationLoop = () => {
      if (!animFrameIdRef.current) {
        animFrameIdRef.current = requestAnimationFrame(render);
      }
    };

    const handlePointerEnter = (e: PointerEvent) => {
      isHoveringRef.current = true;
      enterScaleRef.current = 0.25; // start smaller and expand
      leaveOpacityRef.current = 1;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      targetPosRef.current = { x, y };
      centerPosRef.current = { x, y };
      prevPosRef.current = { x, y, time: performance.now() };
      lastTrailSpawnPosRef.current = { x, y };

      // Initialize secondary trailing nodes at cursor entrance
      trailingNodesRef.current.forEach((node) => {
        node.x = x;
        node.y = y;
      });

      startAnimationLoop();
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      targetPosRef.current = { x, y };

      if (!centerPosRef.current) {
        centerPosRef.current = { x, y };
      }

      startAnimationLoop();
    };

    const handlePointerLeave = () => {
      isHoveringRef.current = false;
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
            height={429}
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
