"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, BookOpen, Users, Calendar, Award, GraduationCap, Code2, Quote, Star } from "lucide-react"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ScrollArrow from "@/components/scroll-arrow"

export default function TrainingPage() {
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

  const trainingServices = [
    {
      icon: BookOpen,
      title: "Formation Web",
      description: "Formations sur les technologies web modernes et le développement front-end/back-end",
      color: "from-[#1D1046] to-[#3a1d8a]"
    },
    {
      icon: Users,
      title: "Formation Marketing",
      description: "Formations sur les stratégies de marketing digital, SEO et réseaux sociaux",
      color: "from-[#1D1046] to-[#3a1d8a]"
    },
    {
      icon: GraduationCap,
      title: "Formation Design",
      description: "Formations sur les outils de design graphique et les principes de l'UX/UI",
      color: "from-[#1D1046] to-[#3a1d8a]"
    },
    {
      icon: Award,
      title: "Certification",
      description: "Préparation aux certifications professionnelles reconnues dans le domaine digital",
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
        
        {/* Animated educational elements */}
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
          
          {/* Floating educational elements */}
          {[...Array(10)].map((_, i) => (
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
              {['📚', '🎓', '💻', '📊', '🔍', '📝', '🧠', '🚀', '⚙️', '📈'][Math.floor(Math.random() * 10)]}
            </motion.div>
          ))}
          
          {/* Educational terminology */}
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
              {['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python', 'Data Science', 'UX/UI', 'DevOps', 'Agile'][Math.floor(Math.random() * 10)]}
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
              Formation Professionnelle
              <motion.span 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity 
                }}
              >
                Expertise & Innovation
              </motion.span>
            </h1>
            <p 
              className="text-xl md:text-2xl text-white mb-8 leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Des formations personnalisées pour développer les compétences techniques de vos équipes et accélérer votre transformation digitale
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8" data-aos="fade-up" data-aos-delay="400">
              <Badge className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 text-sm">Développement Web</Badge>
              <Badge className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 text-sm">Data Science</Badge>
              <Badge className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 text-sm">UX/UI Design</Badge>
              <Badge className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 text-sm">DevOps</Badge>
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
                Demander un programme
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
              Nos <span className="text-[#1D1046]">Formations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des formations adaptées à tous les niveaux et besoins professionnels
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trainingServices.map((service, index) => (
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

      {/* Learning Paths Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <Badge className="bg-[#1D1046]/10 text-[#1D1046] mb-4">Parcours d'Apprentissage</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Progressez à Votre Rythme
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des parcours structurés pour développer vos compétences de débutant à expert
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                level: "Débutant",
                title: "Fondamentaux",
                description: "Maîtrisez les bases essentielles pour démarrer dans le domaine",
                skills: ["Concepts de base", "Outils fondamentaux", "Bonnes pratiques", "Projets simples"],
                color: "from-blue-500 to-cyan-500",
                icon: BookOpen
              },
              {
                level: "Intermédiaire",
                title: "Applications Pratiques",
                description: "Approfondissez vos connaissances avec des projets concrets",
                skills: ["Frameworks populaires", "Méthodologies avancées", "Projets complexes", "Travail d'équipe"],
                color: "from-purple-500 to-pink-500",
                icon: Code2
              },
              {
                level: "Expert",
                title: "Maîtrise Avancée",
                description: "Perfectionnez vos compétences au niveau professionnel",
                skills: ["Architecture avancée", "Performance & optimisation", "Leadership technique", "Innovation"],
                color: "from-orange-500 to-red-500",
                icon: Award
              }
            ].map((path, index) => (
              <div 
                key={index} 
                className="animate-on-scroll"
                data-aos="fade-up"
                data-aos-delay={100 * index}
              >
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 h-full flex flex-col"
                >
                  <div className="mb-6">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${path.color} flex items-center justify-center mb-4`}>
                      <path.icon className="h-8 w-8 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-[#1D1046]/60 uppercase tracking-wider">{path.level}</span>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{path.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{path.description}</p>
                  
                  <div className="mt-auto">
                    <h4 className="font-semibold text-gray-900 mb-3">Compétences acquises:</h4>
                    <ul className="space-y-2">
                      {path.skills.map((skill, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <Badge className="bg-[#1D1046]/10 text-[#1D1046] mb-4">Témoignages</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ce que nos apprenants disent
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez l'impact de nos formations sur le parcours professionnel de nos participants
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sophie Martin",
                role: "Développeuse Frontend",
                company: "TechCorp",
                image: "/images/testimonial1.jpg",
                quote: "La formation React a complètement transformé ma façon de développer. J'ai pu mettre en pratique les compétences acquises dès mon retour en entreprise."
              },
              {
                name: "Thomas Dubois",
                role: "Chef de Projet Digital",
                company: "AgenceWeb",
                image: "/images/testimonial2.jpg",
                quote: "Les formateurs sont de vrais experts qui partagent non seulement leurs connaissances mais aussi leur expérience terrain. Une formation d'une qualité exceptionnelle."
              },
              {
                name: "Marie Leroy",
                role: "UX Designer",
                company: "DesignStudio",
                image: "/images/testimonial3.jpg",
                quote: "J'ai particulièrement apprécié l'approche pratique et les projets concrets qui nous ont permis d'appliquer immédiatement les concepts appris."
              },
              {
                name: "Jean Moreau",
                role: "Ingénieur DevOps",
                company: "CloudServices",
                image: "/images/testimonial4.jpg",
                quote: "La formation DevOps a été un accélérateur pour notre équipe. Nous avons optimisé nos processus et gagné en efficacité dès les premières semaines."
              },
              {
                name: "Camille Bernard",
                role: "Data Scientist",
                company: "DataInsight",
                image: "/images/testimonial5.jpg",
                quote: "Le programme de Data Science était parfaitement structuré, progressif et adapté aux besoins actuels du marché. Je recommande vivement."
              },
              {
                name: "Alexandre Petit",
                role: "Directeur Technique",
                company: "StartupInnovation",
                image: "/images/testimonial6.jpg",
                quote: "Nous avons formé toute notre équipe technique et constaté une amélioration immédiate de notre productivité et de la qualité de nos livrables."
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="animate-on-scroll"
                data-aos="fade-up"
                data-aos-delay={100 * (index % 3)}
              >
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200 flex-shrink-0">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Quote className="h-6 w-6 text-[#1D1046]/30" />
                  </div>
                  
                  <p className="text-gray-700 italic flex-grow">{testimonial.quote}</p>
                  
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400" fill="#FBBF24" />
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-[#1D1046] to-[#3a1d8a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <Badge className="bg-white/10 text-white mb-4">Avantages</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pourquoi Choisir Nos Formations
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Une approche pédagogique moderne et efficace
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Formateurs Experts",
                description: "Des professionnels actifs dans leur domaine avec une expérience terrain significative",
                icon: Users
              },
              {
                title: "Formations Pratiques",
                description: "Approche basée sur des projets concrets et des cas réels d'entreprise",
                icon: BookOpen
              },
              {
                title: "Flexibilité",
                description: "Formats adaptés à vos contraintes : présentiel, distanciel ou hybride",
                icon: Calendar
              },
              {
                title: "Suivi Personnalisé",
                description: "Accompagnement individuel et suivi post-formation pour assurer votre progression",
                icon: CheckCircle2
              },
              {
                title: "Contenu Actualisé",
                description: "Programmes régulièrement mis à jour pour suivre les dernières tendances et technologies",
                icon: Award
              },
              {
                title: "Certification",
                description: "Préparation aux certifications reconnues dans l'industrie pour valoriser vos compétences",
                icon: GraduationCap
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
            <Badge className="bg-[#1D1046]/10 text-[#1D1046] mb-4">Notre Approche</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Parcours de Formation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une méthodologie éprouvée pour garantir votre montée en compétences
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Évaluation",
                description: "Analyse de vos besoins et de votre niveau initial pour personnaliser la formation"
              },
              {
                step: "02",
                title: "Formation",
                description: "Sessions de formation interactives avec alternance théorie et pratique"
              },
              {
                step: "03",
                title: "Application",
                description: "Mise en pratique des connaissances sur des projets concrets"
              },
              {
                step: "04",
                title: "Suivi",
                description: "Accompagnement post-formation et évaluation des compétences acquises"
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
              Prêt à Développer Vos Compétences?
            </h2>
            <p 
              className="text-xl text-white/80 max-w-3xl mx-auto mb-10"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Contactez-nous dès aujourd'hui pour discuter de vos besoins en formation et obtenir un programme personnalisé.
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
                Demander un Programme
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}