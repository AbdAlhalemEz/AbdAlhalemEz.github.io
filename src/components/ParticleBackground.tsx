"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useTheme } from "next-themes";

interface Bit {
    x: number;
    y: number;
    value: string;
    speed: number;
    opacity: number;
    size: number;
    trail: { y: number; opacity: number }[];
}

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
}

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);
    const bitsRef = useRef<Bit[]>([]);
    const nodesRef = useRef<Node[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentTheme = resolvedTheme || theme;

    const getColors = useCallback(() => {
        return currentTheme === "dark"
            ? ["#38bdf8", "#a78bfa", "#818cf8", "#7dd3fc", "#c4b5fd"]
            : ["#2563eb", "#7c3aed", "#6366f1", "#1d4ed8", "#4f46e5"];
    }, [currentTheme]);

    const initScene = useCallback(
        (width: number, height: number) => {
            const colors = getColors();

            // Init Bits (Binary Stream)
            const bitCount = Math.min(Math.floor(width / 40), 60);
            const bits: Bit[] = [];
            for (let i = 0; i < bitCount; i++) {
                bits.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    value: Math.random() > 0.5 ? "0" : "1",
                    speed: Math.random() * 3 + 2,
                    opacity: Math.random() * 0.4 + 0.1,
                    size: Math.random() * 6 + 10,
                    trail: [],
                });
            }
            bitsRef.current = bits;

            // Init Nodes (Network Graph)
            const nodeCount = Math.min(Math.floor((width * height) / 12000), 100);
            const nodes: Node[] = [];
            for (let i = 0; i < nodeCount; i++) {
                nodes.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.8,
                    vy: (Math.random() - 0.5) * 0.8,
                    size: Math.random() * 3 + 1,
                    opacity: Math.random() * 0.7 + 0.3,
                    color: colors[Math.floor(Math.random() * colors.length)],
                });
            }
            nodesRef.current = nodes;
        },
        [getColors]
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initScene(canvas.width, canvas.height);
        };

        const handleMouse = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleTouchMove = (e: TouchEvent) => {
            const touches = e.touches;
            if (touches && touches.length > 0) {
                mouseRef.current = { x: touches[0].clientX, y: touches[0].clientY };
            }
        };

        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouse, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: true });

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const bits = bitsRef.current;
            const nodes = nodesRef.current;
            const mouse = mouseRef.current;
            const colors = getColors();

            // Set blend mode for glowing effect
            ctx.setTransform(1, 0, 0, 1, 0, 0);

            // Draw Binary Stream (Background)
            ctx.font = "bold 13px font-mono, monospace";
            for (let i = 0; i < bits.length; i++) {
                const b = bits[i];

                // Update trail
                b.trail.unshift({ y: b.y, opacity: b.opacity });
                if (b.trail.length > 5) b.trail.pop();

                // Draw trail
                b.trail.forEach((t, idx) => {
                    ctx.fillStyle = colors[0];
                    ctx.globalAlpha = t.opacity * (1 - idx / 6);
                    ctx.fillText(b.value, b.x, t.y);
                });

                // Update Position
                b.y += b.speed;

                // Randomly change bit value
                if (Math.random() > 0.98) b.value = b.value === "0" ? "1" : "0";

                if (b.y > canvas.height + 20) {
                    b.y = -20;
                    b.x = Math.random() * canvas.width;
                    b.speed = Math.random() * 3 + 2;
                    b.trail = [];
                }

                // Interaction: bits react to mouse
                const bdx = b.x - mouse.x;
                const bdy = b.y - mouse.y;
                const bdist = Math.sqrt(bdx * bdx + bdy * bdy);
                if (bdist < 150) {
                    const force = (150 - bdist) / 150;
                    b.x += (bdx / bdist) * force * 5;
                }
            }

            // Draw Network Nodes (Foreground)
            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];

                // Interaction
                const dx = n.x - mouse.x;
                const dy = n.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 200) {
                    const force = (200 - dist) / 200;
                    n.vx += (dx / dist) * force * 0.6;
                    n.vy += (dy / dist) * force * 0.6;
                    // Glow effect on mouse proximity
                    ctx.shadowBlur = 10 * force;
                    ctx.shadowColor = n.color;
                } else {
                    ctx.shadowBlur = 0;
                }

                n.vx *= 0.97;
                n.vy *= 0.97;
                n.x += n.vx;
                n.y += n.vy;

                // Bounce/Wrap
                if (n.x < 0) n.x = canvas.width;
                if (n.x > canvas.width) n.x = 0;
                if (n.y < 0) n.y = canvas.height;
                if (n.y > canvas.height) n.y = 0;

                // Draw node
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
                ctx.fillStyle = n.color;
                ctx.globalAlpha = n.opacity;
                ctx.fill();

                // Connect nearby nodes
                for (let j = i + 1; j < nodes.length; j++) {
                    const n2 = nodes[j];
                    const dx2 = n.x - n2.x;
                    const dy2 = n.y - n2.y;
                    const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                    if (dist2 < 200) {
                        ctx.beginPath();
                        ctx.moveTo(n.x, n.y);
                        ctx.lineTo(n2.x, n2.y);
                        ctx.strokeStyle = n.color;
                        ctx.globalAlpha = (1 - dist2 / 200) * (currentTheme === "dark" ? 0.25 : 0.3);
                        ctx.lineWidth = 1.0;
                        ctx.stroke();
                    }
                }
            }

            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouse);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, [initScene, currentTheme, getColors]);

    // Server-safe background
    const bgStyle = !mounted
        ? { background: "#020617" }
        : {
            background: currentTheme === "dark"
                ? "linear-gradient(135deg, #020617 0%, #0f172a 50%, #020617 100%)"
                : "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)"
        };

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 -z-10 pointer-events-none transition-colors duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden="true"
            style={bgStyle}
        />
    );
}
