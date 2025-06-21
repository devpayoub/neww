"use client"

import { motion } from "framer-motion"
import { Send } from "lucide-react"

export default function BlogNewsletter() {
  return (
    <section className="py-16 md:py-24 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#1D1046] to-[#3a1d8a] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-64 h-64 rounded-full bg-blue-500/10 -top-20 -left-20 animate-pulse"></div>
            <div
              className="absolute w-48 h-48 rounded-full bg-purple-500/10 bottom-10 right-10 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Restez informé</h2>
            <p className="text-blue-100 mb-8">
              Abonnez-vous à notre newsletter pour recevoir nos derniers articles, conseils et actualités directement
              dans votre boîte mail.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-grow px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                required
                aria-label="Votre adresse email"
              />
              <button
                type="submit"
                className="bg-white text-[#1D1046] px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-md flex items-center justify-center"
              >
                S'abonner
                <Send className="ml-2 h-4 w-4" />
              </button>
            </form>

            <p className="text-xs text-blue-200 mt-4">
              En vous inscrivant, vous acceptez notre politique de confidentialité. Vous pouvez vous désabonner à tout
              moment.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
