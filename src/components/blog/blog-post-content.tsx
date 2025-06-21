"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Share2, Facebook, Twitter, Linkedin, ArrowLeft } from "lucide-react"
import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import { getArticleData } from "@/lib/blog-data"

export default function BlogPostContent({ slug }: { slug: string }) {
  const article = getArticleData(slug)

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 100,
    })
  }, [])

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1D1046] to-[#3a1d8a] py-20 md:py-28 overflow-hidden">
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/20"
              style={{
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
            <div className="inline-block bg-[#1D1046]/50 text-white px-4 py-1 rounded-full text-sm font-medium mb-6 hover:bg-[#1D1046]/70 transition-colors">
              {article.category}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 animate-gradient">
                {article.title}
              </span>
            </h1>

            <div className="flex items-center justify-center mb-8" data-aos="fade-up" data-aos-delay="100">
              <Image
                src={article.author.avatar || "/placeholder.svg"}
                alt={article.author.name}
                width={50}
                height={50}
                className="rounded-full mr-4 border-2 border-purple-300"
              />
              <div className="text-left">
                <div className="text-white font-medium">{article.author.name}</div>
                <div className="text-blue-200 text-sm">Expert SEO</div>
              </div>
            </div>

            <div className="flex items-center justify-center text-sm text-blue-100" data-aos="fade-up" data-aos-delay="150">
              <div className="flex items-center mr-6">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{article.readTime} de lecture</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-16 w-full">
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              fill="#ffffff"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              fill="#ffffff"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="lg:w-2/3" data-aos="fade-up">
              <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Featured Image */}
                <div className="relative h-80 md:h-96 overflow-hidden">
                  <Image 
                    src={article.image || "/placeholder.svg"} 
                    alt={article.title} 
                    fill 
                    className="object-cover transition-transform duration-700 hover:scale-105" 
                  />
                </div>

                {/* Article Content */}
                <div className="p-6 md:p-10">
                  {/* Article Text */}
                  <div
                    className="prose prose-lg max-w-none"
                    data-aos="fade-up"
                    data-aos-delay="100"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  ></div>

                  {/* Tags */}
                  <div className="mt-10 pt-6 border-t border-gray-200" data-aos="fade-up" data-aos-delay="150">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {article.tags?.map((tag) => (
                        <Link
                          key={tag}
                          href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-[#1D1046] hover:text-white transition-all duration-300 transform hover:scale-105"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Share */}
                  <div className="mt-10 pt-6 border-t border-gray-200" data-aos="fade-up" data-aos-delay="200">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Partager cet article</h3>
                    <div className="flex gap-3">
                      <button
                        className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-all duration-300 hover:scale-110 hover:shadow-md"
                        aria-label="Partager sur Facebook"
                      >
                        <Facebook className="h-5 w-5" />
                      </button>
                      <button
                        className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:scale-110 hover:shadow-md"
                        aria-label="Partager sur Twitter"
                      >
                        <Twitter className="h-5 w-5" />
                      </button>
                      <button
                        className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-all duration-300 hover:scale-110 hover:shadow-md"
                        aria-label="Partager sur LinkedIn"
                      >
                        <Linkedin className="h-5 w-5" />
                      </button>
                      <button
                        className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 transition-all duration-300 hover:scale-110 hover:shadow-md"
                        aria-label="Partager"
                      >
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Author Bio */}
                  <div className="mt-10 pt-6 border-t border-gray-200" data-aos="fade-up" data-aos-delay="250">
                    <div className="flex items-center">
                      <Image
                        src={article.author.avatar || "/placeholder.svg"}
                        alt={article.author.name}
                        width={80}
                        height={80}
                        className="rounded-full mr-6 border-2 border-[#1D1046]/20 transition-transform duration-300 hover:scale-105"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">À propos de l'auteur</h3>
                        <p className="text-lg font-medium text-[#1D1046] mb-2">{article.author.name}</p>
                        <p className="text-gray-600">{article.author.bio}</p>
                      </div>
                    </div>
                  </div>

                  {/* Back to Blog */}
                  <div className="mt-10 pt-6 border-t border-gray-200" data-aos="fade-up" data-aos-delay="300">
                    <Link
                      href="/blog"
                      className="inline-flex items-center text-[#1D1046] font-medium hover:text-purple-700 transition-all duration-300 hover:translate-x-[-5px] group"
                    >
                      <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:animate-bounce-subtle" />
                      Retour au blog
                    </Link>
                  </div>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Author Card */}
              <div 
                className="bg-white rounded-xl shadow-md p-6 mb-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                data-aos="fade-left"
                data-aos-delay="100"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">À propos de l'auteur</h3>
                <div className="flex items-center mb-4">
                  <Image
                    src={article.author.avatar || "/placeholder.svg"}
                    alt={article.author.name}
                    width={60}
                    height={60}
                    className="rounded-full mr-4 border-2 border-[#1D1046]/20"
                  />
                  <div>
                    <p className="font-medium text-[#1D1046]">{article.author.name}</p>
                    <p className="text-sm text-gray-600">Expert SEO</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{article.author.bio}</p>
              </div>

              {/* Related Posts */}
              <div 
                className="bg-white rounded-xl shadow-md p-6 mb-8 hover:shadow-lg transition-all duration-300"
                data-aos="fade-left"
                data-aos-delay="150"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Articles similaires</h3>
                <div className="space-y-4">
                  {article.relatedPosts.map((post, index) => (
                    <Link 
                      key={post.id} 
                      href={`/blog/${post.slug}`} 
                      className="block group"
                      data-aos="fade-left"
                      data-aos-delay={200 + index * 50}
                    >
                      <div className="flex items-center">
                        <div className="w-20 h-20 relative rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-[#1D1046] transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div 
                className="bg-white rounded-xl shadow-md p-6 mb-8 hover:shadow-lg transition-all duration-300"
                data-aos="fade-left"
                data-aos-delay="250"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Catégories</h3>
                <ul className="space-y-2">
                  {["SEO", "Marketing Digital", "Développement Web", "Design", "Réseaux Sociaux"].map((category, index) => (
                    <li key={category} data-aos="fade-left" data-aos-delay={300 + index * 30}>
                      <Link
                        href={`/blog/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                        className="flex items-center justify-between text-gray-700 hover:text-[#1D1046] transition-colors hover:translate-x-1 transform transition-transform duration-300"
                      >
                        <span>{category}</span>
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs group-hover:bg-[#1D1046]/10">12</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div 
                className="bg-gradient-to-br from-[#1D1046] to-[#3a1d8a] rounded-xl shadow-md p-6 relative overflow-hidden"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                {/* Animated particles for newsletter */}
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full bg-white/10"
                      style={{
                        width: `${Math.random() * 6 + 2}px`,
                        height: `${Math.random() * 6 + 2}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                        animationDelay: `${Math.random() * 5}s`,
                      }}
                    ></div>
                  ))}
                </div>
                
                <h3 className="text-lg font-bold text-white mb-4 relative z-10">Newsletter</h3>
                <p className="text-blue-100 text-sm mb-4 relative z-10">
                  Abonnez-vous pour recevoir nos derniers articles et conseils directement dans votre boîte mail.
                </p>
                <form className="relative z-10">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full px-4 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-300 hover:shadow-inner"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-white text-[#1D1046] px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    S'abonner
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
