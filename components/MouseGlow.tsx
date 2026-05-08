"use client";

import { useEffect, useState } from "react";

export default function MouseGlow() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", updateMouse);

    return () => {
      window.removeEventListener("mousemove", updateMouse);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[999] overflow-hidden"
    >
      <div
        className="absolute w-[500px] h-[500px] rounded-full
        bg-cyan-400/5 blur-3xl
        transition-transform duration-150 ease-out"
        style={{
          transform: `translate(${position.x - 250}px, ${position.y - 250}px)`,
        }}
      />

      <div
        className="absolute w-[300px] h-[300px] rounded-full
        bg-purple-500/5 blur-3xl
        transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${position.x - 150}px, ${position.y - 150}px)`,
        }}
      />
    </div>
  );
}