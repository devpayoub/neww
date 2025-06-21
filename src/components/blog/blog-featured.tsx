"use client"

import { useEffect } from "react"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import AOS from "aos"
import "aos/dist/aos.css"

export default function BlogFeatured() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 100,
    })
  }, [])

  // Article vedette
  const featuredArticle = {
    id: 1,
    title: "10 stratégies SEO incontournables pour améliorer votre classement en 2025",
    excerpt:
      "Découvrez les dernières stratégies SEO qui vous permettront de propulser votre site web dans les premiers résultats de recherche et d'augmenter votre trafic organique.",
    image: "/placeholder.svg?height=600&width=1200",
    category: "SEO",
    author: {
      name: "Marie Dupont",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    date: "15 avril 2025",
    readTime: "8 min",
    slug: "strategies-seo-incontournables-2025",
  }

  return (
    <section className="py-16 md:py-24 px-6">
      <div className="container mx-auto">
        <div
          data-aos="fade-up"
          className="mb-12 text-center"
        >
          <h2 className="text-sm font-semibold text-[#1D1046] uppercase tracking-wider mb-3">À la une</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Article vedette</h3>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
        >
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1D1046]/50 to-transparent z-10"></div>
              <Image
                src={featuredArticle.image || "/placeholder.svg"}
                alt={featuredArticle.title}
                width={600}
                height={400}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-[#1D1046] text-white px-4 py-1 rounded-full text-sm font-medium z-20">
                {featuredArticle.category}
              </div>
            </div>

            <div className="lg:w-1/2 p-6 md:p-10 flex flex-col justify-center">
              <div className="flex items-center mb-4" data-aos="fade-up" data-aos-delay="150">
                <Image
                  src={featuredArticle.author.avatar || "/placeholder.svg"}
                  alt={featuredArticle.author.name}
                  width={40}
                  height={40}
                  className="rounded-full mr-3"
                />
                <span className="text-gray-600">{featuredArticle.author.name}</span>
              </div>

              <h2 
                className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 transition-colors duration-300 hover:text-[#1D1046]"
                data-aos="fade-up" 
                data-aos-delay="200"
              >
                {featuredArticle.title}
              </h2>
              
              <p 
                className="text-gray-600 mb-6"
                data-aos="fade-up" 
                data-aos-delay="250"
              >
                {featuredArticle.excerpt}
              </p>

              <div 
                className="flex items-center text-sm text-gray-500 mb-8"
                data-aos="fade-up" 
                data-aos-delay="300"
              >
                <div className="flex items-center mr-6">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{featuredArticle.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{featuredArticle.readTime} de lecture</span>
                </div>
              </div>

              <Link
                href={`/blog/${featuredArticle.slug}`}
                className="inline-flex items-center bg-[#1D1046] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#2d1a69] transition-all duration-300 hover:scale-105 hover:shadow-lg self-start"
                data-aos="fade-up" 
                data-aos-delay="350"
              >
                Lire l'article
                <ArrowRight className="ml-2 h-5 w-5 animate-bounce-subtle" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
