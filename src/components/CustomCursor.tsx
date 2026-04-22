import { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const trailRef = useRef<{ x: number; y: number; id: number }[]>([]);
  const counterRef = useRef(0);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      setPosition({ x, y });
      
      // Add to trail
      counterRef.current++;
      const newParticle = { x, y, id: counterRef.current };
      trailRef.current = [newParticle, ...trailRef.current].slice(0, 8);
      setTrail(trailRef.current);
    };

    const updateCursorType = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(!!isClickable);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateCursorType);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateCursorType);
    };
  }, []);

  return (
    <>
      {/* Luminous Trail */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-[9997] rounded-full bg-primary/20 blur-sm transition-opacity duration-500"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            width: `${12 - index * 1.2}px`,
            height: `${12 - index * 1.2}px`,
            transform: 'translate(-50%, -50%)',
            opacity: (8 - index) / 10,
          }}
        />
      ))}

      {/* Main Cursor Dot */}
      <div
        className="custom-cursor fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className={`rounded-full bg-primary shadow-[0_0_15px_rgba(255,69,58,0.8)] transition-all duration-300 ${
          isPointer ? 'w-5 h-5 opacity-80' : 'w-2.5 h-2.5'
        }`} />
      </div>

      <style>{`
        * {
          cursor: none !important;
        }
        
        @media (max-width: 768px) {
          .custom-cursor {
            display: none;
          }
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
