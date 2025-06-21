"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Palette, Layers, PenTool, Monitor } from "lucide-react"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ScrollArrow from "@/components/scroll-arrow"

export default function GraphicDesignPage() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  
  // Initialize AOS
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

  // Setup intersection observer for fade-in animations
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
      icon: Palette,
      title: "Design d'Identité",
      description: "Création de logos, chartes graphiques et identités visuelles complètes",
      color: "from-[#1D1046] to-[#3a1d8a]"
    },
    {
      icon: Layers,
      title: "Design d'Imprimés",
      description: "Conception de brochures, flyers, cartes de visite et supports marketing",
      color: "from-[#1D1046] to-[#3a1d8a]"
    },
    {
      icon: PenTool,
      title: "Design d'Interface",
      description: "Création d'interfaces utilisateur intuitives et esthétiques pour web et mobile",
      color: "from-[#1D1046] to-[#3a1d8a]"
    },
    {
      icon: Monitor,
      title: "Design de Contenu",
      description: "Création de visuels pour réseaux sociaux, bannières et contenus digitaux",
      color: "from-[#1D1046] to-[#3a1d8a]"
    }
  ]

  return (
    <main className="overflow-hidden">
      {/* Hero Section with Animated Background */}
      <section className="min-h-screen relative overflow-hidden flex items-center">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#1D1046] to-[#3a1d8a] -z-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        {/* Animated design elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          {/* Abstract design shapes */}
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
            className="absolute w-96 h-96 blur-3xl bg-pink-500/20 top-1/2 right-0 rounded-full"
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
          
          {/* Floating design elements */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${10 + Math.random() * 80}%`,
                width: `${10 + Math.random() * 30}px`,
                height: `${10 + Math.random() * 30}px`,
                borderRadius: Math.random() > 0.5 ? '50%' : `${Math.random() * 5}px`,
                background: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${0.1 + Math.random() * 0.3})`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
          
          {/* Design terminology */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i + 100}
              className="absolute text-white/20 font-serif text-xs"
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
              {['CMYK', 'RGB', 'Pantone', 'Typographie', 'Grille', 'Vecteur', 'Pixel', 'Mockup', 'Wireframe', 'UX/UI'][Math.floor(Math.random() * 10)]}
            </motion.div>
          ))}
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Design Graphique
              <motion.span 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity 
                }}
              >
                Créativité & Impact
              </motion.span>
            </h1>
            <p 
              className="text-xl md:text-2xl text-white mb-8 leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Des designs créatifs et impactants qui transforment votre identité visuelle et captivent votre audience
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8" data-aos="fade-up" data-aos-delay="400">
              <Badge className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 text-sm">Identité de marque</Badge>
              <Badge className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 text-sm">Supports marketing</Badge>
              <Badge className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 text-sm">UI/UX Design</Badge>
              <Badge className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 text-sm">Illustration</Badge>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-[#1D1046] bg-white rounded-full hover:bg-[#3a1d8a]/10 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
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
              Nos Services <span className="text-[#1D1046]">Design</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions créatives pour tous vos besoins en design graphique
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="animate-on-scroll"
                data-aos="fade-up"
                data-aos-delay={100 * index}
              >
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-0">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1D1046] to-[#3a1d8a] flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <Badge className="bg-[#1D1046]/10 text-[#1D1046] mb-4">Notre Portfolio</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Projets Design Récents
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez quelques-unes de nos créations qui ont transformé l'image de nos clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Rebrand Complet",
                client: "TechVision",
                category: "Identité de marque",
                image: "/images/1_fe98d0a647.png",
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Packaging Produit",
                client: "Eco Essentials",
                category: "Design produit",
                image: "/images/2_aecf4994fe.png",
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Application Mobile",
                client: "FinanceApp",
                category: "UI/UX Design",
                image: "/images/3_30781f6f78.png",
                color: "from-green-500 to-emerald-500"
              },
              {
                title: "Campagne Sociale",
                client: "GreenEarth",
                category: "Design marketing",
                image: "/images/4_fe98d0a647.png",
                color: "from-orange-500 to-red-500"
              },
              {
                title: "Magazine Digital",
                client: "TrendMag",
                category: "Editorial design",
                image: "/images/5_aecf4994fe.png",
                color: "from-indigo-500 to-purple-500"
              },
              {
                title: "Site E-commerce",
                client: "FashionHub",
                category: "Web design",
                image: "/images/6_30781f6f78.png",
                color: "from-pink-500 to-rose-500"
              }
            ].map((project, index) => (
              <div 
                key={index} 
                className="animate-on-scroll"
                data-aos="fade-up"
                data-aos-delay={100 * index}
              >
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="relative overflow-hidden rounded-xl shadow-lg group h-80"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1D1046]/80 to-[#3a1d8a]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-6">
                    <div>
                      <span className="text-xs text-white/80 uppercase tracking-wider">{project.category}</span>
                      <h3 className="text-xl font-bold text-white mt-1">{project.title}</h3>
                      <p className="text-white/80 text-sm">Client: {project.client}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-20"></div>
                </motion.div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12" data-aos="fade-up">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/contact" 
                className="inline-flex items-center bg-[#1D1046] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#2d1a69] transition-all shadow-lg"
              >
                Voir plus de projets
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
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-[#1D1046] to-[#3a1d8a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <Badge className="bg-white/10 text-white mb-4">Avantages</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pourquoi Choisir Nos Solutions Design
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Des designs qui font la différence pour votre marque
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Designs Uniques",
                description: "Chaque création est unique et personnalisée selon votre identité et vos besoins",
                icon: Palette
              },
              {
                title: "Expertise Créative",
                description: "Une équipe de designers expérimentés avec une vision artistique forte",
                icon: PenTool
              },
              {
                title: "Approche Stratégique",
                description: "Des designs qui répondent à vos objectifs commerciaux et marketing",
                icon: Layers
              },
              {
                title: "Adaptabilité Multi-Support",
                description: "Des créations adaptées à tous les formats et supports de communication",
                icon: Monitor
              },
              {
                title: "Collaboration Étroite",
                description: "Un processus créatif transparent avec des retours réguliers",
                icon: CheckCircle2
              },
              {
                title: "Résultats Mesurables",
                description: "Des designs qui génèrent de l'engagement et renforcent votre image de marque",
                icon: CheckCircle2
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="animate-on-scroll"
                data-aos="fade-up"
                data-aos-delay={100 * index}
              >
                <Card className="h-full bg-white/5 border-none hover:bg-white/10 transition-all duration-300">
                  <CardHeader className="pb-0">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <Badge className="bg-[#1D1046]/10 text-[#1D1046] mb-4">Notre Processus</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Comment Nous Travaillons
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une approche créative et méthodique pour des résultats exceptionnels
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Découverte",
                description: "Analyse de votre marque, vos besoins et vos objectifs"
              },
              {
                step: "02",
                title: "Concept",
                description: "Élaboration de concepts créatifs et de directions artistiques"
              },
              {
                step: "03",
                title: "Création",
                description: "Développement des designs finaux avec cycles de révision"
              },
              {
                step: "04",
                title: "Livraison",
                description: "Finalisation et livraison des fichiers dans tous les formats nécessaires"
              }
            ].map((process, index) => (
              <div 
                key={index} 
                className="animate-on-scroll"
                data-aos="fade-up"
                data-aos-delay={100 * index}
              >
                <Card className="h-full border border-gray-100 hover:border-[#1D1046]/30 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-0">
                    <span className="text-4xl font-bold text-[#1D1046]/20">{process.step}</span>
                    <CardTitle className="text-xl font-bold mt-2">{process.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{process.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#1D1046] to-[#3a1d8a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 lg:p-16 text-center">
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
              data-aos="fade-up"
            >
              Prêt à Transformer Votre Image de Marque?
            </h2>
            <p 
              className="text-xl text-white/80 max-w-3xl mx-auto mb-10"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Contactez-nous dès aujourd'hui pour discuter de votre projet design et obtenir un devis personnalisé.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-[#1D1046] bg-white rounded-full hover:bg-[#3a1d8a]/10 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Demander un Devis Gratuit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}