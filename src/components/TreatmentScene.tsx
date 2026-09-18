"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import type { Group } from "three";

const GLOW = "#2161c2";

const GLASS_PROPS = {
  color: GLOW,
  emissive: GLOW,
  emissiveIntensity: 0.22,
  thickness: 0.9,
  roughness: 0.04,
  transmission: 1,
  ior: 1.5,
  clearcoat: 1,
} as const;

// The same glass molar from the old hero, now sized for the 3D Implants card
// — it isn't decoration here, it's literally the thing the card is about.
// Slow continuous rotation + a gentle bob, no scroll-tied motion since this
// sits inside a small, fixed-size frame rather than a full viewport section.
function CrystalTooth() {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.35;
    groupRef.current.position.y =
      0.1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.06;
  });

  return (
    <group ref={groupRef} position={[0, 0.1, 0]}>
      <RoundedBox
        args={[1.5, 1.15, 1.3]}
        radius={0.38}
        smoothness={6}
        position={[0, 0.55, 0]}
      >
        <meshPhysicalMaterial {...GLASS_PROPS} />
      </RoundedBox>
      <mesh position={[-0.36, -0.55, 0.05]} rotation={[0, 0, 0.16]}>
        <coneGeometry args={[0.22, 1.15, 20]} />
        <meshPhysicalMaterial {...GLASS_PROPS} />
      </mesh>
      <mesh position={[0.36, -0.55, -0.05]} rotation={[0, 0, -0.16]}>
        <coneGeometry args={[0.22, 1.15, 20]} />
        <meshPhysicalMaterial {...GLASS_PROPS} />
      </mesh>
    </group>
  );
}

export default function TreatmentScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
      // Capped at 1x — this canvas is small (a card thumbnail), so retina
      // sharpness here isn't visible, but the extra render resolution is a
      // real GPU cost on mobile for zero perceived benefit.
      dpr={1}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[3, 2, 4]} color={GLOW} intensity={30} />
      <pointLight position={[-3, -2, -4]} color="#93c5fd" intensity={16} />
      <CrystalTooth />
    </Canvas>
  );
}
