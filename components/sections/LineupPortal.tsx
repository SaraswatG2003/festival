"use client"

import { useState } from "react"

const stages = [
  {
    id: "main",
    name: "Main Stage",
    color: "from-purple-500 to-pink-500",
    artists: ["DJ Nova", "Stellar Waves", "Neon Dreams"],
  },
  {
    id: "edm",
    name: "EDM Dome",
    color: "from-cyan-500 to-blue-500",
    artists: ["BassStorm", "Electric Pulse", "Rave Machine"],
  },
  {
    id: "acoustic",
    name: "Acoustic Grove",
    color: "from-green-500 to-emerald-500",
    artists: ["Lumen", "Forest Whispers", "Moonlight Serenade"],
  },
  {
    id: "future",
    name: "Future Bass Lab",
    color: "from-orange-500 to-red-500",
    artists: ["Quantum Beats", "Digital Aurora", "Cyber Symphony"],
  },
]

export default function LineupPortal() {
  const [selectedStage, setSelectedStage] = useState<string | null>(null)

  return (
    <section className="relative min-h-screen bg-black py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-cyan-900/20" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Lineup Portal
          </h2>
          <p className="text-xl text-gray-300">Enter the festival dimension and explore our cosmic lineup</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className="cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
            >
              <div className={`h-48 rounded-2xl bg-gradient-to-br ${stage.color} p-1 shadow-2xl`}>
                <div className="h-full w-full bg-black/80 rounded-xl flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-white/20 to-white/5 flex items-center justify-center">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${stage.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{stage.name}</h3>
                  <p className="text-sm text-gray-300">{stage.artists.length} artists</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedStage && (
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-8">{stages.find((s) => s.id === selectedStage)?.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stages
                .find((s) => s.id === selectedStage)
                ?.artists.map((artist, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="text-xl font-bold text-white mb-2">{artist}</h4>
                    <p className="text-gray-400">22:00</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-300">
            Get Your Portal Pass
          </button>
        </div>
      </div>
    </section>
  )
}
