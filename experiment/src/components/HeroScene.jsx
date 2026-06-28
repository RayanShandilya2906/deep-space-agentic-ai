import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Text, useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

function HeroPlanet() {
  const { scene } = useGLTF("/earthIntro.glb");
  const ref = useRef();

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.0015;
  });

  if (!scene) return null; // ✅ correct place for safety

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={6}
      position={[0, -6.2, 0]}
    />
  );
}

function IntroText({ onComplete }) {
  const ref = useRef();
  const started = useRef(false);

  useFrame(() => {
    if (!ref.current?.position) return;

    if (ref.current.position.y < 0.4) {
      ref.current.position.y += 0.008;
      return;
    }

    if (!started.current) {
      started.current = true;

      // ✅ HOLD FOR 1 SECOND BEFORE TRIGGER
      setTimeout(() => {
        onComplete?.();
      }, 1000);
    }
  });

  return (
    <Text
      ref={ref}
      position={[0, -4.5, 0]}
      fontSize={0.9}
      font="/fonts/KdamThmorPro-Regular.ttf"
      color="#E7EDF0"
      anchorX="center"
      anchorY="middle"
    >
      ASTRO LENS
    </Text>
  );
}


function MovingStars() {
  const starsRef = useRef();

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.x += 0.00001;
      starsRef.current.rotation.y += 0.00002;
    }
  });

  return (
    <group ref={starsRef}>
      <Stars
        radius={110}
        depth={180}
        count={9000}
        factor={6}
        fade
        speed={0.35}
      />
    </group>
  );
}


export default function HeroScene({ introStage, onIntroEnd }) {


  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45, }}>
      <ambientLight intensity={0.6} />

      <directionalLight
        position={[8, 5, 5]}
        intensity={5}
      />
      <directionalLight
      position={[-5, -2, -4]}
      />

      <directionalLight
      position={[20, 8, -20]}
      intensity={8}
      color="#9fd8ff"
      />
  
      <MovingStars />
      <HeroPlanet />
      {introStage !== "upload" && (
  <IntroText onComplete={onIntroEnd} />
)}
    </Canvas>
  );
}