import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import FestivalStats from "@/components/sections/FestivalStats"
// import LineupPortal from "@/components/sections/LineupPortal"
import Schedule from "@/components/sections/Schedule"
import VenueInfo from "@/components/sections/VenueInfo"
import Gallery from "@/components/sections/Gallery"
import Tickets from "@/components/sections/Tickets"
import Footer from "@/components/sections/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <FestivalStats />
      {/* <LineupPortal /> */}
      <Schedule />
      <VenueInfo />
      <Gallery />
      <Tickets />
      <Footer />
    </main>
  )
}
