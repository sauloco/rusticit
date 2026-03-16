import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function AbstractShape() {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.1) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={1.8}>
        <torusKnotGeometry args={[1, 0.35, 200, 32, 2, 3]} />
        <MeshDistortMaterial
          color="#9C1DE7"
          emissive="#581B98"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.8}
          wireframe
          distort={0.15}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div style={{ width: 380, height: 380 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#9C1DE7" />
        <pointLight position={[-3, -2, 4]} intensity={0.6} color="#FF073A" />
        <AbstractShape />
      </Canvas>
    </div>
  );
}
