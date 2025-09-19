"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Text3D, Float, Sparkles, Html } from "@react-three/drei"
import type { Group } from "three"
import * as THREE from "three"

function CrystalFormation({ position, size, color, growth }: {
  position: [number, number, number]
  size: number
  color: string
  growth: number
}) {
  const crystalRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y += 0.01
      crystalRef.current.scale.y = size * (0.8 + growth * 0.4 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
      crystalRef.current.material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.2
    }
  })

  return (
    <mesh ref={crystalRef} position={position}>
      <octahedronGeometry args={[size * 0.8, 2]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        metalness={0.1}
        roughness={0.1}
        transparent
        opacity={0.85}
      />
    </mesh>
  )
}

function MusicalWave({ center, radius, frequency, amplitude, color }: {
  center: [number, number, number]
  radius: number
  frequency: number
  amplitude: number
  color: string
}) {
  const waveRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (waveRef.current) {
      waveRef.current.children.forEach((child, i) => {
        const angle = (i / waveRef.current!.children.length) * Math.PI * 2
        const wave = Math.sin(state.clock.elapsedTime * frequency + angle * 3) * amplitude
        child.position.y = center[1] + wave
      })
    }
  })

  return (
    <group ref={waveRef}>
      {[...Array(24)].map((_, i) => {
        const angle = (i / 24) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[
              center[0] + Math.cos(angle) * radius,
              center[1],
              center[2] + Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.8}
              transparent
              opacity={0.9}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function GrowingTrees() {
  const treeGroupRef = useRef<THREE.Group>(null)
  const [growth, setGrowth] = useState(0)

  useFrame((state) => {
    setGrowth(Math.sin(state.clock.elapsedTime * 0.5) * 0.5 + 0.5)
  })

  return (
    <group ref={treeGroupRef}>
      {/* Crystal Trees */}
      {[...Array(8)].map((_, i) => (
        <group key={i} position={[
          Math.cos((i / 8) * Math.PI * 2) * 4,
          -1,
          Math.sin((i / 8) * Math.PI * 2) * 4
        ]}>
          {/* Tree Trunk */}
          <mesh>
            <cylinderGeometry args={[0.2, 0.3, 2 + growth * 1.5, 8]} />
            <meshStandardMaterial
              color="#8B4513"
              emissive="#654321"
              emissiveIntensity={0.2}
              roughness={0.8}
            />
          </mesh>
          
          {/* Crystal Branches */}
          {[...Array(5)].map((_, j) => (
            <CrystalFormation
              key={j}
              position={[
                (Math.random() - 0.5) * 1.5,
                1 + j * 0.4 + growth * 0.8,
                (Math.random() - 0.5) * 1.5
              ]}
              size={0.3 + j * 0.1}
              color={["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"][j]}
              growth={growth}
            />
          ))}
        </group>
      ))}
    </group>
  )
}

function MainStage() {
  const groupRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [energy, setEnergy] = useState(0)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
      setEnergy(Math.sin(state.clock.elapsedTime * 1.5) * 0.5 + 0.5)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Living Crystal Garden Base */}
      <mesh
        position={[0, -2, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        <cylinderGeometry args={[6, 6.5, 0.8, 64]} />
        <meshStandardMaterial
          color={hovered ? "#2D5A27" : "#1A4B1A"}
          emissive="#0F2F0F"
          emissiveIntensity={hovered ? 0.3 : 0.1}
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* Central Energy Crystal */}
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.4}>
        <mesh position={[0, 2, 0]}>
          <octahedronGeometry args={[1.5, 3]} />
          <meshStandardMaterial
            color="#FF6B6B"
            emissive="#FF3333"
            emissiveIntensity={0.6 + energy * 0.4}
            metalness={0.3}
            roughness={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>
      </Float>

      {/* Growing Crystal Trees */}
      <GrowingTrees />

      {/* Musical Wave Patterns */}
      <MusicalWave
        center={[0, 0, 0]}
        radius={3}
        frequency={2}
        amplitude={0.5}
        color="#4ECDC4"
      />
      <MusicalWave
        center={[0, 1, 0]}
        radius={5}
        frequency={1.5}
        amplitude={0.3}
        color="#45B7D1"
      />

      {/* Floating Harmonic Crystals */}
      {[...Array(16)].map((_, i) => (
        <Float key={i} speed={1.5 + i * 0.1} rotationIntensity={0.5} floatIntensity={0.8}>
          <CrystalFormation
            position={[
              Math.cos((i / 16) * Math.PI * 2) * (7 + Math.sin(i) * 2),
              2 + Math.sin(i * 0.5) * 3,
              Math.sin((i / 16) * Math.PI * 2) * (7 + Math.cos(i) * 2)
            ]}
            size={0.4 + Math.random() * 0.3}
            color={["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"][i % 6]}
            growth={energy}
          />
        </Float>
      ))}

      {/* Bio-luminescent Particles */}
      <Sparkles
        count={clicked ? 400 : 200}
        scale={[20, 15, 20]}
        size={clicked ? 6 : 3}
        speed={clicked ? 1.5 : 0.8}
        color="#96CEB4"
        opacity={0.7}
      />

      {/* Nature's Symphony Text */}
      <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text3D
          font="/fonts/Inter_Bold.json"
          size={0.6}
          height={0.15}
          position={[0, -3.5, 0]}
          rotation={[0, Math.PI, 0]}
        >
          FESTIVAL HUB
          <meshStandardMaterial
            color="#96CEB4"
            emissive="#4ECDC4"
            emissiveIntensity={0.4 + energy * 0.2}
            metalness={0.3}
            roughness={0.4}
          />
        </Text3D>
      </Float>

      {/* Interactive Garden Info */}
      {hovered && (
        <Html position={[0, 6, 0]} center>
          <div className="glass-card p-4 text-white text-center pointer-events-none border border-green-300/30">
            <p className="text-lg font-bold mb-1">🌸 Living Crystal Garden</p>
            <p className="text-sm opacity-80">Click to bloom • Drag to explore</p>
            <p className="text-xs opacity-60 mt-1">Where music grows like nature</p>
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
        child.position.y = Math.sin(state.clock.elapsedTime * 2 + i) * 0.15 - 2
        child.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.2
      })
    }
  })

  return (
    <group ref={crowdRef}>
      {[...Array(60)].map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 16, -2, (Math.random() - 0.5) * 12 + 6]}>
          <capsuleGeometry args={[0.15, 0.4, 4, 8]} />
          <meshStandardMaterial 
            color="#2D5A27" 
            emissive="#1A4B1A" 
            emissiveIntensity={0.2}
          />
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
          <div className="animate-spin w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-white text-sm">Growing Garden...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 5, 15], fov: 60 }} gl={{ antialias: true, alpha: true }} shadows>
        <ambientLight intensity={0.4} />
        <pointLight position={[15, 20, 15]} intensity={1.2} color="#96CEB4" castShadow />
        <pointLight position={[-15, 20, 15]} intensity={1} color="#4ECDC4" castShadow />
        <spotLight
          position={[0, 25, 0]}
          angle={0.5}
          penumbra={1}
          intensity={2}
          color="#FFEAA7"
          target-position={[0, 0, 0]}
          castShadow
        />

        <MainStage />
        <ConcertCrowd />

        <Environment preset="forest" />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={30}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate={true}
          autoRotateSpeed={0.4}
        />
      </Canvas>
    </div>
  )
}
