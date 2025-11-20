"use client";

import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

const Shape = ({
  className,
  style,
  shape,
}: {
  className?: string;
  style?: React.CSSProperties;
  shape: "circle" | "square" | "triangle";
}) => {
  if (shape === "circle") {
    return <div className={cn("rounded-full", className)} style={style}></div>;
  }
  if (shape === "square") {
    return <div className={cn("rounded-md", className)} style={style}></div>;
  }
  if (shape === "triangle") {
    return (
      <div
        className={cn("w-0 h-0 border-l-[50px] border-l-transparent border-b-[86.6px] border-r-[50px] border-r-transparent", className)}
        style={style}
      ></div>
    );
  }
  return null;
};

export function AnimatedShapes() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  const shapes = [
    {
      shape: "circle",
      className: "w-24 h-24 bg-primary/5 opacity-50",
      initial: { top: "10%", left: "15%", transform: "rotate(0deg)" },
      animate: { top: "15%", left: "10%", transform: "rotate(45deg)" },
      transition: "all 20s ease-in-out infinite alternate",
    },
    {
      shape: "square",
      className: "w-16 h-16 bg-accent/10 opacity-70",
      initial: { top: "20%", left: "80%", transform: "rotate(0deg)" },
      animate: { top: "25%", left: "85%", transform: "rotate(-30deg)" },
      transition: "all 25s ease-in-out infinite alternate",
    },
    {
      shape: "circle",
      className: "w-12 h-12 bg-primary/10",
      initial: { top: "70%", left: "10%", transform: "rotate(0deg)" },
      animate: { top: "65%", left: "15%", transform: "rotate(60deg)" },
      transition: "all 18s ease-in-out infinite alternate",
    },
    {
      shape: "square",
      className: "w-20 h-20 bg-accent/5 opacity-60",
      initial: { top: "80%", left: "90%", transform: "rotate(10deg)" },
      animate: { top: "75%", left: "85%", transform: "rotate(-10deg)" },
      transition: "all 22s ease-in-out infinite alternate",
    },
    {
        shape: "circle",
        className: "w-8 h-8 bg-primary/5",
        initial: { top: "50%", left: "50%", transform: "rotate(0deg) scale(1)" },
        animate: { top: "45%", left: "55%", transform: "rotate(90deg) scale(1.2)" },
        transition: "all 30s ease-in-out infinite alternate",
      },
  ];

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      {shapes.map((s, i) => (
        <div
          key={i}
          className={cn("absolute", s.className)}
          style={{
            ...s.initial,
            animation: `float-${i} ${20 + i*5}s ease-in-out infinite alternate`,
          }}
        >
          <style>
            {`
              @keyframes float-${i} {
                from {
                  top: ${s.initial.top};
                  left: ${s.initial.left};
                  transform: ${s.initial.transform};
                }
                to {
                  top: ${s.animate.top};
                  left: ${s.animate.left};
                  transform: ${s.animate.transform};
                }
              }
            `}
          </style>
        </div>
      ))}
    </div>
  );
}
