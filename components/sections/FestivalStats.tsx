"use client"
import { Music, Users, Calendar, MapPin, Star, Ticket, Headphones, Heart } from "lucide-react"
import { motion } from "framer-motion"

export default function FestivalStats() {
  const stats = [
    { label: "ARTISTS", value: "42%", icon: Music, color: "text-purple-400" },
    { label: "ATTENDEES", value: "28%", icon: Users, color: "text-blue-400" },
    { label: "STAGES", value: "18%", icon: MapPin, color: "text-indigo-400" },
    { label: "SATISFACTION", value: "12%", icon: Star, color: "text-violet-400" },
  ]

  const features = [
    {
      title: "From Lineup to Experience:",
      subtitle: "Building the Perfect Festival Journey",
      description:
        "Discover how we curate world-class artists and create unforgettable experiences that resonate with music lovers from every genre and background.",
      icon: Headphones,
    },
    {
      title: "Every Beat Counts:",
      subtitle: "Smart Scheduling for Maximum Impact",
      description:
        "Learn how our intelligent scheduling system ensures you never miss your favorite acts while discovering new artists that match your taste.",
      icon: Calendar,
    },
    {
      title: "The Hidden Magic of Live Music:",
      subtitle: "Technology Meets Artistry",
      description:
        "Explore how cutting-edge sound engineering and immersive stage design create moments that transform casual listeners into lifelong fans.",
      icon: Heart,
    },
  ]

  return (
    <section id="festival-stats" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 dotted-pattern opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Main Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-heading text-white leading-tight">
                Take Control
                <br />
                <span className="gradient-text">of Your Festival</span>
              </h2>

              <p className="text-xl text-white/80 leading-relaxed max-w-lg">
                Stay on top of your festival experience and musical journey with smart, intuitive tools designed for
                music lovers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="glass-primary px-8 py-4 text-white font-semibold rounded-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-r from-purple-600 to-blue-600">
                  Get Tickets Now
                </button>
                <button className="glass-card px-8 py-4 text-white font-semibold rounded-2xl hover:scale-105 transition-all duration-300 border border-white/20">
                  Learn More
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Stats Dashboard */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="stats-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white/90 font-semibold text-lg">YOUR FESTIVAL BREAKDOWN</h3>
                <Ticket className="w-5 h-5 text-white/60" />
              </div>

              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="flex items-center justify-between p-4 glass-card hover:glass-primary transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center space-x-3">
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      <span className="text-white/80 font-medium text-sm">{stat.label}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      {/* Mini chart bars */}
                      <div className="flex items-end space-x-1 h-6">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 bg-gradient-to-t ${stat.color.replace("text-", "from-")} to-transparent rounded-full`}
                            style={{ height: `${Math.random() * 100 + 20}%` }}
                          />
                        ))}
                      </div>
                      <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Feature Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <div key={index} className="stats-card p-6 space-y-4">
              <feature.icon className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-white font-bold text-lg leading-tight">{feature.title}</h3>
              <h4 className="text-purple-300 font-semibold text-base">{feature.subtitle}</h4>
              <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
