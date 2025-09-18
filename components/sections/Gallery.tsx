"use client"

import { useState, useRef, useEffect } from "react"
import { Camera, Video, Filter, X, ChevronLeft, ChevronRight } from "lucide-react"
import GlassCard from "@/components/glass/GlassCard"
import GlassContainer from "@/components/glass/GlassContainer"
import InfiniteGrid from "@/components/scrollable/InfiniteGrid"
import { Button } from "@/components/ui/button"
import { gallery } from "@/data/gallery"

const categories = ["All", "Performances", "Crowd", "Backstage", "Food"]

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxItem, setLightboxItem] = useState<(typeof gallery)[0] | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const filteredGallery = gallery.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory.toLowerCase(),
  )

  const openLightbox = (item: (typeof gallery)[0]) => {
    const index = filteredGallery.findIndex((g) => g.id === item.id)
    setLightboxIndex(index)
    setLightboxItem(item)
  }

  const navigateLightbox = (direction: "prev" | "next") => {
    if (videoRef.current) {
      videoRef.current.pause()
    }

    const newIndex =
      direction === "prev"
        ? (lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length
        : (lightboxIndex + 1) % filteredGallery.length

    setLightboxIndex(newIndex)
    setLightboxItem(filteredGallery[newIndex])
  }

  const closeLightbox = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setLightboxItem(null)
  }

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause()
      }
    }
  }, [])

  const GalleryItem = ({ item }: { item: (typeof gallery)[0] }) => (
    <div className="relative group cursor-pointer overflow-hidden rounded-lg" onClick={() => openLightbox(item)}>
      <img
        src={item.type === "image" ? item.src : item.thumbnail || item.src}
        alt={item.caption}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="text-white">
          <p className="text-sm font-medium">{item.caption}</p>
          {item.photographer && <p className="text-xs text-white/80">by {item.photographer}</p>}
        </div>
      </div>

      {/* Type Indicator */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {item.type === "video" ? <Video className="w-5 h-5 text-white" /> : <Camera className="w-5 h-5 text-white" />}
      </div>
    </div>
  )

  return (
    <section id="gallery" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <GlassContainer className="mb-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading gradient-text">Festival Gallery</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Relive the magic through photos and videos from past festivals
            </p>
          </div>
        </GlassContainer>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category
                    ? "glass-primary neon-purple border-purple-400/30"
                    : "glass-card border-white/20 hover:glass-primary"
                } transition-all duration-300`}
              >
                <Filter className="w-4 h-4 mr-2" />
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <InfiniteGrid
          items={filteredGallery}
          renderItem={(item) => <GalleryItem key={item.id} item={item} />}
          columns={3}
          gap={16}
          loadMore={() => {}}
          hasMore={false}
        />

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Photos", value: gallery.filter((item) => item.type === "image").length },
            { label: "Videos", value: gallery.filter((item) => item.type === "video").length },
            { label: "Categories", value: categories.length - 1 },
            { label: "Years Covered", value: new Set(gallery.map((item) => item.year)).size },
          ].map((stat, index) => (
            <GlassCard key={index} className="p-4 text-center">
              <div className="text-2xl font-heading neon-purple">{stat.value}</div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </GlassCard>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
            <div className="relative max-w-4xl max-h-full">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Navigation */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateLightbox("prev")}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/10"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateLightbox("next")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/10"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Content */}
              <div className="glass-secondary p-6 rounded-lg">
                {lightboxItem.type === "video" ? (
                  <video
                    ref={videoRef}
                    src={lightboxItem.src}
                    controls
                    className="max-w-full max-h-[70vh] rounded-lg"
                    onError={(e) => console.error("Video error:", e)}
                    onAbort={(e) => console.log("Video aborted:", e)}
                    onLoadStart={() => console.log("Video loading started")}
                  />
                ) : (
                  <img
                    src={lightboxItem.src || "/placeholder.svg"}
                    alt={lightboxItem.caption}
                    className="max-w-full max-h-[70vh] rounded-lg"
                  />
                )}

                <div className="mt-4 text-center">
                  <p className="text-white font-medium">{lightboxItem.caption}</p>
                  {lightboxItem.photographer && (
                    <p className="text-white/60 text-sm mt-1">by {lightboxItem.photographer}</p>
                  )}
                  <p className="text-white/40 text-xs mt-2">
                    {lightboxItem.year} • {lightboxItem.category}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
