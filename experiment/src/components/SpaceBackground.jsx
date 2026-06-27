import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export default function SpaceBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1] }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
      }}
    >
      <Stars
        radius={100}
        depth={50}
        count={3000}
        factor={4}
        fade
      />
    </Canvas>
  );
}