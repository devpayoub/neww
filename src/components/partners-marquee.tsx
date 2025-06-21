"use client"

import { useRef } from "react"
import Image from "next/image"

type Partner = {
  id: number
  name: string
  logo: string
}

type PartnersMarqueeProps = {
  title?: string
  subtitle?: string
  description?: string
}

export default function PartnersMarquee({
  title = "Nos Partenaires",
  subtitle = "Entreprises partenaires",
  description = "Nous collaborons avec des entreprises leaders dans leur domaine pour offrir des solutions digitales complètes.",
}: PartnersMarqueeProps) {
  // Référence pour les animations
  const containerRef = useRef<HTMLDivElement>(null)

  // Données des partenaires (à remplacer par vos propres données)
  const partners: Partner[] = [
    { id: 1, name: "TechCorp", logo: "/placeholder.svg?height=80&width=160" },
    { id: 2, name: "InnovateLab", logo: "/placeholder.svg?height=80&width=160" },
    { id: 3, name: "FutureTech", logo: "/placeholder.svg?height=80&width=160" },
    { id: 4, name: "DigitalSolutions", logo: "/placeholder.svg?height=80&width=160" },
    { id: 5, name: "SmartBusiness", logo: "/placeholder.svg?height=80&width=160" },
    { id: 6, name: "GlobalConnect", logo: "/placeholder.svg?height=80&width=160" },
    { id: 7, name: "NextGeneration", logo: "/placeholder.svg?height=80&width=160" },
    { id: 8, name: "TechLeaders", logo: "/placeholder.svg?height=80&width=160" },
  ]

  return (
    <section className="py-20 px-6 bg-white overflow-hidden" ref={containerRef}>
      <div className="container mx-auto mb-12">
        <div className="text-center">
          <h2 className="text-sm font-semibold text-[#1D1046] uppercase tracking-wider mb-3">{subtitle}</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{title}</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>
      </div>

      <div className="relative">
        {/* Effet de fondu sur les côtés */}
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

        {/* Première rangée - défilement vers la droite */}
        <div className="mb-12 py-4 overflow-hidden">
          <div className="animate-marquee flex whitespace-nowrap">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`row1-${partner.id}-${index}`}
                className="mx-8 flex-shrink-0 group relative"
                style={{ width: "160px", height: "80px" }}
              >
                <div className="absolute inset-0 bg-white rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-full h-full flex items-center justify-center p-4">
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    width={160}
                    height={80}
                    className="object-contain max-h-full max-w-full filter grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deuxième rangée - défilement vers la gauche */}
        <div className="py-4 overflow-hidden">
          <div className="animate-marquee-reverse flex whitespace-nowrap">
            {[...partners.reverse(), ...partners.reverse()].map((partner, index) => (
              <div
                key={`row2-${partner.id}-${index}`}
                className="mx-8 flex-shrink-0 group relative"
                style={{ width: "160px", height: "80px" }}
              >
                <div className="absolute inset-0 bg-white rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-full h-full flex items-center justify-center p-4">
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    width={160}
                    height={80}
                    className="object-contain max-h-full max-w-full filter grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Séparateur décoratif */}
      <div className="container mx-auto mt-16">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>
    </section>
  )
}
