"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { GlassContainer } from "@/components/glass/GlassContainer"

const stages = [
  {
    id: "main",
    name: "Main Stage",
    color: "from-purple-400/20 to-blue-400/20",
    hoverColor: "from-purple-400/30 to-blue-400/30",
    glowColor: "rgba(147, 51, 234, 0.3)",
    artists: ["DJ Nova", "Stellar Waves", "Neon Dreams"],
    icon: "🎵",
    description: "The heart of Aurora Fest"
  },
  {
    id: "edm",
    name: "EDM Dome",
    color: "from-blue-400/20 to-cyan-400/20",
    hoverColor: "from-blue-400/30 to-cyan-400/30",
    glowColor: "rgba(59, 130, 246, 0.3)",
    artists: ["BassStorm", "Electric Pulse", "Rave Machine"],
    icon: "⚡",
    description: "Electric energy unleashed"
  },
  {
    id: "acoustic",
    name: "Acoustic Grove",
    color: "from-cyan-400/20 to-teal-400/20",
    hoverColor: "from-cyan-400/30 to-teal-400/30",
    glowColor: "rgba(34, 211, 238, 0.3)",
    artists: ["Lumen", "Forest Whispers", "Moonlight Serenade"],
    icon: "🌿",
    description: "Nature's symphony"
  },
  {
    id: "future",
    name: "Future Bass Lab",
    color: "from-indigo-400/20 to-purple-400/20",
    hoverColor: "from-indigo-400/30 to-purple-400/30",
    glowColor: "rgba(99, 102, 241, 0.3)",
    artists: ["Quantum Beats", "Digital Aurora", "Cyber Symphony"],
    icon: "🚀",
    description: "Tomorrow's sound today"
  },
]

