"use client"

import { useState, useRef, Suspense } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { GlassContainer } from "@/components/glass/GlassContainer"
import Link from "next/link"

const highlights = [
  {
    id: "lights",
    title: "Spectacular Light Shows",
    description: "Experience mesmerizing light installations that dance with the music",
    icon: "✨",
    details: "Over 500 LED fixtures, synchronized with every beat"
  },
  {
    id: "food",
    title: "Culinary Journey",
    description: "Global street food meets festival vibes",
    icon: "🍜",
    details: "25+ food trucks from around the world"
  },
  {
    id: "art",
    title: "Interactive Art Installations",
    description: "Immerse yourself in living art that responds to your presence",
    icon: "🎨",
    details: "Motion-activated sculptures and digital art walls"
  },
  {
    id: "community",
    title: "Festival Community",
    description: "Connect with fellow music lovers in our curated social spaces",
    icon: "👥",
    details: "Dedicated chill zones and community stages"
  }
]

const stats = [
  { label: "Expected Attendees", value: "50,000+", icon: "👥" },
  { label: "Music Hours", value: "72+", icon: "🎵" },
  { label: "Stages", value: "8", icon: "🎪" },
  { label: "Food Vendors", value: "25+", icon: "🍽️" }
]

export default function ExperiencePortal() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedHighlight, setSelectedHighlight] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      })
    }
  }

  return (
    <section ref={ref} id="experience" className="relative min-h-screen py-32 px-4 overflow-hidden" onMouseMove={handleMouseMove}>
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black" />
      <div className="absolute inset-0 dotted-pattern opacity-30" />

      {/* Floating Interactive Dots */}
      <div className="absolute top-20 left-10 animate-float z-10">
        <motion.div
          className="w-8 h-8 rounded-full bg-purple-400/20 animate-pulse shadow-lg shadow-purple-400/10 cursor-pointer"
          whileHover={{
            scale: 1.5,
            backgroundColor: "rgba(168, 85, 247, 0.4)",
            boxShadow: "0 0 20px rgba(168, 85, 247, 0.6)"
          }}
          whileTap={{ scale: 0.8 }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            y: { duration: 3, repeat: Number.POSITIVE_INFINITY },
            rotate: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }
          }}
        />
      </div>
      <div className="absolute top-40 right-20 animate-float z-10" style={{ animationDelay: "2s" }}>
        <motion.div
          className="w-6 h-6 rounded-full bg-blue-400/15 animate-pulse shadow-lg shadow-blue-400/8 cursor-pointer"
          whileHover={{
            scale: 1.8,
            backgroundColor: "rgba(59, 130, 246, 0.3)",
            boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)"
          }}
          whileTap={{ scale: 0.7 }}
          animate={{
            y: [0, 15, 0],
            x: [0, 5, 0]
          }}
          transition={{
            y: { duration: 4, repeat: Number.POSITIVE_INFINITY },
            x: { duration: 5, repeat: Number.POSITIVE_INFINITY }
          }}
        />
      </div>
      <div className="absolute bottom-40 left-20 animate-float z-10" style={{ animationDelay: "4s" }}>
        <motion.div
          className="w-10 h-10 rounded-full bg-cyan-400/25 animate-pulse shadow-lg shadow-cyan-400/12 cursor-pointer"
          whileHover={{
            scale: 1.3,
            backgroundColor: "rgba(34, 211, 238, 0.4)",
            boxShadow: "0 0 30px rgba(34, 211, 238, 0.7)"
          }}
          whileTap={{ scale: 0.9 }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 3, repeat: Number.POSITIVE_INFINITY }
          }}
        />
      </div>
      <div className="absolute top-60 right-40 animate-float z-10" style={{ animationDelay: "6s" }}>
        <motion.div
          className="w-7 h-7 rounded-full bg-pink-400/18 animate-pulse shadow-lg shadow-pink-400/9 cursor-pointer"
          whileHover={{
            scale: 1.6,
            backgroundColor: "rgba(236, 72, 153, 0.3)",
            boxShadow: "0 0 22px rgba(236, 72, 153, 0.6)"
          }}
          whileTap={{ scale: 0.8 }}
          animate={{
            y: [0, -8, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            y: { duration: 2.5, repeat: Number.POSITIVE_INFINITY },
            opacity: { duration: 3, repeat: Number.POSITIVE_INFINITY }
          }}
        />
      </div>

      {/* Interactive Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full cursor-pointer"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, 30],
              opacity: [0.1, 0.6, 0.1],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
            whileHover={{
              scale: 2,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)"
            }}
            whileTap={{
              scale: 0.2,
              backgroundColor: "rgba(255, 255, 255, 1)"
            }}
          />
        ))}
      </div>

      {/* Sparkles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-2 h-2"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${['#a855f7', '#3b82f6', '#06b6d4', '#ec4899'][i % 4]} 0%, transparent 70%)`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Nebula Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-30"
          animate={{
            background: [
              `radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.15) 0%, rgba(59, 130, 246, 0.1) 25%, rgba(34, 211, 238, 0.05) 50%, transparent 70%)`,
              `radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.15) 0%, rgba(147, 51, 234, 0.1) 25%, rgba(59, 130, 246, 0.05) 50%, transparent 70%)`,
              `radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.15) 0%, rgba(236, 72, 153, 0.1) 25%, rgba(147, 51, 234, 0.05) 50%, transparent 70%)`,
              `radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.15) 0%, rgba(59, 130, 246, 0.1) 25%, rgba(34, 211, 238, 0.05) 50%, transparent 70%)`,
            ],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <GlassContainer className="max-w-7xl mx-auto relative z-20">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-6xl lg:text-7xl font-heading bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6"
          >
            Experience Portal
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/80 font-light"
          >
            Discover what makes AURORA unforgettable
          </motion.p>
        </div>

        {/* Festival Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 text-center border border-white/10 hover:border-white/20 transition-all duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(255, 255, 255, 0.1)"
              }}
            >
              <motion.div
                className="text-3xl mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
              >
                {stat.icon}
              </motion.div>
              <motion.div
                className="text-2xl font-bold text-white mb-1"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="cursor-pointer"
              onClick={() => setSelectedHighlight(selectedHighlight === highlight.id ? null : highlight.id)}
            >
              <motion.div
                className="h-48 rounded-2xl glass-card p-1 shadow-2xl cursor-pointer relative overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 0 40px rgba(147, 51, 234, 0.3)`,
                }}
                whileTap={{ scale: 0.95 }}
                animate={selectedHighlight === highlight.id ? {
                  background: `linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(59, 130, 246, 0.2))`
                } : {}}
                transition={{ duration: 0.3 }}
              >
                {/* Animated Background Pattern */}
                {selectedHighlight === highlight.id && (
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    animate={{
                      background: [
                        `radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.3), transparent)`,
                        `radial-gradient(circle at 80% 80%, rgba(34, 211, 238, 0.3), transparent)`,
                        `radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.3), transparent)`,
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                )}

                <div className="h-full w-full bg-black/80 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center text-center p-6 border border-white/10 hover:border-white/20 transition-all duration-300 relative z-10">
                  <motion.div
                    className="w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-white/20 to-white/5 flex items-center justify-center relative"
                    whileHover={{
                      scale: 1.1,
                      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))"
                    }}
                  >
                    {/* Pulsing Ring */}
                    {selectedHighlight === highlight.id && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-purple-400/50"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      />
                    )}

                    <motion.span
                      className="text-3xl relative z-10"
                      animate={selectedHighlight === highlight.id ? { scale: 1.2, rotate: 360 } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {highlight.icon}
                    </motion.span>
                  </motion.div>
                  <motion.h3
                    className="text-xl font-bold text-white mb-2"
                    animate={selectedHighlight === highlight.id ? { scale: 1.05 } : { scale: 1 }}
                  >
                    {highlight.title}
                  </motion.h3>
                  <motion.p
                    className="text-sm text-gray-300 mb-2"
                    animate={selectedHighlight === highlight.id ? { opacity: 0.8 } : { opacity: 1 }}
                  >
                    {highlight.description}
                  </motion.p>
                  <motion.p
                    className="text-xs text-gray-400"
                    animate={selectedHighlight === highlight.id ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {highlight.details}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Interactive 3D Venue Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <motion.div
            className="glass-card p-8 border border-white/20 hover:border-white/40 transition-all duration-300 mb-6"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 50px rgba(147, 51, 234, 0.2)"
            }}
          >
            <motion.div
              className="text-4xl mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              🗺️
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-4">Interactive Venue Map</h3>
            <p className="text-gray-300 mb-6">Explore the festival grounds with our immersive 3D venue map</p>
          </motion.div>

            <div className="w-full h-96 rounded-2xl bg-black/50 backdrop-blur-sm border border-white/20 overflow-hidden relative group">
              <img
                src="/image.png"
                alt="Festival Venue Map"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <Link href="/venue">
                  <motion.button
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🗺️ Explore Interactive 3D Venue Map
                  </motion.button>
                </Link>
              </div>
            </div>
        </motion.div>
      </GlassContainer>
    </section>
  )
}