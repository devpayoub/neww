"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock, Users, Target, Sparkles, Rocket, TrendingUp, Award, Star, Calendar } from "lucide-react"
import About from "@/components/About"
import Team from "@/components/Team"
import WhyChooseUs from "@/components/WhyChooseUs"
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AboutUsPage() {
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const timelineItems = [
    {
      year: "2018",
      title: "Création de Think Trend",
      description: "Lancement de notre vision d'une agence digitale innovante avec une équipe passionnée.",
      icon: Rocket,
      color: "from-purple-500 to-pink-500"
    },
    {
      year: "2019", 
      title: "Expansion des Services",
      description: "Développement de notre expertise en stratégie digitale et acquisition de nouveaux talents.",
      icon: TrendingUp,
      color: "from-blue-500 to-purple-500"
    },
    {
      year: "2020",
      title: "Adaptation & Résilience", 
      description: "Accompagnement des entreprises dans leur transformation digitale pendant une période cruciale.",
      icon: Award,
      color: "from-green-500 to-blue-500"
    },
    {
      year: "2021",
      title: "Certification & Innovation",
      description: "Obtention de certifications internationales et lancement de services innovants.",
      icon: Star,
      color: "from-yellow-500 to-orange-500"
    },
    {
      year: "2024",
      title: "Leadership Digital",
      description: "Référence incontournable en innovation numérique avec plus de 500 projets réalisés.",
      icon: Calendar,
      color: "from-purple-600 to-blue-600"
    }
  ];

  // Company milestones
  const milestones = [
    {
      year: "2018",
      title: "Création de Think Trend",
      description: "Lancement de l'agence avec une vision innovante du marketing digital.",
    },
    {
      year: "2019",
      title: "Expansion des Services",
      description: "Intégration des services de développement web et design graphique.",
    },
    {
      year: "2020",
      title: "Adaptation & Résilience",
      description: "Développement des solutions digitales innovantes pendant la crise sanitaire.",
    },
    {
      year: "2021",
      title: "Croissance & Innovation",
      description: "Lancement du département formation et consulting digital.",
    },
    {
      year: "2023",
      title: "Leadership Digital",
      description: "Reconnaissance comme leader régional en transformation digitale.",
    },
  ]

  return (
    <main className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1D1046] to-[#3a1d8a] py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute w-[800px] h-[800px] rounded-full bg-blue-500/10 -top-[400px] -left-[400px]"
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
            className="absolute w-[600px] h-[600px] rounded-full bg-purple-500/10 bottom-[-200px] right-[-100px]"
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
          
          {/* Floating elements */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white/10 font-bold"
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${10 + Math.random() * 80}%`,
                fontSize: `${Math.random() > 0.7 ? '2rem' : '1rem'}`
              }}
              initial={{ opacity: 0 }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            >
              {['Innovation', 'Créativité', 'Expertise', 'Passion', 'Digital', 'Stratégie', 'Excellence', 'Vision'][Math.floor(Math.random() * 8)]}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
              data-aos="fade-down"
              data-aos-duration="1000"
            >
              Notre Histoire,{" "}
              <motion.span 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300"
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
                Notre Vision
              </motion.span>
            </h1>
            <p
              className="text-lg md:text-xl text-blue-100/80 mb-12 leading-relaxed max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Depuis 2018, Think Trend façonne l'avenir du digital en combinant créativité, expertise technique
              et vision stratégique pour transformer vos ambitions en réalités numériques.
            </p>
            <div
              className="flex flex-wrap justify-center gap-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/contact" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-3 rounded-full transition-all duration-300">
                  En savoir plus
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/services" className="bg-white text-[#1D1046] px-8 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 flex items-center">
                  Nos Services
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
                <Link href="/contact" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-3 rounded-full transition-all duration-300">
                  Nous Contacter
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative">
        <div className="absolute inset-0 -z-10 opacity-5">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-[#1D1046]/20"></div>
          <div className="absolute bottom-12 -left-12 w-64 h-64 rounded-full border border-[#1D1046]/20"></div>
        </div>
        
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                value: "5+", 
                label: "Années d'expérience", 
                icon: <Clock className="w-10 h-10 text-[#1D1046]" /> 
              },
              { 
                value: "500+", 
                label: "Projets réalisés", 
                icon: <Target className="w-10 h-10 text-[#1D1046]" /> 
              },
              { 
                value: "50+", 
                label: "Clients satisfaits", 
                icon: <Users className="w-10 h-10 text-[#1D1046]" /> 
              },
              { 
                value: "15+", 
                label: "Experts passionnés", 
                icon: <Sparkles className="w-10 h-10 text-[#1D1046]" /> 
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={100 + index * 100}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1D1046]/10 mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold text-[#1D1046] mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Enhanced Timeline Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-20 left-10 w-32 h-32 bg-purple-200/30 rounded-full blur-xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 20, 0],
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200/30 rounded-full blur-xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, -20, 0],
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          />
          <motion.div 
            className="absolute top-32 right-1/4 w-4 h-4 bg-purple-400/40 rounded-full"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div 
            className="absolute top-64 left-1/4 w-3 h-3 bg-blue-400/40 rounded-full"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          />
          <motion.div 
            className="absolute bottom-48 right-1/3 w-5 h-5 bg-pink-400/40 rounded-full"
            animate={{ y: [0, -25, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 2 }}
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div 
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6 shadow-2xl transform hover:scale-110 transition-all duration-500"
              data-aos="zoom-in"
            >
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h2 
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Une Croissance Continue
            </h2>
            <p 
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Découvrez les moments clés qui ont façonné notre parcours et notre expertise 
              dans l'accompagnement digital. Chaque étape représente notre engagement envers l'excellence.
            </p>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-400 via-blue-400 to-purple-600 hidden lg:block rounded-full shadow-lg"
              data-aos="height"
              data-aos-duration="2000"
            />
            
            <div className="space-y-16 lg:space-y-24">
              {timelineItems.map((item, index) => {
                const Icon = item.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div 
                    key={index}
                    className={`flex items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                    data-aos={isEven ? "fade-right" : "fade-left"}
                    data-aos-delay={200 * index}
                  >
                    <div className={`w-full lg:w-5/12 ${isEven ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12'}`}>
                      <div className="group relative transform hover:scale-105 transition-all duration-500">
                        <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-700 transform scale-105 animate-pulse`}></div>
                        <div className="absolute inset-0 bg-white/50 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2"></div>
                        
                        <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 border border-white/50 group-hover:bg-white/95">
                          <div className="flex items-center gap-4 mb-6">
                            <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 animate-pulse`}>
                              <Icon className="w-8 h-8 text-white animate-bounce" style={{ animationDelay: `${index * 0.2}s` }} />
                            </div>
                            <div className={`text-5xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                              {item.year}
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-all duration-500 transform group-hover:translate-x-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed text-lg">
                            {item.description}
                          </p>
                          
                          <div className={`absolute top-4 right-4 w-3 h-3 bg-gradient-to-r ${item.color} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping`}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="hidden lg:flex w-2/12 justify-center">
                      <div className="relative transform hover:scale-150 transition-all duration-500">
                        <div className={`w-8 h-8 bg-gradient-to-r ${item.color} rounded-full border-4 border-white shadow-xl relative z-10 animate-pulse transform hover:rotate-180 transition-all duration-700`}></div>
                        <div className={`absolute inset-0 w-8 h-8 bg-gradient-to-r ${item.color} rounded-full animate-ping opacity-30`}></div>
                        <div className={`absolute inset-0 w-8 h-8 bg-gradient-to-r ${item.color} rounded-full animate-pulse opacity-20`} style={{ animationDelay: '0.5s' }}></div>
                      </div>
                    </div>
                    
                    <div className="w-full lg:w-5/12"></div>
                  </div>
                );
              })}
            </div>
            
            <div 
              className="text-center mt-20"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Star className="w-6 h-6" />
                </motion.div>
                <span className="font-bold text-lg">Et ce n'est que le début...</span>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Star className="w-6 h-6" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <Team />

      {/* Enhanced Office & Culture Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <div
            className="max-w-7xl mx-auto"
            data-aos="fade-up"
          >
            <div 
              className="text-center mb-20"
              data-aos="fade-up"
            >
              <div
                className="inline-flex items-center justify-center space-x-2 bg-[#1D1046]/5 rounded-full px-4 py-2 mb-4"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <Users className="w-4 h-4 text-[#1D1046]" />
                <span className="text-sm font-semibold text-[#1D1046]">Notre Culture</span>
              </div>
              <h3 
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Un Environnement Innovant
              </h3>
              <div 
                className="w-20 h-1 bg-gradient-to-r from-[#1D1046] to-[#3a1d8a] mx-auto mb-6"
                data-aos="width"
                data-aos-delay="300"
                data-aos-duration="1000"
              ></div>
              <p 
                className="text-gray-600 max-w-2xl mx-auto text-lg"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                Découvrez l'environnement dynamique et créatif qui inspire notre équipe au quotidien.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div
                className="relative h-[500px] rounded-2xl overflow-hidden group"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <Image
                  src="/images/office-1.jpg"
                  alt="Notre espace de travail"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1D1046]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Floating elements */}
                <div className="absolute inset-0 z-20 overflow-hidden">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg text-white/90 text-xs font-medium"
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${10 + Math.random() * 70}%`,
                      }}
                      animate={{
                        y: [0, -15, 0],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 4 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    >
                      {['Créativité', 'Collaboration', 'Innovation', 'Passion'][Math.floor(Math.random() * 4)]}
                    </motion.div>
                  ))}
                </div>
              </div>
              <div 
                className="flex flex-col justify-center space-y-8"
                data-aos="fade-left"
                data-aos-delay="300"
              >
                <h4 className="text-3xl font-bold text-gray-900">Un Espace de Création</h4>
                <p className="text-gray-600 text-lg">
                  Notre environnement de travail est conçu pour favoriser la créativité, la collaboration et
                  l'innovation. Nous croyons qu'un espace inspirant est essentiel pour développer des solutions
                  digitales exceptionnelles.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "Espaces de collaboration ouverts",
                    "Zones de créativité dédiées",
                    "Environnement technologique moderne",
                    "Atmosphère conviviale et dynamique"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      data-aos="fade-up"
                      data-aos-delay={100 + index * 100}
                      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <motion.div 
                          className="flex-shrink-0"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1D1046] to-[#3a1d8a] flex items-center justify-center">
                            <ArrowRight className="w-5 h-5 text-white" />
                          </div>
                        </motion.div>
                        <p className="text-gray-800 font-medium">{item}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
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
              <h2 className="text-3xl font-bold text-white mb-6">Prêt à construire l'avenir ensemble?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Contactez-nous dès aujourd'hui pour discuter de vos projets et découvrir comment nous pouvons vous aider à atteindre vos objectifs.
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

// Add the keyframe animations to the global styles
const styles = `
  @keyframes slide-in-timeline {
    0% {
      opacity: 0;
      transform: translateX(100px) translateY(50px);
    }
    100% {
      opacity: 1;
      transform: translateX(0) translateY(0);
    }
  }
  
  @keyframes grow-line {
    0% {
      height: 0%;
    }
    100% {
      height: 100%;
    }
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes width {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
`;

// Add the styles to the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}