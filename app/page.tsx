import Hero from "@/components/sections/Hero"
import FestivalStats from "@/components/sections/FestivalStats"
import ArtistLineup from "@/components/sections/ArtistLineup"
import Schedule from "@/components/sections/Schedule"
import VenueInfo from "@/components/sections/VenueInfo"
import Gallery from "@/components/sections/Gallery"
import Tickets from "@/components/sections/Tickets"
import Footer from "@/components/sections/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FestivalStats />
      <ArtistLineup />
      <Schedule />
      <VenueInfo />
      <Gallery />
      <Tickets />
      <Footer />
    </main>
  )
}
