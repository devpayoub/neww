"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, Mail, Phone, Building, MessageSquare, Send, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"
import dynamic from "next/dynamic"
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Map = dynamic(
  () => import("../../components/ContactMap"),
  { ssr: false }
)

import TiktokIcon from "@/components/icon/Ticktok";

export default function ContactPage() {

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
    subject: "",
    message: "",
  })

  const formFieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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

  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1D1046] to-[#3a1d8a] py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-blue-500/10 -top-20 -left-20"
            animate={{
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>
          <motion.div
            className="absolute w-64 h-64 rounded-full bg-purple-500/10 bottom-10 right-10"
            animate={{
              x: [0, -20, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1
            }}
          ></motion.div>
          <motion.div
            className="absolute w-40 h-40 rounded-full bg-indigo-500/10 top-40 right-20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Contactez{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                Nous
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Nous sommes à votre écoute pour répondre à toutes vos questions et vous accompagner dans vos projets.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section with Map */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Contact Form */}
              <div
                data-aos="fade-right"
                data-aos-delay="200"
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="p-8 md:p-12">
                  <h2
                    data-aos="fade-down"
                    data-aos-delay="300"
                    className="text-2xl font-bold text-gray-900 mb-6"
                  >
                    Envoyez-nous un message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div
                      data-aos="fade-up"
                      data-aos-delay="400"
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="text"
                          required
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent transition-all duration-300"
                          placeholder="Votre nom"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                    </div>

                    <div
                      data-aos="fade-up"
                      data-aos-delay="500"
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="email"
                          required
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent transition-all duration-300"
                          placeholder="votre@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div
                      data-aos="fade-up"
                      data-aos-delay="600"
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="tel"
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent transition-all duration-300"
                          placeholder="Votre numéro"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div
                      data-aos="fade-up"
                      data-aos-delay="700"
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="text"
                          required
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent transition-all duration-300"
                          placeholder="Sujet de votre message"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        />
                      </div>
                    </div>

                    <div
                      data-aos="fade-up"
                      data-aos-delay="800"
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                        <textarea
                          required
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent transition-all duration-300"
                          rows={4}
                          placeholder="Votre message..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        ></textarea>
                      </div>
                    </div>

                    <div
                      className="flex justify-center mt-8"
                      data-aos="zoom-in"
                      data-aos-delay="900"
                    >
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#1D1046] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#2d1a69] transition-all shadow-lg flex items-center"
                      >
                        Envoyer le message
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                        >
                          <Send className="ml-2 h-5 w-5" />
                        </motion.div>
                      </motion.button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Contact Info */}
              <div
                data-aos="fade-left"
                data-aos-delay="200"
                className="bg-white rounded-2xl shadow-xl overflow-hidden p-8 pb-4">

                <h2
                  data-aos="fade-down"
                  data-aos-delay="300"
                  className="text-2xl font-bold text-gray-900 mb-6"
                >
                  Nos coordonnées
                </h2>
                <div className="space-y-6">
                  <div
                    className="flex items-start"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(29, 16, 70, 0.2)" }}
                      className="bg-[#1D1046]/10 p-3 rounded-full mr-4"
                    >
                      <Mail className="h-6 w-6 text-[#1D1046]" />
                    </motion.div>
                    <div>
                      <h3 className="font-medium text-gray-900">Email</h3>
                      <motion.a
                        href="mailto:info.thinktrend@gmail.com"
                        className="text-[#1D1046] hover:underline"
                        whileHover={{ x: 3 }}
                      >
                        info.thinktrend@gmail.com
                      </motion.a>
                    </div>
                  </div>

                  <div
                    className="flex items-start"
                    data-aos="fade-up"
                    data-aos-delay="500"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(29, 16, 70, 0.2)" }}
                      className="bg-[#1D1046]/10 p-3 rounded-full mr-4"
                    >
                      <Phone className="h-6 w-6 text-[#1D1046]" />
                    </motion.div>
                    <div>
                      <h3 className="font-medium text-gray-900">Téléphone</h3>
                      <motion.a
                        href="tel:+21628804890"
                        className="text-[#1D1046] hover:underline"
                        whileHover={{ x: 3 }}
                      >
                        +216 28 804 890
                      </motion.a>
                    </div>
                  </div>

                  <div
                    className="flex items-start"
                    data-aos="fade-up"
                    data-aos-delay="600"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(29, 16, 70, 0.2)" }}
                      className="bg-[#1D1046]/10 p-3 rounded-full mr-4"
                    >
                      <MapPin className="h-6 w-6 text-[#1D1046]" />
                    </motion.div>
                    <div>
                      <h3 className="font-medium text-gray-900">Adresse</h3>
                      <p className="text-gray-600">Tunis, Nabeul</p>
                    </div>
                  </div>

                  {/* Social Media Icons */}
                  <div
                    className="pt-4 mt-4 border-t border-gray-200"
                    data-aos="fade-up"
                    data-aos-delay="700"
                  >
                    <h3 className="font-medium text-gray-900 mb-4">Suivez-nous</h3>
                    <div className="flex space-x-4">
                      <motion.a
                        href="https://www.facebook.com/people/Think-Trend/61559223579967/"
                        className="bg-[#1D1046]/10 p-3 rounded-full transition-colors"
                        aria-label="Facebook"
                        whileHover={{ scale: 1.2, backgroundColor: "rgba(29, 16, 70, 0.2)" }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Facebook className="h-6 w-6 text-[#1D1046]" />
                      </motion.a>
                      <motion.a
                        href="https://www.instagram.com/think_trends/"
                        className="bg-[#1D1046]/10 p-3 rounded-full transition-colors"
                        aria-label="Instagram"
                        whileHover={{ scale: 1.2, backgroundColor: "rgba(29, 16, 70, 0.2)" }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Instagram className="h-6 w-6 text-[#1D1046]" />
                      </motion.a>
                      <motion.a
                        href="https://tn.linkedin.com/company/think-trend-solutions"
                        className="bg-[#1D1046]/10 p-3 rounded-full transition-colors"
                        aria-label="LinkedIn"
                        whileHover={{ scale: 1.2, backgroundColor: "rgba(29, 16, 70, 0.2)" }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Linkedin className="h-6 w-6 text-[#1D1046]" />
                      </motion.a>


                      <motion.a
                        href="https://www.tiktok.com/@think_trend"
                        className="bg-[#1D1046]/10 p-3 rounded-full transition-colors"
                        aria-label="TikTok"
                        whileHover={{ scale: 1.2, backgroundColor: "rgba(29, 16, 70, 0.2)" }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <TiktokIcon className="h-6 w-6 text-[#1D1046]" />
                      </motion.a>


                    </div>
                  </div>

                  {/* Business Hours - New section to fill empty space */}
                  <div
                    className="pt-4 mt-4 border-t border-gray-200"
                    data-aos="fade-up"
                    data-aos-delay="800"
                  >
                    <h3 className="font-medium text-gray-900 mb-4">Heures d'ouverture</h3>
                    <div className="space-y-2">
                      <p className="text-gray-600">Lundi - Vendredi: 9h00 - 18h00</p>
                      <p className="text-gray-600">Samedi: 9h00 - 13h00</p>
                      <p className="text-gray-600">Dimanche: Fermé</p>
                    </div>
                  </div>
                </div>
                <div
                  className="pt-5 mt-4 border-t border-gray-200 flex justify-center"
                  data-aos="zoom-in"
                  data-aos-delay="900"
                >
                  <Image
                    src="/images/logo.png"
                    alt="ThinkTrend Logo"
                    width={200}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Map - Now placed below both form and contact info */}
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="bg-white rounded-2xl shadow-xl overflow-hidden h-[450px] w-full"
            >
              <Map />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}