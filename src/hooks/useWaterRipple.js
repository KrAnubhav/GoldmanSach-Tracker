import { useEffect, useRef, useCallback } from 'react';

export const useWaterRipple = (canvasRef) => {
    const ripples = useRef([]);
    const lastMousePos = useRef({ x: 0, y: 0 });
    const lastMouseTime = useRef(Date.now());
    const animationFrameId = useRef(null);

    const createRipple = useCallback((x, y, intensity = 1) => {
        ripples.current.push({
            x,
            y,
            radius: 0,
            maxRadius: 100 + intensity * 50,
            alpha: 0.6,
            speed: 2 + intensity * 0.5,
            intensity
        });

        // Limit the number of ripples for performance
        if (ripples.current.length > 50) {
            ripples.current.shift();
        }
    }, []);

    const calculateSpeed = useCallback((x, y) => {
        const now = Date.now();
        const timeDiff = now - lastMouseTime.current;
        const distance = Math.sqrt(
            Math.pow(x - lastMousePos.current.x, 2) +
            Math.pow(y - lastMousePos.current.y, 2)
        );

        lastMousePos.current = { x, y };
        lastMouseTime.current = now;

        // Calculate speed (pixels per millisecond)
        const speed = timeDiff > 0 ? distance / timeDiff : 0;
        return Math.min(speed * 10, 5); // Normalize and cap the speed
    }, []);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw ripples
        ripples.current = ripples.current.filter(ripple => {
            ripple.radius += ripple.speed;
            ripple.alpha -= 0.01;

            if (ripple.alpha <= 0 || ripple.radius >= ripple.maxRadius) {
                return false;
            }

            // Draw ripple with gradient
            const gradient = ctx.createRadialGradient(
                ripple.x, ripple.y, ripple.radius * 0.8,
                ripple.x, ripple.y, ripple.radius
            );

            gradient.addColorStop(0, `rgba(147, 197, 253, ${ripple.alpha * 0.3})`); // blue-300
            gradient.addColorStop(0.5, `rgba(96, 165, 250, ${ripple.alpha * 0.5})`); // blue-400
            gradient.addColorStop(1, `rgba(59, 130, 246, ${ripple.alpha * 0.2})`); // blue-500

            ctx.beginPath();
            ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2 + ripple.intensity;
            ctx.stroke();

            // Inner ripple for more depth
            ctx.beginPath();
            ctx.arc(ripple.x, ripple.y, ripple.radius * 0.7, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(191, 219, 254, ${ripple.alpha * 0.4})`; // blue-200
            ctx.lineWidth = 1;
            ctx.stroke();

            return true;
        });

        animationFrameId.current = requestAnimationFrame(animate);
    }, [canvasRef]);

    const handleMouseMove = useCallback((e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const speed = calculateSpeed(x, y);

        // Create ripples based on speed
        if (speed > 0.5) {
            createRipple(x, y, speed);
        }
    }, [canvasRef, calculateSpeed, createRipple]);

    const handleClick = useCallback((e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Create multiple ripples on click for denser waves
        createRipple(x, y, 3);
        setTimeout(() => createRipple(x, y, 2.5), 100);
        setTimeout(() => createRipple(x, y, 2), 200);
    }, [canvasRef, createRipple]);

    const handleMouseEnter = useCallback((e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Create a ripple when entering the blue area
        createRipple(x, y, 1.5);
    }, [canvasRef, createRipple]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Start animation loop
        animationFrameId.current = requestAnimationFrame(animate);

        // Add event listeners
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('click', handleClick);
        canvas.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('click', handleClick);
            canvas.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [canvasRef, animate, handleMouseMove, handleClick, handleMouseEnter]);

    return { createRipple };
};
