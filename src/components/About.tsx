"use client"

import { motion } from "framer-motion"
import { ArrowRight, Lightbulb, Award, Heart, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function About() {
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

  // Values data
  const values = [
    {
      id: "01",
      title: "Innovation",
      description:
        "Nous adoptons les dernières tendances technologiques pour proposer des solutions modernes et adaptées à vos besoins.",
      icon: <Lightbulb className="w-8 h-8" />,
      color: "from-blue-500 to-purple-600",
    },
    {
      id: "02",
      title: "Excellence",
      description:
        "Nous garantissons des prestations de haute qualité, basées sur des standards élevés en conception et stratégie marketing.",
      icon: <Award className="w-8 h-8" />,
      color: "from-purple-600 to-pink-500",
    },
    {
      id: "03",
      title: "Engagement",
      description: "Notre équipe passionnée vous accompagne à chaque étape pour atteindre vos objectifs digitaux.",
      icon: <Heart className="w-8 h-8" />,
      color: "from-pink-500 to-red-500",
    },
    {
      id: "04",
      title: "Transparence",
      description: "Une communication honnête et claire, de la planification à la réalisation.",
      icon: <MessageSquare className="w-8 h-8" />,
      color: "from-red-500 to-orange-500",
    },
  ]

  return (
    <main className="min-h-screen bg-white">

      {/* Values Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-7xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-sm font-semibold text-[#1D1046] uppercase tracking-wider mb-3">Nos valeurs</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ce qui nous définit</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Nos valeurs fondamentales guident chacune de nos actions et nous permettent de délivrer des résultats
                exceptionnels.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className={`h-2 bg-gradient-to-r ${value.color}`}></div>
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-r ${value.color} flex items-center justify-center text-white`}
                      >
                        {value.icon}
                      </div>
                      <div className="ml-4 text-2xl font-bold text-gray-900">{value.id}</div>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
                    <p className="text-gray-600 mb-6">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="mt-16 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center bg-[#1D1046] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#2d1a69] transition-colors shadow-md"
              >
                Discutons de votre projet
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#1D1046] to-[#3a1d8a] relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 rounded-full bg-blue-500/10 -bottom-20 -right-20 animate-pulse"></div>
          <div
            className="absolute w-64 h-64 rounded-full bg-purple-500/10 top-10 left-10 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à transformer votre présence digitale?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir comment Think Trend peut vous
              aider à atteindre vos objectifs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-white text-[#1D1046] px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transform hover:-translate-y-1 transition-all shadow-lg"
              >
                Nous contacter
              </Link>
              <Link
                href="/services"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transform hover:-translate-y-1 transition-all"
              >
                Découvrir nos services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}