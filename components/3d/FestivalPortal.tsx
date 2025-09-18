"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Text3D, Float, Sparkles, Html, Trail } from "@react-three/drei"
import type { Group, Mesh } from "three"
import * as THREE from "three"

function PortalRing({
  radius,
  position,
  color,
  speed,
}: { radius: number; position: [number, number, number]; color: string; speed: number }) {
  const ringRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += speed
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
      ringRef.current.scale.setScalar(scale)
    }
  })

  return (
    <mesh ref={ringRef} position={position}>
      <torusGeometry args={[radius, 0.08, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        transparent
        opacity={0.9}
        wireframe={radius > 3}
      />
    </mesh>
  )
}

function EnergyOrb({ position, color, size }: { position: [number, number, number]; color: string; size: number }) {
  const orbRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.4
      orbRef.current.rotation.x += 0.02
      orbRef.current.rotation.y += 0.03
      const intensity = 0.6 + Math.sin(state.clock.elapsedTime * 3) * 0.3
      orbRef.current.material.emissiveIntensity = intensity
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
      <Trail width={2} length={8} color={color} attenuation={(t) => t * t}>
        <mesh ref={orbRef} position={position}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            transparent
            opacity={0.95}
            metalness={0.3}
            roughness={0.1}
          />
        </mesh>
      </Trail>
    </Float>
  )
}

function LightningBolt({
  start,
  end,
  color,
}: { start: [number, number, number]; end: [number, number, number]; color: string }) {
  const lineRef = useRef<THREE.BufferGeometry>(null)
  const [points, setPoints] = useState<THREE.Vector3[]>([])

  useEffect(() => {
    const startVec = new THREE.Vector3(...start)
    const endVec = new THREE.Vector3(...end)
    const newPoints = []

    for (let i = 0; i <= 10; i++) {
      const t = i / 10
      const point = startVec.clone().lerp(endVec, t)
      // Add random offset for lightning effect
      point.x += (Math.random() - 0.5) * 0.5
      point.y += (Math.random() - 0.5) * 0.5
      point.z += (Math.random() - 0.5) * 0.5
      newPoints.push(point)
    }
    setPoints(newPoints)
  }, [start, end])

  useFrame((state) => {
    if (Math.random() < 0.02) {
      // Randomly update lightning path
      const startVec = new THREE.Vector3(...start)
      const endVec = new THREE.Vector3(...end)
      const newPoints = []

      for (let i = 0; i <= 10; i++) {
        const t = i / 10
        const point = startVec.clone().lerp(endVec, t)
        point.x += (Math.random() - 0.5) * 0.8
        point.y += (Math.random() - 0.5) * 0.8
        point.z += (Math.random() - 0.5) * 0.8
        newPoints.push(point)
      }
      setPoints(newPoints)
    }
  })

  return (
    <line>
      <bufferGeometry ref={lineRef}>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} linewidth={3} transparent opacity={0.8} />
    </line>
  )
}

