"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, TrendingUp, BarChart, Users, Target, TrendingDown } from "lucide-react"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ScrollArrow from "@/components/scroll-arrow"

export default function DigitalMarketingPage() {
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
      icon: TrendingUp,
      title: "SEO",
      description: "Optimisation pour les moteurs de recherche pour améliorer votre visibilité en ligne",
      color: "from-[#1D1046] to-[#3a1d8a]"
    },
    {
      icon: BarChart,
      title: "SEM / SEA",
      description: "Campagnes publicitaires ciblées pour atteindre rapidement votre audience",
      color: "from-[#1D1046] to-[#3a1d8a]"
    },
    {
      icon: Users,
      title: "Social Media",
      description: "Stratégies de médias sociaux pour engager et développer votre communauté",
      color: "from-[#1D1046] to-[#3a1d8a]"
    },
    {
      icon: Target,
      title: "Analytics",
      description: "Analyse de données pour optimiser vos performances marketing",
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
        
        {/* Animated marketing elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          {/* Abstract shapes */}
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
            className="absolute w-96 h-96 blur-3xl bg-indigo-500/20 top-1/2 right-0 rounded-full"
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
          
          {/* Floating marketing elements */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${10 + Math.random() * 80}%`,
                opacity: 0.2,
                fontSize: `${Math.random() > 0.7 ? '2rem' : '1rem'}`
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            >
              {['📊', '📱', '🔍', '📈', '💻', '📣', '🎯', '📝', '💡', '⚡️'][Math.floor(Math.random() * 10)]}
            </motion.div>
          ))}
          
          {/* Marketing terminology */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i + 100}
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
              {['SEO', 'SEM', 'CPC', 'CTR', 'CRO', 'ROI', 'KPI', 'CPA', 'PPC', 'CRM'][Math.floor(Math.random() * 10)]}
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
              Marketing Digital
              <motion.span 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-500"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity 
                }}
              >
                Visibilité & Conversion
              </motion.span>
            </h1>
            <p 
              className="text-xl md:text-2xl text-white mb-8 leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Des stratégies digitales sur mesure pour augmenter votre visibilité en ligne, attirer du trafic qualifié et convertir vos visiteurs en clients
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8" data-aos="fade-up" data-aos-delay="400">
              <Badge className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 text-sm">SEO</Badge>
              <Badge className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 text-sm">Réseaux Sociaux</Badge>
              <Badge className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 text-sm">Google Ads</Badge>
              <Badge className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 text-sm">Content Marketing</Badge>
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
                Booster votre présence
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
              Nos Services <span className="text-[#1D1046]">Marketing</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des stratégies marketing innovantes pour booster votre présence en ligne
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

      {/* Analytics Dashboard Section */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <Badge className="bg-[#1D1046]/10 text-[#1D1046] mb-4">Analyse & Reporting</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pilotez votre Performance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des tableaux de bord personnalisés pour suivre vos KPIs et optimiser vos campagnes en temps réel
            </p>
          </div>
          
          <div className="relative" data-aos="fade-up">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1D1046] to-[#3a1d8a] transform rotate-1 scale-105 rounded-xl opacity-10"></div>
            <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Dashboard Marketing</h3>
                    <p className="text-sm text-gray-500">Performance des campagnes - Derniers 30 jours</p>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className="bg-green-100 text-green-800 px-3 py-1">Croissance +24%</Badge>
                    <Badge className="bg-blue-100 text-blue-800 px-3 py-1">Temps réel</Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                {[
                  { 
                    title: "Trafic Organique", 
                    value: "12,486", 
                    change: "+18.2%",
                    positive: true,
                    color: "from-blue-500 to-indigo-600"
                  },
                  { 
                    title: "Taux de Conversion", 
                    value: "3.7%", 
                    change: "+2.1%",
                    positive: true,
                    color: "from-green-500 to-emerald-600"
                  },
                  { 
                    title: "Coût par Acquisition", 
                    value: "€24.80", 
                    change: "-12.5%",
                    positive: true,
                    color: "from-purple-500 to-pink-600"
                  }
                ].map((metric, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">{metric.title}</h4>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                        <div className={`flex items-center mt-1 ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                          <span className="text-sm font-medium">{metric.change}</span>
                          <motion.div
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {metric.positive ? 
                              <TrendingUp className="h-4 w-4 ml-1" /> : 
                              <TrendingDown className="h-4 w-4 ml-1" />
                            }
                          </motion.div>
                        </div>
                      </div>
                      <div className={`h-16 w-24 bg-gradient-to-r ${metric.color} rounded-md opacity-20`}></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6">
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="w-full px-6">
                    <div className="flex justify-between mb-2">
                      <div className="text-xs font-medium text-gray-500">Performance par Canal</div>
                      <div className="flex space-x-2 text-xs text-gray-400">
                        <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-1"></span> Organique</span>
                        <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-purple-500 mr-1"></span> Social</span>
                        <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span> Ads</span>
                        <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-orange-500 mr-1"></span> Email</span>
                      </div>
                    </div>
                    <div className="relative h-40">
                      {/* Simulated chart bars */}
                      <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-between">
                        {[65, 40, 85, 30, 75, 50, 90, 45, 60, 80, 35, 70].map((height, i) => (
                          <div key={i} className="w-1/12 px-1 flex flex-col items-center">
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${height}%` }}
                              transition={{ duration: 1, delay: i * 0.1 }}
                              className={`w-full rounded-t-sm ${
                                i % 4 === 0 ? 'bg-blue-500' : 
                                i % 4 === 1 ? 'bg-purple-500' : 
                                i % 4 === 2 ? 'bg-green-500' : 
                                'bg-orange-500'
                              }`}
                            ></motion.div>
                            <div className="text-xs text-gray-400 mt-1">{i+1}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center" data-aos="fade-up">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/contact" 
                className="inline-flex items-center bg-[#1D1046] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#2d1a69] transition-all shadow-lg"
              >
                Demander une démo
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

      {/* Case Studies Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <Badge className="bg-[#1D1046]/10 text-[#1D1046] mb-4">Études de Cas</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Résultats Concrets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez comment nos stratégies marketing ont transformé la présence en ligne de nos clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Augmentation de 150% du trafic organique",
                client: "E-commerce Mode",
                description: "Refonte complète de la stratégie SEO avec création de contenu optimisé et amélioration technique du site.",
                results: [
                  "Trafic organique: +150% en 6 mois",
                  "Positions #1-3: 45 mots-clés stratégiques",
                  "Taux de conversion: +32%",
                  "ROI: 450%"
                ],
                image: "/images/case1.jpg",
                color: "from-blue-500 to-indigo-600"
              },
              {
                title: "Campagne Ads avec ROAS de 780%",
                client: "SaaS B2B",
                description: "Optimisation des campagnes Google Ads et LinkedIn Ads avec segmentation avancée et landing pages dédiées.",
                results: [
                  "ROAS: 780%",
                  "Coût par lead: -45%",
                  "Taux de conversion: +28%",
                  "Leads qualifiés: +95%"
                ],
                image: "/images/case2.jpg",
                color: "from-purple-500 to-pink-600"
              },
              {
                title: "Stratégie social media avec engagement x5",
                client: "Marque Lifestyle",
                description: "Création d'une stratégie de contenu engageante sur Instagram et TikTok avec campagnes d'influence.",
                results: [
                  "Engagement: +400%",
                  "Followers: +25K en 3 mois",
                  "Trafic depuis réseaux sociaux: +320%",
                  "Ventes attribuées: +75%"
                ],
                image: "/images/case3.jpg",
                color: "from-orange-500 to-red-600"
              },
              {
                title: "Refonte email marketing avec +210% de revenus",
                client: "Marketplace",
                description: "Automatisation des workflows email et personnalisation avancée basée sur le comportement utilisateur.",
                results: [
                  "Taux d'ouverture: +85%",
                  "Taux de clic: +120%",
                  "Revenus générés: +210%",
                  "Désabonnements: -40%"
                ],
                image: "/images/case4.jpg",
                color: "from-green-500 to-emerald-600"
              }
            ].map((caseStudy, index) => (
              <div 
                key={index} 
                className="animate-on-scroll"
                data-aos="fade-up"
                data-aos-delay={100 * (index % 2)}
              >
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 h-full"
                >
                  <div className="relative h-64">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1D1046]/80 to-[#3a1d8a]/80 z-10 flex items-center justify-center">
                      <h3 className="text-2xl font-bold text-white text-center px-6">{caseStudy.title}</h3>
                    </div>
                    <div className="absolute inset-0 overflow-hidden">
                      <Image
                        src={caseStudy.image}
                        alt={caseStudy.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Badge className={`bg-gradient-to-r ${caseStudy.color} text-white px-3 py-1`}>
                        {caseStudy.client}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{caseStudy.description}</p>
                    
                    <h4 className="font-semibold text-gray-900 mb-3">Résultats clés:</h4>
                    <ul className="space-y-2 mb-6">
                      {caseStudy.results.map((result, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{result}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        href="/contact" 
                        className="inline-flex items-center text-[#1D1046] font-medium hover:text-[#3a1d8a] transition-all"
                      >
                        Voir l'étude complète
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
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
              Prêt à Booster Votre Présence En Ligne?
            </h2>
            <p 
              className="text-xl text-white/80 max-w-3xl mx-auto mb-10"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Contactez-nous dès aujourd'hui pour discuter de votre projet marketing et obtenir un devis personnalisé.
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