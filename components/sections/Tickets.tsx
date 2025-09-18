"use client"

import { useState } from "react"
import { Ticket, CreditCard, Check, Star, Users, Calendar } from "lucide-react"
import GlassCard from "@/components/glass/GlassCard"
import GlassContainer from "@/components/glass/GlassContainer"
import GlassButton from "@/components/glass/GlassButton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const ticketTypes = [
  {
    id: "general",
    name: "General Admission",
    price: 199,
    description: "Access to all stages and general festival areas",
    features: ["Access to all stages", "General festival areas", "Food court access", "Merchandise stands"],
    availability: 500,
    validDays: [1, 2, 3],
    popular: false,
  },
  {
    id: "vip",
    name: "VIP Experience",
    price: 399,
    description: "Premium festival experience with exclusive perks",
    features: [
      "All General Admission benefits",
      "VIP viewing areas",
      "Exclusive VIP lounge",
      "Complimentary drinks",
      "Meet & greet opportunities",
      "Premium restrooms",
    ],
    availability: 150,
    validDays: [1, 2, 3],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium Package",
    price: 699,
    description: "Ultimate festival experience with luxury amenities",
    features: [
      "All VIP benefits",
      "Backstage access",
      "Artist meet & greets",
      "Premium catering",
      "Dedicated concierge",
      "Exclusive merchandise",
      "Private transportation",
    ],
    availability: 50,
    validDays: [1, 2, 3],
    popular: false,
  },
]

export default function Tickets() {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [step, setStep] = useState(1) // 1: selection, 2: details, 3: payment

  const selectedTicketData = ticketTypes.find((ticket) => ticket.id === selectedTicket)

  const handleTicketSelect = (ticketId: string) => {
    setSelectedTicket(ticketId)
    setStep(2)
  }

  const TicketCard = ({ ticket }: { ticket: (typeof ticketTypes)[0] }) => (
    <GlassCard className={`p-6 relative ${ticket.popular ? "border-2 border-purple-400/50" : ""}`}>
      {ticket.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="glass-primary px-4 py-1 rounded-full border border-purple-400/50">
            <div className="flex items-center space-x-1 text-sm neon-purple">
              <Star className="w-4 h-4" />
              <span>Most Popular</span>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-heading text-white">{ticket.name}</h3>
          <p className="text-white/80">{ticket.description}</p>
          <div className="text-3xl font-heading neon-blue">${ticket.price}</div>
        </div>

        {/* Features */}
        <div className="space-y-3">
          {ticket.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Check className="w-4 h-4 neon-green flex-shrink-0" />
              <span className="text-white/90 text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {/* Availability */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Availability</span>
            <span className="text-white/80">{ticket.availability} left</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
              style={{ width: `${Math.max(20, (ticket.availability / 500) * 100)}%` }}
            />
          </div>
        </div>

        {/* Valid Days */}
        <div className="flex items-center space-x-2 text-sm text-white/80">
          <Calendar className="w-4 h-4" />
          <span>Valid for {ticket.validDays.length} days</span>
        </div>

        {/* Select Button */}
        <GlassButton variant="primary" className="w-full" onClick={() => handleTicketSelect(ticket.id)}>
          <Ticket className="w-4 h-4 mr-2" />
          Select Ticket
        </GlassButton>
      </div>
    </GlassCard>
  )

  return (
    <section id="tickets" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <GlassContainer className="mb-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading gradient-text">Get Your Tickets</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Secure your spot at the most anticipated music festival of the year
            </p>
          </div>
        </GlassContainer>

        {step === 1 && (
          <>
            {/* Ticket Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {ticketTypes.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Users, label: "Trusted by 50K+ fans" },
                { icon: CreditCard, label: "Secure payments" },
                { icon: Ticket, label: "Instant delivery" },
                { icon: Check, label: "100% authentic" },
              ].map((indicator, index) => (
                <GlassCard key={index} className="p-4 text-center">
                  <indicator.icon className="w-6 h-6 mx-auto mb-2 neon-blue" />
                  <div className="text-sm text-white/80">{indicator.label}</div>
                </GlassCard>
              ))}
            </div>
          </>
        )}

        {step === 2 && selectedTicketData && (
          <div className="max-w-2xl mx-auto">
            <GlassContainer>
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-heading neon-blue">{selectedTicketData.name}</h3>
                  <p className="text-white/80">${selectedTicketData.price} per ticket</p>
                </div>

                {/* Quantity Selection */}
                <div className="space-y-4">
                  <label className="block text-white/90 font-medium">Number of Tickets</label>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="glass-card border-white/20"
                    >
                      -
                    </Button>
                    <span className="text-xl font-heading text-white px-4">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.min(8, quantity + 1))}
                      className="glass-card border-white/20"
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Total */}
                <div className="glass-card p-4 rounded-lg">
                  <div className="flex items-center justify-between text-lg">
                    <span className="text-white/90">Total</span>
                    <span className="font-heading neon-blue">${selectedTicketData.price * quantity}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1 glass-card border-white/20">
                    Back
                  </Button>
                  <GlassButton variant="primary" onClick={() => setStep(3)} className="flex-1">
                    Continue to Payment
                  </GlassButton>
                </div>
              </div>
            </GlassContainer>
          </div>
        )}

        {step === 3 && selectedTicketData && (
          <div className="max-w-2xl mx-auto">
            <GlassContainer>
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-heading neon-blue">Payment Details</h3>
                  <p className="text-white/80">
                    Complete your purchase for {quantity} × {selectedTicketData.name}
                  </p>
                </div>

                {/* Payment Form */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/90 font-medium mb-2">First Name</label>
                      <Input
                        placeholder="John"
                        className="glass-card border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>
                    <div>
                      <label className="block text-white/90 font-medium mb-2">Last Name</label>
                      <Input
                        placeholder="Doe"
                        className="glass-card border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/90 font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="glass-card border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>

                  <div>
                    <label className="block text-white/90 font-medium mb-2">Card Number</label>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      className="glass-card border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/90 font-medium mb-2">Expiry Date</label>
                      <Input
                        placeholder="MM/YY"
                        className="glass-card border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>
                    <div>
                      <label className="block text-white/90 font-medium mb-2">CVV</label>
                      <Input
                        placeholder="123"
                        className="glass-card border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="glass-card p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/80">
                      {quantity} × {selectedTicketData.name}
                    </span>
                    <span className="text-white">${selectedTicketData.price * quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Service Fee</span>
                    <span className="text-white">$15</span>
                  </div>
                  <div className="border-t border-white/20 pt-2 flex justify-between font-heading">
                    <span className="text-white">Total</span>
                    <span className="neon-blue">${selectedTicketData.price * quantity + 15}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-4">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1 glass-card border-white/20">
                    Back
                  </Button>
                  <GlassButton variant="primary" className="flex-1 animate-glow">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Complete Purchase
                  </GlassButton>
                </div>
              </div>
            </GlassContainer>
          </div>
        )}
      </div>
    </section>
  )
}
