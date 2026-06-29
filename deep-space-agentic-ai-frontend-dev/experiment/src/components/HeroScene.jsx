import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Text, useGLTF } from "@react-three/drei";
import { useRef } from "react";

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
  const groupRef = useRef();
  const started = useRef(false);
  const glitching = useRef(false);
  const glitchX = useRef(0);
  const glitchCount = useRef(0);
  const glitchFrame = useRef(0);

  useFrame(() => {
    if (!groupRef.current) return;

    // ✅ rise up
    if (groupRef.current.position.y < 0.4) {
      groupRef.current.position.y += 0.008;
    }

    // ✅ trigger onComplete once risen
    if (groupRef.current.position.y >= 0.4 && !started.current) {
      started.current = true;
      setTimeout(() => onComplete?.(), 1000);
    }

    // ✅ glitch logic — runs every few frames
    glitchFrame.current++;
    if (glitchFrame.current % 4 === 0 && glitchCount.current < 3) {
      if (!glitching.current && Math.random() < 0.08) {
        glitching.current = true;
      }
    }

    if (glitching.current) {
      glitchX.current = (Math.random() - 0.5) * 0.2;
      groupRef.current.position.x = glitchX.current;
      if (Math.random() < 0.15) {
        glitching.current = false;
        glitchX.current = 0;
        groupRef.current.position.x = 0;
        glitchCount.current++;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, -4.5, 0]}>
      {/* cyan ghost */}
      <Text
        position={[-0.04, 0, -0.01]}
        fontSize={1}
        font="/fonts/Goldman-Bold.ttf"
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.3}
      >
        ASTRO LENS
      </Text>

      {/* purple ghost */}
      <Text
        position={[0.02, 0, -0.01]}
        fontSize={1}
        font="/fonts/Goldman-Bold.ttf"
        color="#aa00ff"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.5}
      >
        ASTRO LENS
      </Text>

      {/* main text */}
      <Text
        position={[0, 0, 0]}
        fontSize={1}
        font="/fonts/Goldman-Bold.ttf"
        color="#838B9E"
        anchorX="center"
        anchorY="middle"
      >
        ASTRO LENS
      </Text>
    </group>
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