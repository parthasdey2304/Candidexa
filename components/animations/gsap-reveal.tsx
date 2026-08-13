"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const GsapReveal = ({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let x = 0;
    let y = 0;

    switch (direction) {
      case "up":
        y = 50;
        break;
      case "down":
        y = -50;
        break;
      case "left":
        x = 50;
        break;
      case "right":
        x = -50;
        break;
      case "none":
        break;
    }

    gsap.fromTo(
      el,
      {
        opacity: 0,
        x: x,
        y: y,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%", // Trigger when top of element hits 85% down the viewport
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === el) {
          trigger.kill();
        }
      });
    };
  }, [direction, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
