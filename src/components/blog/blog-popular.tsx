"use client"

import { motion } from "framer-motion"
import { Calendar, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BlogPopular() {
  // Articles populaires
  const popularPosts = [
    {
      id: 1,
      title: "Comment augmenter votre taux de conversion avec l'A/B testing",
      image: "/placeholder.svg?height=200&width=300",
      category: "Marketing Digital",
      date: "2 avril 2025",
      slug: "augmenter-taux-conversion-ab-testing",
      views: 1245,
    },
    {
      id: 2,
      title: "Les meilleures pratiques SEO pour 2025",
      image: "/placeholder.svg?height=200&width=300",
      category: "SEO",
      date: "28 mars 2025",
      slug: "meilleures-pratiques-seo-2025",
      views: 982,
    },
    {
      id: 3,
      title: "Comment créer une stratégie de contenu qui convertit",
      image: "/placeholder.svg?height=200&width=300",
      category: "Content Marketing",
      date: "15 mars 2025",
      slug: "strategie-contenu-convertit",
      views: 876,
    },
  ]

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-sm font-semibold text-[#1D1046] uppercase tracking-wider mb-3">Les plus lus</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Articles populaires</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative h-40">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1D1046]/30 to-transparent z-10"></div>
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#1D1046] text-white px-3 py-1 rounded-full text-xs font-medium z-20">
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#1D1046] transition-colors">
                    {post.title}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center text-[#1D1046]">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>{post.views} vues</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
