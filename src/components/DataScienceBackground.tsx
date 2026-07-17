import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  radius: number;
  baseRadius: number;
  color: string;
}

const DataScienceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false }); // Optimize
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let targets: { x: number, y: number }[] = [];
    
    // Physics constants
    const SPRING = 0.05;
    const FRICTION = 0.90;
    const MOUSE_RADIUS = 150;
    const MOUSE_REPULSION = 1.5;

    let mouse = {
      x: -1000,
      y: -1000,
      isActive: false
    };

    const extractTextPixels = () => {
      const textCanvas = document.createElement('canvas');
      textCanvas.width = canvas.width;
      textCanvas.height = canvas.height;
      const tCtx = textCanvas.getContext('2d', { willReadFrequently: true });
      if (!tCtx) return;

      tCtx.fillStyle = 'white';
      // Dynamically size font based on screen width so the long text fits
      const fontSize = Math.min(canvas.width / 10, 150);
      tCtx.font = `900 ${fontSize}px Inter, system-ui, sans-serif`;
      tCtx.textAlign = 'center';
      tCtx.textBaseline = 'middle';
      
      // Draw text slightly offset upwards to center better visually
      tCtx.fillText('SAWAB_E_DARAIN', canvas.width / 2, canvas.height / 2 - fontSize * 0.1);

      const imageData = tCtx.getImageData(0, 0, textCanvas.width, textCanvas.height).data;
      targets = [];
      
      // Step controls particle density (lower = more particles)
      const step = canvas.width < 768 ? 6 : 8; 

      for (let y = 0; y < textCanvas.height; y += step) {
        for (let x = 0; x < textCanvas.width; x += step) {
          const index = (y * textCanvas.width + x) * 4;
          const alpha = imageData[index + 3];
          
          if (alpha > 128) {
            targets.push({ x, y });
          }
        }
      }
    };

    const initParticles = () => {
      extractTextPixels();
      
      const newParticles: Particle[] = [];
      
      // Assign particles to targets
      for (let i = 0; i < targets.length; i++) {
        // If we already have a particle from a previous resize, keep it but give it a new target
        if (i < particles.length) {
          const p = particles[i];
          p.targetX = targets[i].x;
          p.targetY = targets[i].y;
          newParticles.push(p);
        } else {
          // Spawn new particles at random edges
          const radius = Math.random() * 1.5 + 0.5;
          newParticles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: 0,
            vy: 0,
            targetX: targets[i].x,
            targetY: targets[i].y,
            radius: radius,
            baseRadius: radius,
            color: `rgba(255, 69, 58, ${Math.random() * 0.3 + 0.2})`
          });
        }
      }
      
      particles = newParticles;
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const draw = () => {
      // Solid black background with very subtle motion blur
      ctx.fillStyle = 'rgba(5, 0, 0, 0.4)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Calculate distance to mouse
        let dxMouse = mouse.x - p.x;
        let dyMouse = mouse.y - p.y;
        let distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        // 2. Mouse Repulsion Force
        if (mouse.isActive && distMouse < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - distMouse) / MOUSE_RADIUS;
          const angle = Math.atan2(dyMouse, dxMouse);
          
          // Push away
          p.vx -= Math.cos(angle) * force * MOUSE_REPULSION;
          p.vy -= Math.sin(angle) * force * MOUSE_REPULSION;
        }

        // 3. Spring attraction back to target position
        const dxTarget = p.targetX - p.x;
        const dyTarget = p.targetY - p.y;
        
        p.vx += dxTarget * SPRING;
        p.vy += dyTarget * SPRING;

        // 4. Apply friction
        p.vx *= FRICTION;
        p.vy *= FRICTION;

        // 5. Update position
        p.x += p.vx;
        p.y += p.vy;

        // 6. Draw Particle
        ctx.beginPath();
        ctx.fillStyle = p.color;
        // Optimization: use rect instead of arc for thousands of particles
        ctx.rect(p.x, p.y, p.radius * 2, p.radius * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
      // Throw mouse offscreen so particles settle
      mouse.x = -1000;
      mouse.y = -1000;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
      mouse.isActive = true;
    };

    resizeCanvas();
    draw();

    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 200);
    };

    window.addEventListener('resize', debouncedResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseLeave);
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto z-0"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default DataScienceBackground;
