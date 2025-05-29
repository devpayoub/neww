import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Share2, Facebook, Twitter, Linkedin, ArrowLeft } from "lucide-react"

// Cette fonction serait remplacée par une vraie récupération de données
function getArticleData(slug: string) {
  return {
    title: "10 stratégies SEO incontournables pour améliorer votre classement en 2025",
    excerpt:
      "Découvrez les dernières stratégies SEO qui vous permettront de propulser votre site web dans les premiers résultats de recherche et d'augmenter votre trafic organique.",
    content: `
      <p>Le référencement naturel (SEO) est en constante évolution, et il est essentiel de rester à jour avec les dernières tendances et stratégies pour maintenir et améliorer le classement de votre site web dans les moteurs de recherche.</p>
      
      <h2>1. Optimisez votre contenu pour la recherche vocale</h2>
      <p>Avec l'augmentation de l'utilisation des assistants vocaux comme Siri, Alexa et Google Assistant, l'optimisation pour la recherche vocale est devenue incontournable. Les requêtes vocales sont généralement plus longues et plus conversationnelles que les requêtes textuelles. Concentrez-vous sur les questions naturelles et les phrases complètes que votre public cible pourrait poser.</p>
      
      <h2>2. Créez un contenu de qualité supérieure</h2>
      <p>Le contenu reste roi en matière de SEO. Les moteurs de recherche privilégient le contenu approfondi, informatif et utile. Visez à créer du contenu qui répond aux questions de votre audience de manière complète et qui apporte une réelle valeur ajoutée.</p>
      
      <h2>3. Optimisez pour les featured snippets</h2>
      <p>Les featured snippets (ou extraits optimisés) apparaissent en haut des résultats de recherche et peuvent considérablement augmenter votre visibilité. Structurez votre contenu pour répondre directement aux questions courantes de votre secteur, en utilisant des listes à puces, des tableaux et des définitions claires.</p>
      
      <h2>4. Améliorez l'expérience utilisateur</h2>
      <p>Google accorde une importance croissante aux signaux d'expérience utilisateur, notamment la vitesse de chargement des pages, la convivialité mobile et la facilité de navigation. Assurez-vous que votre site est rapide, facile à utiliser et accessible sur tous les appareils.</p>
      
      <h2>5. Utilisez l'IA pour personnaliser votre stratégie SEO</h2>
      <p>L'intelligence artificielle peut vous aider à analyser les données de votre site, à identifier les opportunités de mots-clés et à personnaliser votre stratégie de contenu en fonction du comportement des utilisateurs.</p>
    `,
    image: "/placeholder.svg?height=600&width=1200",
    category: "SEO",
    author: {
      name: "Marie Dupont",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Experte en SEO et marketing digital avec plus de 10 ans d'expérience dans l'optimisation de sites web pour les moteurs de recherche.",
    },
    date: "15 avril 2025",
    readTime: "8 min",
    tags: ["SEO", "Marketing Digital", "Référencement", "Google", "Stratégie Web"],
    relatedPosts: [
      {
        id: 1,
        title: "Comment optimiser votre site pour la recherche vocale",
        slug: "optimiser-site-recherche-vocale",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 2,
        title: "Les meilleures pratiques SEO pour 2025",
        slug: "meilleures-pratiques-seo-2025",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 3,
        title: "Comment analyser efficacement vos données SEO",
        slug: "analyser-donnees-seo",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  }
}

// Génération des métadonnées dynamiques pour chaque article
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticleData(params.slug)

  return {
    title: `${article.title} | Blog Think Trend`,
    description: article.excerpt,
    keywords: article.tags.join(", "),
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://thinktrend.com/blog/${params.slug}`,
      type: "article",
      publishedTime: article.date,
      authors: [article.author.name],
      tags: article.tags,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const article = getArticleData(params.slug)

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1D1046] to-[#3a1d8a] py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-[#1D1046]/50 text-white px-4 py-1 rounded-full text-sm font-medium mb-6">
              {article.category}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center justify-center mb-8">
              <Image
                src={article.author.avatar || "/placeholder.svg"}
                alt={article.author.name}
                width={50}
                height={50}
                className="rounded-full mr-4"
              />
              <div className="text-left">
                <div className="text-white font-medium">{article.author.name}</div>
                <div className="text-blue-200 text-sm">Expert SEO</div>
              </div>
            </div>

            <div className="flex items-center justify-center text-sm text-blue-100">
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
            <div className="lg:w-2/3">
              <article className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Featured Image */}
                <div className="relative h-80 md:h-96">
                  <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
                </div>

                {/* Article Content */}
                <div className="p-6 md:p-10">
                  {/* Article Text */}
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  ></div>

                  {/* Tags */}
                  <div className="mt-10 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Share */}
                  <div className="mt-10 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Partager cet article</h3>
                    <div className="flex gap-3">
                      <button
                        className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                        aria-label="Partager sur Facebook"
                      >
                        <Facebook className="h-5 w-5" />
                      </button>
                      <button
                        className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition-colors"
                        aria-label="Partager sur Twitter"
                      >
                        <Twitter className="h-5 w-5" />
                      </button>
                      <button
                        className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors"
                        aria-label="Partager sur LinkedIn"
                      >
                        <Linkedin className="h-5 w-5" />
                      </button>
                      <button
                        className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 transition-colors"
                        aria-label="Partager"
                      >
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Author Bio */}
                  <div className="mt-10 pt-6 border-t border-gray-200">
                    <div className="flex items-center">
                      <Image
                        src={article.author.avatar || "/placeholder.svg"}
                        alt={article.author.name}
                        width={80}
                        height={80}
                        className="rounded-full mr-6"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">À propos de l'auteur</h3>
                        <p className="text-lg font-medium text-[#1D1046] mb-2">{article.author.name}</p>
                        <p className="text-gray-600">{article.author.bio}</p>
                      </div>
                    </div>
                  </div>

                  {/* Back to Blog */}
                  <div className="mt-10 pt-6 border-t border-gray-200">
                    <Link
                      href="/blog"
                      className="inline-flex items-center text-[#1D1046] font-medium hover:text-purple-700 transition-colors"
                    >
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Retour au blog
                    </Link>
                  </div>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Author Card */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">À propos de l'auteur</h3>
                <div className="flex items-center mb-4">
                  <Image
                    src={article.author.avatar || "/placeholder.svg"}
                    alt={article.author.name}
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <p className="font-medium text-[#1D1046]">{article.author.name}</p>
                    <p className="text-sm text-gray-600">Expert SEO</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{article.author.bio}</p>
              </div>

              {/* Related Posts */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Articles similaires</h3>
                <div className="space-y-4">
                  {article.relatedPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
                      <div className="flex items-center">
                        <div className="w-20 h-20 relative rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover"
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
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Catégories</h3>
                <ul className="space-y-2">
                  {["SEO", "Marketing Digital", "Développement Web", "Design", "Réseaux Sociaux"].map((category) => (
                    <li key={category}>
                      <Link
                        href={`/blog/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                        className="flex items-center justify-between text-gray-700 hover:text-[#1D1046] transition-colors"
                      >
                        <span>{category}</span>
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">12</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-[#1D1046] to-[#3a1d8a] rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-white mb-4">Newsletter</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Abonnez-vous pour recevoir nos derniers articles et conseils directement dans votre boîte mail.
                </p>
                <form>
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full px-4 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-white text-[#1D1046] px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
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
