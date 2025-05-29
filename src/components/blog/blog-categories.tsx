"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export default function BlogCategories() {
  const [activeCategory, setActiveCategory] = useState("Tous")

  const categories = [
    { name: "Tous", count: 42 },
    { name: "SEO", count: 12 },
    { name: "Marketing Digital", count: 8 },
    { name: "Développement Web", count: 10 },
    { name: "Design", count: 7 },
    { name: "Réseaux Sociaux", count: 5 },
  ]

  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.name
                  ? "bg-[#1D1046] text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category.name} <span className="text-xs ml-1">({category.count})</span>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
