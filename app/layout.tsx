import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Festival Hub - Interactive Music Festival Experience",
  description:
    "Experience the ultimate music festival with glassmorphism design, 3D interactive elements, and immersive multimedia experiences.",
  keywords: "music festival, glassmorphism, 3D interactive, music events, festival tickets",
  authors: [{ name: "Festival Hub Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#00d4ff",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} antialiased`}>
      <body className="font-body">{children}</body>
    </html>
  )
}
