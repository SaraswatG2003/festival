"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Text3D, Float, Sparkles, Html } from "@react-three/drei"
import type { Mesh } from "three"

function Stage() {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1
    }
  })

  return (
    <group>
      {/* Main Stage Platform */}
      <mesh
        ref={meshRef}
        position={[0, -1, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <cylinderGeometry args={[3, 3.5, 0.3, 32]} />
        <meshStandardMaterial
          color={hovered ? "#3b82f6" : "#1e293b"}
          metalness={0.8}
          roughness={0.2}
          emissive={hovered ? "#1e40af" : "#0f172a"}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>

      {/* Stage Lights */}
      {[...Array(8)].map((_, i) => (
        <Float key={i} speed={2 + i * 0.2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh
            position={[
              Math.cos((i / 8) * Math.PI * 2) * 2.5,
              1 + Math.sin(i) * 0.5,
              Math.sin((i / 8) * Math.PI * 2) * 2.5,
            ]}
          >
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color={["#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"][i % 4]}
              emissive={["#1e40af", "#7c3aed", "#d97706", "#dc2626"][i % 4]}
              emissiveIntensity={0.8}
            />
          </mesh>
        </Float>
      ))}

      {/* 3D Festival Text */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <Text3D font="/fonts/Inter_Bold.json" size={0.5} height={0.1} position={[0, 0.5, 0]} rotation={[0, Math.PI, 0]}>
          FESTIVAL
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.5}
            roughness={0.3}
            emissive="#3b82f6"
            emissiveIntensity={0.2}
          />
        </Text3D>
      </Float>

      {/* Particle Effects */}
      <Sparkles count={100} scale={[8, 4, 8]} size={3} speed={0.5} color="#3b82f6" />

      {/* Interactive Info */}
      {hovered && (
        <Html position={[0, 2, 0]} center>
          <div className="glass-card p-4 text-white text-center pointer-events-none">
            <p className="text-sm font-medium">Interactive 3D Stage</p>
            <p className="text-xs opacity-80">Drag to rotate • Scroll to zoom</p>
          </div>
        </Html>
      )}
    </group>
  )
}

function Speakers() {
  return (
    <group>
      {/* Left Speaker Stack */}
      <group position={[-4, -0.5, 2]}>
        {[...Array(3)].map((_, i) => (
          <mesh key={i} position={[0, i * 0.8, 0]}>
            <boxGeometry args={[0.8, 0.7, 0.4]} />
            <meshStandardMaterial color="#1f2937" metalness={0.6} roughness={0.4} />
          </mesh>
        ))}
      </group>

      {/* Right Speaker Stack */}
      <group position={[4, -0.5, 2]}>
        {[...Array(3)].map((_, i) => (
          <mesh key={i} position={[0, i * 0.8, 0]}>
            <boxGeometry args={[0.8, 0.7, 0.4]} />
            <meshStandardMaterial color="#1f2937" metalness={0.6} roughness={0.4} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export default function InteractiveStage() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        <pointLight position={[-10, 10, 10]} intensity={0.8} color="#8b5cf6" />
        <spotLight
          position={[0, 15, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1.5}
          color="#ffffff"
          target-position={[0, 0, 0]}
        />

        <Stage />
        <Speakers />

        <Environment preset="night" />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={15}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}
