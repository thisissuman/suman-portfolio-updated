'use client';

import { useEffect, useRef } from 'react';

/** A projected, rotating star sphere inspired by the original portfolio. No WebGL. */
export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let width = 0;
    let height = 0;
    let angle = 0;
    let elapsed = 0;
    let previous = 0;
    let color = '';
    // Deterministic points avoid hydration randomness and keep a stable sky on resize.
    const stars = Array.from({ length: 380 }, (_, i) => {
      const y = 1 - (i / 379) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = i * 2.399963;
      return { x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius };
    });
    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = color;
      const count = width < 600 ? 160 : stars.length;
      for (let i = 0; i < count; i++) {
        const star = stars[Math.floor((i * stars.length) / count)];
        const x = star.x * Math.cos(angle) - star.z * Math.sin(angle);
        const z = star.x * Math.sin(angle) + star.z * Math.cos(angle);
        const depth = 2.2 / (2.2 + z);
        const px = width / 2 + x * width * 0.64 * depth;
        const py = height / 2 + star.y * height * 0.64 * depth;
        const twinkle = 0.5 + 0.5 * Math.sin(elapsed * (0.85 + (i % 7) * 0.09) + i * 2.4);
        const radius = Math.min(2.2, 0.95 * depth);
        context.globalAlpha = (0.24 + (1 - (z + 1) / 2) * 0.5) * (0.55 + twinkle * 0.45);
        context.beginPath();
        context.arc(px, py, radius, 0, Math.PI * 2);
        context.fill();
        // A few softly breathing four-point glints, never a full-screen flash.
        if (i % 13 === 0) {
          const reach = radius * (2.2 + twinkle * 1.3);
          const core = radius * 0.45;
          context.globalAlpha *= 0.25 + twinkle * 0.5;
          context.beginPath();
          context.moveTo(px, py - reach);
          context.lineTo(px + core, py - core);
          context.lineTo(px + reach, py);
          context.lineTo(px + core, py + core);
          context.lineTo(px, py + reach);
          context.lineTo(px - core, py + core);
          context.lineTo(px - reach, py);
          context.lineTo(px - core, py - core);
          context.closePath();
          context.fill();
        }
      }
    };
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      color = getComputedStyle(document.documentElement).getPropertyValue('--star-color').trim();
      draw();
    };
    const tick = (now: number) => {
      if (now - previous >= 33) {
        const delta = Math.min(now - previous, 50);
        angle += delta * 0.000014;
        elapsed += delta / 1000;
        previous = now;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      resize();
      if (!reduce.matches && !document.hidden) {
        previous = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const observer = new MutationObserver(resize);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', sync);
    reduce.addEventListener('change', sync);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', sync);
      reduce.removeEventListener('change', sync);
    };
  }, []);

  return <canvas ref={canvasRef} className="star-field" aria-hidden="true" />;
}
