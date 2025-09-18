"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Text3D, Float, Sparkles, Html } from "@react-three/drei"
import type { Group } from "three"

function MainStage() {
  const groupRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main Stage Platform */}
      <mesh
        position={[0, -1.5, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        <cylinderGeometry args={[4, 4.5, 0.4, 32]} />
        <meshStandardMaterial
          color={hovered ? "#8b5cf6" : "#1e293b"}
          metalness={0.9}
          roughness={0.1}
          emissive={hovered ? "#7c3aed" : "#0f172a"}
          emissiveIntensity={hovered ? 0.4 : 0.1}
        />
      </mesh>

      {/* Stage Backdrop */}
      <mesh position={[0, 1, -3]}>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.5}
          roughness={0.3}
          emissive="#3b82f6"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Dynamic Light Towers */}
      {[...Array(6)].map((_, i) => (
        <Float key={i} speed={1.5 + i * 0.3} rotationIntensity={0.3} floatIntensity={0.4}>
          <group position={[Math.cos((i / 6) * Math.PI * 2) * 3.5, 0.5, Math.sin((i / 6) * Math.PI * 2) * 3.5]}>
            {/* Light Tower */}
            <mesh>
              <cylinderGeometry args={[0.1, 0.15, 2, 8]} />
              <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Light Head */}
            <mesh position={[0, 1.2, 0]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial
                color={["#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444", "#10b981", "#f97316"][i]}
                emissive={["#1e40af", "#7c3aed", "#d97706", "#dc2626", "#059669", "#ea580c"][i]}
                emissiveIntensity={clicked ? 1.2 : 0.8}
              />
            </mesh>
          </group>
        </Float>
      ))}

      {/* 3D Festival Logo */}
      <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.2}>
        <Text3D
          font="/fonts/Inter_Bold.json"
          size={0.6}
          height={0.15}
          position={[0, 0.8, 0]}
          rotation={[0, Math.PI, 0]}
        >
          FESTIVAL HUB
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.6}
            roughness={0.2}
            emissive="#8b5cf6"
            emissiveIntensity={0.3}
          />
        </Text3D>
      </Float>

      {/* Interactive Particle System */}
      <Sparkles
        count={clicked ? 200 : 100}
        scale={[10, 6, 10]}
        size={clicked ? 5 : 3}
        speed={clicked ? 1 : 0.5}
        color="#8b5cf6"
      />

      {/* Floating Orbs */}
      {[...Array(8)].map((_, i) => (
        <Float key={`orb-${i}`} speed={2 + i * 0.1} rotationIntensity={0.5} floatIntensity={0.8}>
          <mesh
            position={[Math.cos((i / 8) * Math.PI * 2) * 6, 2 + Math.sin(i) * 1.5, Math.sin((i / 8) * Math.PI * 2) * 6]}
          >
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial
              color={["#3b82f6", "#8b5cf6"][i % 2]}
              emissive={["#1e40af", "#7c3aed"][i % 2]}
              emissiveIntensity={0.6}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}

      {/* Interactive Info */}
      {hovered && (
        <Html position={[0, 3, 0]} center>
          <div className="glass-card p-4 text-white text-center pointer-events-none">
            <p className="text-lg font-bold mb-1">Interactive Festival Stage</p>
            <p className="text-sm opacity-80">Click to activate • Drag to explore</p>
            <p className="text-xs opacity-60 mt-1">Experience the magic of live music</p>
          </div>
        </Html>
      )}
    </group>
  )
}

function ConcertCrowd() {
  const crowdRef = useRef<Group>(null)

  useFrame((state) => {
    if (crowdRef.current) {
      crowdRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.elapsedTime * 2 + i) * 0.1 - 2
      })
    }
  })

  return (
    <group ref={crowdRef}>
      {[...Array(50)].map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 12, -2, (Math.random() - 0.5) * 8 + 2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.3, 6]} />
          <meshStandardMaterial color="#4a5568" emissive="#2d3748" emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
  )
}

export default function EnhancedStage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="glass-card p-6">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-white text-sm">Loading 3D Experience...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 3, 12], fov: 60 }} gl={{ antialias: true, alpha: true }} shadows>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 15, 10]} intensity={1.5} color="#3b82f6" castShadow />
        <pointLight position={[-10, 15, 10]} intensity={1.2} color="#8b5cf6" castShadow />
        <spotLight
          position={[0, 20, 0]}
          angle={0.4}
          penumbra={1}
          intensity={2}
          color="#ffffff"
          target-position={[0, 0, 0]}
          castShadow
        />

        <MainStage />
        <ConcertCrowd />

        <Environment preset="night" />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={8}
          maxDistance={20}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
