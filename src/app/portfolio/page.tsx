"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink, Code, Palette, Megaphone, Calendar, Users, Award, Star, Filter, Search, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import AOS from "aos"
import "aos/dist/aos.css"
import ScrollArrow from "@/components/scroll-arrow"

type Project = {
  id: number
  title: string
  description: string
  category: "development" | "marketing" | "design" | "all"
  image: string
  link: string
  technologies?: string[]
  client?: string
  date: string
  featured?: boolean
  stats?: {
    metric: string
    value: string
  }[]
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "development" | "marketing" | "design">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const servicesRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 100,
    })
  }, [])

  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Bio Golds",
      description: "Développement d'une plateforme e-commerce complète avec système de gestion des commandes, intégration de paiement sécurisé et interface d'administration avancée.",
      category: "development",
      image: "/images/Bio_gold's-Logo-Officiel-fond-blanc.jpg",
      link: "https://biogolds.com",
      technologies: ["Next.js", "Tailwind CSS", "Stripe", "Supabase", "TypeScript"],
      client: "Bio Golds",
      date: "2024",
      featured: true,
      stats: [
        { metric: "Conversion", value: "+45%" },
        { metric: "Performance", value: "95/100" },
        { metric: "Uptime", value: "99.9%" }
      ]
    },
    {
      id: 2,
      title: "Campagne Marketing Ilyos",
      description: "Stratégie de marketing digital complète incluant la gestion des réseaux sociaux, campagnes publicitaires ciblées et optimisation SEO pour maximiser la visibilité.",
      category: "marketing",
      image: "/images/ilyos.jpg",
      link: "https://ilyos.com",
      technologies: ["Social Media", "SEO", "Google Ads", "Analytics", "Content Marketing"],
      client: "Ilyos",
      date: "2024",
      featured: true,
      stats: [
        { metric: "Engagement", value: "+120%" },
        { metric: "Trafic", value: "+65%" },
        { metric: "ROI", value: "350%" }
      ]
    },
    {
      id: 3,
      title: "Identité visuelle Ezemnia",
      description: "Création d'une identité visuelle moderne et cohérente pour une startup technologique, incluant logo, charte graphique et supports de communication.",
      category: "design",
      image: "/images/logo_ezemnia.png",
      link: "https://ezemnia.com",
      technologies: ["Branding", "UI/UX Design", "Motion Design", "Print Design"],
      client: "Ezemnia",
      date: "2024",
      featured: true,
      stats: [
        { metric: "Reconnaissance", value: "+200%" },
        { metric: "Cohérence", value: "100%" },
        { metric: "Satisfaction", value: "4.9/5" }
      ]
    },
    {
      id: 4,
      title: "Application Mobile FinTech",
      description: "Développement d'une application mobile innovante pour la gestion financière personnelle avec interface intuitive et sécurité renforcée.",
      category: "development",
      image: "/images/1_fe98d0a647.png",
      link: "#",
      technologies: ["React Native", "Node.js", "MongoDB", "Firebase"],
      client: "FinanceApp",
      date: "2024",
      stats: [
        { metric: "Utilisateurs", value: "10K+" },
        { metric: "Rating", value: "4.8★" },
        { metric: "Sécurité", value: "A+" }
      ]
    },
    {
      id: 5,
      title: "Stratégie Digitale GreenTech",
      description: "Accompagnement complet dans la transformation digitale d'une entreprise écologique avec refonte de l'image de marque et stratégie omnicanale.",
      category: "marketing",
      image: "/images/2_aecf4994fe.png",
      link: "#",
      technologies: ["Digital Strategy", "Rebranding", "Social Media", "Email Marketing"],
      client: "GreenTech Solutions",
      date: "2024",
      stats: [
        { metric: "Leads", value: "+180%" },
        { metric: "Notoriété", value: "+90%" },
        { metric: "Conversion", value: "+55%" }
      ]
    },
    {
      id: 6,
      title: "Interface SaaS Dashboard",
      description: "Conception et développement d'un tableau de bord SaaS moderne avec analytics avancés et expérience utilisateur optimisée.",
      category: "design",
      image: "/images/3_30781f6f78.png",
      link: "#",
      technologies: ["Figma", "React", "D3.js", "Material-UI"],
      client: "DataInsight",
      date: "2024",
      stats: [
        { metric: "Usabilité", value: "+75%" },
        { metric: "Temps de tâche", value: "-40%" },
        { metric: "Satisfaction", value: "4.7/5" }
      ]
    }
  ]

  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === "all" || project.category === activeFilter
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.client?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const featuredProjects = projects.filter(project => project.featured)

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "development":
        return "from-blue-500 to-cyan-500"
      case "marketing":
        return "from-purple-500 to-pink-500"
      case "design":
        return "from-orange-500 to-red-500"
      default:
        return "from-gray-500 to-gray-600"
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
          
          {/* Animated particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/20"
                style={{
                  width: `${Math.random() * 8 + 2}px`,
                  height: `${Math.random() * 8 + 2}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Floating project keywords */}
          {["Innovation", "Créativité", "Performance", "Excellence", "Digital", "Design", "Marketing", "Tech"].map((keyword, index) => (
            <motion.div
              key={keyword}
              className="absolute bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-white/80 text-xs font-medium"
              style={{
                top: `${15 + (index * 10) + (Math.random() * 10)}%`,
                left: `${10 + (index * 10) + (Math.random() * 10)}%`,
                zIndex: 5
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              {keyword}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Notre{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 animate-gradient">
                Portfolio
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Découvrez nos projets les plus récents et comment nous aidons nos clients à transformer leurs ambitions digitales en succès concrets.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center">
                <Award className="w-4 h-4 mr-2" />
                <span className="text-sm">500+ Projets réalisés</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm">50+ Clients satisfaits</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center">
                <Star className="w-4 h-4 mr-2" />
                <span className="text-sm">4.9/5 Satisfaction</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-16 w-full">
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              fill="#ffffff"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              fill="#ffffff"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill="#ffffff"
            ></path>
          </svg>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <ScrollArrow targetRef={servicesRef} />
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-white" ref={servicesRef}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Projets <span className="text-[#1D1046]">Vedettes</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nos réalisations les plus remarquables qui illustrent notre expertise et notre engagement envers l'excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1D1046]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <div className={`bg-gradient-to-r ${getCategoryColor(project.category)} text-white px-3 py-1 rounded-full text-xs font-medium flex items-center`}>
                      {getCategoryIcon(project.category)}
                      <span className="ml-1 capitalize">{project.category}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-white/90 backdrop-blur-sm text-[#1D1046] px-2 py-1 rounded-full text-xs font-bold">
                      FEATURED
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#1D1046] transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {project.date}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {project.stats && (
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {project.stats.map((stat, i) => (
                        <div key={i} className="text-center p-2 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-[#1D1046]">{stat.value}</div>
                          <div className="text-xs text-gray-500">{stat.metric}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium text-[#1D1046]">{project.client}</span>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/portfolio/${project.id}`}
                        className="text-[#1D1046] hover:text-purple-700 transition-colors p-2 rounded-full hover:bg-purple-50"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1D1046] hover:text-purple-700 transition-colors p-2 rounded-full hover:bg-purple-50"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div 
              data-aos="fade-right"
              className="flex flex-wrap justify-center gap-4"
            >
              {[
                { id: "all", label: "Tous les projets", count: projects.length },
                { id: "development", label: "Développement", icon: <Code className="w-4 h-4" />, count: projects.filter(p => p.category === "development").length },
                { id: "marketing", label: "Marketing", icon: <Megaphone className="w-4 h-4" />, count: projects.filter(p => p.category === "marketing").length },
                { id: "design", label: "Design", icon: <Palette className="w-4 h-4" />, count: projects.filter(p => p.category === "design").length }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id as any)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
                    ${activeFilter === filter.id
                      ? "bg-[#1D1046] text-white shadow-md transform scale-105"
                      : "bg-white text-gray-700 hover:bg-gray-100 hover:shadow"
                    }`}
                >
                  {filter.icon}
                  {filter.label}
                  <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>

            <div 
              data-aos="fade-left"
              className="relative"
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un projet..."
                className="pl-10 pr-4 py-3 w-64 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1D1046] focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tous nos <span className="text-[#1D1046]">Projets</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explorez l'ensemble de nos réalisations et découvrez comment nous transformons les idées en solutions digitales performantes.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1D1046]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <div className={`bg-gradient-to-r ${getCategoryColor(project.category)} text-white px-3 py-1 rounded-full text-xs font-medium flex items-center`}>
                      {getCategoryIcon(project.category)}
                      <span className="ml-1 capitalize">{project.category}</span>
                    </div>
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        FEATURED
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#1D1046] transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {project.date}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {project.technologies && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium text-[#1D1046]">{project.client}</span>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/portfolio/${project.id}`}
                        className="text-[#1D1046] hover:text-purple-700 transition-colors p-2 rounded-full hover:bg-purple-50"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1D1046] hover:text-purple-700 transition-colors p-2 rounded-full hover:bg-purple-50"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12" data-aos="fade-up">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun projet trouvé</h3>
              <p className="text-gray-500">
                Essayez de modifier vos critères de recherche ou de filtrage.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-[#1D1046] to-[#3a1d8a] text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Nos Résultats en Chiffres
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Des performances qui parlent d'elles-mêmes et témoignent de notre engagement envers l'excellence.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "500+", label: "Projets Réalisés", icon: "🚀" },
              { value: "50+", label: "Clients Satisfaits", icon: "😊" },
              { value: "5+", label: "Années d'Expérience", icon: "⭐" },
              { value: "99%", label: "Taux de Satisfaction", icon: "💯" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl"
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div 
            data-aos="zoom-in"
            data-aos-delay="100"
            className="max-w-4xl mx-auto bg-gradient-to-br from-[#1D1046] to-[#3a1d8a] rounded-2xl shadow-xl overflow-hidden p-8 md:p-12 text-center relative"
          >
            {/* Background decoration */}
            <motion.div 
              className="absolute w-64 h-64 rounded-full bg-white/5 top-0 right-0 transform translate-x-1/4 -translate-y-1/4"
              animate={{ 
                scale: [1, 1.2, 1], 
                opacity: [0.2, 0.4, 0.2] 
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
            />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Prêt à Lancer Votre Projet ?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir comment nous pouvons vous aider à atteindre vos objectifs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/consultation" className="bg-white text-[#1D1046] px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-all shadow-lg inline-flex items-center">
                    Consultation gratuite
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                    >
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.div>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/contact" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-all shadow-lg">
                    Nous contacter
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}