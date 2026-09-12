import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('button, a, input, [data-cursor], [data-cursor-text]');
      if (interactiveEl) {
        setIsHovering(true);
        const customText = interactiveEl.getAttribute('data-cursor-text') || '';
        setCursorText(customText);
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Small dot pointer */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      >
        <div
          className={`rounded-full bg-volt transition-all duration-200 ${
            isHovering ? 'w-2 h-2 opacity-0' : 'w-2.5 h-2.5 opacity-100 shadow-[0_0_12px_#CCFF00]'
          }`}
        />
      </div>

      {/* Larger magnetic ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-out flex items-center justify-center"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isClicking ? 0.85 : isHovering ? 1.6 : 1})`,
        }}
      >
        <div
          className={`rounded-full border transition-all duration-300 flex items-center justify-center ${
            isHovering
              ? 'w-14 h-14 bg-volt/15 border-volt shadow-[0_0_25px_rgba(204,255,0,0.3)] backdrop-blur-[2px]'
              : 'w-8 h-8 bg-transparent border-white/30'
          }`}
        >
          {cursorText && (
            <span className="text-[9px] font-bold tracking-widest text-volt uppercase select-none">
              {cursorText}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
