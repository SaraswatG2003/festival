import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import ExperiencePortal from "@/components/sections/ExperiencePortal"
import LineupPortal from "@/components/sections/LineupPortal"
import Footer from "@/components/sections/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <ExperiencePortal />
      <LineupPortal />
      <Footer />
    </main>
  )
}
