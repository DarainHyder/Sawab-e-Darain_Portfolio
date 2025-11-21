import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
}

interface DataStream {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
}

interface GradientOrb {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  hue: number;
}

const DataScienceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let dataStreams: DataStream[] = [];
    let gradientOrbs: GradientOrb[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          hue: Math.random() > 0.5 ? 0 : 340, // Red or pink hues
        });
      }
    };

    const initDataStreams = () => {
      dataStreams = [];
      for (let i = 0; i < 12; i++) {
        dataStreams.push({
          x: Math.random() * canvas.width,
          y: -Math.random() * canvas.height,
          speed: Math.random() * 1.5 + 0.8,
          length: Math.random() * 100 + 50,
          opacity: Math.random() * 0.3 + 0.2,
        });
      }
    };

    const initGradientOrbs = () => {
      gradientOrbs = [];
      for (let i = 0; i < 4; i++) {
        gradientOrbs.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 200 + 150,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          hue: Math.random() > 0.5 ? 0 : 340,
        });
      }
    };

    const drawGradientMesh = (time: number) => {
      // Create flowing gradient mesh effect
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.3 + Math.sin(time * 0.0005) * 100,
        canvas.height * 0.3 + Math.cos(time * 0.0007) * 100,
        0,
        canvas.width * 0.3,
        canvas.height * 0.3,
        canvas.width * 0.4
      );
      gradient1.addColorStop(0, 'rgba(255, 69, 58, 0.15)');
      gradient1.addColorStop(0.5, 'rgba(255, 45, 85, 0.08)');
      gradient1.addColorStop(1, 'rgba(255, 69, 58, 0)');

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.7 + Math.cos(time * 0.0006) * 150,
        canvas.height * 0.6 + Math.sin(time * 0.0008) * 150,
        0,
        canvas.width * 0.7,
        canvas.height * 0.6,
        canvas.width * 0.5
      );
      gradient2.addColorStop(0, 'rgba(255, 100, 120, 0.12)');
      gradient2.addColorStop(0.5, 'rgba(255, 69, 58, 0.06)');
      gradient2.addColorStop(1, 'rgba(255, 45, 85, 0)');

      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawGradientOrb = (orb: GradientOrb, time: number) => {
      const pulse = Math.sin(time * 0.001) * 0.2 + 0.8;
      
      const gradient = ctx.createRadialGradient(
        orb.x, orb.y, 0,
        orb.x, orb.y, orb.radius * pulse
      );
      
      gradient.addColorStop(0, `hsla(${orb.hue}, 100%, 65%, 0.15)`);
      gradient.addColorStop(0.4, `hsla(${orb.hue}, 100%, 60%, 0.08)`);
      gradient.addColorStop(0.7, `hsla(${orb.hue}, 100%, 55%, 0.03)`);
      gradient.addColorStop(1, `hsla(${orb.hue}, 100%, 50%, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.radius * pulse, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawParticle = (particle: Particle, time: number) => {
      const pulse = Math.sin(time * 0.002 + particle.x) * 0.3 + 0.7;
      
      // Particle glow
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 4
      );
      gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, ${particle.opacity * pulse})`);
      gradient.addColorStop(0.5, `hsla(${particle.hue}, 100%, 60%, ${particle.opacity * pulse * 0.5})`);
      gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 50%, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
      ctx.fill();

      // Particle core
      ctx.fillStyle = `hsla(${particle.hue}, 100%, 80%, ${particle.opacity * pulse})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particles[i].x;
          const dy = particles[j].y - particles[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.15;
            
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, `rgba(255, 69, 58, ${opacity})`);
            gradient.addColorStop(0.5, `rgba(255, 100, 120, ${opacity * 1.2})`);
            gradient.addColorStop(1, `rgba(255, 45, 85, ${opacity})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const drawDataStream = (stream: DataStream) => {
      const gradient = ctx.createLinearGradient(
        stream.x, stream.y - stream.length,
        stream.x, stream.y
      );
      gradient.addColorStop(0, 'rgba(255, 69, 58, 0)');
      gradient.addColorStop(0.5, `rgba(255, 100, 120, ${stream.opacity})`);
      gradient.addColorStop(1, `rgba(255, 69, 58, ${stream.opacity * 0.3})`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(stream.x, stream.y - stream.length);
      ctx.lineTo(stream.x, stream.y);
      ctx.stroke();

      // Glowing head
      const headGradient = ctx.createRadialGradient(
        stream.x, stream.y, 0,
        stream.x, stream.y, 8
      );
      headGradient.addColorStop(0, `rgba(255, 150, 150, ${stream.opacity * 1.2})`);
      headGradient.addColorStop(0.5, `rgba(255, 100, 120, ${stream.opacity * 0.6})`);
      headGradient.addColorStop(1, 'rgba(255, 69, 58, 0)');

      ctx.fillStyle = headGradient;
      ctx.beginPath();
      ctx.arc(stream.x, stream.y, 8, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawMLText = (time: number) => {
      ctx.font = '12px monospace';
      ctx.fillStyle = `rgba(255, 69, 58, ${0.12 + Math.sin(time * 0.001) * 0.03})`;
      
      const texts = ['AI', 'ML', 'DL', 'NN', 'NLP', 'CV', 'RNN', 'CNN', 'GPU', 'TPU'];
      
      texts.forEach((text, i) => {
        const x = (canvas.width / (texts.length + 1)) * (i + 1) + Math.sin(time * 0.0005 + i) * 20;
        const y = 40 + Math.cos(time * 0.0008 + i) * 15;
        ctx.fillText(text, x, y);
      });
    };

    const animate = (time: number) => {
      // Dark background
      ctx.fillStyle = 'rgba(10, 10, 10, 0.95)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw gradient mesh
      drawGradientMesh(time);

      // Update and draw gradient orbs
      gradientOrbs.forEach(orb => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -orb.radius || orb.x > canvas.width + orb.radius) orb.vx *= -1;
        if (orb.y < -orb.radius || orb.y > canvas.height + orb.radius) orb.vy *= -1;

        drawGradientOrb(orb, time);
      });

      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        drawParticle(particle, time);
      });

      // Draw connections
      drawConnections();

      // Update and draw data streams
      dataStreams.forEach(stream => {
        stream.y += stream.speed;

        if (stream.y > canvas.height + stream.length) {
          stream.y = -stream.length;
          stream.x = Math.random() * canvas.width;
        }

        drawDataStream(stream);
      });

      // Draw ML text
      drawMLText(time);

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    initDataStreams();
    initGradientOrbs();
    animate(0);

    const handleResize = () => {
      resizeCanvas();
      initParticles();
      initDataStreams();
      initGradientOrbs();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: '#0a0a0a' }}
    />
  );
};

export default DataScienceBackground;
