"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Calendar, Building, Code, Palette, Megaphone } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

// Function to get project data by ID
function getProjectData(id: string) {
  const projects = [
    {
      id: 1,
      title: "E-commerce Bio Golds",
      description: "Développement d'une plateforme e-commerce complète avec système de gestion des commandes et intégration de paiement.",
      category: "development",
      image: "/images/Bio_gold's-Logo-Officiel-fond-blanc.jpg",
      link: "https://biogolds.com",
      technologies: ["Next.js", "Tailwind CSS", "Stripe", "Supabase"],
      client: "Bio Golds",
      date: "2024",
      fullDescription: `
        <p>Bio Golds souhaitait développer une plateforme e-commerce moderne et performante pour la vente de leurs produits biologiques. Notre équipe a conçu une solution complète qui répond parfaitement à leurs besoins.</p>
        
        <h2>Objectifs du projet</h2>
        <p>L'objectif principal était de créer une expérience d'achat fluide et intuitive pour les clients, tout en fournissant des outils de gestion efficaces pour l'équipe de Bio Golds.</p>
        
        <h2>Solutions techniques</h2>
        <p>Nous avons développé la plateforme avec Next.js pour garantir des performances optimales et une excellente expérience utilisateur. L'intégration de Stripe permet un processus de paiement sécurisé, tandis que Supabase offre une base de données robuste et évolutive.</p>
        
        <h2>Résultats</h2>
        <p>La nouvelle plateforme e-commerce a permis à Bio Golds d'augmenter significativement ses ventes en ligne et d'améliorer la satisfaction client grâce à une interface utilisateur intuitive et des fonctionnalités avancées.</p>
      `,
      challenges: "L'un des principaux défis était d'intégrer un système de gestion des stocks en temps réel qui se synchronise avec leur système existant.",
      results: "Augmentation de 45% des ventes en ligne dans les trois mois suivant le lancement de la nouvelle plateforme.",
      testimonial: {
        content: "L'équipe de Think Trend a transformé notre vision en une plateforme e-commerce exceptionnelle qui dépasse toutes nos attentes. Leur expertise technique et leur approche collaborative ont fait toute la différence.",
        author: "Sarah Martin",
        position: "Directrice Marketing, Bio Golds"
      },
      relatedProjects: [2, 3]
    },
    {
      id: 2,
      title: "Campagne Marketing Ilyos",
      description: "Stratégie de marketing digital et gestion des réseaux sociaux pour augmenter la visibilité de la marque.",
      category: "marketing",
      image: "/images/ilyos.jpg",
      link: "https://ilyos.com",
      technologies: ["Social Media", "SEO", "Content Marketing"],
      client: "Ilyos",
      date: "2024",
      fullDescription: `
        <p>Ilyos, une marque émergente dans le secteur de la mode, cherchait à renforcer sa présence en ligne et à développer sa notoriété. Notre équipe a élaboré une stratégie marketing complète pour atteindre ces objectifs.</p>
        
        <h2>Objectifs du projet</h2>
        <p>L'objectif principal était d'accroître la visibilité de la marque sur les réseaux sociaux et d'augmenter le trafic vers leur site web, tout en établissant Ilyos comme une référence dans son secteur.</p>
        
        <h2>Stratégie déployée</h2>
        <p>Nous avons mis en place une stratégie de contenu cohérente sur l'ensemble des plateformes sociales, optimisé le référencement du site web, et lancé des campagnes publicitaires ciblées pour atteindre l'audience idéale.</p>
        
        <h2>Résultats</h2>
        <p>La stratégie a permis d'augmenter significativement l'engagement sur les réseaux sociaux et le trafic organique vers le site web, renforçant ainsi la position d'Ilyos sur le marché.</p>
      `,
      challenges: "Le principal défi était de se démarquer dans un secteur très concurrentiel avec un budget marketing limité.",
      results: "Augmentation de 120% de l'engagement sur les réseaux sociaux et 65% d'augmentation du trafic organique.",
      testimonial: {
        content: "La stratégie marketing développée par Think Trend a transformé notre présence en ligne. Leur approche créative et data-driven a généré des résultats impressionnants.",
        author: "Thomas Leroy",
        position: "Fondateur, Ilyos"
      },
      relatedProjects: [1, 3]
    },
    {
      id: 3,
      title: "Identité visuelle Ezemnia",
      description: "Création d'une identité visuelle moderne et responsive pour une startup technologique.",
      category: "design",
      image: "/images/logo_ezemnia.png",
      link: "https://ezemnia.com",
      technologies: ["Branding", "UI/UX Design", "Motion Design"],
      client: "Ezemnia",
      date: "2024",
      fullDescription: `
        <p>Ezemnia, une startup innovante dans le domaine de la technologie, avait besoin d'une identité visuelle forte et cohérente pour se lancer sur le marché. Notre équipe de designers a relevé ce défi avec brio.</p>
        
        <h2>Objectifs du projet</h2>
        <p>L'objectif était de créer une identité de marque distinctive qui reflète l'innovation et la fiabilité d'Ezemnia, tout en étant suffisamment flexible pour s'adapter à différents supports.</p>
        
        <h2>Approche créative</h2>
        <p>Nous avons développé un système de design complet comprenant logo, palette de couleurs, typographie et éléments graphiques, en veillant à ce que chaque élément contribue à raconter l'histoire unique d'Ezemnia.</p>
        
        <h2>Résultats</h2>
        <p>La nouvelle identité visuelle a été unanimement saluée par les parties prenantes et a contribué à positionner Ezemnia comme un acteur innovant dans son secteur.</p>
      `,
      challenges: "Le défi était de créer une identité visuelle qui soit à la fois technologique et accessible, tout en se démarquant dans un secteur saturé.",
      results: "La nouvelle identité a contribué à une reconnaissance immédiate de la marque et a facilité l'acquisition de nouveaux clients.",
      testimonial: {
        content: "L'équipe de design de Think Trend a parfaitement capturé l'essence de notre entreprise. Notre nouvelle identité visuelle nous a permis de nous démarquer immédiatement sur le marché.",
        author: "Claire Dubois",
        position: "CEO, Ezemnia"
      },
      relatedProjects: [1, 2]
    }
  ];

  return projects.find(project => project.id === parseInt(id)) || null;
}

