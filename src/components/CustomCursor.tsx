import { useEffect, useState } from 'react';
import { Brain, Sparkles } from 'lucide-react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
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
      {/* Custom cursor dot */}
      <div
        className="custom-cursor fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {isPointer ? (
          <div className="relative animate-pulse">
            <Brain className="w-8 h-8 text-primary" strokeWidth={2.5} />
            <Sparkles className="w-4 h-4 text-primary absolute -top-1 -right-1 animate-spin" />
          </div>
        ) : (
          <div className="w-3 h-3 rounded-full bg-primary" />
        )}
      </div>

      {/* Cursor trail */}
      <div
        className="custom-cursor-trail fixed pointer-events-none z-[9998] transition-all duration-200 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className={`rounded-full border-2 border-primary/30 transition-all duration-300 ${
          isPointer ? 'w-16 h-16' : 'w-8 h-8'
        }`} />
      </div>

      <style>{`
        * {
          cursor: none !important;
        }
        
        @media (max-width: 768px) {
          .custom-cursor,
          .custom-cursor-trail {
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
