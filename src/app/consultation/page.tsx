"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, User, Mail, Phone, Building, MessageSquare, Send } from "lucide-react"

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    date: "",
    time: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
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
              Consultation{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                Gratuite
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Réservez une session de consultation gratuite avec nos experts pour discuter de votre projet digital.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="text"
                            required
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent"
                            placeholder="Votre nom"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="email"
                            required
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent"
                            placeholder="votre@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="tel"
                            required
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent"
                            placeholder="Votre numéro"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Entreprise</label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="text"
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent"
                            placeholder="Nom de votre entreprise"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Schedule and Message */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date souhaitée</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="date"
                            required
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Heure préférée</label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="time"
                            required
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                          <textarea
                            required
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent"
                            rows={4}
                            placeholder="Décrivez brièvement votre projet..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mt-8">
                    <button
                      type="submit"
                      className="bg-[#1D1046] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#2d1a69] transform hover:-translate-y-1 transition-all shadow-lg flex items-center"
                    >
                      Réserver ma consultation
                      <Send className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 text-center"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Comment ça marche ?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="w-12 h-12 bg-[#1D1046]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-6 w-6 text-[#1D1046]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">1. Réservez</h3>
                  <p className="text-gray-600">Choisissez une date et une heure qui vous conviennent</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="w-12 h-12 bg-[#1D1046]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-6 w-6 text-[#1D1046]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">2. Discutons</h3>
                  <p className="text-gray-600">Échangeons sur vos besoins et objectifs</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="w-12 h-12 bg-[#1D1046]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-6 w-6 text-[#1D1046]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">3. Plan d'action</h3>
                  <p className="text-gray-600">Recevez une proposition adaptée à votre projet</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}