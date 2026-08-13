"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export const Card3D = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    setRotateX(yPct * -20); // Tilt amount
    setRotateY(xPct * 20);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.5,
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className={`relative w-full rounded-xl bg-card/60 backdrop-blur-xl border border-border transition-colors ${
        isHovered ? "shadow-xl border-primary/50 shadow-primary/20" : ""
      } ${className || ""}`}
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="w-full h-full p-6"
      >
        {children}
      </div>
    </motion.div>
  );
};
