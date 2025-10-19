import { useEffect, useState } from 'react';
import { Brain, Sparkles } from 'lucide-react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
  const cursor = document.querySelector(".custom-cursor") as HTMLElement;
  const trail = document.querySelector(".custom-cursor-trail") as HTMLElement;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  const updateMouse = (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  const updateCursorType = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isClickable =
      target.tagName === "A" ||
      target.tagName === "BUTTON" ||
      target.closest("a") ||
      target.closest("button") ||
      target.style.cursor === "pointer" ||
      window.getComputedStyle(target).cursor === "pointer";

    setIsPointer(!!isClickable);
  };

  const animate = () => {
    // ease motion — smooth follow
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    if (cursor) {
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
    }

    if (trail) {
      trail.style.left = `${cursorX}px`;
      trail.style.top = `${cursorY}px`;
    }

    requestAnimationFrame(animate);
  };

  window.addEventListener("mousemove", updateMouse);
  window.addEventListener("mouseover", updateCursorType);
  animate();

  return () => {
    window.removeEventListener("mousemove", updateMouse);
    window.removeEventListener("mouseover", updateCursorType);
  };
  }, []);

};

export default CustomCursor;
