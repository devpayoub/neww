"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink, Code, Palette, Megaphone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Project = {
  id: number
  title: string
  description: string
  category: "development" | "marketing" | "design"
  image: string
  link: string
  technologies?: string[]
  client?: string
  date: string
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "development" | "marketing" | "design">("all")

  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Bio Golds",
      description: "Développement d'une plateforme e-commerce complète avec système de gestion des commandes et intégration de paiement.",
      category: "development",
      image: "/images/Bio_gold's-Logo-Officiel-fond-blanc.jpg",
      link: "https://biogolds.com",
      technologies: ["Next.js", "Tailwind CSS", "Stripe", "Supabase"],
      client: "Bio Golds",
      date: "2024"
    },
    {
      id: 2,
      title: "Campagne Marketing Ilyos",
      description: "Stratégie de marketing digital et gestion des réseaux sociaux pour augmenter la visibilité de la marque.",
      category: "marketing",
      image: "/images/ilyos.jpg",
      link: "https://ilyos.com",
      technologies: ["Social Media", "SEO", "Content Marketing"],
      client: "Ilyos",
      date: "2024"
    },
    {
      id: 3,
      title: "Identité visuelle Ezemnia",
      description: "Création d'une identité visuelle moderne et responsive pour une startup technologique.",
      category: "design",
      image: "/images/logo_ezemnia.png",
      link: "https://ezemnia.com",
      technologies: ["Branding", "UI/UX Design", "Motion Design"],
      client: "Ezemnia",
      date: "2024"
    }
  ]

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "development":
        return <Code className="w-5 h-5" />
      case "marketing":
        return <Megaphone className="w-5 h-5" />
      case "design":
        return <Palette className="w-5 h-5" />
      default:
        return null
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1D1046] to-[#3a1d8a] py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 rounded-full bg-blue-500/10 -top-20 -left-20 animate-pulse"></div>
          <div className="absolute w-64 h-64 rounded-full bg-purple-500/10 bottom-10 right-10 animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Nos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                Réalisations
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Découvrez nos projets les plus récents et comment nous aidons nos clients à atteindre leurs objectifs digitaux.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filtres */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              { id: "all", label: "Tous les projets" },
              { id: "development", label: "Développement", icon: <Code className="w-4 h-4" /> },
              { id: "marketing", label: "Marketing", icon: <Megaphone className="w-4 h-4" /> },
              { id: "design", label: "Design", icon: <Palette className="w-4 h-4" /> }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as any)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
                  ${activeFilter === filter.id
                    ? "bg-[#1D1046] text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projets */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 md:h-64">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1D1046]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-2 z-20">
                    {getCategoryIcon(project.category)}
                    <span className="text-[#1D1046] font-medium text-sm capitalize">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#1D1046] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {project.technologies && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium text-[#1D1046]">{project.client}</span>
                      <span className="mx-2">•</span>
                      <span>{project.date}</span>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/portfolio/${project.id}`}
                        className="text-[#1D1046] hover:text-purple-700 transition-colors"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1D1046] hover:text-purple-700 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#1D1046] to-[#3a1d8a] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 rounded-full bg-blue-500/10 -bottom-20 -right-20 animate-pulse"></div>
          <div className="absolute w-64 h-64 rounded-full bg-purple-500/10 top-10 left-10 animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à lancer votre projet ?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Discutons de votre projet et voyons comment nous pouvons vous aider à atteindre vos objectifs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/consultation"
                className="bg-white text-[#1D1046] px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transform hover:-translate-y-1 transition-all shadow-lg inline-flex items-center"
              >
                Consultation gratuite
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transform hover:-translate-y-1 transition-all inline-flex items-center"
              >
                Nous contacter
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}