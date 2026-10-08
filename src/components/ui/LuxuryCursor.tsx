'use client';

import React, { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
}

/**
 * Ultra Luxury Couture Cursor:
 * - Fluid Lerp physics trailing ring with gold/crimson styling
 * - Ambient golden sparkles trail (stardust/shimmer effect)
 * - Click ripple wave effect
 * - Magnetic expansion on interactive elements
 * - Smooth velocity-based stretch
 */
export default function LuxuryCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);

  // Position references for physics
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const prevMousePos = useRef({ x: -100, y: -100 });
  
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sparkles array
  const particles = useRef<Particle[]>([]);
  const particleId = useRef(0);

  useEffect(() => {
    // Only run on PC / non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || window.innerWidth < 768) {
      return;
    }

    setMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Add shimmer sparkle particle when moving
      const dx = e.clientX - prevMousePos.current.x;
      const dy = e.clientY - prevMousePos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 4 && particles.current.length < 24) {
        particleId.current += 1;
        particles.current.push({
          id: particleId.current,
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          size: Math.random() * 2.5 + 1.2,
          opacity: 0.85,
          vx: (Math.random() - 0.5) * 0.8,
          vy: Math.random() * 0.8 + 0.3,
        });
      }
      prevMousePos.current = { x: e.clientX, y: e.clientY };

      // Sync inner dot instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      // Detect interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, input, select, textarea, [role="button"]');
        if (interactive) {
          setIsHovered(true);
          const customText = interactive.getAttribute('data-cursor-text');
          setHoverText(customText || null);
        } else {
          setIsHovered(false);
          setHoverText(null);
        }
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
    };
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Canvas size resize listener
    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Main animation loop
    let animationFrameId: number;
    const render = () => {
      // 1. Lerp physics for trailing ring
      const ease = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // 2. Render shimmer gold sparkles on canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          particles.current = particles.current.filter((p) => p.opacity > 0.05);
          for (let i = 0; i < particles.current.length; i++) {
            const p = particles.current[i];
            p.x += p.vx;
            p.y += p.vy;
            p.opacity *= 0.91; // fade out
            p.size *= 0.96;

            ctx.save();
            ctx.fillStyle = `rgba(245, 197, 66, ${p.opacity})`;
            ctx.shadowColor = '#f5c542';
            ctx.shadowBlur = 4;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!mounted || !isVisible) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* Shimmer Gold Sparkles Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
      />

      {/* Trailing Luxury Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full transition-[width,height,background-color,border-color,box-shadow] duration-200 ease-out flex items-center justify-center will-change-transform ${
          isClicking
            ? 'w-7 h-7 bg-amber-500/30 border-2 border-amber-300 scale-90 shadow-[0_0_20px_rgba(245,197,66,0.8)]'
            : isHovered
            ? 'w-14 h-14 bg-amber-400/20 border-2 border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.6)] backdrop-blur-[1px]'
            : 'w-8 h-8 bg-black/5 border border-amber-500/60 shadow-[0_0_12px_rgba(212,175,55,0.25)]'
        }`}
      >
        {isHovered && (
          <span className="text-[8px] font-bold text-amber-200 tracking-widest uppercase animate-pulse">
            {hoverText || 'VIEW'}
          </span>
        )}
      </div>

      {/* Precise Center Maroon/Gold Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full will-change-transform transition-[background-color,transform,box-shadow] duration-150 ${
          isClicking
            ? 'bg-amber-300 scale-125 shadow-[0_0_12px_#fde047]'
            : isHovered
            ? 'bg-[#d4af37] scale-0'
            : 'bg-[#8b1828] shadow-[0_0_8px_rgba(139,24,40,0.8)]'
        }`}
      />
    </div>
  );
}