// Function to get related projects
function getRelatedProjects(relatedIds: number[]) {
  const allProjects = [
    {
      id: 1,
      title: "E-commerce Bio Golds",
      description: "Développement d'une plateforme e-commerce complète avec système de gestion des commandes et intégration de paiement.",
      category: "development",
      image: "/images/Bio_gold's-Logo-Officiel-fond-blanc.jpg",
    },
    {
      id: 2,
      title: "Campagne Marketing Ilyos",
      description: "Stratégie de marketing digital et gestion des réseaux sociaux pour augmenter la visibilité de la marque.",
      category: "marketing",
      image: "/images/ilyos.jpg",
    },
    {
      id: 3,
      title: "Identité visuelle Ezemnia",
      description: "Création d'une identité visuelle moderne et responsive pour une startup technologique.",
      category: "design",
      image: "/images/logo_ezemnia.png",
    }
  ];

  return allProjects.filter(project => relatedIds.includes(project.id));
}

// Function to get category icon
function getCategoryIcon(category: string) {
  switch (category) {
    case "development":
      return <Code className="w-5 h-5" />
    case "marketing":
      return <Megaphone className="w-5 h-5" />
    case "design":
      return <Palette className="w-5 h-5" />
    default:
      return null
  }
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null);
  const [relatedProjects, setRelatedProjects] = useState<any[]>([]);
  
  useEffect(() => {
    const projectData = getProjectData(params.id);
    setProject(projectData);
    
    if (projectData?.relatedProjects) {
      setRelatedProjects(getRelatedProjects(projectData.relatedProjects));
    }

    // Initialize AOS
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 100,
    });
  }, [params.id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-48 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-4 w-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1D1046] to-[#3a1d8a] py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 rounded-full bg-blue-500/10 -top-20 -left-20 animate-pulse"></div>
          <div
            className="absolute w-64 h-64 rounded-full bg-purple-500/10 bottom-10 right-10 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          
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
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
            <div className="inline-flex items-center bg-[#1D1046]/50 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-medium mb-6 gap-2 border border-white/10">
              {getCategoryIcon(project.category)}
              <span className="capitalize">{project.category}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {project.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm text-blue-100">
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-1" />
                <span>{project.client}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{project.date}</span>
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

      {/* Project Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="lg:w-2/3" data-aos="fade-right">
              <article className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg">
                {/* Featured Image */}
                <div className="relative h-80 md:h-96 overflow-hidden">
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill 
                    className="object-cover transition-transform duration-700 hover:scale-105" 
                  />
                </div>

                {/* Project Content */}
                <div className="p-6 md:p-10">
                  {/* Project Text */}
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: project.fullDescription }}
                  ></div>

                  {/* Technologies */}
                  <div className="mt-10 pt-6 border-t border-gray-200" data-aos="fade-up" data-aos-delay="100">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech: string, index: number) => (
                        <span
                          key={tech}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm transition-all duration-300 hover:bg-[#1D1046]/10 hover:text-[#1D1046]"
                          style={{ transitionDelay: `${index * 50}ms` }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Challenges & Results */}
                  <div className="mt-10 pt-6 border-t border-gray-200" data-aos="fade-up" data-aos-delay="200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-gray-50 p-6 rounded-xl transition-all duration-300 hover:shadow-md">
                        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                          <span className="w-8 h-8 bg-[#1D1046] text-white rounded-full flex items-center justify-center mr-2 text-sm">1</span>
                          Défis
                        </h3>
                        <p className="text-gray-600">{project.challenges}</p>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-xl transition-all duration-300 hover:shadow-md">
                        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                          <span className="w-8 h-8 bg-[#1D1046] text-white rounded-full flex items-center justify-center mr-2 text-sm">2</span>
                          Résultats
                        </h3>
                        <p className="text-gray-600">{project.results}</p>
                      </div>
                    </div>
                  </div>

                  {/* Testimonial */}
                  {project.testimonial && (
                    <div className="mt-10 pt-6 border-t border-gray-200" data-aos="fade-up" data-aos-delay="300">
                      <div className="bg-gradient-to-br from-[#1D1046]/5 to-[#3a1d8a]/5 p-6 rounded-xl relative">
                        <div className="absolute top-4 left-4 text-[#1D1046]/20 text-6xl font-serif">"</div>
                        <p className="text-gray-700 italic mb-4 relative z-10">{project.testimonial.content}</p>
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-[#1D1046] rounded-full flex items-center justify-center text-white font-bold mr-3">
                            {project.testimonial.author.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-[#1D1046]">{project.testimonial.author}</p>
                            <p className="text-sm text-gray-600">{project.testimonial.position}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Visit Website */}
                  <div className="mt-10 pt-6 border-t border-gray-200" data-aos="fade-up" data-aos-delay="400">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-[#1D1046] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#2a1863] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
                    >
                      Visiter le site
                      <ExternalLink className="ml-2 h-5 w-5" />
                    </a>
                  </div>

                  {/* Back to Portfolio */}
                  <div className="mt-10 pt-6 border-t border-gray-200" data-aos="fade-up" data-aos-delay="500">
                    <Link
                      href="/portfolio"
                      className="inline-flex items-center text-[#1D1046] font-medium hover:text-purple-700 transition-all duration-300 group"
                    >
                      <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                      Retour au portfolio
                    </Link>
                  </div>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3" data-aos="fade-left">
              {/* Project Info */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8 transition-all duration-300 hover:shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Informations du projet</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                    <span className="text-gray-600">Client:</span>
                    <span className="font-medium">{project.client}</span>
                  </li>
                  <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{project.date}</span>
                  </li>
                  <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                    <span className="text-gray-600">Catégorie:</span>
                    <span className="font-medium capitalize flex items-center">
                      {getCategoryIcon(project.category)}
                      <span className="ml-1">{project.category}</span>
                    </span>
                  </li>
                </ul>
              </div>

              {/* Related Projects */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8 transition-all duration-300 hover:shadow-lg" data-aos="fade-up" data-aos-delay="100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Projets similaires</h3>
                <div className="space-y-4">
                  {relatedProjects.map((relatedProject, index) => (
                    <Link 
                      key={relatedProject.id} 
                      href={`/portfolio/${relatedProject.id}`} 
                      className="block group"
                      data-aos="fade-up"
                      data-aos-delay={150 + (index * 50)}
                    >
                      <div className="flex items-center p-2 rounded-lg transition-all duration-300 hover:bg-gray-50">
                        <div className="w-20 h-20 relative rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                          <Image
                            src={relatedProject.image}
                            alt={relatedProject.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-[#1D1046] transition-colors line-clamp-2">
                            {relatedProject.title}
                          </h4>
                          <p className="text-xs text-gray-500 capitalize flex items-center mt-1">
                            {getCategoryIcon(relatedProject.category)}
                            <span className="ml-1">{relatedProject.category}</span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div 
                className="bg-gradient-to-br from-[#1D1046] to-[#3a1d8a] rounded-xl shadow-md p-6 relative overflow-hidden"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                {/* Animated background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-10 -mb-10"></div>
                
                <h3 className="text-lg font-bold text-white mb-4 relative">Vous avez un projet similaire ?</h3>
                <p className="text-blue-100 text-sm mb-4 relative">
                  Discutons de votre projet et voyons comment nous pouvons vous aider à atteindre vos objectifs.
                </p>
                <Link
                  href="/consultation"
                  className="block w-full bg-white text-[#1D1046] px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-center relative"
                >
                  Consultation gratuite
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}