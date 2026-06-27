import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

function Mars() {
  const { scene } = useGLTF("/mars.glb");
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
      scale={1.3}
      position={[0, 0, 0]}
    />
  );
}

export default function MarsModel() {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 2, 3]} intensity={2} />
      <Mars />
    </Canvas>
  );
}