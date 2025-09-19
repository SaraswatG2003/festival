"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Float, Sparkles, Html, Trail } from "@react-three/drei"
import type { Mesh, Group } from "three"
import * as THREE from "three"

function TimeRing({
  radius,
  thickness,
  speed,
  time,
  color,
}: {
  radius: number
  thickness: number
  speed: number
  time: number
  color: string
}) {
  const ringRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += speed
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      ringRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.05

      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + time) * 0.1
      ringRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, thickness, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5 + Math.sin(time) * 0.3}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.7}
        wireframe={Math.random() > 0.5}
      />
    </mesh>
  )
}

function EnergyOrb({
  position,
  size,
  color,
  active,
}: {
  position: [number, number, number]
  size: number
  color: string
  active: boolean
}) {
  const orbRef = useRef<Mesh>(null)
  const [trail, setTrail] = useState<THREE.Vector3[]>([])

  useFrame((state) => {
    if (orbRef.current) {
      const time = state.clock.elapsedTime
      const baseX = position[0] + Math.cos(time * 0.8) * 2
      const baseY = position[1] + Math.sin(time * 1.2) * 1.5
      const baseZ = position[2] + Math.sin(time * 0.6) * 2

      orbRef.current.position.set(baseX, baseY, baseZ)

      // Update trail
      if (active) {
        setTrail((prev) => {
          const newTrail = [orbRef.current!.position.clone(), ...prev.slice(0, 8)]
          return newTrail
        })
      }

      const pulse = active ? 1.2 + Math.sin(time * 4) * 0.3 : 1
      orbRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <group>
      {active && (
        <Trail width={0.5} length={3} color={color} attenuation={(t) => t * t}>
          <mesh ref={orbRef}>
            <sphereGeometry args={[size, 16, 16]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={active ? 1.5 : 0.8}
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={0.9}
            />
          </mesh>
        </Trail>
      )}
      {!active && (
        <mesh ref={orbRef}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>
      )}
    </group>
  )
}

function LightningBolt({
  start,
  end,
  active,
  color,
}: {
  start: [number, number, number]
  end: [number, number, number]
  active: boolean
  color: string
}) {
  const lineRef = useRef<THREE.BufferGeometry>(null)
  const [points, setPoints] = useState<THREE.Vector3[]>([])

  useEffect(() => {
    const startVec = new THREE.Vector3(...start)
    const endVec = new THREE.Vector3(...end)
    const segments = 8
    const newPoints = [startVec]

    for (let i = 1; i < segments; i++) {
      const t = i / segments
      const point = startVec.clone().lerp(endVec, t)
      point.add(
        new THREE.Vector3((Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8),
      )
      newPoints.push(point)
    }
    newPoints.push(endVec)
    setPoints(newPoints)
  }, [start, end, active])

  if (!active || points.length === 0) return null

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
      <lineBasicMaterial color={color} linewidth={3} transparent opacity={0.9} />
    </line>
  )
}

function CrystalFormation({
  position,
  size,
  color,
}: {
  position: [number, number, number]
  size: number
  color: string
}) {
  const crystalRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y += 0.01
      crystalRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.1

      crystalRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.3
    }
  })

  return (
    <mesh ref={crystalRef} position={position}>
      <octahedronGeometry args={[size, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

function InteractiveStageCore() {
  const groupRef = useRef<Group>(null)
  const [isActive, setIsActive] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [lightningActive, setLightningActive] = useState(false)

  const energyOrbs = [
    { pos: [4, 2, 2], size: 0.3, color: "#00D4FF" },
    { pos: [-4, 1, -2], size: 0.25, color: "#FF6B9D" },
    { pos: [3, -2, 4], size: 0.35, color: "#C770F0" },
    { pos: [-3, 3, -1], size: 0.28, color: "#70F0A6" },
    { pos: [2, -1, -3], size: 0.32, color: "#F0D770" },
    { pos: [-2, 2, 3], size: 0.27, color: "#FF8A5B" },
  ]

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005

      if (isActive && Math.sin(state.clock.elapsedTime * 2) > 0.8) {
        setLightningActive(true)
        setTimeout(() => setLightningActive(false), 200)
      }
    }
  })

  return (
    <group ref={groupRef}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setIsActive(!isActive)}
      >
        <icosahedronGeometry args={[1.5, 2]} />
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#0099CC"
          emissiveIntensity={isActive ? 2 : 1}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>

      <TimeRing radius={3} thickness={0.1} speed={0.02} time={0} color="#00D4FF" />
      <TimeRing radius={4.5} thickness={0.08} speed={-0.015} time={1} color="#FF6B9D" />
      <TimeRing radius={6} thickness={0.12} speed={0.01} time={2} color="#C770F0" />
      <TimeRing radius={7.5} thickness={0.06} speed={-0.008} time={3} color="#70F0A6" />

      {energyOrbs.map((orb, i) => (
        <EnergyOrb
          key={i}
          position={orb.pos as [number, number, number]}
          size={orb.size}
          color={orb.color}
          active={isActive}
        />
      ))}

      {lightningActive &&
        energyOrbs.map((orb, i) => (
          <LightningBolt
            key={`lightning-${i}`}
            start={[0, 0, 0]}
            end={orb.pos as [number, number, number]}
            active={true}
            color={orb.color}
          />
        ))}

      {[...Array(12)].map((_, i) => (
        <CrystalFormation
          key={`crystal-${i}`}
          position={[Math.cos((i / 12) * Math.PI * 2) * 8, Math.sin(i * 0.7) * 2, Math.sin((i / 12) * Math.PI * 2) * 8]}
          size={0.4 + Math.random() * 0.3}
          color={["#00D4FF", "#FF6B9D", "#C770F0", "#70F0A6"][i % 4]}
        />
      ))}

      <Sparkles
        count={isActive ? 800 : 400}
        scale={[20, 15, 20]}
        size={isActive ? 10 : 6}
        speed={isActive ? 3 : 1.5}
        color="#00D4FF"
        opacity={0.8}
      />

      <Sparkles count={200} scale={[25, 20, 25]} size={4} speed={1} color="#C770F0" opacity={0.6} />
      <Sparkles count={150} scale={[15, 10, 15]} size={2} speed={2} color="#FF6B9D" opacity={0.7} />

      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* <Text3D font="/fonts/Inter_Bold.json" size={1.2} height={0.4} position={[0, -10, 0]}>
          INTERACTIVE STAGE
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#00D4FF"
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.2}
          />
        </Text3D> */}
      </Float>

      {hovered && (
        <Html position={[0, 12, 0]} center>
          <div className="glass-card p-6 text-white text-center pointer-events-none border border-cyan-300/30">
            <p className="text-xl font-bold mb-2 text-white">🎵 Interactive Festival Stage</p>
            <p className="text-sm opacity-90 mb-1">Click to activate • Drag to explore</p>
            <p className="text-xs opacity-70 mt-2">Experience the future of live music</p>
            <div className="mt-3 flex justify-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-pink-300 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

export default function InteractiveStage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="glass-card p-6">
          <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-white text-sm">Loading Interactive Stage...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 8, 25], fov: 60 }} gl={{ antialias: true, alpha: true }} shadows>
        <ambientLight intensity={0.4} />
        <pointLight position={[15, 15, 15]} intensity={2} color="#00D4FF" />
        <pointLight position={[-15, 15, 15]} intensity={1.8} color="#FF6B9D" />
        <pointLight position={[0, -15, 10]} intensity={1.5} color="#C770F0" />
        <spotLight
          position={[0, 25, 0]}
          angle={0.8}
          penumbra={1}
          intensity={2.5}
          color="#FFFFFF"
          target-position={[0, 0, 0]}
        />

        <InteractiveStageCore />

        <Environment preset="night" />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={15}
          maxDistance={40}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.6}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}