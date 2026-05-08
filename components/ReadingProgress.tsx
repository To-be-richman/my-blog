"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.scrollY;

      const docHeight =
        document.body.scrollHeight -
        window.innerHeight;

      const progress =
        (scrollTop / docHeight) * 100;

      setWidth(progress);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <div
      className="
        fixed
        top-0
        left-0
        h-[3px]
        z-[9999]
        bg-cyan-400
        transition-all
        duration-150
      "
      style={{
        width: `${width}%`,
      }}
    />
  );
}