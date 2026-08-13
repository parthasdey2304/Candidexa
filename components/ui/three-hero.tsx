"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Wireframe, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function Icosahedron({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      
      // Gentle mouse interaction
      const targetX = (state.mouse.x * Math.PI) / 4;
      const targetY = (state.mouse.y * Math.PI) / 4;
      
      meshRef.current.rotation.x += 0.05 * (targetY - meshRef.current.rotation.x);
      meshRef.current.rotation.y += 0.05 * (targetX - meshRef.current.rotation.y);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial 
          color={isDark ? "#6366f1" : "#4F46E5"} 
          wireframe 
          emissive={isDark ? "#6366f1" : "#4F46E5"} 
          emissiveIntensity={isDark ? 0.8 : 0.4} 
        />
      </mesh>
    </Float>
  );
}

export function ThreeHero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  
  const isDark = mounted ? resolvedTheme === 'dark' : true;

  return (
    <div className="absolute inset-0 z-0 h-full w-full opacity-60">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={isDark ? 0.5 : 1} />
        <pointLight position={[10, 10, 10]} intensity={isDark ? 1 : 1.5} color={isDark ? "#c0c1ff" : "#4F46E5"} />
        {isDark && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}
        <Icosahedron isDark={isDark} />
      </Canvas>
      
      {/* Gradient overlay to blend bottom into the page */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </div>
  );
}
