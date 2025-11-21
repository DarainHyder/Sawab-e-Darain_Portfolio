import { useEffect, useRef } from 'react';

interface Neuron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  connections: number[];
  activationLevel: number;
  pulsePhase: number;
}

interface SignalPulse {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  strength: number;
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
    let signalPulses: SignalPulse[] = [];
    const NEURON_COUNT = 30;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initNeurons = () => {
      neurons = [];
      const padding = 100;
      
      for (let i = 0; i < NEURON_COUNT; i++) {
        const neuron: Neuron = {
          x: padding + Math.random() * (canvas.width - padding * 2),
          y: padding + Math.random() * (canvas.height - padding * 2),
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          radius: 4 + Math.random() * 3,
          connections: [],
          activationLevel: Math.random(),
          pulsePhase: Math.random() * Math.PI * 2,
        };
        neurons.push(neuron);
      }

      // Create connections between neurons
      neurons.forEach((neuron, i) => {
        const connectionCount = 3 + Math.floor(Math.random() * 4); // 3-6 connections per neuron
        const possibleConnections = neurons
          .map((_, idx) => idx)
          .filter(idx => idx !== i)
          .sort(() => Math.random() - 0.5);
        
        neuron.connections = possibleConnections.slice(0, connectionCount);
      });
    };

    const drawNeuron = (neuron: Neuron, time: number) => {
      const pulse = Math.sin(time * 0.0012 + neuron.pulsePhase) * 0.3 + 0.7;
      const activation = neuron.activationLevel * pulse;

      // Outer glow
      const outerGlow = ctx.createRadialGradient(
        neuron.x, neuron.y, 0,
        neuron.x, neuron.y, neuron.radius * 8
      );
      outerGlow.addColorStop(0, `rgba(255, 69, 58, ${activation * 0.4})`);
      outerGlow.addColorStop(0.5, `rgba(255, 100, 120, ${activation * 0.2})`);
      outerGlow.addColorStop(1, 'rgba(255, 69, 58, 0)');

      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, neuron.radius * 8, 0, Math.PI * 2);
      ctx.fill();

      // Neuron body
      const bodyGradient = ctx.createRadialGradient(
        neuron.x, neuron.y, 0,
        neuron.x, neuron.y, neuron.radius
      );
      bodyGradient.addColorStop(0, `rgba(255, 150, 150, ${activation})`);
      bodyGradient.addColorStop(0.6, `rgba(255, 100, 120, ${activation * 0.9})`);
      bodyGradient.addColorStop(1, `rgba(255, 69, 58, ${activation * 0.8})`);

      ctx.fillStyle = bodyGradient;
      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, neuron.radius, 0, Math.PI * 2);
      ctx.fill();

      // Bright core
      ctx.fillStyle = `rgba(255, 200, 200, ${activation * 0.9})`;
      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, neuron.radius * 0.5, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawConnection = (from: Neuron, to: Neuron) => {
      const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
      const opacity = (from.activationLevel + to.activationLevel) * 0.1;
      
      gradient.addColorStop(0, `rgba(255, 69, 58, ${opacity})`);
      gradient.addColorStop(0.5, `rgba(255, 100, 120, ${opacity * 0.8})`);
      gradient.addColorStop(1, `rgba(255, 45, 85, ${opacity})`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    };

    const drawSignalPulse = (pulse: SignalPulse) => {
      const from = neurons[pulse.fromIndex];
      const to = neurons[pulse.toIndex];
      
      const x = from.x + (to.x - from.x) * pulse.progress;
      const y = from.y + (to.y - from.y) * pulse.progress;

      // Signal glow
      const signalGlow = ctx.createRadialGradient(x, y, 0, x, y, 12);
      signalGlow.addColorStop(0, `rgba(255, 150, 150, ${pulse.strength})`);
      signalGlow.addColorStop(0.4, `rgba(255, 100, 120, ${pulse.strength * 0.8})`);
      signalGlow.addColorStop(0.8, `rgba(255, 69, 58, ${pulse.strength * 0.4})`);
      signalGlow.addColorStop(1, 'rgba(255, 69, 58, 0)');

      ctx.fillStyle = signalGlow;
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.fill();

      // Signal core
      ctx.fillStyle = `rgba(255, 220, 220, ${pulse.strength})`;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    };

    const createSignalPulse = () => {
      if (neurons.length === 0) return;
      
      const fromIndex = Math.floor(Math.random() * neurons.length);
      const fromNeuron = neurons[fromIndex];
      
      if (fromNeuron.connections.length === 0) return;
      
      const toIndex = fromNeuron.connections[Math.floor(Math.random() * fromNeuron.connections.length)];
      
      signalPulses.push({
        fromIndex,
        toIndex,
        progress: 0,
        speed: 0.008 + Math.random() * 0.012,
        strength: 0.7 + Math.random() * 0.3,
      });

      // Activate neurons
      fromNeuron.activationLevel = Math.min(1, fromNeuron.activationLevel + 0.3);
    };

    const animate = (time: number) => {
      // Dark background with slight fade for trails
      ctx.fillStyle = 'rgba(10, 10, 10, 0.92)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update neurons
      neurons.forEach((neuron, i) => {
        // Gentle drift
        neuron.x += neuron.vx;
        neuron.y += neuron.vy;

        // Boundary bounce
        if (neuron.x < 50 || neuron.x > canvas.width - 50) neuron.vx *= -1;
        if (neuron.y < 50 || neuron.y > canvas.height - 50) neuron.vy *= -1;

        // Decay activation
        neuron.activationLevel *= 0.98;
      });

      // Draw all connections
      neurons.forEach((neuron, i) => {
        neuron.connections.forEach(targetIdx => {
          drawConnection(neuron, neurons[targetIdx]);
        });
      });

      // Update and draw signal pulses
      signalPulses = signalPulses.filter(pulse => {
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          // Signal reached target, activate it
          neurons[pulse.toIndex].activationLevel = Math.min(1, neurons[pulse.toIndex].activationLevel + 0.4);
          return false;
        }

        drawSignalPulse(pulse);
        return true;
      });

      // Draw all neurons
      neurons.forEach(neuron => drawNeuron(neuron, time));

      // Create new signal pulses frequently
      if (Math.random() < 0.12 && signalPulses.length < 15) {
        createSignalPulse();
      }

      // Occasionally create burst of signals
      if (Math.random() < 0.005) {
        for (let i = 0; i < 3; i++) {
          createSignalPulse();
        }
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
      style={{ background: '#0a0a0a' }}
    />
  );
};

export default DataScienceBackground;
