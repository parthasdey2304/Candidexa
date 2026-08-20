"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Edges } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

function Orb() {
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const reduceMotion = useReducedMotion();

  useFrame((state) => {
    if (reduceMotion) return;
    const t = state.clock.elapsedTime;
    if (innerRef.current) {
      innerRef.current.rotation.x = t * 0.35;
      innerRef.current.rotation.y = t * 0.5;
    }
    if (outerRef.current) {
      outerRef.current.rotation.x = -t * 0.2;
      outerRef.current.rotation.y = t * 0.28;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={innerRef} scale={0.9}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#6366f1"
          wireframe
          emissive="#6366f1"
          emissiveIntensity={0.9}
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh ref={outerRef} scale={1.5}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#818cf8" wireframe transparent opacity={0.35} />
        <Edges scale={1} threshold={15} color="#818cf8" />
      </mesh>
    </Float>
  );
}

export function NavOrb({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative inline-flex size-9 shrink-0 items-center justify-center ${className ?? ""}`}
    >
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: false, alpha: true }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[4, 4, 4]} intensity={1.2} color="#a5b4fc" />
        <Orb />
      </Canvas>
    </div>
  );
}