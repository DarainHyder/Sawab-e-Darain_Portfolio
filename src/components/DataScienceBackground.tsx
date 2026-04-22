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
    const NEURON_COUNT = 20;

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
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          radius: 3 + Math.random() * 2,
          connections: [],
          activationLevel: Math.random(),
          pulsePhase: Math.random() * Math.PI * 2,
        };
        neurons.push(neuron);
      }

      // Create connections between neurons
      neurons.forEach((neuron, i) => {
        const connectionCount = 2 + Math.floor(Math.random() * 2);
        const possibleConnections = neurons
          .map((_, idx) => idx)
          .filter(idx => idx !== i)
          .sort(() => Math.random() - 0.5);
        
        neuron.connections = possibleConnections.slice(0, connectionCount);
      });
    };

    const drawNeuron = (neuron: Neuron, time: number) => {
      const pulse = Math.sin(time * 0.0012 + neuron.pulsePhase) * 0.2 + 0.8;
      const activation = neuron.activationLevel * pulse;

      // Glow (Simplified)
      ctx.fillStyle = `rgba(255, 69, 58, ${activation * 0.3})`;
      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, neuron.radius * 4, 0, Math.PI * 2);
      ctx.fill();

      // Body (Simplified)
      ctx.fillStyle = `rgba(255, 100, 120, ${activation})`;
      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, neuron.radius, 0, Math.PI * 2);
      ctx.fill();

      // Bright core
      ctx.fillStyle = `rgba(255, 255, 255, ${activation})`;
      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, neuron.radius * 0.4, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawConnection = (from: Neuron, to: Neuron) => {
      const opacity = (from.activationLevel + to.activationLevel) * 0.08;
      ctx.strokeStyle = `rgba(255, 69, 58, ${opacity})`;
      ctx.lineWidth = 0.5;
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

      ctx.fillStyle = `rgba(255, 150, 150, ${pulse.strength})`;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
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
        speed: 0.01 + Math.random() * 0.01,
        strength: 0.8,
      });

      fromNeuron.activationLevel = Math.min(1, fromNeuron.activationLevel + 0.2);
    };

    const animate = (time: number) => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.95)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      neurons.forEach((neuron) => {
        neuron.x += neuron.vx;
        neuron.y += neuron.vy;

        if (neuron.x < 50 || neuron.x > canvas.width - 50) neuron.vx *= -1;
        if (neuron.y < 50 || neuron.y > canvas.height - 50) neuron.vy *= -1;

        neuron.activationLevel *= 0.985;
      });

      neurons.forEach((neuron) => {
        neuron.connections.forEach(targetIdx => {
          drawConnection(neuron, neurons[targetIdx]);
        });
      });

      signalPulses = signalPulses.filter(pulse => {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          neurons[pulse.toIndex].activationLevel = Math.min(1, neurons[pulse.toIndex].activationLevel + 0.3);
          return false;
        }
        drawSignalPulse(pulse);
        return true;
      });

      neurons.forEach(neuron => drawNeuron(neuron, time));

      if (Math.random() < 0.08 && signalPulses.length < 10) {
        createSignalPulse();
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
