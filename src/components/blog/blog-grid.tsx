"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Types
type BlogPost = {
  id: number
  title: string
  excerpt: string
  image: string
  category: string
  author: {
    name: string
    avatar: string
  }
  date: string
  readTime: string
  slug: string
}

export default function BlogGrid() {
  // Articles de blog
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Comment créer une stratégie de contenu efficace pour votre entreprise",
      excerpt:
        "Apprenez à développer une stratégie de contenu qui engage votre audience et convertit les visiteurs en clients.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Marketing Digital",
      author: {
        name: "Sophie Martin",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: "10 avril 2025",
      readTime: "6 min",
      slug: "strategie-contenu-efficace-entreprise",
    },
    {
      id: 2,
      title: "Les tendances UX/UI qui domineront en 2025",
      excerpt:
        "Découvrez les dernières tendances en matière de design d'interface utilisateur et d'expérience utilisateur.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Design",
      author: {
        name: "Thomas Leroy",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: "5 avril 2025",
      readTime: "5 min",
      slug: "tendances-ux-ui-2025",
    },
    {
      id: 3,
      title: "Comment optimiser votre site pour la recherche vocale",
      excerpt:
        "La recherche vocale change la façon dont les utilisateurs trouvent du contenu. Voici comment adapter votre SEO.",
      image: "/placeholder.svg?height=400&width=600",
      category: "SEO",
      author: {
        name: "Marie Dupont",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: "28 mars 2025",
      readTime: "7 min",
      slug: "optimiser-site-recherche-vocale",
    },
    {
      id: 4,
      title: "Les frameworks JavaScript à surveiller en 2025",
      excerpt:
        "Un aperçu des frameworks JavaScript les plus prometteurs qui façonneront le développement web cette année.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Développement Web",
      author: {
        name: "Lucas Bernard",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: "20 mars 2025",
      readTime: "8 min",
      slug: "frameworks-javascript-2025",
    },
    {
      id: 5,
      title: "Comment créer des campagnes publicitaires performantes sur TikTok",
      excerpt: "Tirez parti de la popularité de TikTok avec ces stratégies publicitaires éprouvées.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Réseaux Sociaux",
      author: {
        name: "Emma Leclerc",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: "15 mars 2025",
      readTime: "6 min",
      slug: "campagnes-publicitaires-tiktok",
    },
    {
      id: 6,
      title: "L'importance de l'accessibilité web pour votre entreprise",
      excerpt: "Découvrez pourquoi l'accessibilité web est essentielle et comment la mettre en œuvre sur votre site.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Développement Web",
      author: {
        name: "Thomas Leroy",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: "8 mars 2025",
      readTime: "7 min",
      slug: "importance-accessibilite-web",
    },
  ]

  // Variants pour les animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <section className="py-16 md:py-24 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-sm font-semibold text-[#1D1046] uppercase tracking-wider mb-3">Nos publications</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Articles récents</h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogPosts.map((post) => (
            <motion.article key={post.id} variants={itemVariants} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="bg-white rounded-xl shadow-md overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48 md:h-56">
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
                    <div className="flex items-center mb-4">
                      <Image
                        src={post.author.avatar || "/placeholder.svg"}
                        alt={post.author.name}
                        width={30}
                        height={30}
                        className="rounded-full mr-2"
                      />
                      <span className="text-sm text-gray-600">{post.author.name}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#1D1046] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center text-xs text-gray-500 mt-auto">
                      <div className="flex items-center mr-4">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{post.readTime} de lecture</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center text-[#1D1046] font-medium text-sm">
                      Lire l'article
                      <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* Pagination */}
        <div className="mt-16 flex justify-center">
          <nav className="inline-flex items-center" aria-label="Pagination">
            <button
              className="px-4 py-2 rounded-l-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              aria-label="Page précédente"
            >
              Précédent
            </button>
            <button className="px-4 py-2 border-t border-b border-gray-300 bg-[#1D1046] text-white">1</button>
            <button className="px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
              3
            </button>
            <span className="px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-700">...</span>
            <button className="px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
              8
            </button>
            <button
              className="px-4 py-2 rounded-r-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              aria-label="Page suivante"
            >
              Suivant
            </button>
          </nav>
        </div>
      </div>
    </section>
  )
}
