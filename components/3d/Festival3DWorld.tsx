"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { 
  OrbitControls, 
  Text, 
  Html, 
  useTexture, 
  Sky, 
  Environment,
  Stars,
  Plane,
  Box,
  Cylinder,
  Cone,
  Sphere,
  RoundedBox
} from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import * as THREE from "three"
import { venues } from "@/data/venues"

// Enhanced Stage Component with More Details
function Stage3D({ venue, position, onClick }: {
  venue: typeof venues[0]
  position: [number, number, number]
  onClick: () => void
}) {
  console.log(`Rendering Stage3D: ${venue.name} at position:`, position)
  
  const groupRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Stage Foundation - SIMPLE BRIGHT MATERIAL */}
      <Box
        args={[20, 3, 15]}
        position={[0, -1.5, 0]}
      >
        <meshStandardMaterial 
          color="#ff0000"
        />
      </Box>

      {/* Main Stage Platform - SIMPLE BRIGHT MATERIAL */}
      <RoundedBox
        args={[15, 2, 12]}
        radius={0.1}
        smoothness={4}
        position={[0, 1, 0]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={hovered ? "#00ff00" : "#0000ff"}
        />
      </RoundedBox>

      {/* Stage Steps */}
      {[-1, 1].map((side, i) => (
        <group key={i} position={[side * 5, 0, 3.5]}>
          <Box args={[2, 0.3, 1]}>
            <meshStandardMaterial color="#4c1d95" />
          </Box>
          <Box args={[2, 0.6, 1]} position={[0, -0.3, 1.2]}>
            <meshStandardMaterial color="#3730a3" />
          </Box>
        </group>
      ))}

      {/* Stage Backdrop Structure */}
      <Box
        args={[12, 8, 1]}
        position={[0, 4.5, -3]}
      >
        <meshStandardMaterial 
          color="#1f2937"
          metalness={0.4}
          roughness={0.6}
        />
      </Box>

      {/* LED Screens Array */}
      <Box
        args={[10, 6, 0.2]}
        position={[0, 4, -2.8]}
      >
        <meshStandardMaterial 
          color="#1e293b"
          emissive="#4338ca"
          emissiveIntensity={0.6}
          metalness={0.2}
          roughness={0.8}
        />
      </Box>

      {/* Side LED Panels */}
      {[-6, 6].map((x, i) => (
        <Box
          key={i}
          args={[0.2, 4, 3]}
          position={[x, 3, -1]}
          rotation={[0, x > 0 ? -0.3 : 0.3, 0]}
        >
          <meshStandardMaterial 
            color="#000011"
            emissive={["#ec4899", "#06b6d4"][i]}
            emissiveIntensity={0.6}
          />
        </Box>
      ))}

      {/* Professional Lighting Truss */}
      <Box
        args={[14, 0.3, 0.3]}
        position={[0, 8, -2]}
      >
        <meshStandardMaterial color="#1f2937" metalness={0.9} />
      </Box>
      <Box
        args={[0.3, 0.3, 6]}
        position={[-7, 8, 0]}
      >
        <meshStandardMaterial color="#1f2937" metalness={0.9} />
      </Box>
      <Box
        args={[0.3, 0.3, 6]}
        position={[7, 8, 0]}
      >
        <meshStandardMaterial color="#1f2937" metalness={0.9} />
      </Box>

      {/* Stage Lights Array - WITHOUT individual point lights */}
      {[-6, -3, 0, 3, 6].map((x, i) => (
        <group key={i} position={[x, 7.5, -2]}>
          <Cylinder
            args={[0.3, 0.4, 1.2]}
            rotation={[Math.PI, 0, 0]}
          >
            <meshStandardMaterial 
              color="#111827"
              metalness={0.8}
            />
          </Cylinder>
          {/* Light Beam Effect - NO POINT LIGHTS */}
          <Cone
            args={[0.1, 0.8]}
            position={[0, -1, 0]}
            rotation={[Math.PI, 0, 0]}
          >
            <meshStandardMaterial 
              color={["#ff0080", "#00ff80", "#8000ff", "#ff8000", "#0080ff"][i]}
              transparent
              opacity={0.3}
              emissive={["#ff0080", "#00ff80", "#8000ff", "#ff8000", "#0080ff"][i]}
              emissiveIntensity={0.5}
            />
          </Cone>
        </group>
      ))}

      {/* Speaker Arrays */}
      {[-4, 4].map((x, i) => (
        <group key={i} position={[x, 2, 3.5]}>
          <Box args={[1.5, 3, 1.2]}>
            <meshStandardMaterial color="#1f2937" />
          </Box>
          {/* Speaker Cones */}
          {[0.5, -0.5].map((y, j) => (
            <Cylinder
              key={j}
              args={[0.4, 0.4, 0.1]}
              position={[0, y, 0.7]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <meshStandardMaterial color="#374151" />
            </Cylinder>
          ))}
        </group>
      ))}

      {/* Monitor Speakers */}
      {[-2, 2].map((x, i) => (
        <Box
          key={i}
          args={[1, 0.8, 0.6]}
          position={[x, 1.2, 2]}
          rotation={[-0.2, 0, 0]}
        >
          <meshStandardMaterial color="#1f2937" />
        </Box>
      ))}

      {/* Stage Barriers */}
      {[-10, -8, -6, 6, 8, 10].map((x, i) => (
        <Box
          key={i}
          args={[0.2, 1.5, 0.2]}
          position={[x, 0.75, 6]}
        >
          <meshStandardMaterial color="#fbbf24" />
        </Box>
      ))}

      {/* VIP Area Markers */}
      {[-12, 12].map((x, i) => (
        <group key={i} position={[x, 0, 8]}>
          <Cylinder
            args={[1.5, 1.5, 0.2]}
            position={[0, 0.1, 0]}
          >
            <meshStandardMaterial 
              color="#7c2d12"
              emissive="#dc2626"
              emissiveIntensity={0.2}
            />
          </Cylinder>
          <Text
            position={[0, 0.3, 0]}
            fontSize={0.4}
            color="#fbbf24"
            anchorX="center"
            anchorY="middle"
          >
            VIP
          </Text>
        </group>
      ))}

      {/* Venue Name Display */}
      <Text
        position={[0, 10, 0]}
        fontSize={1.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.1}
        outlineColor="#000"
      >
        {venue.name}
      </Text>

      {/* Stage Type Indicator */}
      <Text
        position={[0, 9, 0]}
        fontSize={0.6}
        color="#a855f7"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000"
      >
        🎵 {venue.type.toUpperCase()}
      </Text>

      {/* Hover Info Enhanced */}
      {hovered && (
        <Html position={[0, 6, 4]} center>
          <div className="bg-black/95 text-white p-6 rounded-2xl text-sm max-w-sm backdrop-blur-sm border border-purple-400/70 shadow-2xl">
            <h4 className="font-bold mb-3 text-purple-400 text-lg">{venue.name}</h4>
            <p className="text-xs text-gray-300 mb-3 leading-relaxed">{venue.description}</p>
            {venue.capacity && (
              <div className="bg-purple-500/20 p-2 rounded-lg">
                <p className="text-xs text-cyan-400">
                  <strong>Capacity:</strong> {venue.capacity.toLocaleString()}
                </p>
              </div>
            )}
            <div className="mt-3 text-xs text-gray-400">
              🎤 Professional Sound System<br/>
              💡 LED Lighting Array<br/>
              📺 4K Video Screens
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

// Enhanced Food Area Component with Restaurant Details
function FoodArea3D({ venue, position, onClick }: {
  venue: typeof venues[0]
  position: [number, number, number]
  onClick: () => void
}) {
  const groupRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
    }
  })

  const foodTypes = ["🍕", "🍔", "🌮", "🍜", "🍰", "🍺", "☕", "🥗"]
  const stallNames = ["Pizza Palace", "Burger Barn", "Taco Fiesta", "Noodle House", "Sweet Dreams", "Brew Garden", "Coffee Corner", "Fresh Salads"]

  return (
    <group ref={groupRef} position={position}>
      {/* Food Court Foundation */}
      <Cylinder
        args={[6, 6, 0.5]}
        position={[0, -0.25, 0]}
      >
        <meshStandardMaterial 
          color="#92400e"
          metalness={0.2}
          roughness={0.8}
        />
      </Cylinder>

      {/* Main Food Court Platform */}
      <Cylinder
        args={[5, 5, 0.3]}
        position={[0, 0.15, 0]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={hovered ? "#fb923c" : "#ea580c"}
          emissive={hovered ? "#ea580c" : "#c2410c"}
          emissiveIntensity={hovered ? 0.4 : 0.2}
          metalness={0.3}
          roughness={0.7}
        />
      </Cylinder>

      {/* Food Stalls in Circle */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i / 8) * Math.PI * 2
        const x = Math.cos(angle) * 3.5
        const z = Math.sin(angle) * 3.5
        const stallColor = ["#ef4444", "#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#06b6d4", "#84cc16", "#f97316"][i]
        
        return (
          <group key={i} position={[x, 1.5, z]} rotation={[0, angle + Math.PI, 0]}>
            {/* Stall Structure */}
            <RoundedBox
              args={[2, 2.5, 1.5]}
              radius={0.1}
              smoothness={4}
            >
              <meshStandardMaterial 
                color={stallColor}
                metalness={0.3}
                roughness={0.7}
              />
            </RoundedBox>
            
            {/* Stall Roof */}
            <Cone
              args={[1.5, 1]}
              position={[0, 2, 0]}
            >
              <meshStandardMaterial 
                color="#7c2d12"
                metalness={0.4}
                roughness={0.6}
              />
            </Cone>

            {/* Stall Window/Counter */}
            <Box
              args={[1.5, 0.8, 0.1]}
              position={[0, 0.5, 0.8]}
            >
              <meshStandardMaterial 
                color="#1f2937"
                transparent
                opacity={0.8}
              />
            </Box>

            {/* Menu Board */}
            <Box
              args={[1, 1.2, 0.05]}
              position={[-1.2, 1, 0]}
              rotation={[0, Math.PI / 4, 0]}
            >
              <meshStandardMaterial 
                color="#374151"
                emissive="#4b5563"
                emissiveIntensity={0.2}
              />
            </Box>

            {/* Food Icon Display */}
            <Text
              position={[0, 2.8, 0]}
              fontSize={0.6}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {foodTypes[i]}
            </Text>

            {/* Stall Name */}
            <Text
              position={[0, 0.2, 0.9]}
              fontSize={0.2}
              color="white"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#000"
            >
              {stallNames[i]}
            </Text>

            {/* Cooking Equipment */}
            <Box
              args={[0.6, 0.3, 0.4]}
              position={[0.3, 0.65, 0.3]}
            >
              <meshStandardMaterial 
                color="#6b7280"
                metalness={0.8}
              />
            </Box>

            {/* Smoke Effect for Some Stalls */}
            {(i === 0 || i === 1 || i === 3) && (
              <Cylinder
                args={[0.1, 0.2, 1]}
                position={[0.3, 1.5, 0.3]}
              >
                <meshStandardMaterial 
                  color="#9ca3af"
                  transparent
                  opacity={0.3}
                />
              </Cylinder>
            )}
          </group>
        )
      })}

      {/* Central Seating Area */}
      <Cylinder
        args={[2, 2, 0.1]}
        position={[0, 0.35, 0]}
      >
        <meshStandardMaterial 
          color="#92400e"
          metalness={0.4}
          roughness={0.6}
        />
      </Cylinder>

      {/* Picnic Tables */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4
        const x = Math.cos(angle) * 1.3
        const z = Math.sin(angle) * 1.3
        
        return (
          <group key={i} position={[x, 0.8, z]} rotation={[0, angle, 0]}>
            {/* Table Top */}
            <Box args={[1.5, 0.05, 0.6]}>
              <meshStandardMaterial color="#8b4513" />
            </Box>
            {/* Table Legs */}
            {[-0.6, 0.6].map((side, j) => (
              <Box key={j} args={[0.05, 0.4, 0.05]} position={[side, -0.225, 0]}>
                <meshStandardMaterial color="#654321" />
              </Box>
            ))}
            {/* Benches */}
            {[-0.5, 0.5].map((side, j) => (
              <group key={j} position={[0, -0.1, side]}>
                <Box args={[1.4, 0.05, 0.3]}>
                  <meshStandardMaterial color="#8b4513" />
                </Box>
                <Box args={[0.05, 0.3, 0.05]} position={[-0.6, -0.175, 0]}>
                  <meshStandardMaterial color="#654321" />
                </Box>
                <Box args={[0.05, 0.3, 0.05]} position={[0.6, -0.175, 0]}>
                  <meshStandardMaterial color="#654321" />
                </Box>
              </group>
            ))}
          </group>
        )
      })}

      {/* Outdoor Heaters */}
      {[-6, 6].map((x, i) => (
        <group key={i} position={[x, 1.5, 0]}>
          <Cylinder
            args={[0.3, 0.3, 2.5]}
          >
            <meshStandardMaterial 
              color="#1f2937"
              metalness={0.8}
            />
          </Cylinder>
          <Cylinder
            args={[0.8, 0.6, 0.3]}
            position={[0, 1.5, 0]}
          >
            <meshStandardMaterial 
              color="#dc2626"
              emissive="#dc2626"
              emissiveIntensity={0.3}
            />
          </Cylinder>
        </group>
      ))}

      {/* Food Court Sign */}
      <Text
        position={[0, 5, 0]}
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.1}
        outlineColor="#000"
      >
        {venue.name}
      </Text>

      {/* Food Court Type */}
      <Text
        position={[0, 4, 0]}
        fontSize={0.5}
        color="#f59e0b"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000"
      >
        🍽️ DINING AREA
      </Text>

      {/* Enhanced Hover Info */}
      {hovered && (
        <Html position={[0, 4, 6]} center>
          <div className="bg-black/95 text-white p-6 rounded-2xl text-sm max-w-sm backdrop-blur-sm border border-orange-400/70 shadow-2xl">
            <h4 className="font-bold mb-3 text-orange-400 text-lg">{venue.name}</h4>
            <p className="text-xs text-gray-300 mb-3 leading-relaxed">{venue.description}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-orange-500/20 p-2 rounded">
                <p className="text-orange-300">🍕 International Cuisine</p>
              </div>
              <div className="bg-orange-500/20 p-2 rounded">
                <p className="text-orange-300">☕ Beverages</p>
              </div>
              <div className="bg-orange-500/20 p-2 rounded">
                <p className="text-orange-300">🪑 Seating Available</p>
              </div>
              <div className="bg-orange-500/20 p-2 rounded">
                <p className="text-orange-300">🔥 Heated Area</p>
              </div>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

// Enhanced Merchandise Area Component
function MerchArea3D({ venue, position, onClick }: {
  venue: typeof venues[0]
  position: [number, number, number]
  onClick: () => void
}) {
  const groupRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)

  return (
    <group ref={groupRef} position={position}>
      {/* Store Foundation */}
      <Box
        args={[5, 0.5, 4]}
        position={[0, -0.25, 0]}
      >
        <meshStandardMaterial 
          color="#065f46"
          metalness={0.2}
          roughness={0.8}
        />
      </Box>

      {/* Main Store Building */}
      <RoundedBox
        args={[4, 4, 3]}
        radius={0.2}
        smoothness={4}
        position={[0, 2, 0]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={hovered ? "#22c55e" : "#16a34a"}
          emissive={hovered ? "#15803d" : "#166534"}
          emissiveIntensity={hovered ? 0.4 : 0.2}
          metalness={0.3}
          roughness={0.7}
        />
      </RoundedBox>

      {/* Store Roof */}
      <Box
        args={[4.5, 0.3, 3.5]}
        position={[0, 4.3, 0]}
      >
        <meshStandardMaterial 
          color="#374151"
          metalness={0.8}
        />
      </Box>

      {/* Store Sign */}
      <Box
        args={[3, 0.8, 0.1]}
        position={[0, 3.5, 1.6]}
      >
        <meshStandardMaterial 
          color="#1f2937"
          emissive="#10b981"
          emissiveIntensity={0.5}
        />
      </Box>

      {/* Large Windows */}
      <Box
        args={[1.2, 1.5, 0.1]}
        position={[-1, 2.5, 1.6]}
      >
        <meshStandardMaterial 
          color="#1e3a8a"
          transparent
          opacity={0.7}
          metalness={0.9}
        />
      </Box>
      <Box
        args={[1.2, 1.5, 0.1]}
        position={[1, 2.5, 1.6]}
      >
        <meshStandardMaterial 
          color="#1e3a8a"
          transparent
          opacity={0.7}
          metalness={0.9}
        />
      </Box>

      {/* Entrance Door */}
      <Box
        args={[0.8, 2, 0.1]}
        position={[0, 1, 1.6]}
      >
        <meshStandardMaterial 
          color="#8b4513"
          metalness={0.4}
        />
      </Box>

      {/* Door Handle */}
      <Sphere
        args={[0.05]}
        position={[0.3, 1, 1.65]}
      >
        <meshStandardMaterial 
          color="#fbbf24"
          metalness={0.9}
        />
      </Sphere>

      {/* Display Cases Outside */}
      {[-1.8, 1.8].map((x, i) => (
        <group key={i} position={[x, 0.5, 2]}>
          <Box args={[0.8, 1, 0.4]}>
            <meshStandardMaterial 
              color="#374151"
              transparent
              opacity={0.8}
            />
          </Box>
          <Text
            position={[0, 0.6, 0.3]}
            fontSize={0.15}
            color="#10b981"
            anchorX="center"
            anchorY="middle"
          >
            {i === 0 ? "T-SHIRTS" : "HOODIES"}
          </Text>
        </group>
      ))}

      {/* Outdoor Merchandise Display */}
      <Cylinder
        args={[1, 1, 2]}
        position={[3, 1, 0]}
      >
        <meshStandardMaterial 
          color="#1f2937"
          metalness={0.6}
        />
      </Cylinder>

      {/* Store Name */}
      <Text
        position={[0, 5.5, 0]}
        fontSize={0.8}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.1}
        outlineColor="#000"
      >
        {venue.name}
      </Text>

      <Text
        position={[0, 4.8, 0]}
        fontSize={0.4}
        color="#10b981"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000"
      >
        🛍️ MERCHANDISE
      </Text>

      {/* Enhanced Hover Info */}
      {hovered && (
        <Html position={[0, 3, 4]} center>
          <div className="bg-black/95 text-white p-6 rounded-2xl text-sm max-w-sm backdrop-blur-sm border border-green-400/70 shadow-2xl">
            <h4 className="font-bold mb-3 text-green-400 text-lg">{venue.name}</h4>
            <p className="text-xs text-gray-300 mb-3 leading-relaxed">{venue.description}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-green-500/20 p-2 rounded">
                <p className="text-green-300">👕 Apparel</p>
              </div>
              <div className="bg-green-500/20 p-2 rounded">
                <p className="text-green-300">🎵 Music Gear</p>
              </div>
              <div className="bg-green-500/20 p-2 rounded">
                <p className="text-green-300">📱 Accessories</p>
              </div>
              <div className="bg-green-500/20 p-2 rounded">
                <p className="text-green-300">🎁 Souvenirs</p>
              </div>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

// Facilities Component
function Facilities3D({ venue, position, onClick }: {
  venue: typeof venues[0]
  position: [number, number, number]
  onClick: () => void
}) {
  const groupRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)

  return (
    <group ref={groupRef} position={position}>
      {/* Main Building */}
      <Cylinder
        args={[2, 2, 2.5]}
        position={[0, 1.25, 0]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={hovered ? "#60a5fa" : "#3b82f6"}
          emissive={hovered ? "#2563eb" : "#1d4ed8"}
          emissiveIntensity={hovered ? 0.3 : 0.1}
          metalness={0.3}
          roughness={0.7}
        />
      </Cylinder>

      {/* Dome Top */}
      <Sphere
        args={[2, 16, 8]}
        position={[0, 3.5, 0]}
        scale={[1, 0.5, 1]}
      >
        <meshStandardMaterial 
          color="#6366f1"
          metalness={0.4}
          roughness={0.6}
        />
      </Sphere>

      {/* Entrance */}
      <Box
        args={[0.8, 1.8, 0.2]}
        position={[0, 0.9, 2.1]}
      >
        <meshStandardMaterial color="#374151" />
      </Box>

      {/* Signs */}
      <Text
        position={[0, 1.5, 2.2]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000"
      >
        {venue.name.includes("Medical") ? "🏥" : "🚻"}
      </Text>

      {/* Venue Name */}
      <Text
        position={[0, 5, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000"
      >
        {venue.name}
      </Text>

      {/* Hover Info */}
      {hovered && (
        <Html position={[0, 3, 3]} center>
          <div className="bg-black/90 text-white p-4 rounded-xl text-sm max-w-xs backdrop-blur-sm border border-blue-400/50 shadow-2xl">
            <h4 className="font-bold mb-2 text-blue-400">{venue.name}</h4>
            <p className="text-xs text-gray-300">{venue.description}</p>
          </div>
        </Html>
      )}
    </group>
  )
}

// Main Scene Component
function FestivalScene({ onVenueClick }: { onVenueClick: (venue: typeof venues[0]) => void }) {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 25, 40)
    camera.lookAt(0, 0, 0)
    console.log("Camera positioned at:", camera.position)
    console.log("Camera looking at center (0,0,0)")
    console.log("Test cubes should be visible at positions: [0,1.5,0], [10,1,0], [-10,1,0], [0,1,10], [0,1,-10]")
  }, [camera])

  // Strategic positioning for a realistic festival layout
  const stagePositions: [number, number, number][] = [
    [0, 0, -5],     // Main Stage - closer to camera
    [-20, 0, -5],   // Electronic Stage - left
    [20, 0, -5],    // Indie Stage - right
    [0, 0, 15],     // Acoustic Stage - back
  ]

  const foodPositions: [number, number, number][] = [
    [-15, 0, 8],    // Food Court - left side
    [15, 0, 8],     // Beer Garden - right side
  ]

  const merchPositions: [number, number, number][] = [
    [-25, 0, 15],   // Merch Store - back left
    [25, 0, 15],    // Meet & Greet - back right
  ]

  const facilityPositions: [number, number, number][] = [
    [-30, 0, 0],    // Restrooms - far left
    [30, 0, 0],     // Medical - far right
  ]

  return (
    <>
      {/* SIMPLIFIED Lighting Setup - Only Essential Lights */}
      <ambientLight intensity={1.5} color="#ffffff" />
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={3}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        color="#ffffff"
      />
      
      {/* Only TWO additional lights to stay within limits */}
      <pointLight position={[0, 25, 0]} intensity={4} color="#ffffff" distance={60} />

      {/* Removed problematic Sky component */}
      {/* 
      <Sky 
        distance={450000}
        sunPosition={[0, 0.1, 0]}
        inclination={0.8}
        azimuth={0.8}
        mieCoefficient={0.1}
        mieDirectionalG={0.8}
        rayleigh={0.5}
        turbidity={20}
      />
      */}
      <Stars 
        radius={300}
        depth={60}
        count={1000}
        factor={5}
        saturation={0.5}
        fade={true}
      />

      {/* Visible Ground */}
      <Plane
        args={[120, 100]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <meshStandardMaterial 
          color="#2a1810"
          roughness={0.9}
          metalness={0.0}
        />
      </Plane>

      {/* Brighter Pathways */}
      <Plane
        args={[6, 100]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.4, 0]}
      >
        <meshStandardMaterial 
          color="#6b46c1"
          emissive="#3730a3"
          emissiveIntensity={0.3}
          roughness={0.8}
        />
      </Plane>
      <Plane
        args={[120, 6]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.4, 0]}
      >
        <meshStandardMaterial 
          color="#6b46c1"
          emissive="#3730a3"
          emissiveIntensity={0.3}
          roughness={0.8}
        />
      </Plane>

      {/* Visible Curved Pathways */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2
        const radius = 25
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return (
          <Plane
            key={i}
            args={[4, 30]}
            rotation={[-Math.PI / 2, angle, 0]}
            position={[x, -0.35, z]}
          >
            <meshStandardMaterial 
              color="#8b5cf6"
              emissive="#5b21b6"
              emissiveIntensity={0.2}
              roughness={0.7}
            />
          </Plane>
        )
      })}

      {/* TEST CUBES - Simple visible cubes to verify 3D rendering */}
      <Box args={[3, 3, 3]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#ff0000" />
      </Box>
      <Box args={[2, 2, 2]} position={[10, 1, 0]}>
        <meshStandardMaterial color="#00ff00" />
      </Box>
      <Box args={[2, 2, 2]} position={[-10, 1, 0]}>
        <meshStandardMaterial color="#0000ff" />
      </Box>
      <Box args={[2, 2, 2]} position={[0, 1, 10]}>
        <meshStandardMaterial color="#ffff00" />
      </Box>
      <Box args={[2, 2, 2]} position={[0, 1, -10]}>
        <meshStandardMaterial color="#ff00ff" />
      </Box>

      {/* Render Venues */}
      {venues.map((venue, index) => {
        let position: [number, number, number] = [0, 0, 0]
        let Component = Stage3D

        // Debug log
        console.log(`Rendering venue ${index}: ${venue.name} of type ${venue.type}`)

        if (venue.type === "stage") {
          const stageIndex = venues.slice(0, index + 1).filter(v => v.type === "stage").length - 1
          position = stagePositions[Math.min(stageIndex, stagePositions.length - 1)]
          Component = Stage3D
          console.log(`Stage ${stageIndex} positioned at:`, position)
        } else if (venue.type === "food") {
          const foodIndex = venues.slice(0, index + 1).filter(v => v.type === "food").length - 1
          position = foodPositions[Math.min(foodIndex, foodPositions.length - 1)]
          Component = FoodArea3D
          console.log(`Food ${foodIndex} positioned at:`, position)
        } else if (venue.type === "merchandise") {
          const merchIndex = venues.slice(0, index + 1).filter(v => v.type === "merchandise").length - 1
          position = merchPositions[Math.min(merchIndex, merchPositions.length - 1)]
          Component = MerchArea3D
          console.log(`Merch ${merchIndex} positioned at:`, position)
        } else if (venue.type === "facilities") {
          const facilityIndex = venues.slice(0, index + 1).filter(v => v.type === "facilities").length - 1
          position = facilityPositions[Math.min(facilityIndex, facilityPositions.length - 1)]
          Component = Facilities3D
          console.log(`Facility ${facilityIndex} positioned at:`, position)
        }

        return (
          <Component
            key={venue.id}
            venue={venue}
            position={position}
            onClick={() => onVenueClick(venue)}
          />
        )
      })}

      {/* Additional Festival Buildings */}
      
      {/* VIP Lounge */}
      <group position={[15, 0, 8]}>
        <RoundedBox args={[6, 4, 4]} radius={0.2} smoothness={4}>
          <meshStandardMaterial 
            color="#f59e0b"
            emissive="#d97706"
            emissiveIntensity={0.3}
            metalness={0.3}
            roughness={0.7}
          />
        </RoundedBox>
        <Text
          position={[0, 3, 2.5]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          VIP LOUNGE
        </Text>
      </group>

      {/* Security Tower */}
      <group position={[20, 0, 15]}>
        <RoundedBox args={[3, 8, 3]} radius={0.2} smoothness={4}>
          <meshStandardMaterial 
            color="#ef4444"
            emissive="#dc2626"
            emissiveIntensity={0.3}
            metalness={0.3}
            roughness={0.7}
          />
        </RoundedBox>
        <Text
          position={[0, 5, 2]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          SECURITY
        </Text>
      </group>

      {/* Enhanced Seating Areas with Shade */}
      {[
        { pos: [18, 0, 5] as [number, number, number], name: "Chill Zone 1" },
        { pos: [-18, 0, 5] as [number, number, number], name: "Chill Zone 2" },
        { pos: [0, 0, 20] as [number, number, number], name: "Main Rest Area" },
        { pos: [0, 0, -20] as [number, number, number], name: "Quiet Zone" }
      ].map((area, i) => (
        <group key={`seating-${i}`} position={area.pos}>
          {/* Benches */}
          {[-2, 0, 2].map((x, j) => (
            <group key={j} position={[x, 0, 0]}>
              <Box args={[3, 0.3, 0.5]} position={[0, 0.5, 0]}>
                <meshStandardMaterial color="#8b4513" metalness={0.3} />
              </Box>
              <Box args={[3, 0.8, 0.1]} position={[0, 0.9, -0.2]}>
                <meshStandardMaterial color="#8b4513" metalness={0.3} />
              </Box>
            </group>
          ))}
          {/* Shade Structure */}
          <Box args={[8, 0.2, 8]} position={[0, 4, 0]}>
            <meshStandardMaterial 
              color="#4b5563" 
              transparent 
              opacity={0.7}
            />
          </Box>
          {/* Support Poles */}
          {[[-3, 3], [3, 3], [-3, -3], [3, -3]].map(([x, z], j) => (
            <Cylinder key={j} args={[0.1, 0.1, 4]} position={[x, 2, z]}>
              <meshStandardMaterial color="#6b7280" metalness={0.8} />
            </Cylinder>
          ))}
          <Text
            position={[0, 5, 0]}
            fontSize={0.4}
            color="#10b981"
            anchorX="center"
            anchorY="middle"
          >
            {area.name}
          </Text>
        </group>
      ))}

      {/* First Aid Station */}
      <group position={[-22, 0, 5]}>
        <RoundedBox args={[4, 3, 3]} radius={0.2} smoothness={4}>
          <meshStandardMaterial 
            color="#ef4444"
            emissive="#dc2626"
            emissiveIntensity={0.3}
            metalness={0.3}
            roughness={0.7}
          />
        </RoundedBox>
        <Text
          position={[0, 2.5, 1.8]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          🏥 FIRST AID
        </Text>
        {/* Red Cross Symbol */}
        <Box args={[0.8, 0.2, 0.1]} position={[0, 2, 1.6]}>
          <meshStandardMaterial color="white" />
        </Box>
        <Box args={[0.2, 0.8, 0.1]} position={[0, 2, 1.6]}>
          <meshStandardMaterial color="white" />
        </Box>
      </group>
      <group position={[0, 0, 25]}>
        <RoundedBox
          args={[12, 4, 8]}
          radius={0.3}
          smoothness={4}
          position={[0, 2, 0]}
        >
          <meshStandardMaterial 
            color="#581c87"
            emissive="#3730a3"
            emissiveIntensity={0.2}
            metalness={0.8}
            roughness={0.2}
          />
        </RoundedBox>
        <Text
          position={[0, 5, 0]}
          fontSize={0.8}
          color="#fbbf24"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#000"
        >
          VIP LOUNGE
        </Text>
        {/* VIP Entrance */}
        <Box
          args={[2, 3, 0.2]}
          position={[0, 1.5, 4.1]}
        >
          <meshStandardMaterial 
            color="#fbbf24"
            metalness={0.8}
          />
        </Box>
      </group>

      {/* Information Kiosks */}
      {[[-35, 0, 10] as [number, number, number], [35, 0, 10] as [number, number, number], [0, 0, -35] as [number, number, number]].map((pos, i) => (
        <group key={i} position={pos}>
          <Cylinder
            args={[1, 1, 3]}
          >
            <meshStandardMaterial 
              color="#3b82f6"
              emissive="#2563eb"
              emissiveIntensity={0.4}
              metalness={0.3}
              roughness={0.7}
            />
          </Cylinder>
          <Box
            args={[1.5, 2, 0.1]}
            position={[0, 2, 0]}
          >
            <meshStandardMaterial 
              color="#1e293b"
              emissive="#3b82f6"
              emissiveIntensity={0.5}
            />
          </Box>
          <Text
            position={[0, 4, 0]}
            fontSize={0.4}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            ℹ️ INFO
          </Text>
        </group>
      ))}

      {/* Security Towers */}
      {[[-40, 0, -20] as [number, number, number], [40, 0, -20] as [number, number, number], [-40, 0, 20] as [number, number, number], [40, 0, 20] as [number, number, number]].map((pos, i) => (
        <group key={i} position={pos}>
          <Cylinder
            args={[1.5, 1.5, 8]}
          >
            <meshStandardMaterial 
              color="#6b7280"
              metalness={0.4}
              roughness={0.6}
            />
          </Cylinder>
          <Box
            args={[2, 2, 2]}
            position={[0, 5, 0]}
          >
            <meshStandardMaterial 
              color="#374151"
              metalness={0.3}
              roughness={0.7}
            />
          </Box>
          <Text
            position={[0, 7, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            🔒 SECURITY
          </Text>
        </group>
      ))}

      {/* ATM Stations */}
      {[[-20, 0, 25] as [number, number, number], [20, 0, 25] as [number, number, number]].map((pos, i) => (
        <group key={i} position={pos}>
          <Box
            args={[2, 2.5, 1]}
            position={[0, 1.25, 0]}
          >
            <meshStandardMaterial 
              color="#10b981"
              emissive="#059669"
              emissiveIntensity={0.3}
              metalness={0.4}
              roughness={0.6}
            />
          </Box>
          <Box
            args={[1.5, 1, 0.1]}
            position={[0, 1.5, 0.6]}
          >
            <meshStandardMaterial 
              color="#1e293b"
              emissive="#10b981"
              emissiveIntensity={0.5}
            />
          </Box>
          <Text
            position={[0, 3, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            💳 ATM
          </Text>
        </group>
      ))}

      {/* Photo Booth Areas */}
      {[[-30, 0, 5] as [number, number, number], [30, 0, 5] as [number, number, number]].map((pos, i) => (
        <group key={i} position={pos}>
          <RoundedBox
            args={[3, 3, 3]}
            radius={0.2}
            smoothness={4}
            position={[0, 1.5, 0]}
          >
            <meshStandardMaterial 
              color="#be185d"
              emissive="#ec4899"
              emissiveIntensity={0.2}
              metalness={0.6}
            />
          </RoundedBox>
          <Text
            position={[0, 3.5, 0]}
            fontSize={0.4}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            📸 PHOTO BOOTH
          </Text>
          {/* Camera Equipment */}
          <Cylinder
            args={[0.3, 0.3, 1]}
            position={[0, 2, 1.8]}
          >
            <meshStandardMaterial color="#1f2937" />
          </Cylinder>
        </group>
      ))}

      {/* Charging Stations */}
      {[[-10, 0, 30] as [number, number, number], [10, 0, 30] as [number, number, number], [-25, 0, -10] as [number, number, number], [25, 0, -10] as [number, number, number]].map((pos, i) => (
        <group key={i} position={pos}>
          <Cylinder
            args={[0.8, 0.8, 2]}
          >
            <meshStandardMaterial 
              color="#0f766e"
              emissive="#14b8a6"
              emissiveIntensity={0.3}
            />
          </Cylinder>
          <Text
            position={[0, 2.5, 0]}
            fontSize={0.25}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            🔋 CHARGING
          </Text>
        </group>
      ))}

      {/* Decorative Elements */}
      
      {/* Festival Flags */}
      {Array.from({ length: 20 }, (_, i) => {
        const angle = (i / 20) * Math.PI * 2
        const radius = 45
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return (
          <group key={i} position={[x, 0, z]}>
            <Cylinder
              args={[0.1, 0.1, 8]}
            >
              <meshStandardMaterial color="#1f2937" />
            </Cylinder>
            <Box
              args={[2, 1.5, 0.05]}
              position={[1, 6, 0]}
            >
              <meshStandardMaterial 
                color={["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"][i % 5]}
                emissiveIntensity={0.1}
              />
            </Box>
          </group>
        )
      })}

      {/* Simplified Ambient Lighting - REMOVED extra pointLight */}

      {/* Festival Entrance */}
      <group position={[0, 0, 35]}>
        <RoundedBox
          args={[20, 8, 2]}
          radius={0.5}
          smoothness={4}
          position={[0, 4, 0]}
        >
          <meshStandardMaterial 
            color="#1f2937"
            metalness={0.8}
            roughness={0.2}
          />
        </RoundedBox>
        <Text
          position={[0, 4, 1.1]}
          fontSize={2}
          color="#a855f7"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.1}
          outlineColor="#000"
        >
          AURORA FESTIVAL
        </Text>
        <Text
          position={[0, 2, 1.1]}
          fontSize={0.8}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#000"
        >
          Welcome to the Experience
        </Text>
      </group>

      {/* Orbit Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={10}
        maxDistance={100}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={0.1}
        autoRotate={false}
        autoRotateSpeed={0.5}
      />
    </>
  )
}

// Main Festival3DWorld Component
export default function Festival3DWorld() {
  const [selectedVenue, setSelectedVenue] = useState<typeof venues[0] | null>(null)

  const handleVenueClick = (venue: typeof venues[0]) => {
    setSelectedVenue(venue)
  }

  return (
    <div className="w-full h-screen relative">
      <Canvas
        shadows
        camera={{ position: [0, 25, 40], fov: 75 }}
        gl={{ 
          antialias: true, 
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace 
        }}
        style={{ 
          background: 'linear-gradient(to bottom, #1e1b4b, #312e81, #1e1b4b)' 
        }}
      >
        <FestivalScene onVenueClick={handleVenueClick} />
      </Canvas>

      {/* Selected Venue Info Panel */}
      <AnimatePresence>
        {selectedVenue && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="absolute top-20 right-6 w-80 bg-black/90 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-2xl z-30"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-white">{selectedVenue.name}</h3>
              <button
                onClick={() => setSelectedVenue(null)}
                className="text-white/60 hover:text-white text-2xl transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedVenue.type === 'stage' ? 'bg-purple-500/20 text-purple-400' :
                  selectedVenue.type === 'food' ? 'bg-orange-500/20 text-orange-400' :
                  selectedVenue.type === 'merchandise' ? 'bg-green-500/20 text-green-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {selectedVenue.type.charAt(0).toUpperCase() + selectedVenue.type.slice(1)}
                </span>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                {selectedVenue.description}
              </p>
              
              {selectedVenue.capacity && (
                <div className="bg-white/5 p-3 rounded-lg">
                  <span className="text-cyan-400 font-semibold">Capacity: </span>
                  <span className="text-white">{selectedVenue.capacity.toLocaleString()}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  )
}