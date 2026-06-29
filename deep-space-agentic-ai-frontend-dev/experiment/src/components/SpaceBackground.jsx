import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

function MovingStars() {
  const starsRef = useRef();

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.x += 0.00001;
      starsRef.current.rotation.y += 0.00002;
    }
  });
    return (
      <Stars
        radius={110}
        depth={180}
        count={5000}
        factor={6}
        fade
        speed={0.35}
      />
    );
  }
  export default function SpaceBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1] }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
      }}
    >
      <MovingStars />
    </Canvas>
  );
}