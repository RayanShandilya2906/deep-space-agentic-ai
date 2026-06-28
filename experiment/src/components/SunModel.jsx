import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

function Sun() {
  const { scene } = useGLTF("/Sun.glb");
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.004;
    }
  });

  return (
    <primitive
  ref={ref}
  object={scene}
  scale={0.4}
  position={[0, 0, 0]}
/>
  );
}

export default function SunModel() {
  return (
    <Canvas
      style={{
        width: "120px",
        height: "120px",
      }}
      camera={{
        position: [0, 0, 2.2],
        fov: 28,
      }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 2, 3]} intensity={2} />
      <Sun />
    </Canvas>
  );
}