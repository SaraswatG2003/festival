"use client"

import { useState } from "react"
import { Clock, MapPin, Music, Calendar } from "lucide-react"
import GlassCard from "@/components/glass/GlassCard"
import GlassContainer from "@/components/glass/GlassContainer"
import VerticalTimeline from "@/components/scrollable/VerticalTimeline"
import { Button } from "@/components/ui/button"
import { schedule } from "@/data/schedule"

const days = ["Day 1", "Day 2", "Day 3"]
const stages = ["Main Stage", "Electronic Stage", "Indie Stage", "Acoustic Stage"]

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState(0)
  const [selectedStage, setSelectedStage] = useState("All")

  const filteredEvents = schedule.filter((event) => {
    const matchesDay = event.day === selectedDay + 1
    const matchesStage = selectedStage === "All" || event.stage === selectedStage
    return matchesDay && matchesStage
  })

  return (
    <section id="schedule" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <GlassContainer className="mb-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading gradient-text">Festival Schedule</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Plan your perfect festival experience with our interactive schedule
            </p>
          </div>
        </GlassContainer>

        {/* Day Tabs */}
        <div className="mb-8">
          <div className="flex justify-center space-x-2">
            {days.map((day, index) => (
              <Button
                key={day}
                variant={selectedDay === index ? "default" : "outline"}
                onClick={() => setSelectedDay(index)}
                className={`${
                  selectedDay === index
                    ? "glass-primary neon-blue border-blue-400/30"
                    : "glass-card border-white/20 hover:glass-primary"
                } transition-all duration-300`}
              >
                <Calendar className="w-4 h-4 mr-2" />
                {day}
              </Button>
            ))}
          </div>
        </div>

        {/* Stage Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant={selectedStage === "All" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStage("All")}
              className={`${
                selectedStage === "All"
                  ? "glass-primary neon-purple border-purple-400/30"
                  : "glass-card border-white/20 hover:glass-primary"
              } transition-all duration-300`}
            >
              All Stages
            </Button>
            {stages.map((stage) => (
              <Button
                key={stage}
                variant={selectedStage === stage ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStage(stage)}
                className={`${
                  selectedStage === stage
                    ? "glass-primary neon-purple border-purple-400/30"
                    : "glass-card border-white/20 hover:glass-primary"
                } transition-all duration-300`}
              >
                <Music className="w-4 h-4 mr-2" />
                {stage}
              </Button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <VerticalTimeline
          events={filteredEvents}
          currentTime="14:30"
          onEventClick={(event) => console.log("Event clicked:", event)}
          groupBy="stage"
        />

        {/* Day Summary */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {days.map((day, index) => {
            const dayEvents = schedule.filter((event) => event.day === index + 1)
            const dayStages = [...new Set(dayEvents.map((event) => event.stage))]

            return (
              <GlassCard key={day} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-heading neon-blue">{day}</h3>
                    <Calendar className="w-5 h-5 text-white/60" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-white/80">
                      <Clock className="w-4 h-4" />
                      <span>{dayEvents.length} performances</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-white/80">
                      <MapPin className="w-4 h-4" />
                      <span>{dayStages.length} stages active</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <h4 className="text-sm font-medium text-white/90 mb-2">Featured Artists:</h4>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 3).map((event, eventIndex) => (
                        <div key={eventIndex} className="text-xs text-white/70">
                          {event.artist} • {event.startTime}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
