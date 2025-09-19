import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary" | "card"
  hover?: boolean
}

export { GlassCard }
export default function GlassCard({ children, className, variant = "card", hover = true }: GlassCardProps) {
  const baseClasses = {
    primary: "glass-primary",
    secondary: "glass-secondary",
    card: "glass-card",
  }

  return <div className={cn(baseClasses[variant], hover && "hover:glass-card", className)}>{children}</div>
}
