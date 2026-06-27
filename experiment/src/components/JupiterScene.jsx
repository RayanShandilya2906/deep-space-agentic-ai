import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, useGLTF } from "@react-three/drei";
import { useRef } from "react";

function Jupiter({ stage, jupiterExit }) {
  const { scene } = useGLTF("/Jupiter.glb");
  const ref = useRef();

useFrame(() => {
  if (!ref.current) return;

  ref.current.rotation.y += 0.002;

});

  const cameraRef = useRef();

useFrame((state) => {
  if (stage >= 1) {
    state.camera.position.z += 0.02;
    state.camera.lookAt(0, 0, 0);
  }
});

  return <primitive ref={ref} object={scene} scale={2.3} />;
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
        radius={100}
        depth={50}
        count={3000}
        factor={4}
        fade
      />
    </group>
  );
}


export default function JupiterScene({ stage, jupiterExit }) {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.2} />

      <directionalLight
        position={[2, 1, 2]}
        intensity={3}
      />

      <MovingStars />
      {stage < 2 && (
  <Jupiter stage={stage} jupiterExit={jupiterExit} />
)}
    </Canvas>
  );
}