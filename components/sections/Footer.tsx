import { Music, Instagram, Twitter, Facebook, Youtube, Mail, MapPin, Phone } from "lucide-react"
import GlassCard from "@/components/glass/GlassCard"

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

const quickLinks = [
  { label: "Artists", href: "#artists" },
  { label: "Schedule", href: "#schedule" },
  { label: "Venue", href: "#experience" },
  { label: "Gallery", href: "#gallery" },
  { label: "Tickets", href: "#tickets" },
]

const contactInfo = [
  { icon: Mail, text: "info@festivalhub.com" },
  { icon: Phone, text: "+1 (555) 123-4567" },
  { icon: MapPin, text: "Central Park, New York" },
]

export default function Footer() {
  return (
    <footer id="tickets" className="py-20 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Music className="w-8 h-8 neon-blue" />
              <h3 className="text-2xl font-heading violet-gradient">Festival Hub</h3>
            </div>
            <p className="text-white/80 text-sm">
              Experience the ultimate music festival with glassmorphism design, 3D interactive elements, and immersive
              multimedia experiences.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-white/60 hover:text-white transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-heading text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/80 hover:text-white transition-colors duration-200 text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-heading text-white">Contact</h4>
            <ul className="space-y-3">
              {contactInfo.map((contact, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <contact.icon className="w-4 h-4 neon-blue flex-shrink-0" />
                  <span className="text-white/80 text-sm">{contact.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tickets Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-heading text-white">Get Tickets</h4>
            <p className="text-white/80 text-sm">Secure your spot at the ultimate festival experience.</p>
            <GlassCard className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold text-sm">Early Bird</div>
                  <div className="text-purple-400 font-bold">$89</div>
                </div>
                <div className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                  Limited
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold text-sm">Regular</div>
                  <div className="text-blue-400 font-bold">$129</div>
                </div>
                <div className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full">
                  Available
                </div>
              </div>
              <button className="w-full  glass-primary hover:glass-secondary neon-blue border border-blue-400/30 rounded-lg px-4 py-2 text-sm font-accent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/25 ">
                <span className="text-white font-semibold">
                  Buy Tickets Now
                  </span>
              </button>
            </GlassCard>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">© 2025 Festival Hub. All rights reserved.</p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
