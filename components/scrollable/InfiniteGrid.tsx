"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

interface InfiniteGridProps {
  items: any[]
  renderItem: (item: any) => React.ReactNode
  columns: number
  gap: number
  loadMore: () => void
  hasMore: boolean
  className?: string
}

export default function InfiniteGrid({
  items,
  renderItem,
  columns,
  gap,
  loadMore,
  hasMore,
  className = "",
}: InfiniteGridProps) {
  const [displayedItems, setDisplayedItems] = useState(items.slice(0, 12))
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const isIntersecting = useIntersectionObserver(loadMoreRef, { threshold: 0.1 })

  useEffect(() => {
    if (isIntersecting && hasMore && displayedItems.length < items.length) {
      const nextBatch = items.slice(0, displayedItems.length + 6)
      setDisplayedItems(nextBatch)
      loadMore()
    }
  }, [isIntersecting, hasMore, items, displayedItems.length, loadMore])

  useEffect(() => {
    setDisplayedItems(items.slice(0, Math.max(12, displayedItems.length)))
  }, [items])

  const getColumnClass = () => {
    const columnClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
      6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
    }
    return columnClasses[columns as keyof typeof columnClasses] || "grid-cols-3"
  }

  const getGapClass = () => {
    const gapClasses = {
      4: "gap-1",
      8: "gap-2",
      12: "gap-3",
      16: "gap-4",
      20: "gap-5",
      24: "gap-6",
    }
    return gapClasses[gap as keyof typeof gapClasses] || "gap-4"
  }

  return (
    <div className={className}>
      <div className={`grid ${getColumnClass()} ${getGapClass()}`}>
        {displayedItems.map((item, index) => (
          <div key={item.id || index} className="animate-in fade-in duration-500">
            {renderItem(item)}
          </div>
        ))}
      </div>

      {/* Load More Trigger */}
      {hasMore && displayedItems.length < items.length && (
        <div ref={loadMoreRef} className="mt-8 text-center">
          <div className="glass-card inline-block px-4 py-2 rounded-lg">
            <div className="flex items-center space-x-2 text-white/60">
              <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              <span>Loading more...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
