"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import Image from "next/image"

interface Technology {
  name: string
  icon: string
  description: string
}

interface TechnologySliderProps {
  technologies: Technology[]
}

export default function TechnologySlider({ technologies }: TechnologySliderProps) {
  const controls = useAnimation()

  useEffect(() => {
    const animate = async () => {
      while (true) {
        await controls.start({
          x: ["-100%", "0%"],
          transition: { duration: 20, ease: "linear" }
        })
        await controls.start({
          x: "-100%",
          transition: { duration: 0 }
        })
      }
    }
    animate()
  }, [])

  return (
    <div className="relative overflow-hidden py-10 bg-gray-50">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-transparent to-gray-50 z-10" />
      <motion.div
        className="flex space-x-8 whitespace-nowrap"
        animate={controls}
      >
        {[...technologies, ...technologies].map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="inline-flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg min-w-[200px]"
          >
            <div className="relative w-16 h-16 mb-4">
              <Image
                src={tech.icon}
                alt={tech.name}
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold text-[#1D1046] mb-2">{tech.name}</h3>
            <p className="text-sm text-gray-600 text-center">{tech.description}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}