export const venues = [
  {
    id: "1",
    name: "Main Stage",
    type: "stage" as const,
    description:
      "The heart of the festival featuring headlining acts with state-of-the-art sound and lighting systems.",
    image: "/large-outdoor-concert-stage-with-massive-led-scree.jpg",
    capacity: 50000,
  },
  {
    id: "2",
    name: "Electronic Stage",
    type: "stage" as const,
    description:
      "Dedicated electronic music venue with immersive LED walls and premium sound system designed for electronic performances.",
    image: "/electronic-music-stage-with-led-panels-and-laser-l.jpg",
    capacity: 15000,
  },
  {
    id: "3",
    name: "Indie Stage",
    type: "stage" as const,
    description: "Intimate venue showcasing emerging and established indie artists in a more personal setting.",
    image: "/smaller-intimate-concert-stage-with-warm-lighting.jpg",
    capacity: 8000,
  },
  {
    id: "4",
    name: "Acoustic Stage",
    type: "stage" as const,
    description: "Cozy acoustic venue perfect for singer-songwriters and unplugged performances.",
    image: "/acoustic-stage-with-wooden-backdrop-and-soft-light.jpg",
    capacity: 3000,
  },
  {
    id: "5",
    name: "Festival Food Court",
    type: "food" as const,
    description:
      "Diverse culinary offerings from local vendors and international cuisine, featuring everything from gourmet burgers to vegan delights.",
    image: "/outdoor-food-court-with-colorful-vendor-stalls-and.jpg",
    capacity: undefined,
  },
  {
    id: "6",
    name: "Craft Beer Garden",
    type: "food" as const,
    description:
      "Premium craft beer selection from local breweries with comfortable seating areas and live acoustic performances.",
    image: "/outdoor-beer-garden-with-wooden-tables-and-string-.jpg",
    capacity: undefined,
  },
  {
    id: "7",
    name: "Official Merchandise Store",
    type: "merchandise" as const,
    description:
      "Official festival merchandise including t-shirts, hoodies, posters, and exclusive artist collaborations.",
    image: "/placeholder.svg?height=200&width=300",
    capacity: undefined,
  },
  {
    id: "8",
    name: "Artist Meet & Greet",
    type: "merchandise" as const,
    description:
      "Exclusive area for VIP ticket holders to meet artists, get autographs, and purchase limited edition items.",
    image: "/placeholder.svg?height=200&width=300",
    capacity: undefined,
  },
  {
    id: "9",
    name: "Premium Restrooms",
    type: "facilities" as const,
    description: "Clean, well-maintained restroom facilities with hand sanitizing stations and accessibility features.",
    image: "/placeholder.svg?height=200&width=300",
    capacity: undefined,
  },
  {
    id: "10",
    name: "Medical Station",
    type: "facilities" as const,
    description:
      "On-site medical facility staffed with qualified medical professionals for any health emergencies or concerns.",
    image: "/placeholder.svg?height=200&width=300",
    capacity: undefined,
  },
]