function FestivalPortalCore() {
  const groupRef = useRef<Group>(null)
  const [isActive, setIsActive] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [energy, setEnergy] = useState(0)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += isActive ? 0.03 : 0.008
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.2
      setEnergy(Math.sin(state.clock.elapsedTime * 1.5) * 0.5 + 0.5)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central Portal Core with improved materials */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setIsActive(!isActive)}
      >
        <sphereGeometry args={[1.5, 128, 128]} />
        <meshStandardMaterial
          color={isActive ? "#ffffff" : "#cccccc"}
          emissive={isActive ? "#ffffff" : "#666666"}
          emissiveIntensity={isActive ? 1.2 + energy * 0.5 : 0.4 + energy * 0.2}
          metalness={0.95}
          roughness={0.05}
          transparent
          opacity={0.85}
          envMapIntensity={2}
        />
      </mesh>

      <PortalRing radius={2.2} position={[0, 0, 0]} color="#ffffff" speed={0.015} />
      <PortalRing radius={3.2} position={[0, 0, 0]} color="#dddddd" speed={-0.012} />
      <PortalRing radius={4.2} position={[0, 0, 0]} color="#bbbbbb" speed={0.009} />
      <PortalRing radius={5.2} position={[0, 0, 0]} color="#999999" speed={-0.006} />
      <PortalRing radius={6.2} position={[0, 0, 0]} color="#777777" speed={0.003} />

      <EnergyOrb position={[4, 3, 2]} color="#ffffff" size={0.4} />
      <EnergyOrb position={[-3.5, 2.5, -2]} color="#f0f0f0" size={0.35} />
      <EnergyOrb position={[2.5, -3, 3]} color="#e0e0e0" size={0.45} />
      <EnergyOrb position={[-4, -2, 2.5]} color="#d0d0d0" size={0.38} />
      <EnergyOrb position={[3, 4, -3]} color="#ffffff" size={0.42} />
      <EnergyOrb position={[-2, -3.5, -2.5]} color="#f5f5f5" size={0.36} />
      <EnergyOrb position={[5, 1, 1]} color="#eeeeee" size={0.33} />
      <EnergyOrb position={[-1, 4, 3]} color="#ffffff" size={0.39} />

      {isActive && (
        <>
          <LightningBolt start={[4, 3, 2]} end={[0, 0, 0]} color="#ffffff" />
          <LightningBolt start={[-3.5, 2.5, -2]} end={[0, 0, 0]} color="#cccccc" />
          <LightningBolt start={[2.5, -3, 3]} end={[0, 0, 0]} color="#aaaaaa" />
        </>
      )}

      {[...Array(18)].map((_, i) => (
        <Float key={i} speed={1.2 + i * 0.08} rotationIntensity={0.4} floatIntensity={0.8}>
          <mesh
            position={[
              Math.cos((i / 18) * Math.PI * 2) * (7 + Math.sin(i * 0.7) * 1.5),
              Math.sin(i * 0.3) * 3 + Math.cos(i * 0.5) * 1,
              Math.sin((i / 18) * Math.PI * 2) * (7 + Math.cos(i * 0.7) * 1.5),
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
          >
            <octahedronGeometry args={[0.5 + Math.random() * 0.3, 0]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#bbbbbb"
              emissiveIntensity={0.5 + energy * 0.3}
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}

      <Sparkles
        count={isActive ? 500 : 250}
        scale={[15, 10, 15]}
        size={isActive ? 8 : 5}
        speed={isActive ? 2 : 1}
        color="#ffffff"
        opacity={0.7}
      />

      <Sparkles count={100} scale={[20, 15, 20]} size={3} speed={0.5} color="#cccccc" opacity={0.4} />

      {/* Portal Text with better positioning */}
      <Float speed={0.6} rotationIntensity={0.15} floatIntensity={0.4}>
        <Text3D font="/fonts/Inter_Bold.json" size={1} height={0.3} position={[0, -7.5, 0]} rotation={[0, 0, 0]}>
          FESTIVAL PORTAL
          <meshStandardMaterial
            color="#ffffff"
            emissive="#999999"
            emissiveIntensity={0.4 + energy * 0.2}
            metalness={0.7}
            roughness={0.2}
          />
        </Text3D>
      </Float>

      {hovered && (
        <Html position={[0, 7, 0]} center>
          <div className="glass-card p-6 text-white text-center pointer-events-none border border-white/20">
            <p className="text-xl font-bold mb-2 text-white">🎵 Festival Portal</p>
            <p className="text-sm opacity-90 mb-1">Click to activate • Drag to explore</p>
            <p className="text-xs opacity-70 mt-2">Enter the musical dimension</p>
            <div className="mt-3 flex justify-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

function AmbientElements() {
  return (
    <>
      {[...Array(35)].map((_, i) => (
        <Float key={`ambient-${i}`} speed={0.3 + i * 0.03} rotationIntensity={0.3} floatIntensity={1.2}>
          <mesh position={[(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 30]}>
            <sphereGeometry args={[0.08 + Math.random() * 0.05, 16, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#dddddd"
              emissiveIntensity={0.4 + Math.random() * 0.3}
              transparent
              opacity={0.3 + Math.random() * 0.2}
            />
          </mesh>
        </Float>
      ))}

      {[...Array(8)].map((_, i) => (
        <Float key={`stream-${i}`} speed={0.8} rotationIntensity={0.1} floatIntensity={0.5}>
          <mesh
            position={[
              Math.cos((i / 8) * Math.PI * 2) * 12,
              Math.sin(i * 0.5) * 4,
              Math.sin((i / 8) * Math.PI * 2) * 12,
            ]}
            rotation={[0, (i / 8) * Math.PI * 2, 0]}
          >
            <cylinderGeometry args={[0.02, 0.02, 8, 8]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#aaaaaa"
              emissiveIntensity={0.6}
              transparent
              opacity={0.4}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

export default function FestivalPortal() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="glass-card p-6">
          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-white text-sm">Loading Portal...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 5, 15], fov: 60 }} gl={{ antialias: true, alpha: true }} shadows>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, 10, 10]} intensity={0.8} color="#cccccc" />
        <pointLight position={[0, -10, 5]} intensity={0.6} color="#aaaaaa" />
        <spotLight
          position={[0, 15, 0]}
          angle={0.5}
          penumbra={1}
          intensity={1.5}
          color="#ffffff"
          target-position={[0, 0, 0]}
        />

        <FestivalPortalCore />
        <AmbientElements />

        <Environment preset="night" />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={25}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          autoRotate={true}
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  )
}
