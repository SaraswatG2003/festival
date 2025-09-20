"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Text3D, Sparkles } from "@react-three/drei"
import type { Group } from "three"
import * as THREE from "three"

function MainStage() {
  const stageRef = useRef<Group>(null)
  const [lightShow, setLightShow] = useState(false)

  useFrame((state) => {
    if (stageRef.current) {
      stageRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
    setLightShow(Math.sin(state.clock.elapsedTime * 2) > 0)
  })

  return (
    <group ref={stageRef} position={[0, 0, -15]}>
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[12, 0.8, 8]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.5} 
          roughness={0.4}
          emissive="#111111"
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh position={[0, 3, -4]}>
        <boxGeometry args={[14, 8, 0.5]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          emissive="#333333"
          emissiveIntensity={0.1}
        />
      </mesh>

      <mesh position={[0, 3, -3.8]}>
        <boxGeometry args={[10, 6, 0.1]} />
        <meshStandardMaterial 
          color="#001122"
          emissive={lightShow ? "#0066ff" : "#003366"}
          emissiveIntensity={lightShow ? 0.8 : 0.3}
        />
      </mesh>

      {[...Array(8)].map((_, i) => (
        <group key={i} position={[(i - 3.5) * 2, 6 + Math.sin(i) * 0.5, -2 + Math.cos(i) * 0.3]}>
          <mesh>
            <cylinderGeometry args={[0.3, 0.4, 1]} />
            <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
          </mesh>
          
          <mesh position={[0, -2, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[2, 4, 8]} />
            <meshStandardMaterial
              color={["#ff0066", "#00ff66", "#6600ff", "#ffff00", "#ff6600", "#00ffff", "#ff3366", "#66ff33"][i]}
              transparent
              opacity={lightShow ? 0.3 : 0.1}
              emissive={["#ff0066", "#00ff66", "#6600ff", "#ffff00", "#ff6600", "#00ffff", "#ff3366", "#66ff33"][i]}
              emissiveIntensity={lightShow ? 0.5 : 0.2}
            />
          </mesh>
        </group>
      ))}

      <mesh position={[-7, 1, 2]}>
        <boxGeometry args={[1.5, 4, 2]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[7, 1, 2]}>
        <boxGeometry args={[1.5, 4, 2]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      <mesh position={[-9, 1, 1]}>
        <boxGeometry args={[1, 3, 1.5]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[9, 1, 1]}>
        <boxGeometry args={[1, 3, 1.5]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

    
      <mesh position={[0, 0.5, -1]}>
        <boxGeometry args={[4, 1.5, 2]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.3} />
      </mesh>

  
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text3D
          font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
          size={2}
          height={0.3}
          position={[-8, 8, 2]}
          rotation={[0, 0, 0]}
          curveSegments={32}
        >
          FESTIVAL HUB
          <meshStandardMaterial
            color="#ffffff"
            emissive={lightShow ? "#ff6b6b" : "#4ecdc4"}
            emissiveIntensity={lightShow ? 0.8 : 0.4}
            metalness={0.8}
            roughness={0.1}
          />
        </Text3D>
      </Float>
    </group>
  )
}

function FestivalTents() {
  useEffect(() => {
    console.log(THREE)
  }, [])

  return (
    <>
      
      {[...Array(4)].map((_, i) => (
        <group key={`left-${i}`} position={[-12 - i * 3, 0, -5 + i * 4]}>
          <mesh position={[0, 1.5, 0]}>
            <coneGeometry args={[1.8, 3, 8]} />
            <meshStandardMaterial color={["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4"][i]} />
          </mesh>
          <mesh position={[0, 0.75, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 3]} />
            <meshStandardMaterial color="#8b4513" />
          </mesh>
        </group>
      ))}

    
      {[...Array(4)].map((_, i) => (
        <group key={`right-${i}`} position={[12 + i * 3, 0, -5 + i * 4]}>
          <mesh position={[0, 1.5, 0]}>
            <coneGeometry args={[1.8, 3, 8]} />
            <meshStandardMaterial color={["#feca57", "#ff9ff3", "#a8e6cf", "#ffd93d"][i]} />
          </mesh>
          <mesh position={[0, 0.75, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 3]} />
            <meshStandardMaterial color="#8b4513" />
          </mesh>
        </group>
      ))}

      
      {[...Array(6)].map((_, i) => (
        <group key={`front-${i}`} position={[(i - 2.5) * 6, 0, 8]}>
          <mesh position={[0, 1.2, 0]}>
            <coneGeometry args={[1.2, 2.5, 6]} />
            <meshStandardMaterial color={["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3"][i]} />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 2.5]} />
            <meshStandardMaterial color="#8b4513" />
          </mesh>
        </group>
      ))}
    </>
  )
}

 //! Not needed 
// function FestivalFlags() {
//   return (
//     <>
//       {[...Array(15)].map((_, i) => (
//         <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.2} floatIntensity={0.5}>
//           <group position={[(Math.random() - 0.5) * 50, 8 + Math.random() * 4, (Math.random() - 0.5) * 40]}>
//             <mesh>
//               <cylinderGeometry args={[0.05, 0.05, 8]} />
//               <meshStandardMaterial color="#654321" />
//             </mesh>
//             <mesh position={[1, 2, 0]}>
//               <planeGeometry args={[2, 1.2]} />
//               <meshStandardMaterial
//                 color={["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3", "#a8e6cf"][i % 7]}
//                 side={THREE.DoubleSide}
//                 transparent
//                 opacity={0.8}
//               />
//             </mesh>
//           </group>
//         </Float>
//       ))}
//     </>
//   )
// }

function CrowdSimulation() {
  return (
    <group>
      {[...Array(200)].map((_, i) => (
        <Float key={i} speed={0.5 + Math.random()} rotationIntensity={0.1} floatIntensity={0.3}>
          <mesh position={[(Math.random() - 0.5) * 20, 0.5 + Math.random() * 0.5, -5 + Math.random() * 8]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial
              color={`hsl(${Math.random() * 360}, 70%, 60%)`}
              emissive={`hsl(${Math.random() * 360}, 50%, 20%)`}
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function FerrisWheel() {
  const wheelRef = useRef<Group>(null)
  useFrame((state) => {
    if (wheelRef.current) {
      wheelRef.current.rotation.z += 0.008
    }
  })

  return (
    <group ref={wheelRef} position={[25, 8, -25]}>
      {/* Main wheel structure */}
      <mesh>
        <torusGeometry args={[6, 0.4, 16, 100]} />
        <meshStandardMaterial 
          color="#ff6b6b" 
          metalness={0.8} 
          roughness={0.2} 
          emissive="#ff3333"
          emissiveIntensity={0.3}
        />
      </mesh>


      {[...Array(8)].map((_, i) => (
        <mesh key={`spoke-${i}`} position={[0, 0, 0]} rotation={[0, 0, (i / 8) * Math.PI * 2]}>
          <boxGeometry args={[0.2, 12, 0.2]} />
          <meshStandardMaterial color="#ff6b6b" metalness={0.8} />
        </mesh>
      ))}

      {[...Array(8)].map((_, i) => (
        <group key={i} position={[Math.cos((i / 8) * Math.PI * 2) * 6, Math.sin((i / 8) * Math.PI * 2) * 6, 0]}>
          <mesh>
            <boxGeometry args={[1.2, 1.8, 1.2]} />
            <meshStandardMaterial 
              color="#4ecdc4" 
              transparent 
              opacity={0.9}
              emissive="#00aaaa"
              emissiveIntensity={0.2}
            />
          </mesh>
        
          <mesh position={[0, 0, 0.65]}>
            <planeGeometry args={[0.8, 1.2]} />
            <meshStandardMaterial color="#87ceeb" transparent opacity={0.7} />
          </mesh>
        </group>
      ))}

      
      {[...Array(24)].map((_, i) => (
        <mesh key={i} position={[Math.cos((i / 24) * Math.PI * 2) * 6.5, Math.sin((i / 24) * Math.PI * 2) * 6.5, 0]}>
          <sphereGeometry args={[0.15]} />
          <meshStandardMaterial 
            color="#ffff00" 
            emissive="#ffff00" 
            emissiveIntensity={0.8 + Math.sin(i + Date.now() * 0.01) * 0.3} 
          />
        </mesh>
      ))}
    </group>
  )
}

function LeftFerrisWheel() {
  const wheelRef = useRef<Group>(null)

  useFrame((state) => {
    if (wheelRef.current) {
      wheelRef.current.rotation.z -= 0.006 // Rotate in opposite direction
    }
  })

  return (
    <group ref={wheelRef} position={[-25, 8, -25]}>
      
      <mesh>
        <torusGeometry args={[6, 0.4, 16, 100]} />
        <meshStandardMaterial 
          color="#4ecdc4" 
          metalness={0.8} 
          roughness={0.2} 
          emissive="#00cccc"
          emissiveIntensity={0.3}
        />
      </mesh>

     
      {[...Array(8)].map((_, i) => (
        <mesh key={`spoke-${i}`} position={[0, 0, 0]} rotation={[0, 0, (i / 8) * Math.PI * 2]}>
          <boxGeometry args={[0.2, 12, 0.2]} />
          <meshStandardMaterial color="#4ecdc4" metalness={0.8} />
        </mesh>
      ))}

      
      {[...Array(8)].map((_, i) => (
        <group key={i} position={[Math.cos((i / 8) * Math.PI * 2) * 6, Math.sin((i / 8) * Math.PI * 2) * 6, 0]}>
          <mesh>
            <boxGeometry args={[1.2, 1.8, 1.2]} />
            <meshStandardMaterial 
              color="#ff6b6b" 
              transparent 
              opacity={0.9}
              emissive="#ff3333"
              emissiveIntensity={0.2}
            />
          </mesh>
          
          <mesh position={[0, 0, 0.65]}>
            <planeGeometry args={[0.8, 1.2]} />
            <meshStandardMaterial color="#87ceeb" transparent opacity={0.7} />
          </mesh>
        </group>
      ))}

      
      {[...Array(24)].map((_, i) => (
        <mesh key={i} position={[Math.cos((i / 24) * Math.PI * 2) * 6.5, Math.sin((i / 24) * Math.PI * 2) * 6.5, 0]}>
          <sphereGeometry args={[0.15]} />
          <meshStandardMaterial 
            color="#00ffff" 
            emissive="#00ffff" 
            emissiveIntensity={0.8 + Math.sin(i + Date.now() * 0.008) * 0.3} 
          />
        </mesh>
      ))}
    </group>
  )
}

function FoodTrucks() {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <group key={i} position={[-20, 0, -10 + i * 8]}>
          <mesh position={[0, 1.2, 0]}>
            <boxGeometry args={[4, 2.4, 2]} />
            <meshStandardMaterial color={["#ff6b6b", "#4ecdc4", "#feca57"][i]} />
          </mesh>
          {/* Wheels */}
          <mesh position={[-1.5, 0.4, 1.2]}>
            <cylinderGeometry args={[0.4, 0.4, 0.25]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          <mesh position={[1.5, 0.4, 1.2]}>
            <cylinderGeometry args={[0.4, 0.4, 0.25]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          <mesh position={[-1.5, 0.4, -1.2]}>
            <cylinderGeometry args={[0.4, 0.4, 0.25]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          <mesh position={[1.5, 0.4, -1.2]}>
            <cylinderGeometry args={[0.4, 0.4, 0.25]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          <mesh position={[0, 1.6, -1.1]}>
            <planeGeometry args={[2.5, 1.2]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
          </mesh>
        </group>
      ))}
    </>
  )
}

function FestivalCore() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <group>
      <MainStage />
      <FestivalTents />
      <CrowdSimulation />
      <FerrisWheel />
      <LeftFerrisWheel />
      <FoodTrucks />

      <mesh position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color="#2a1f15" roughness={0.9} transparent opacity={0.25} />
      </mesh>

      
      <mesh position={[0, -1.9, -5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 20]} />
        <meshStandardMaterial color="#5a4a3a" />
      </mesh>

    
      <mesh position={[0, -1.9, 5]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[6, 25]} />
        <meshStandardMaterial color="#5a4a3a" />
      </mesh>

      
      <Sparkles count={120} scale={[50, 18, 35]} size={3} speed={0.4} color="#ffffff" opacity={0.5} />
      <Sparkles count={60} scale={[35, 12, 20]} size={4} speed={0.2} color="#ff6b6b" opacity={0.4} />
      <Sparkles count={40} scale={[25, 8, 15]} size={2} speed={0.6} color="#feca57" opacity={0.6} />
      <Sparkles count={30} scale={[20, 10, 20]} size={1.5} speed={0.8} color="#4ecdc4" opacity={0.5} />
    </group>
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
          <div className="animate-spin w-8 h-8 border-2 border-white/40 border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-white text-sm">Loading Festival Grounds...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 6, 15], fov: 75 }} gl={{ antialias: true, alpha: true }} shadows>
        
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[0, 15, 0]} intensity={1.2} color="#ffffff" />

        <FestivalCore />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={25}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate={true}
          autoRotateSpeed={0.2}
        />
      </Canvas>
    </div>
  )
}