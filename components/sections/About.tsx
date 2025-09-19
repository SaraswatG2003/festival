"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { GlassContainer } from "@/components/glass/GlassContainer"

const keywords = [
  { text: "Music", color: "from-purple-400 to-pink-400" },
  { text: "Light", color: "from-blue-400 to-cyan-400" },
  { text: "Culture", color: "from-green-400 to-teal-400" },
  { text: "Energy", color: "from-orange-400 to-red-400" },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredKeyword, setHoveredKeyword] = useState<string | null>(null)

  return (
    <section ref={ref} className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black" />

      <div className="absolute top-20 left-10 animate-float z-10">
        <div className="w-8 h-8 rounded-full bg-purple-400/20 animate-pulse" />
      </div>
      <div className="absolute bottom-40 right-20 animate-float z-10" style={{ animationDelay: "2s" }}>
        <div className="w-6 h-6 rounded-full bg-blue-400/15 animate-pulse" />
      </div>

      <GlassContainer className="max-w-7xl mx-auto relative z-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Aurora Orb */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-80 h-80 flex items-center justify-center">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-white/10"
                  style={{
                    width: `${200 + i * 40}px`,
                    height: `${200 + i * 40}px`,
                  }}
                  animate={{
                    rotate: i % 2 === 0 ? 360 : -360,
                  }}
                  transition={{
                    duration: 20 + i * 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              ))}

              {/* Central Aurora Orb */}
              <motion.div
                className="relative w-48 h-48 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                }}
                style={{
                  boxShadow: "0 0 60px rgba(147, 51, 234, 0.5), 0 0 120px rgba(59, 130, 246, 0.3)",
                }}
              >
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white tracking-wider">AURORA</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
              >
                About Aurora Fest
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-xl text-white/90 font-light"
              >
                Where Light Meets Music — a journey, not a show.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass-card p-6 space-y-4"
            >
              <p className="text-lg text-white/80 leading-relaxed">
                Aurora Fest was born when artists, dreamers, and tech wizards came together to light up the darkest
                night of the year. What started as a spark became a movement.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                A celebration of sound, color and unexpected moments. Expect music that moves your soul, and colors that
                linger in your dreams long after the last note fades.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-white/95 uppercase tracking-wider">Experience</h3>
              <div className="grid grid-cols-2 gap-3">
                {keywords.map((keyword, index) => (
                  <motion.button
                    key={keyword.text}
                    className={`glass-card p-4 bg-gradient-to-r ${keyword.color} text-white font-semibold transition-all duration-300`}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                  >
                    {keyword.text}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="pt-4"
            >
              <motion.button
                className="glass-card px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  y: -2,
                }}
                whileTap={{ scale: 0.95 }}
              >
                Explore the Experience
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </GlassContainer>
    </section>
  )
}
