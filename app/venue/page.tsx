"use client"

import { Suspense } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"

// Dynamically import the 3D world to avoid SSR issues
const Festival3DWorld = dynamic(() => import("../../components/3d/Festival3DWorld"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="animate-spin rounded-full h-24 w-24 border-4 border-purple-400/30 border-t-purple-400 mx-auto"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-24 w-24 border-2 border-purple-400/20"></div>
        </div>
        <motion.h2 
          className="text-2xl font-bold text-white mb-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading Festival World
        </motion.h2>
        <p className="text-gray-400">Preparing immersive 3D experience...</p>
      </div>
    </div>
  )
})

export default function VenuePage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 left-0 right-0 z-50 p-6"
      >
        <div className="flex justify-between items-center">
          <motion.h1 
            className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            AURORA Festival 3D World
          </motion.h1>
          <motion.button
            onClick={() => window.history.back()}
            className="glass-card px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back to Festival
          </motion.button>
        </div>
      </motion.div>

      {/* 3D World */}
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="animate-spin rounded-full h-24 w-24 border-4 border-purple-400/30 border-t-purple-400 mx-auto"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-24 w-24 border-2 border-purple-400/20"></div>
            </div>
            <motion.h2 
              className="text-2xl font-bold text-white mb-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Loading Festival World
            </motion.h2>
            <p className="text-gray-400">Preparing immersive 3D experience...</p>
          </div>
        </div>
      }>
        <Festival3DWorld />
      </Suspense>

      {/* Instructions Overlay */}
      
    </div>
  )
}