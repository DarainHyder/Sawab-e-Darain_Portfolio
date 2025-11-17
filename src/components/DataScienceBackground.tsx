import { useEffect, useRef } from 'react';

interface Neuron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulseOffset: number;
}

interface Pulse {
  from: Neuron;
  to: Neuron;
  progress: number;
  speed: number;
}

const DataScienceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let neurons: Neuron[] = [];
    let pulses: Pulse[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initNeurons = () => {
      neurons = [];
      const neuronCount = Math.floor((canvas.width * canvas.height) / 25000);
      
      for (let i = 0; i < neuronCount; i++) {
        neurons.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: 2 + Math.random() * 2,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const createPulse = () => {
      if (neurons.length < 2) return;
      
      const from = neurons[Math.floor(Math.random() * neurons.length)];
      const nearbyNeurons = neurons.filter(n => {
        const dx = n.x - from.x;
        const dy = n.y - from.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance > 0 && distance < 200;
      });

      if (nearbyNeurons.length > 0) {
        const to = nearbyNeurons[Math.floor(Math.random() * nearbyNeurons.length)];
        pulses.push({
          from,
          to,
          progress: 0,
          speed: 0.005 + Math.random() * 0.01,
        });
      }
    };

    const drawNeuron = (neuron: Neuron, time: number) => {
      const pulse = Math.sin(time * 0.001 + neuron.pulseOffset) * 0.3 + 0.7;
      const glowIntensity = pulse * 0.6;

      // Outer glow
      const gradient = ctx.createRadialGradient(
        neuron.x, neuron.y, 0,
        neuron.x, neuron.y, neuron.radius * 4
      );
      gradient.addColorStop(0, `rgba(100, 180, 255, ${glowIntensity * 0.8})`);
      gradient.addColorStop(0.5, `rgba(120, 140, 255, ${glowIntensity * 0.3})`);
      gradient.addColorStop(1, 'rgba(100, 180, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, neuron.radius * 4, 0, Math.PI * 2);
      ctx.fill();

      // Core
      ctx.fillStyle = `rgba(150, 200, 255, ${pulse})`;
      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, neuron.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawConnection = (from: Neuron, to: Neuron, opacity: number) => {
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 200) {
        const fadeOpacity = (1 - distance / 200) * opacity * 0.15;
        
        const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        gradient.addColorStop(0, `rgba(100, 180, 255, ${fadeOpacity})`);
        gradient.addColorStop(0.5, `rgba(140, 120, 255, ${fadeOpacity * 1.2})`);
        gradient.addColorStop(1, `rgba(100, 180, 255, ${fadeOpacity})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }
    };

    const drawPulse = (pulse: Pulse) => {
      const x = pulse.from.x + (pulse.to.x - pulse.from.x) * pulse.progress;
      const y = pulse.from.y + (pulse.to.y - pulse.from.y) * pulse.progress;

      // Pulse glow
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
      gradient.addColorStop(0, 'rgba(150, 220, 255, 0.9)');
      gradient.addColorStop(0.5, 'rgba(120, 160, 255, 0.5)');
      gradient.addColorStop(1, 'rgba(100, 180, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();

      // Pulse core
      ctx.fillStyle = 'rgba(200, 230, 255, 1)';
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = (time: number) => {
      ctx.fillStyle = 'rgba(10, 15, 30, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update neuron positions
      neurons.forEach(neuron => {
        neuron.x += neuron.vx;
        neuron.y += neuron.vy;

        if (neuron.x < 0 || neuron.x > canvas.width) neuron.vx *= -1;
        if (neuron.y < 0 || neuron.y > canvas.height) neuron.vy *= -1;
      });

      // Draw connections
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          drawConnection(neurons[i], neurons[j], 1);
        }
      }

      // Draw neurons
      neurons.forEach(neuron => drawNeuron(neuron, time));

      // Update and draw pulses
      pulses = pulses.filter(pulse => {
        pulse.progress += pulse.speed;
        if (pulse.progress < 1) {
          drawPulse(pulse);
          return true;
        }
        return false;
      });

      // Create new pulses randomly
      if (Math.random() < 0.03 && pulses.length < 15) {
        createPulse();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initNeurons();
    animate(0);

    const handleResize = () => {
      resizeCanvas();
      initNeurons();
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
      style={{ background: '#0a0f1e' }}
    />
  );
};

export default DataScienceBackground;