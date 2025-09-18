"use client"

import { Clock, MapPin, Calendar } from "lucide-react"
import GlassCard from "@/components/glass/GlassCard"

interface ScheduleEvent {
  id: string
  artist: string
  stage: string
  startTime: string
  endTime: string
  day: number
  description: string
  genre: string
}

interface VerticalTimelineProps {
  events: ScheduleEvent[]
  currentTime?: string
  onEventClick?: (event: ScheduleEvent) => void
  groupBy?: "day" | "stage"
}

export default function VerticalTimeline({
  events,
  currentTime,
  onEventClick,
  groupBy = "day",
}: VerticalTimelineProps) {
  const isCurrentEvent = (event: ScheduleEvent) => {
    if (!currentTime) return false
    const current = new Date(`2024-01-01 ${currentTime}:00`)
    const start = new Date(`2024-01-01 ${event.startTime}:00`)
    const end = new Date(`2024-01-01 ${event.endTime}:00`)
    return current >= start && current <= end
  }

  const getEventColor = (genre: string) => {
    const colors = {
      Electronic: "neon-blue",
      Rock: "neon-orange",
      "Hip Hop": "neon-purple",
      Pop: "neon-pink",
      Indie: "neon-green",
    }
    return colors[genre as keyof typeof colors] || "neon-blue"
  }

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-orange-400 opacity-30" />

      {/* Events */}
      <div className="space-y-6">
        {events.map((event, index) => {
          const isCurrent = isCurrentEvent(event)
          const colorClass = getEventColor(event.genre)

          return (
            <div key={event.id} className="relative flex items-start space-x-6">
              {/* Timeline Dot */}
              <div
                className={`relative z-10 flex-shrink-0 w-4 h-4 rounded-full border-2 ${
                  isCurrent ? "bg-blue-400 border-blue-400 animate-pulse" : "bg-white/20 border-white/40"
                }`}
              >
                {isCurrent && <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping" />}
              </div>

              {/* Event Card */}
              <GlassCard
                className={`flex-1 p-4 cursor-pointer transition-all duration-300 ${
                  isCurrent ? "border-2 border-blue-400/50 animate-glow" : ""
                }`}
                onClick={() => onEventClick?.(event)}
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`text-lg font-heading ${colorClass}`}>{event.artist}</h3>
                      <p className="text-white/80 text-sm">{event.genre}</p>
                    </div>
                    {isCurrent && (
                      <div className="flex items-center space-x-1 text-xs neon-blue">
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                        <span>LIVE NOW</span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-white/80">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {event.startTime} - {event.endTime}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.stage}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Day {event.day}</span>
                    </div>
                  </div>

                  {/* Description */}
                  {event.description && <p className="text-white/70 text-sm">{event.description}</p>}
                </div>
              </GlassCard>
            </div>
          )
        })}
      </div>

      {/* Current Time Indicator */}
      {currentTime && (
        <div className="absolute left-0 top-20 flex items-center space-x-4 text-sm neon-blue">
          <div className="w-6 h-0.5 bg-blue-400" />
          <span className="glass-primary px-2 py-1 rounded text-xs">{currentTime}</span>
        </div>
      )}
    </div>
  )
}
