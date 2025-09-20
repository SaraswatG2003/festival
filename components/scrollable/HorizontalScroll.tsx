"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HorizontalScrollProps {
  items: any[]
  renderItem: (item: any, index: number) => React.ReactNode
  spacing?: number
  showScrollbar?: boolean
  enableMomentum?: boolean
  className?: string
}

export default function HorizontalScroll({
  items,
  renderItem,
  spacing = 16,
  showScrollbar = false,
  enableMomentum = true,
  className = "",
}: HorizontalScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    checkScrollButtons()
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener("scroll", checkScrollButtons)
      return () => scrollElement.removeEventListener("scroll", checkScrollButtons)
    }
  }, [items])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8
      const targetScroll =
        direction === "left" ? scrollRef.current.scrollLeft - scrollAmount : scrollRef.current.scrollLeft + scrollAmount

      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className={`relative group ${className}`}>
      {/* Navigation Buttons */}
      {canScrollLeft && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => scroll("left")}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 glass-card hover:glass-primary border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
      )}

      {canScrollRight && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => scroll("right")}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 glass-card hover:glass-primary border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      )}

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className={`flex overflow-x-auto gap-${spacing / 4} pb-4 ${
          !showScrollbar ? "scrollbar-hide" : ""
        } ${enableMomentum ? "scroll-smooth" : ""}`}
        style={{
          scrollbarWidth: showScrollbar ? "thin" : "none",
          msOverflowStyle: showScrollbar ? "auto" : "none",
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="flex-shrink-0">
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  )
}
