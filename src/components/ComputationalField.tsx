import { useEffect, useRef } from 'react';

/**
 * A restrained, abstract computational field: a slowly drifting lattice of
 * nodes connected by faint lines, with a single accent node pulsing softly.
 * Pure canvas — no AI imagery, no gradients. Respects prefers-reduced-motion.
 */
export function ComputationalField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Node = { x: number; y: number; vx: number; vy: number; baseX: number; baseY: number };
    let nodes: Node[] = [];
    let raf = 0;
    let t = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
    };

    const buildNodes = () => {
      const cols = Math.max(6, Math.floor(width / 90));
      const rows = Math.max(5, Math.floor(height / 90));
      const padX = width / (cols + 1);
      const padY = height / (rows + 1);
      nodes = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = padX * (c + 1);
          const y = padY * (r + 1);
          nodes.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: (Math.random() - 0.5) * 0.12,
            vy: (Math.random() - 0.5) * 0.12,
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // drift
      for (const n of nodes) {
        if (!reduceMotion) {
          n.x += n.vx;
          n.y += n.vy;
          // gentle pull back toward base position
          n.x += (n.baseX - n.x) * 0.008;
          n.y += (n.baseY - n.y) * 0.008;
        }
      }

      // connection lines
      const maxDist = 120;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.22;
            ctx.strokeStyle = `rgba(122, 122, 130, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const isAccent = i === Math.floor(nodes.length / 2) + 1;
        if (isAccent) {
          const pulse = reduceMotion ? 0.7 : 0.5 + Math.sin(t * 0.0016) * 0.3;
          ctx.fillStyle = `rgba(232, 90, 142, ${0.5 * pulse})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 3 + pulse * 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = `rgba(232, 90, 142, ${0.25 * pulse})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 10 + pulse * 6, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.fillStyle = 'rgba(168, 168, 176, 0.45)';
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      t += 1;
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    const onResize = () => {
      cancelAnimationFrame(raf);
      resize();
      draw();
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      aria-hidden="true"
      role="presentation"
    />
  );
}
