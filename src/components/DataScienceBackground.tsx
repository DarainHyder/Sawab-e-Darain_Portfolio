import { useEffect, useRef } from 'react';

interface Neuron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulseOffset: number;
  layer: number;
}

interface Pulse {
  from: Neuron;
  to: Neuron;
  progress: number;
  speed: number;
}

interface DataParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
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
    let dataParticles: DataParticle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initNeurons = () => {
      neurons = [];
      const layers = 5; // Neural network layers
      const neuronsPerLayer = 8;
      const layerSpacing = canvas.width / (layers + 1);
      const neuronSpacing = canvas.height / (neuronsPerLayer + 1);
      
      // Create structured neural network layers
      for (let layer = 0; layer < layers; layer++) {
        const neuronsInThisLayer = layer === 0 || layer === layers - 1 ? 
          neuronsPerLayer - 2 : neuronsPerLayer;
        const yOffset = (canvas.height - (neuronsInThisLayer * neuronSpacing)) / 2;
        
        for (let i = 0; i < neuronsInThisLayer; i++) {
          neurons.push({
            x: layerSpacing * (layer + 1) + (Math.random() - 0.5) * 40,
            y: yOffset + neuronSpacing * (i + 1) + (Math.random() - 0.5) * 40,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.15,
            radius: 3 + Math.random() * 2,
            pulseOffset: Math.random() * Math.PI * 2,
            layer: layer,
          });
        }
      }

      // Add some random floating neurons
      for (let i = 0; i < 15; i++) {
        neurons.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: 2 + Math.random() * 1.5,
          pulseOffset: Math.random() * Math.PI * 2,
          layer: -1,
        });
      }
    };

    const createPulse = () => {
      if (neurons.length < 2) return;
      
      const layeredNeurons = neurons.filter(n => n.layer >= 0);
      if (layeredNeurons.length === 0) return;
      
      const from = layeredNeurons[Math.floor(Math.random() * layeredNeurons.length)];
      
      // Prefer forward connections (to next layer)
      const targetNeurons = neurons.filter(n => 
        n.layer === from.layer + 1 || 
        (n.layer === from.layer && Math.random() < 0.3)
      );

      if (targetNeurons.length > 0) {
        const to = targetNeurons[Math.floor(Math.random() * targetNeurons.length)];
        pulses.push({
          from,
          to,
          progress: 0,
          speed: 0.01 + Math.random() * 0.015,
        });
      }
    };

    const createDataParticle = () => {
      dataParticles.push({
        x: Math.random() * canvas.width,
        y: -10,
        vx: (Math.random() - 0.5) * 0.5,
        vy: 0.5 + Math.random() * 1,
        life: 1,
      });
    };

    const drawNeuron = (neuron: Neuron, time: number) => {
      const pulse = Math.sin(time * 0.0015 + neuron.pulseOffset) * 0.4 + 0.6;
      const glowIntensity = pulse * 0.9;

      // Larger glow for layer neurons
      const glowRadius = neuron.layer >= 0 ? neuron.radius * 6 : neuron.radius * 4;

      // Outer glow - Red theme
      const gradient = ctx.createRadialGradient(
        neuron.x, neuron.y, 0,
        neuron.x, neuron.y, glowRadius
      );
      gradient.addColorStop(0, `rgba(255, 69, 58, ${glowIntensity})`);
      gradient.addColorStop(0.4, `rgba(255, 45, 85, ${glowIntensity * 0.6})`);
      gradient.addColorStop(1, 'rgba(255, 69, 58, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // Core
      ctx.fillStyle = `rgba(255, 85, 100, ${pulse})`;
      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, neuron.radius, 0, Math.PI * 2);
      ctx.fill();

      // Inner bright core
      ctx.fillStyle = `rgba(255, 180, 180, ${pulse * 0.9})`;
      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, neuron.radius * 0.6, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawConnection = (from: Neuron, to: Neuron) => {
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Draw connections between adjacent layers
      if (from.layer >= 0 && to.layer === from.layer + 1) {
        const fadeOpacity = 0.3;
        
        const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        gradient.addColorStop(0, `rgba(255, 69, 58, ${fadeOpacity})`);
        gradient.addColorStop(0.5, `rgba(255, 45, 85, ${fadeOpacity * 1.2})`);
        gradient.addColorStop(1, `rgba(255, 69, 58, ${fadeOpacity})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }
      // Subtle connections between nearby floating neurons
      else if (distance < 150 && from.layer === -1 && to.layer === -1) {
        const fadeOpacity = (1 - distance / 150) * 0.15;
        ctx.strokeStyle = `rgba(255, 69, 58, ${fadeOpacity})`;
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

      // Pulse outer glow
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 15);
      gradient.addColorStop(0, 'rgba(255, 120, 140, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 69, 58, 0.9)');
      gradient.addColorStop(0.7, 'rgba(255, 45, 85, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 69, 58, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fill();

      // Pulse bright core
      ctx.fillStyle = 'rgba(255, 220, 220, 1)';
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawDataParticle = (particle: DataParticle) => {
      const opacity = particle.life;
      
      ctx.fillStyle = `rgba(255, 100, 120, ${opacity * 0.8})`;
      ctx.fillRect(particle.x - 1, particle.y - 1, 2, 2);
      
      // Trail effect
      ctx.fillStyle = `rgba(255, 69, 58, ${opacity * 0.3})`;
      ctx.fillRect(particle.x - 0.5, particle.y - 5, 1, 5);
    };

    const drawMLText = (time: number) => {
      ctx.font = '11px monospace';
      ctx.fillStyle = `rgba(255, 69, 58, ${0.15 + Math.sin(time * 0.001) * 0.05})`;
      
      const texts = ['ML', 'AI', 'DL', 'NN', 'CNN', 'RNN', 'GPU', 'NLP'];
      const spacing = canvas.width / (texts.length + 1);
      
      texts.forEach((text, i) => {
        const x = spacing * (i + 1);
        const y = 30 + Math.sin(time * 0.001 + i) * 10;
        ctx.fillText(text, x, y);
      });
    };

    const animate = (time: number) => {
      // Dark background matching theme
      ctx.fillStyle = 'rgba(10, 10, 10, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw ML-related text
      drawMLText(time);

      // Update neuron positions (slight drift)
      neurons.forEach(neuron => {
        neuron.x += neuron.vx;
        neuron.y += neuron.vy;

        // Keep neurons roughly in place
        if (neuron.layer >= 0) {
          const centerX = canvas.width / 5 * (neuron.layer + 1);
          if (Math.abs(neuron.x - centerX) > 50) neuron.vx *= -1;
        }

        if (neuron.x < 0 || neuron.x > canvas.width) neuron.vx *= -1;
        if (neuron.y < 0 || neuron.y > canvas.height) neuron.vy *= -1;
      });

      // Draw all connections
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          drawConnection(neurons[i], neurons[j]);
        }
      }

      // Draw neurons
      neurons.forEach(neuron => drawNeuron(neuron, time));

      // Update and draw pulses (data flowing through network)
      pulses = pulses.filter(pulse => {
        pulse.progress += pulse.speed;
        if (pulse.progress < 1) {
          drawPulse(pulse);
          return true;
        }
        return false;
      });

      // Update and draw data particles (falling binary/data effect)
      dataParticles = dataParticles.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.005;
        
        if (particle.life > 0 && particle.y < canvas.height) {
          drawDataParticle(particle);
          return true;
        }
        return false;
      });

      // Create new pulses frequently
      if (Math.random() < 0.08 && pulses.length < 25) {
        createPulse();
      }

      // Create data particles occasionally
      if (Math.random() < 0.03 && dataParticles.length < 30) {
        createDataParticle();
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
