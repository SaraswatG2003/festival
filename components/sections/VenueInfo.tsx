"use client"

import { useState } from "react"
import { MapPin, Navigation, Info, Utensils, ShoppingBag, PenTool as Restroom } from "lucide-react"
import GlassCard from "@/components/glass/GlassCard"
import GlassContainer from "@/components/glass/GlassContainer"
import { Button } from "@/components/ui/button"
import { venues } from "@/data/venues"

const venueTypes = [
  { type: "stage", icon: MapPin, label: "Stages", color: "neon-blue" },
  { type: "food", icon: Utensils, label: "Food & Drinks", color: "neon-orange" },
  { type: "merchandise", icon: ShoppingBag, label: "Merchandise", color: "neon-purple" },
  { type: "facilities", icon: Restroom, label: "Facilities", color: "neon-green" },
]

export default function VenueInfo() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedVenue, setSelectedVenue] = useState<(typeof venues)[0] | null>(null)

  const filteredVenues = selectedType ? venues.filter((venue) => venue.type === selectedType) : venues

  return (
    <section id="venue" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <GlassContainer className="mb-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading gradient-text">Venue Explorer</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Navigate the festival grounds and discover all the amazing locations
            </p>
          </div>
        </GlassContainer>

        {/* Venue Type Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant={selectedType === null ? "default" : "outline"}
              onClick={() => setSelectedType(null)}
              className={`${
                selectedType === null
                  ? "glass-primary neon-blue border-blue-400/30"
                  : "glass-card border-white/20 hover:glass-primary"
              } transition-all duration-300`}
            >
              <Navigation className="w-4 h-4 mr-2" />
              All Locations
            </Button>
            {venueTypes.map(({ type, icon: Icon, label, color }) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                onClick={() => setSelectedType(type)}
                className={`${
                  selectedType === type
                    ? `glass-primary ${color} border-current/30`
                    : "glass-card border-white/20 hover:glass-primary"
                } transition-all duration-300`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Venue Map Placeholder */}
        <div className="mb-8">
          <GlassCard className="p-8 text-center">
            <div className="relative h-96 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg overflow-hidden">
              <img
                src="/festival-venue-map-with-stages-and-facilities.jpg"
                alt="Festival Venue Map"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Navigation className="w-12 h-12 mx-auto neon-blue" />
                  <h3 className="text-xl font-heading text-white">Interactive 3D Map</h3>
                  <p className="text-white/80">Click on locations to explore the venue</p>
                </div>
              </div>

              {/* Venue Hotspots */}
              {filteredVenues.slice(0, 6).map((venue, index) => (
                <button
                  key={venue.id}
                  onClick={() => setSelectedVenue(venue)}
                  className="absolute w-4 h-4 bg-blue-400 rounded-full animate-pulse hover:scale-150 transition-transform duration-200"
                  style={{
                    left: `${20 + index * 12}%`,
                    top: `${30 + (index % 2) * 20}%`,
                  }}
                />
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Venue Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredVenues.map((venue) => {
            const venueTypeInfo = venueTypes.find((vt) => vt.type === venue.type)
            const Icon = venueTypeInfo?.icon || MapPin

            return (
              <GlassCard key={venue.id} className="p-6 cursor-pointer group" onClick={() => setSelectedVenue(venue)}>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-6 h-6 ${venueTypeInfo?.color || "neon-blue"}`} />
                      <div>
                        <h3 className="font-heading text-white group-hover:text-blue-400 transition-colors">
                          {venue.name}
                        </h3>
                        <p className="text-sm text-white/60 capitalize">{venue.type}</p>
                      </div>
                    </div>
                    <Info className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors" />
                  </div>

                  <img
                    src={venue.image || "/placeholder.svg"}
                    alt={venue.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />

                  <p className="text-sm text-white/80 line-clamp-2">{venue.description}</p>

                  {venue.capacity && (
                    <div className="text-xs text-white/60">Capacity: {venue.capacity.toLocaleString()}</div>
                  )}
                </div>
              </GlassCard>
            )
          })}
        </div>

        {/* Selected Venue Details */}
        {selectedVenue && (
          <GlassContainer className="border-2 border-blue-400/30">
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-heading neon-blue">{selectedVenue.name}</h3>
                  <p className="text-white/80 capitalize">{selectedVenue.type}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedVenue(null)}
                  className="text-white/60 hover:text-white"
                >
                  ×
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <img
                  src={selectedVenue.image || "/placeholder.svg"}
                  alt={selectedVenue.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="space-y-4">
                  <p className="text-white/90">{selectedVenue.description}</p>
                  {selectedVenue.capacity && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 neon-blue" />
                      <span className="text-white/80">Capacity: {selectedVenue.capacity.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </GlassContainer>
        )}
      </div>
    </section>
  )
}
