"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { GlassContainer } from "@/components/glass/GlassContainer"

const keywords = [
  { text: "Music", color: "from-purple-400 to-pink-400", icon: "🎵" },
  { text: "Light", color: "from-blue-400 to-cyan-400", icon: "✨" },
  { text: "Culture", color: "from-green-400 to-teal-400", icon: "🎭" },
  { text: "Energy", color: "from-orange-400 to-red-400", icon: "⚡" },
]

const timeline = [
  { year: "2022", caption: "The Spark", description: "First vision" },
  { year: "2023", caption: "The Rise", description: "Community grows" },
  { year: "2024", caption: "The Gathering", description: "Festival begins" },
  { year: "2025", caption: "The Future", description: "Aurora awaits" },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredKeyword, setHoveredKeyword] = useState<string | null>(null)
  const [ringSpeed, setRingSpeed] = useState(1)
  const [orbSpeed, setOrbSpeed] = useState(1)
  const [orbColor, setOrbColor] = useState("from-purple-500 via-blue-500 to-cyan-500")
  const handleRingHover = (isHovering: boolean) => {
    setRingSpeed(isHovering ? 3 : 1)
  }

  const handleOrbHover = (isHovering: boolean) => {
    setOrbSpeed(isHovering ? 4 : 1)
    if (isHovering) {
      const colors = [
        "from-red-500 via-pink-500 to-purple-500",
        "from-yellow-500 via-orange-500 to-red-500",
        "from-green-500 via-teal-500 to-blue-500",
        "from-indigo-500 via-purple-500 to-pink-500"
      ]
      setOrbColor(colors[Math.floor(Math.random() * colors.length)])
    } else {
      setOrbColor("from-purple-500 via-blue-500 to-cyan-500")
    }
  }

  const handleOrbClick = () => {
    setOrbSpeed(orbSpeed === 1 ? 8 : 1)
    // Add a burst effect
    const burstColors = ["from-yellow-400", "from-pink-400", "from-cyan-400", "from-green-400"]
    setOrbColor(burstColors[Math.floor(Math.random() * burstColors.length)])
    setTimeout(() => setOrbColor("from-purple-500 via-blue-500 to-cyan-500"), 1000)
  }

  return (
    <section id="about" ref={ref} className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black" />
      <div className="absolute inset-0 dotted-pattern opacity-30" />

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

      <GlassContainer className="max-w-7xl mx-auto relative z-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Enhanced Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-96 h-96 flex items-center justify-center">
              {/* Outer Glow Rings with glass effect */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-white/10 glass-card cursor-pointer"
                  style={{
                    width: `${180 + i * 50}px`,
                    height: `${180 + i * 50}px`,
                    background: `rgba(${147 + i * 20}, ${51 + i * 30}, ${234 - i * 20}, 0.05)`,
                  }}
                  animate={{
                    rotate: i % 2 === 0 ? 360 : -360,
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    rotate: { duration: (25 + i * 5) / ringSpeed, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: (5 + i) / ringSpeed, repeat: Number.POSITIVE_INFINITY },
                  }}
                  onMouseEnter={() => handleRingHover(true)}
                  onMouseLeave={() => handleRingHover(false)}
                  whileHover={{
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 0 30px rgba(147, 51, 234, 0.3)",
                  }}
                />
              ))}

              {/* Central Aurora Orb with enhanced styling */}
              <motion.div
                className={`relative w-52 h-52 rounded-full bg-gradient-to-br ${orbColor} glass-card cursor-pointer`}
                animate={{
                  scale: [1, 1.08, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  scale: { duration: 4 / orbSpeed, repeat: Number.POSITIVE_INFINITY },
                  rotate: { duration: 20 / orbSpeed, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                }}
                style={{
                  boxShadow:
                    "0 0 80px rgba(147, 51, 234, 0.6), 0 0 160px rgba(59, 130, 246, 0.4), inset 0 0 40px rgba(255, 255, 255, 0.1)",
                }}
                onMouseEnter={() => handleOrbHover(true)}
                onMouseLeave={() => handleOrbHover(false)}
                onClick={handleOrbClick}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 120px rgba(147, 51, 234, 0.8), 0 0 240px rgba(59, 130, 246, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Inner Glow */}
                <div className="absolute inset-6 rounded-full bg-gradient-to-br from-white/30 to-transparent" />

                {/* Aurora Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="text-3xl font-bold text-white/95 tracking-wider font-heading"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    AURORA
                  </motion.span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Enhanced Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-5xl lg:text-6xl font-heading bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
              >
                About Aurora Fest
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-2xl text-white/90 font-light leading-relaxed"
              >
                Where Light Meets Music — a journey, not a show.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass-card p-8 space-y-6"
            >
              <p className="text-lg text-white/80 leading-relaxed font-body">
                Aurora Fest was born when artists, dreamers, and tech wizards came together to light up the darkest
                night of the year. What started as a spark became a movement.
              </p>
              <p className="text-lg text-white/80 leading-relaxed font-body">
                A celebration of sound, color and unexpected moments. Expect music that moves your soul, and colors that
                linger in your dreams long after the last note fades.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-heading text-white/95 uppercase tracking-wider">Experience</h3>
              <div className="grid grid-cols-2 gap-4">
                {keywords.map((keyword, index) => (
                  <motion.button
                    key={keyword.text}
                    className={`glass-card p-6 bg-gradient-to-r ${keyword.color} text-white font-heading transition-all duration-300 group`}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                    }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setHoveredKeyword(keyword.text)}
                    onHoverEnd={() => setHoveredKeyword(null)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {keyword.icon}
                      </span>
                      <span className="text-lg font-semibold">{keyword.text}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="pt-4"
            >
            </motion.div>
          </motion.div>
        </div>
      </GlassContainer>
    </section>
  )
}