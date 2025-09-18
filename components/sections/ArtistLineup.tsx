"use client"

import { useState } from "react"
import { Search, Filter, ExternalLink, Instagram, Music } from "lucide-react"
import GlassCard from "@/components/glass/GlassCard"
import GlassContainer from "@/components/glass/GlassContainer"
import HorizontalScroll from "@/components/scrollable/HorizontalScroll"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { artists } from "@/data/artists"

const genres = ["All", "Electronic", "Rock", "Hip Hop", "Pop", "Indie"]

export default function ArtistLineup() {
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredArtists = artists.filter((artist) => {
    const matchesGenre = selectedGenre === "All" || artist.genre === selectedGenre
    const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesGenre && matchesSearch
  })

  const ArtistCard = ({ artist }: { artist: (typeof artists)[0] }) => (
    <GlassCard className="min-w-[300px] p-6 group cursor-pointer">
      <div className="space-y-4">
        {/* Artist Image */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={artist.image || "/placeholder.svg"}
            alt={artist.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-heading text-white">{artist.name}</h3>
            <p className="text-sm text-white/80">{artist.genre}</p>
          </div>
        </div>

        {/* Artist Info */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm neon-blue">{artist.stage}</span>
            <span className="text-sm text-white/60">{artist.performanceDate}</span>
          </div>

          <p className="text-sm text-white/80 line-clamp-2">{artist.bio}</p>

          {/* Social Links */}
          <div className="flex items-center space-x-3">
            {artist.socialLinks.spotify && (
              <a
                href={artist.socialLinks.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-green-400 transition-colors"
              >
                <Music className="w-4 h-4" />
              </a>
            )}
            {artist.socialLinks.instagram && (
              <a
                href={artist.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-pink-400 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {artist.socialLinks.twitter && (
              <a
                href={artist.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-blue-400 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  )

  return (
    <section id="artists" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <GlassContainer className="mb-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading gradient-text">Artist Lineup</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Discover incredible artists from around the world performing across multiple stages
            </p>
          </div>
        </GlassContainer>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-card border-white/20 text-white placeholder:text-white/40"
            />
          </div>

          {/* Genre Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGenre(genre)}
                className={`${
                  selectedGenre === genre
                    ? "glass-primary neon-blue border-blue-400/30"
                    : "glass-card border-white/20 hover:glass-primary"
                } transition-all duration-300`}
              >
                <Filter className="w-4 h-4 mr-2" />
                {genre}
              </Button>
            ))}
          </div>
        </div>

        {/* Artists Horizontal Scroll */}
        <HorizontalScroll
          items={filteredArtists}
          renderItem={(artist) => <ArtistCard key={artist.id} artist={artist} />}
          spacing={16}
          showScrollbar={false}
          enableMomentum={true}
        />

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Artists", value: artists.length },
            { label: "Genres", value: genres.length - 1 },
            { label: "Stages", value: 4 },
            { label: "Hours of Music", value: 72 },
          ].map((stat, index) => (
            <GlassCard key={index} className="p-4 text-center">
              <div className="text-2xl font-heading neon-blue">{stat.value}</div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
