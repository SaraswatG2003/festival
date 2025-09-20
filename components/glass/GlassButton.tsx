"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GlassButtonProps {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary"
  onClick?: () => void
  disabled?: boolean
}

export default function GlassButton({
  children,
  className,
  variant = "primary",
  onClick,
  disabled = false,
}: GlassButtonProps) {
  const variants = {
    primary: "glass-primary hover:glass-secondary neon-blue border-blue-400/30",
    secondary: "glass-card hover:glass-primary border-white/20",
  }

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(variants[variant], "transition-all duration-300 font-accent", className)}
    >
      {children}
    </Button>
  )
}
