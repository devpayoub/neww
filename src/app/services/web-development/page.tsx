"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Globe, Smartphone, ShoppingCart, Database, CheckCircle, Zap, Shield, Layers, Cloud, Code2, Cpu } from "lucide-react"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ScrollArrow from "@/components/scroll-arrow"

export default function WebDevelopmentPage() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const nextSectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 100,
    });
    
    // Refresh AOS when window is resized
    window.addEventListener('resize', () => {
      AOS.refresh();
    });
    
    return () => {
      window.removeEventListener('resize', () => {
        AOS.refresh();
      });
    };
  }, []);

  // Initialize Intersection Observer for fade-in animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])
  
  const services = [
    {
      icon: Globe,
      title: "Sites Web",
      description: "Sites vitrine et institutionnels performants et responsives",
      features: ["Design responsive", "SEO optimisé", "Performance élevée", "CMS intégré"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Smartphone,
      title: "Applications Mobile",
      description: "Applications natives et cross-platform pour iOS et Android",
      features: ["React Native", "Flutter", "Interface intuitive", "Notifications push"],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      description: "Boutiques en ligne complètes avec gestion des paiements",
      features: ["Catalogue produits", "Paiement sécurisé", "Gestion stocks", "Analytics"],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Database,
      title: "API & Backend",
      description: "Solutions backend robustes et APIs RESTful/GraphQL",
      features: ["Architecture scalable", "Base de données", "Sécurité avancée", "Documentation"],
      color: "from-orange-500 to-red-500",
    },
  ]

  const techStack = [
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Framework" },
    { name: "Node.js", category: "Backend" },
    { name: "Python", category: "Backend" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
    { name: "AWS", category: "Cloud" },
    { name: "Docker", category: "DevOps" },
  ]

  const features = [
    {
      icon: Zap,
      title: "Performance Optimale",
      description: "Code optimisé pour des temps de chargement ultra-rapides",
    },
    {
      icon: Shield,
      title: "Sécurité Renforcée",
      description: "Protocoles de sécurité avancés et protection des données",
    },
    {
      icon: Layers,
      title: "Architecture Scalable",
      description: "Solutions évolutives qui grandissent avec votre entreprise",
    },
    {
      icon: Cloud,
      title: "Cloud Ready",
      description: "Déploiement et hébergement cloud pour une disponibilité maximale",
    },
  ]

  const projects = [
    {
      title: "Plateforme SaaS",
      description: "Application web complexe avec tableau de bord analytics",
      tech: ["React", "Node.js", "PostgreSQL"],
      result: "99.9% uptime",
    },
    {
      title: "App Mobile E-commerce",
      description: "Application mobile pour marketplace avec paiements intégrés",
      tech: ["React Native", "Stripe", "Firebase"],
      result: "4.8★ rating",
    },
    {
      title: "Site Web Corporate",
      description: "Site institutionnel multilingue avec CMS personnalisé",
      tech: ["Next.js", "Headless CMS", "Vercel"],
      result: "95% PageSpeed",
    },
  ]

  return (
    <main className="overflow-hidden">
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#1D1046] to-[#3a1d8a] py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated background elements */}
          <motion.div 
            className="absolute w-96 h-96 blur-3xl bg-purple-500/20 -top-48 -left-48 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, 20, 0],
              y: [0, 20, 0]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          />
          <motion.div 
            className="absolute w-96 h-96 blur-3xl bg-blue-500/20 top-1/2 right-0 rounded-full"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2],
              x: [0, -30, 0],
              y: [0, -20, 0]
            }}
            transition={{ 
              duration: 18, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          />
          
          {/* Floating code particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white/20 font-mono text-xs"
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${10 + Math.random() * 80}%`,
                fontSize: `${Math.random() > 0.7 ? '1.5rem' : '0.8rem'}`
              }}
              initial={{ opacity: 0 }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            >
              {['<div>', '</div>', '<span>', 'const', 'function()', 'return', '{ }', '[]', 'import', 'export'][Math.floor(Math.random() * 10)]}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div 
            className="max-w-4xl mx-auto text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Développement Web
              <motion.span 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1D1046] to-[#3a1d8a]"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  repeatType: "reverse" 
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Sur Mesure
              </motion.span>
            </h1>
            <p 
              className="text-xl md:text-2xl text-[#1D1046] mb-12 leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Des solutions web innovantes et performantes pour votre succès digital
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-[#1D1046] bg-white rounded-full hover:bg-[#3a1d8a]/10 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Démarrer votre projet
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                >
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.div>
              </Link>
            </motion.div>
            
          </div>
          
        </div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <ScrollArrow targetRef={servicesRef} />
        </div>

      </section>  

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Nos Services <span className="text-[#1D1046]">Techniques</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Du concept à la mise en production, nous développons vos solutions digitales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 animate-on-scroll"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <p className="text-gray-600">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Technologies <span className="text-[#1D1046]">Maîtrisées</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous utilisons les technologies les plus modernes et performantes
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300 animate-on-scroll"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r from-[#1D1046] to-[#3a1d8a] flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{tech.name}</h3>
                  <p className="text-sm text-gray-500">{tech.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Nos <span className="text-[#1D1046]">Garanties</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Des solutions techniques robustes et évolutives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300 animate-on-scroll"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#1D1046] to-[#3a1d8a] flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Projets <span className="text-[#1D1046]">Réalisés</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez quelques-unes de nos réalisations techniques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-shadow duration-300 animate-on-scroll"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-2xl font-bold text-[#1D1046]">{project.result}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#1D1046]/10 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6">
          <div
            data-aos="fade-up"
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-[#1D1046]">
              Notre Processus de Développement
            </h2>
            <p className="text-xl text-gray-600">
              Une approche méthodique pour des résultats exceptionnels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Analyse",
                description: "Compréhension approfondie de vos besoins",
                icon: "📊"
              },
              {
                step: "02",
                title: "Design",
                description: "Création de maquettes interactives",
                icon: "🎨"
              },
              {
                step: "03",
                title: "Développement",
                description: "Codage avec les meilleures pratiques",
                icon: "💻"
              },
              {
                step: "04",
                title: "Déploiement",
                description: "Mise en ligne et optimisation continue",
                icon: "🚀"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                data-aos="zoom-in"
                data-aos-delay={100 + index * 100}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)"
                }}
                className="relative p-6 bg-gradient-to-br from-[#1D1046] to-[#3a1d8a] rounded-2xl text-white group transition-all duration-300"
              >
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl shadow-lg">
                  {item.icon}
                </div>
                <div className="text-4xl font-bold mb-4 text-purple-300">{item.step}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-blue-100">{item.description}</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#1D1046] to-[#3a1d8a] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <h2 className="text-4xl font-bold mb-6 text-[#1D1046]">
                Fonctionnalités Avancées
              </h2>
              <div className="space-y-6">
                {[
                  "Performance optimisée pour le SEO",
                  "Interface utilisateur responsive",
                  "Sécurité renforcée",
                  "Intégration API complète"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    </motion.div>
                    <span className="text-lg text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8"
              >
                <Link 
                  href="/consultation" 
                  className="inline-flex items-center bg-[#1D1046] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#2d1a69] transition-all shadow-lg"
                >
                  Discuter de votre projet
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
            
            <motion.div
              data-aos="fade-left"
              data-aos-delay="300"
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1D1046]/80 to-[#3a1d8a]/80 mix-blend-multiply z-10"></div>
              <Image
                src="/images/team-4.png"
                alt="Web Development"
                fill
                className="object-cover"
              />
              
              {/* Floating code elements */}
              <div className="absolute inset-0 z-20 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute font-mono text-xs text-white/70 bg-white/10 px-3 py-1 rounded"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${10 + Math.random() * 70}%`,
                      fontSize: `${Math.random() > 0.7 ? '0.7rem' : '0.6rem'}`
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 4,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  >
                    {['<div className="...">', 'const handleClick = () => {}', 'import React from "react"', 'export default function', 'return <Component />'][Math.floor(Math.random() * 5)]}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-6">
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
              <h2 className="text-3xl font-bold text-white mb-6">Prêt à transformer votre stratégie marketing?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir comment nous pouvons vous aider à atteindre vos objectifs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/contact" className="bg-white text-[#1D1046] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all shadow-lg inline-flex items-center">
                    Nous contacter
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
                  <Link href="/consultation" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-all shadow-lg">
                    Demander un devis
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