"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, User, Mail, Phone, Building, MessageSquare, Send, Check } from "lucide-react"
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ConsultationPage() {
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    services: [] as string[],
  })

  // Liste des services disponibles basée sur le composant Service.tsx
  const availableServices = [
    "Développement Web",
    "Marketing Digital",
    "Design Graphique",
    "Formations sur Mesure"
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  const toggleService = (service: string) => {
    setFormData(prev => {
      if (prev.services.includes(service)) {
        return {
          ...prev,
          services: prev.services.filter(s => s !== service)
        }
      } else {
        return {
          ...prev,
          services: [...prev.services, service]
        }
      }
    })
  }

  return (
    <main>
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
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Obtenir un {" "}
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300"
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
                devis
              </motion.span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Réservez une session de consultation gratuite avec nos experts pour discuter de votre projet digital.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="form-section" className="py-16 px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#1D1046]/10 to-transparent"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-[#1D1046]/20"></div>
          <div className="absolute bottom-12 -left-12 w-64 h-64 rounded-full border border-[#1D1046]/20"></div>
        </div>
        
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-8 md:p-12">
                <h2 
                  data-aos="fade-down"
                  data-aos-delay="300"
                  className="text-2xl font-bold text-gray-900 mb-6 text-center"
                >
                  Réservez votre consultation
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="space-y-6">
                      <div
                        data-aos="fade-right"
                        data-aos-delay="400"
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="text"
                            required
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent transition-all"
                            placeholder="Votre nom"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                      </div>

                      <div
                        data-aos="fade-right"
                        data-aos-delay="500"
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="email"
                            required
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent transition-all"
                            placeholder="votre@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                      </div>

                      <div
                        data-aos="fade-right"
                        data-aos-delay="600"
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="tel"
                            required
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent transition-all"
                            placeholder="Votre numéro"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                      </div>

                      <div
                        data-aos="fade-right"
                        data-aos-delay="700"
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2">Entreprise</label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="text"
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent transition-all"
                            placeholder="Nom de votre entreprise"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Services and Message */}
                    <div className="space-y-6">
                      <div
                        data-aos="fade-left"
                        data-aos-delay="400"
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2">Services</label>
                        <div className="space-y-2">
                          {availableServices.map((service, index) => (
                            <motion.div 
                              key={service}
                              onClick={() => toggleService(service)}
                              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${formData.services.includes(service) ? 'border-[#1D1046] bg-[#1D1046]/5' : 'border-gray-300'}`}
                              whileHover={{ 
                                scale: 1.02, 
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" 
                              }}
                              whileTap={{ scale: 0.98 }}
                              data-aos="fade-up"
                              data-aos-delay={450 + index * 50}
                            >
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 transition-all ${formData.services.includes(service) ? 'bg-[#1D1046] text-white' : 'border border-gray-400'}`}>
                                {formData.services.includes(service) && <Check className="h-3 w-3" />}
                              </div>
                              <span>{service}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div
                        data-aos="fade-left"
                        data-aos-delay="700"
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                          <textarea
                            required
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent transition-all"
                            rows={4}
                            placeholder="Décrivez brièvement votre projet..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="flex justify-center mt-8"
                    data-aos="zoom-in"
                    data-aos-delay="800"
                  >
                    <motion.button
                      type="submit"
                      className="bg-[#1D1046] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#2d1a69] transform transition-all shadow-lg flex items-center"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                        className="flex items-center"
                      >
                        Réserver ma consultation
                        <Send className="ml-2 h-5 w-5" />
                      </motion.div>
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>

            {/* Additional Information */}
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="mt-16 text-center"
            >
              <div className="relative inline-block mb-10">
                <h2 className="text-3xl font-bold text-gray-900 relative z-10">
                  Comment ça marche ?
                </h2>
                <div className="absolute -bottom-3 left-0 right-0 h-3 bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 rounded-full opacity-70 transform -rotate-1"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {[
                  {
                    icon: <Calendar className="h-7 w-7 text-white" />,
                    title: "1. Réservez",
                    description: "Choisissez une date et une heure qui vous conviennent",
                    delay: 400,
                    gradient: "from-blue-500 to-indigo-600",
                    shadowColor: "rgba(59, 130, 246, 0.5)"
                  },
                  {
                    icon: <MessageSquare className="h-7 w-7 text-white" />,
                    title: "2. Discutons",
                    description: "Échangeons sur vos besoins et objectifs",
                    delay: 500,
                    gradient: "from-purple-500 to-pink-600",
                    shadowColor: "rgba(168, 85, 247, 0.5)"
                  },
                  {
                    icon: <Send className="h-7 w-7 text-white" />,
                    title: "3. Plan d'action",
                    description: "Recevez une proposition adaptée à votre projet",
                    delay: 600,
                    gradient: "from-indigo-500 to-[#1D1046]",
                    shadowColor: "rgba(99, 102, 241, 0.5)"
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-8 rounded-xl shadow-lg relative overflow-hidden group"
                    whileHover={{ 
                      y: -8,
                      boxShadow: `0 25px 50px -12px ${step.shadowColor}`
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    data-aos="fade-up"
                    data-aos-delay={step.delay}
                  >
                    {/* Background decoration */}
                    <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-all duration-500"></div>
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${step.gradient} opacity-80 rounded-t-xl transition-all duration-300 group-hover:h-2 group-hover:opacity-100 group-hover:shadow-lg`} style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}></div>                    
                    <div className="relative z-10">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform group-hover:rotate-3 transition-all duration-300 bg-gradient-to-br ${step.gradient}`}>
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-[#1D1046] transition-colors">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                    
                    {/* Number indicator */}
                    <div className="absolute -right-4 -bottom-4 text-9xl font-bold text-gray-50 group-hover:text-gray-100 transition-colors z-0">
                      {index + 1}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="mt-12 inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-aos="fade-up"
                data-aos-delay="700"
              >
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}