export default function LineupPortal() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedStage, setSelectedStage] = useState<string | null>(null)
  const [hoveredStage, setHoveredStage] = useState<string | null>(null)
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
    <section ref={ref} id="artists" className="relative min-h-screen py-32 px-4 overflow-hidden" onMouseMove={handleMouseMove}>
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

      {/* Floating Music Notes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {["♪", "♫", "♬", "♩", "♭", "♯"].map((note, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl text-white/20 font-bold"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 12}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 360],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
          >
            {note}
          </motion.div>
        ))}
      </div>

      {/* Dynamic Wave Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-32 opacity-10"
            style={{
              top: `${30 + i * 20}%`,
              background: `linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.1), transparent)`,
            }}
            animate={{
              x: [-100, 100],
              scaleX: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${i % 2 === 0 ? 'w-4 h-4' : 'w-6 h-6'} border border-purple-400/20`}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + i * 10}%`,
              transform: `rotate(${i * 60}deg)`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.8,
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

      {/* Light Rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`ray-${i}`}
            className="absolute w-1 opacity-20"
            style={{
              left: `${20 + i * 15}%`,
              top: '0%',
              height: '100%',
              background: `linear-gradient(to bottom, rgba(147, 51, 234, 0.3), rgba(59, 130, 246, 0.2), rgba(34, 211, 238, 0.1), transparent)`,
              transform: `rotate(${i * 15}deg)`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scaleX: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-xl"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${10 + i * 20}%`,
              top: `${15 + i * 15}%`,
              background: `radial-gradient(circle, ${['rgba(147, 51, 234, 0.1)', 'rgba(59, 130, 246, 0.08)', 'rgba(34, 211, 238, 0.06)', 'rgba(236, 72, 153, 0.05)'][i]})`,
            }}
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -20, 20, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 2,
            }}
          />
        ))}
      </div>

      {/* Mesh Gradient Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-40"
          style={{
            background: `
              radial-gradient(circle at 25% 25%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.06) 0%, transparent 50%),
              linear-gradient(45deg, rgba(147, 51, 234, 0.05) 0%, rgba(59, 130, 246, 0.03) 50%, rgba(34, 211, 238, 0.05) 100%)
            `,
          }}
          animate={{
            background: [
              `
                radial-gradient(circle at 25% 25%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.06) 0%, transparent 50%),
                linear-gradient(45deg, rgba(147, 51, 234, 0.05) 0%, rgba(59, 130, 246, 0.03) 50%, rgba(34, 211, 238, 0.05) 100%)
              `,
              `
                radial-gradient(circle at 75% 25%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 25% 75%, rgba(147, 51, 234, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.06) 0%, transparent 50%),
                linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(147, 51, 234, 0.03) 50%, rgba(59, 130, 246, 0.05) 100%)
              `,
              `
                radial-gradient(circle at 25% 25%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.06) 0%, transparent 50%),
                linear-gradient(45deg, rgba(147, 51, 234, 0.05) 0%, rgba(59, 130, 246, 0.03) 50%, rgba(34, 211, 238, 0.05) 100%)
              `,
            ],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Star Field */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Cosmic Dust Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute w-3 h-3 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${['rgba(147, 51, 234, 0.4)', 'rgba(59, 130, 246, 0.3)', 'rgba(34, 211, 238, 0.3)', 'rgba(236, 72, 153, 0.3)'][i % 4]})`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <GlassContainer className="max-w-7xl mx-auto relative z-20">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-6xl lg:text-7xl font-heading bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6"
          >
            Lineup Portal
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/80 font-light"
          >
            Enter the festival dimension and explore our cosmic lineup
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="cursor-pointer"
              onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
              onMouseEnter={() => setHoveredStage(stage.id)}
              onMouseLeave={() => setHoveredStage(null)}
            >
              {/* Sound Wave Visualization */}
              {hoveredStage === stage.id && (
                <div className="absolute -inset-4 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 bg-gradient-to-t from-purple-400/50 to-cyan-400/50 rounded-full"
                      style={{
                        left: `${10 + i * 10}%`,
                        bottom: '100%',
                        height: `${20 + Math.random() * 40}px`,
                      }}
                      animate={{
                        height: [20, 60, 20],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              )}

              <motion.div
                className="h-64 rounded-2xl glass-card p-1 shadow-2xl cursor-pointer relative overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 0 40px ${stage.glowColor}`,
                }}
                whileTap={{ scale: 0.95 }}
                animate={hoveredStage === stage.id ? {
                  background: `linear-gradient(135deg, ${stage.hoverColor.split(' ')[0].replace('from-', '')}, ${stage.hoverColor.split(' ')[1].replace('to-', '')})`
                } : {}}
                transition={{ duration: 0.3 }}
              >
                {/* Animated Background Pattern */}
                {hoveredStage === stage.id && (
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
                    {hoveredStage === stage.id && (
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
                      className="text-2xl relative z-10"
                      animate={hoveredStage === stage.id ? { scale: 1.2, rotate: 360 } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {stage.icon}
                    </motion.span>
                  </motion.div>
                  <motion.h3
                    className="text-xl font-bold text-white mb-2"
                    animate={hoveredStage === stage.id ? { scale: 1.05 } : { scale: 1 }}
                  >
                    {stage.name}
                  </motion.h3>
                  <motion.p
                    className="text-sm text-gray-300 mb-2"
                    animate={hoveredStage === stage.id ? { opacity: 0.8 } : { opacity: 1 }}
                  >
                    {stage.artists.length} artists
                  </motion.p>
                  <motion.p
                    className="text-xs text-gray-400"
                    animate={hoveredStage === stage.id ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {stage.description}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {selectedStage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="text-center mb-16"
          >
            <motion.h3
              className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-8"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              {stages.find((s) => s.id === selectedStage)?.name}
            </motion.h3>

            {/* Timeline Visualization */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4">
                {["20:00", "21:00", "22:00", "23:00"].map((time, i) => (
                  <motion.div
                    key={time}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <motion.div
                      className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 mb-2"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.5,
                      }}
                    />
                    <span className="text-xs text-gray-400">{time}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stages
                .find((s) => s.id === selectedStage)
                ?.artists.map((artist, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-card p-6 border border-white/20 hover:border-white/40 transition-all duration-300 relative overflow-hidden"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 30px rgba(255, 255, 255, 0.1)"
                    }}
                  >
                    {/* Mini Sound Waves */}
                    <div className="absolute top-2 right-2 flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-0.5 bg-purple-400/50 rounded-full"
                          animate={{
                            height: [4, 12, 4],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>

                    <motion.h4
                      className="text-xl font-bold text-white mb-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      {artist}
                    </motion.h4>
                    <motion.p
                      className="text-gray-400"
                      whileHover={{ opacity: 0.8 }}
                    >
                      22:00
                    </motion.p>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center relative"
        >
          {/* Particle Burst Effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: [0, Math.cos(i * 30 * Math.PI / 180) * 100],
                  y: [0, Math.sin(i * 30 * Math.PI / 180) * 100],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          <motion.button
            className="glass-card px-10 py-5 bg-gradient-to-r from-purple-400/20 to-blue-400/20 text-white font-bold rounded-full shadow-lg text-lg border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden group hover:scale-105"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(147, 51, 234, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(147, 51, 234, 0.2)",
                "0 0 30px rgba(59, 130, 246, 0.2)",
                "0 0 20px rgba(147, 51, 234, 0.2)"
              ]
            }}
            transition={{
              boxShadow: { duration: 3, repeat: Number.POSITIVE_INFINITY }
            }}
          >
            {/* Button Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: [-100, 200],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
              }}
            />

            <span className="relative z-10 flex items-center space-x-2">
              <span className="text-xl">🎫</span>
              <span>Get Your Portal Pass</span>
            </span>
          </motion.button>
        </motion.div>
      </GlassContainer>
    </section>
  )
}