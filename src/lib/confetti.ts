/**
 * Lightweight, high-performance colorful confetti / sprinkles canvas particle emitter.
 * Runs smoothly on both mobile and desktop with zero external dependencies.
 */

export interface ConfettiOptions {
  particleCount?: number;
  origin?: { x?: number; y?: number };
  spread?: number;
  startVelocity?: number;
  colors?: string[];
}

const SPRINKLE_COLORS = [
  "#FF6B6B", // coral pink
  "#4ECDC4", // pastel cyan
  "#FFD166", // bright golden yellow
  "#06D6A0", // emerald mint
  "#118AB2", // deep blue
  "#9D4EDD", // royal violet
  "#FF9F1C", // vibrant orange
  "#E0AAFF", // pastel lavender
  "#F72585", // hot pink
  "#B5E48C", // light lime green
  "#D4AF37", // metallic gold
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  shape: "circle" | "rect" | "strip" | "star";
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  decay: number;
  wobble: number;
  wobbleSpeed: number;
}

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let animationFrameId: number | null = null;
let particles: Particle[] = [];

function ensureCanvas(): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } | null {
  if (typeof window === "undefined") return null;

  if (!canvas || !document.body.contains(canvas)) {
    canvas = document.createElement("canvas");
    canvas.id = "vastu-sprinkles-canvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "999999";
    document.body.appendChild(canvas);

    const onResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth * window.devicePixelRatio;
        canvas.height = window.innerHeight * window.devicePixelRatio;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();
  }

  if (!ctx && canvas) {
    ctx = canvas.getContext("2d");
  }

  return canvas && ctx ? { canvas, ctx } : null;
}

function createParticle(originX: number, originY: number, spread: number, startVelocity: number, colors: string[]): Particle {
  const angle = (Math.PI / 2) + (Math.random() - 0.5) * spread;
  const speed = startVelocity * (0.6 + Math.random() * 0.8);
  const shapes: Particle["shape"][] = ["circle", "rect", "strip", "star"];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];

  return {
    x: originX,
    y: originY,
    vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1),
    vy: -Math.abs(Math.sin(angle) * speed),
    size: 6 + Math.random() * 8,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.25,
    opacity: 1,
    decay: 0.008 + Math.random() * 0.012,
    wobble: Math.random() * 10,
    wobbleSpeed: 0.08 + Math.random() * 0.08,
  };
}

function drawStar(c: CanvasRenderingContext2D, size: number) {
  c.beginPath();
  for (let i = 0; i < 4; i++) {
    c.lineTo(Math.cos((i * Math.PI) / 2) * size, Math.sin((i * Math.PI) / 2) * size);
    c.lineTo(Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.4), Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.4));
  }
  c.closePath();
  c.fill();
}

function updateAndRender() {
  const env = ensureCanvas();
  if (!env) return;
  const { canvas: c, ctx: context } = env;

  context.clearRect(0, 0, c.width, c.height);

  const scale = window.devicePixelRatio || 1;
  context.save();
  context.scale(scale, scale);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];

    // Physics
    p.wobble += p.wobbleSpeed;
    p.x += p.vx + Math.sin(p.wobble) * 1.5;
    p.y += p.vy;
    p.vy += 0.28; // gravity
    p.vx *= 0.985;
    p.vy *= 0.985;
    p.rotation += p.rotationSpeed;
    p.opacity -= p.decay;

    if (p.opacity <= 0 || p.y > window.innerHeight + 50) {
      particles.splice(i, 1);
      continue;
    }

    context.save();
    context.translate(p.x, p.y);
    context.rotate(p.rotation);
    context.globalAlpha = Math.max(0, p.opacity);
    context.fillStyle = p.color;

    if (p.shape === "circle") {
      context.beginPath();
      context.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      context.fill();
    } else if (p.shape === "rect") {
      context.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    } else if (p.shape === "strip") {
      context.fillRect(-p.size * 0.75, -p.size * 0.25, p.size * 1.5, p.size * 0.5);
    } else {
      drawStar(context, p.size);
    }

    context.restore();
  }

  context.restore();

  if (particles.length > 0) {
    animationFrameId = requestAnimationFrame(updateAndRender);
  } else {
    context.clearRect(0, 0, c.width, c.height);
    animationFrameId = null;
  }
}

/**
 * Trigger a celebratory burst of colorful sprinkles across the screen.
 */
export function fireSprinkles(options: ConfettiOptions = {}) {
  if (typeof window === "undefined") return;

  const env = ensureCanvas();
  if (!env) return;

  const count = options.particleCount ?? 80;
  const spread = options.spread ?? Math.PI * 0.85;
  const startVelocity = options.startVelocity ?? 16;
  const colors = options.colors ?? SPRINKLE_COLORS;

  const originX = options.origin?.x ?? window.innerWidth * 0.5;
  const originY = options.origin?.y ?? Math.min(window.innerHeight * 0.45, 350);

  // Spawn particles
  for (let i = 0; i < count; i++) {
    particles.push(createParticle(originX, originY, spread, startVelocity, colors));
  }

  // Also spawn a secondary burst on the right side if near cart drawer
  const rightOriginX = Math.min(window.innerWidth - 180, window.innerWidth * 0.85);
  for (let i = 0; i < Math.floor(count * 0.5); i++) {
    particles.push(createParticle(rightOriginX, originY * 0.8, spread * 0.7, startVelocity * 0.85, colors));
  }

  if (!animationFrameId) {
    animationFrameId = requestAnimationFrame(updateAndRender);
  }
}
