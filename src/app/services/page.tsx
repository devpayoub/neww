"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Code, Palette, Megaphone, GraduationCap, Star, CheckCircle, TrendingUp, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ServicesPage() {
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

  // Services data from the Service component
  const services = [
    {
      title: "Développement Web",
      description:
        "Conception de sites vitrines, plateformes e-commerce et solutions sur-mesure pour répondre à vos besoins spécifiques.",
      icon: <Code className="h-10 w-10 text-[#1D1046]" />,
      iconPath: "/icons/Frame-dev.svg",
      detailedDescription: [
        "Sites web responsifs adaptés à tous les appareils",
        "Applications web progressives pour une expérience mobile optimale",
        "Intégration de systèmes de gestion de contenu (CMS)",
        "Développement d'API et services web",
        "Maintenance et support technique"
      ],
      cta: "Discuter de votre projet web",
      bgGradient: "from-blue-600 to-indigo-800",
      keywords: ["HTML", "CSS", "JavaScript", "React", "Next.js", "API"]
    },
    {
      title: "Marketing Digital",
      description:
        "Gestion professionnelle des réseaux sociaux, campagnes publicitaires ciblées, et optimisation SEO pour améliorer votre visibilité sur les moteurs de recherche.",
      icon: <Megaphone className="h-10 w-10 text-[#1D1046]" />,
      iconPath: "/icons/marketing.svg",
      detailedDescription: [
        "Stratégie de contenu et calendrier éditorial",
        "Gestion des réseaux sociaux et community management",
        "Campagnes publicitaires sur Google Ads et réseaux sociaux",
        "Optimisation SEO et référencement naturel",
        "Analyse de performance et rapports mensuels"
      ],
      cta: "Booster votre présence en ligne",
      bgGradient: "from-purple-600 to-pink-700",
      keywords: ["SEO", "SEM", "Social Media", "Content", "Analytics", "Ads"]
    },
    {
      title: "Design Graphique",
      description:
        "Création d'identités visuelles uniques. Conception de maquettes graphiques modernes. Expériences utilisateurs engageantes et intuitives.",
      icon: <Palette className="h-10 w-10 text-[#1D1046]" />,
      iconPath: "/icons/desg.svg",
      detailedDescription: [
        "Création de logos et identités visuelles",
        "Design d'interfaces utilisateur (UI) et expérience utilisateur (UX)",
        "Conception de supports marketing (flyers, brochures, affiches)",
        "Design de publications pour réseaux sociaux",
        "Charte graphique complète pour votre entreprise"
      ],
      cta: "Créer votre identité visuelle",
      bgGradient: "from-pink-600 to-orange-600",
      keywords: ["UI/UX", "Branding", "Logo", "Mockup", "Photoshop", "Figma"]
    },
    {
      title: "Formations sur Mesure",
      description: "Sessions pratiques pour maîtriser les compétences en marketing digital et développement web.",
      icon: <GraduationCap className="h-10 w-10 text-[#1D1046]" />,
      iconPath: "/icons/formation.svg",
      detailedDescription: [
        "Formation aux outils de gestion de contenu (WordPress, Shopify)",
        "Ateliers pratiques sur les stratégies de marketing digital",
        "Cours d'initiation au développement web",
        "Formation aux outils de design graphique",
        "Coaching personnalisé pour votre équipe"
      ],
      cta: "Réserver une formation",
      bgGradient: "from-green-600 to-teal-700",
      keywords: ["Workshop", "Coaching", "Pratique", "Expertise", "Learning"]
    },
  ]

  // Stats data
  const stats = [
    { value: "500+", label: "Projets Réalisés", icon: <Star className="h-8 w-8 text-[#1D1046]" /> },
    { value: "50+", label: "Clients Satisfaits", icon: <CheckCircle className="h-8 w-8 text-[#1D1046]" /> },
    { value: "5+", label: "Années d'Expérience", icon: <TrendingUp className="h-8 w-8 text-[#1D1046]" /> },
    { value: "15+", label: "Experts Passionnés", icon: <Users className="h-8 w-8 text-[#1D1046]" /> },
  ]

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1D1046] to-[#3a1d8a] py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated background elements */}
          <motion.div 
            className="absolute w-96 h-96 rounded-full bg-blue-500/10 -top-20 -left-20"
            animate={{ 
              x: [0, 30, 0], 
              y: [0, 20, 0],
              opacity: [0.5, 0.8, 0.5] 
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          />
          <motion.div 
            className="absolute w-64 h-64 rounded-full bg-purple-500/10 bottom-10 right-10"
            animate={{ 
              x: [0, -20, 0], 
              y: [0, -15, 0],
              opacity: [0.6, 0.9, 0.6] 
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          />
          <motion.div 
            className="absolute w-32 h-32 rounded-full bg-indigo-500/10 top-40 right-1/4"
            animate={{ 
              scale: [1, 1.2, 1], 
              opacity: [0.4, 0.7, 0.4] 
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          />
          
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white/30"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
          
          {/* Floating service keywords */}
          {services.flatMap((service, serviceIndex) => 
            service.keywords.map((keyword, keywordIndex) => (
              <motion.div
                key={`${serviceIndex}-${keywordIndex}`}
                className="absolute bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-white/80 text-xs font-medium"
                style={{
                  top: `${15 + (serviceIndex * 15) + (Math.random() * 10)}%`,
                  left: `${10 + (keywordIndex * 15) + (Math.random() * 10)}%`,
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
            ))
          )}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Nos{" "}
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  repeatType: "reverse" 
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Services
              </motion.span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Des solutions digitales complètes pour propulser votre entreprise vers de nouveaux sommets.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link href="/consultation" className="bg-white text-[#1D1046] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transform transition-all shadow-lg inline-flex items-center">
                  <span>Découvrir nos services</span>
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
                className="inline-block"
              >
                <Link href="/contact" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg">
                  Nous contacter
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 bg-white relative">
        <div className="absolute inset-0 -z-10 opacity-5">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-[#1D1046]/20"></div>
          <div className="absolute bottom-12 -left-12 w-64 h-64 rounded-full border border-[#1D1046]/20"></div>
        </div>
        
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={100 + index * 100}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1D1046]/10 mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-[#1D1046] mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#1D1046]/10 to-transparent"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-[#1D1046]/20"></div>
          <div className="absolute bottom-12 -left-12 w-64 h-64 rounded-full border border-[#1D1046]/20"></div>
        </div>
        
        <div className="container mx-auto">
          <div 
            className="text-center mb-16"
            data-aos="fade-up"
          >
            <div 
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6 shadow-2xl transform hover:scale-110 transition-all duration-500"
              data-aos="zoom-in"
            >
              <Star className="w-10 h-10 text-white" />
            </div>
            <h2 
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1D1046] via-purple-700 to-[#1D1046] bg-clip-text text-transparent mb-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Nos Expertises
            </h2>
            <p 
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Découvrez nos services spécialisés conçus pour répondre à tous vos besoins digitaux
              et propulser votre entreprise vers le succès.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* Services Grid */}
            <div className="grid grid-cols-1 gap-16 mb-16">
              {services.map((service, index) => (
                <div
                  key={index}
                  data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                  data-aos-delay={100 + index * 50}
                  className={`bg-white rounded-2xl shadow-xl overflow-hidden ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} md:flex group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1`}
                >
                  {/* Service Image/Icon Section */}
                  <div className={`md:w-2/5 bg-gradient-to-br ${service.bgGradient} p-10 flex items-center justify-center relative overflow-hidden`}>
                    {/* Animated background */}
                    <motion.div 
                      className="absolute w-64 h-64 rounded-full bg-white/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      animate={{ 
                        scale: [1, 1.2, 1], 
                        opacity: [0.3, 0.5, 0.3] 
                      }}
                      transition={{ 
                        duration: 8, 
                        repeat: Infinity, 
                        repeatType: "reverse" 
                      }}
                    />
                    
                    {/* Floating keywords specific to each service */}
                    {service.keywords.map((keyword, keywordIndex) => (
                      <motion.div
                        key={keywordIndex}
                        className="absolute bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-white/90 text-xs font-medium"
                        style={{
                          top: `${20 + (keywordIndex * 15)}%`,
                          left: keywordIndex % 2 === 0 ? '10%' : '70%',
                        }}
                        animate={{
                          y: [0, -10, 0],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 3 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      >
                        {keyword}
                      </motion.div>
                    ))}
                    
                    <motion.div 
                      className="bg-white/10 p-8 rounded-full z-10 relative group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-700"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 0 30px rgba(255, 255, 255, 0.2)"
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border border-white/20 opacity-70"
                      />
                      <motion.div
                        animate={{ rotate: [360, 0] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 rounded-full border border-white/10 opacity-50"
                      />
                      <Image
                        src={service.iconPath}
                        alt={service.title}
                        width={120}
                        height={120}
                        className="h-32 w-32 object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </motion.div>
                  </div>
                  
                  {/* Service Content */}
                  <div className="md:w-3/5 p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-[#1D1046] transition-colors duration-300">{service.title}</h2>
                    <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Ce que nous proposons:</h3>
                    <ul className="space-y-3 mb-8">
                      {service.detailedDescription.map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <motion.div 
                            className="bg-[#1D1046]/10 p-1 rounded-full mr-3 mt-1"
                            whileHover={{ scale: 1.2, backgroundColor: "rgba(29, 16, 70, 0.2)" }}
                          >
                            <ArrowRight className="h-4 w-4 text-[#1D1046]" />
                          </motion.div>
                          <span className="text-gray-700">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-').replace(/é/g, 'e').replace(/è/g, 'e').replace(/à/g, 'a')}`} 
                        className="inline-flex items-center bg-[#1D1046] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#2d1a69] transition-all shadow-lg"
                      >
                        {service.cta}
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
              ))}
            </div>
            
            {/* CTA Section */}
            <div
              data-aos="zoom-in"
              data-aos-delay="200"
              className="bg-gradient-to-br from-[#1D1046] to-[#3a1d8a] rounded-2xl shadow-xl overflow-hidden p-8 md:p-12 text-center relative"
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
              <motion.div 
                className="absolute w-32 h-32 rounded-full bg-white/5 bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4"
                animate={{ 
                  scale: [1, 1.3, 1], 
                  opacity: [0.1, 0.3, 0.1] 
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  repeatType: "reverse" 
                }}
              />
              
              {/* Floating elements */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-white/10 font-bold text-xl"
                  style={{
                    top: `${10 + Math.random() * 80}%`,
                    left: `${10 + Math.random() * 80}%`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 5,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                >
                  {['Innovation', 'Créativité', 'Excellence', 'Expertise', 'Passion'][i]}
                </motion.div>
              ))}
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-6">Prêt à démarrer votre projet?</h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Contactez-nous dès aujourd'hui pour discuter de vos besoins et découvrir comment nous pouvons vous aider à atteindre vos objectifs.
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
                      Demander une consultation
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}