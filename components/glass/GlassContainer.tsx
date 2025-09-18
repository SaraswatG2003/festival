import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlassContainerProps {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary"
}

export default function GlassContainer({ children, className, variant = "primary" }: GlassContainerProps) {
  const variants = {
    primary: "glass-primary",
    secondary: "glass-secondary",
  }

  return <div className={cn(variants[variant], "p-6", className)}>{children}</div>
}
