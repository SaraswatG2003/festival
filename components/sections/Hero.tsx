"use client"
import { ChevronDown } from "lucide-react"
import GlassNavbar from "@/components/glass/GlassNavbar"
// import FestivalPortal from "@/components/3d/FestivalPortal"

export default function Hero() {
  const scrollToNext = () => {
    const nextSection = document.querySelector("#festival-stats")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Navigation */}
      <GlassNavbar />

      {/* Top Right Stats */}
      <div className="absolute top-32 right-8 z-30">
        <div className="glass-card p-4 backdrop-blur-md text-right">
          <div className="text-white/60 text-sm uppercase tracking-wider mb-2">Live Stats</div>
          <div className="text-3xl font-bold text-white mb-1">50K+</div>
          <div className="text-white/70 text-sm mb-4">Attendees</div>
          <div className="text-2xl font-bold text-white mb-1">120+</div>
          <div className="text-white/70 text-sm">Artists</div>
        </div>
      </div>

      {/* Bottom Left Event Info */}
      <div className="absolute bottom-32 left-8 z-30">
        <div className="glass-card p-4 backdrop-blur-md">
          <div className="text-white/60 text-sm uppercase tracking-wider mb-2">Event Details</div>
          <div className="text-white text-lg font-semibold mb-1">July 15-17, 2024</div>
          <div className="text-white/70 text-sm mb-2">Digital Realm Arena</div>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Live Now
          </div>
        </div>
      </div>

      {/* Bottom Right Interactive Hint */}
      <div className="absolute bottom-32 right-8 z-30">
        <div className="glass-card p-4 backdrop-blur-md text-center">
          <div className="text-white/60 text-sm uppercase tracking-wider mb-2">Portal Control</div>
          <div className="text-white text-sm mb-2">Click • Drag • Explore</div>
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
            <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
          </div>
        </div>
      </div>

      <div className="relative z-20 w-full h-full flex items-center justify-center my-16">
        <div className="w-full h-[calc(100vh-8rem)] max-h-[800px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-64 h-64 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 animate-pulse flex items-center justify-center">
              <div className="text-6xl">🎪</div>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              Aurora Fest
            </h1>
            <p className="text-xl text-gray-300">Experience the Magic</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <button
          onClick={scrollToNext}
          className="animate-bounce text-white/60 hover:text-white transition-colors duration-300 glass-card p-4 rounded-full hover:scale-110"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute top-20 left-10 animate-float z-10">
        <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse shadow-lg shadow-white/10" />
      </div>
      <div className="absolute top-40 right-20 animate-float z-10" style={{ animationDelay: "2s" }}>
        <div className="w-6 h-6 rounded-full bg-white/15 animate-pulse shadow-lg shadow-white/8" />
      </div>
      <div className="absolute bottom-40 left-20 animate-float z-10" style={{ animationDelay: "4s" }}>
        <div className="w-10 h-10 rounded-full bg-white/25 animate-pulse shadow-lg shadow-white/12" />
      </div>
      <div className="absolute top-60 right-40 animate-float z-10" style={{ animationDelay: "6s" }}>
        <div className="w-7 h-7 rounded-full bg-white/18 animate-pulse shadow-lg shadow-white/9" />
      </div>
      <div className="absolute top-1/2 left-4 animate-float z-10" style={{ animationDelay: "8s" }}>
        <div className="w-5 h-5 rounded-full bg-white/22 animate-pulse shadow-lg shadow-white/11" />
      </div>
      <div className="absolute bottom-60 right-12 animate-float z-10" style={{ animationDelay: "10s" }}>
        <div className="w-9 h-9 rounded-full bg-white/17 animate-pulse shadow-lg shadow-white/7" />
      </div>
    </section>
  )
}
