"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Facebook, Mail, ArrowUpRight, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Types pour les membres de l'équipe
type SocialLink = {
  platform: "github" | "linkedin" | "facebook" | "email"
  url: string
}

type TeamMember = {
  id: number
  name: string
  firstName: string
  lastName: string
  role: string
  specialty: string
  image: string
  bio: string
  socialLinks: SocialLink[]
  level?: number // Niveau hiérarchique: 1 pour le président, 2 pour les managers, etc.
  reportsTo?: number // ID du supérieur hiérarchique
}

// Composant principal
export default function Team() {
  // Données des membres de l'équipe avec ajout du président
  const teamMembers: TeamMember[] = [
    {
      id: 0,
      name: "Mehdi Chaouch",
      firstName: "Mehdi",
      lastName: "Chaouch",
      role: "Président Directeur Général",
      specialty: "Stratégie & Innovation",
      image: "/images/CEO_thinktrend.jpeg?height=400&width=400",
      bio: "Fondateur de Think Trend avec plus de 15 ans d'expérience dans le secteur digital. Visionnaire et stratège passionné par l'innovation.",
      socialLinks: [
        { platform: "linkedin", url: "https://linkedin.com/" },
        { platform: "email", url: "mailto:jm.durand@thinktrend.com" },
      ],
      level: 1,
    },
    {
      id: 1,
      name: "Sarah Dupont",
      firstName: "Sarah",
      lastName: "Dupont",
      role: "Directrice Marketing",
      specialty: "SEO & Content Strategy",
      image: "/images/team-2.png?height=400&width=400",
      bio: "Experte en stratégie de contenu et SEO avec plus de 8 ans d'expérience dans le marketing digital.",
      socialLinks: [
        { platform: "linkedin", url: "https://linkedin.com/" },
        { platform: "facebook", url: "https://facebook.com/" },
        { platform: "email", url: "mailto:sarah@thinktrend.com" },
      ],
      level: 2,
      reportsTo: 0
    },
    {
      id: 2,
      name: "Thomas Martin",
      firstName: "Thomas",
      lastName: "Martin",
      role: "Lead Developer",
      specialty: "Full-Stack Development",
      image: "/images/team-1.png?height=400&width=400",
      bio: "Développeur full-stack passionné par les technologies web modernes et l'architecture logicielle.",
      socialLinks: [
        { platform: "github", url: "https://github.com/" },
        { platform: "linkedin", url: "https://linkedin.com/" },
        { platform: "email", url: "mailto:thomas@thinktrend.com" },
      ],
      level: 2,
      reportsTo: 0
    },
    {
      id: 3,
      name: "Emma Leclerc",
      firstName: "Emma",
      lastName: "Leclerc",
      role: "UI/UX Designer",
      specialty: "User Experience & Interface Design",
      image: "/images/team-4.png?height=400&width=400",
      bio: "Designer créative spécialisée dans la création d'expériences utilisateur intuitives et esthétiques.",
      socialLinks: [
        { platform: "linkedin", url: "https://linkedin.com/" },
        { platform: "facebook", url: "https://facebook.com/" },
        { platform: "github", url: "https://github.com/" },
      ],
      level: 2,
      reportsTo: 0
    },
    {
      id: 4,
      name: "Lucas Bernard",
      firstName: "Lucas",
      lastName: "Bernard",
      role: "Social Media Manager",
      specialty: "Content Creation & Community Management",
      image: "/images/team-3.png?height=400&width=400",
      bio: "Expert en gestion de communauté et création de contenu engageant pour les réseaux sociaux.",
      socialLinks: [
        { platform: "linkedin", url: "https://linkedin.com/" },
        { platform: "facebook", url: "https://facebook.com/" },
        { platform: "email", url: "mailto:lucas@thinktrend.com" },
      ],
      level: 2,
      reportsTo: 0
    },
  ]

  const president = teamMembers.find(member => member.level === 1);
  const managers = teamMembers.filter(member => member.level === 2);

  // État pour le membre sélectionné (pour la vue mobile)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [expandedMember, setExpandedMember] = useState<number | null>(null)

  // Fonction pour obtenir l'icône du réseau social
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "github":
        return <Github className="h-4 w-4" />
      case "linkedin":
        return <Linkedin className="h-4 w-4" />
      case "facebook":
        return <Facebook className="h-4 w-4" />
      case "email":
        return <Mail className="h-4 w-4" />
      default:
        return null
    }
  }

  // Variants pour les animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-sm font-semibold text-[#1D1046] uppercase tracking-wider mb-2">Notre équipe</h2>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Des experts passionnés</h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Découvrez les talents qui font de Think Trend une agence unique. Notre équipe combine expertise technique,
            créativité et passion pour vous offrir des solutions digitales exceptionnelles.
          </p>
        </motion.div>

        {/* Vue mobile - Accordéon */}
        <div className="md:hidden mb-12">
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D1046]"
              onChange={(e) => {
                const selected = teamMembers.find((m) => m.id === Number.parseInt(e.target.value))
                setSelectedMember(selected || null)
              }}
              value={selectedMember?.id || ""}
            >
              <option value="" disabled>
                Sélectionnez un membre
              </option>
              {teamMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name} - {member.role}
                </option>
              ))}
            </select>
          </div>

          {selectedMember && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={selectedMember.image || "/placeholder.svg"}
                  alt={selectedMember.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h4 className="text-xl font-bold text-gray-900">
                  {selectedMember.firstName} <span className="text-[#1D1046]">{selectedMember.lastName}</span>
                </h4>
                <p className="text-[#1D1046] font-medium mb-2">{selectedMember.role}</p>
                <p className="text-gray-500 text-xs mb-2">Spécialité: {selectedMember.specialty}</p>
                <p className="text-gray-600 text-sm mb-4">{selectedMember.bio}</p>

                <div className="flex space-x-2">
                  {selectedMember.socialLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#1D1046] hover:text-white transition-colors"
                    >
                      {getSocialIcon(link.platform)}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Vue desktop - Organigramme */}
        <div className="hidden md:block">
          {/* Président */}
          {president && (
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden w-64 group hover:shadow-xl transition-all duration-300 relative"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1D1046]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  <Image
                    src={president.image || "/placeholder.svg"}
                    alt={president.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4 bg-gradient-to-r from-[#1D1046] to-purple-700 text-white">
                  <h4 className="text-lg font-bold">
                    {president.firstName} <span className="opacity-90">{president.lastName}</span>
                  </h4>
                  <p className="text-white/90 text-sm font-medium">{president.role}</p>
                  
                  <div className="flex space-x-2 mt-2">
                    {president.socialLinks.map((link, index) => (
                      <Link
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#1D1046] transition-colors"
                      >
                        {getSocialIcon(link.platform)}
                      </Link>
                    ))}
                  </div>
                </div>
                
                <div 
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => setExpandedMember(expandedMember === president.id ? null : president.id)}
                >
                  {expandedMember === president.id && (
                    <div className="absolute inset-0 bg-white/95 p-4 flex flex-col justify-between z-30">
                      <div>
                        <h4 className="text-lg font-bold text-[#1D1046]">{president.name}</h4>
                        <p className="text-[#1D1046] text-sm font-medium">{president.role}</p>
                        <p className="text-gray-500 text-xs mt-1">Spécialité: {president.specialty}</p>
                        <p className="text-gray-600 text-sm mt-2">{president.bio}</p>
                      </div>
                      <div className="flex justify-end">
                        <button className="text-sm text-[#1D1046] font-medium">Fermer</button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}

          {/* Lignes de connexion */}
          <div className="relative h-16 mx-auto w-full max-w-4xl">
            <div className="absolute left-1/2 top-0 w-px h-8 bg-gray-300"></div>
            <div className="absolute left-1/2 top-8 transform -translate-x-1/2 w-full max-w-4xl h-px bg-gray-300"></div>
            {managers.map((_, index) => {
              const position = 100 / (managers.length * 2);
              const left = position + (index * (100 - (position * 2))) / (managers.length - 1);
              
              return (
                <div 
                  key={index} 
                  className="absolute w-px h-8 bg-gray-300" 
                  style={{ left: `${left}%`, top: '8px' }}
                ></div>
              );
            })}
          </div>

          {/* Managers */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
          >
            {managers.map((member, index) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                className="bg-white rounded-lg shadow overflow-hidden group hover:shadow-lg transition-all duration-300 relative"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1D1046]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-base font-bold text-gray-900">
                        {member.firstName} <span className="text-[#1D1046]">{member.lastName}</span>
                      </h4>
                      <p className="text-[#1D1046] text-sm font-medium">{member.role}</p>
                      <p className="text-gray-500 text-xs">{member.specialty}</p>
                    </div>

                    <button 
                      onClick={() => setExpandedMember(expandedMember === member.id ? null : member.id)}
                      className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#1D1046] hover:text-white transition-colors"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex space-x-1 mt-2">
                    {member.socialLinks.map((link, index) => (
                      <Link
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#1D1046] hover:text-white transition-colors"
                      >
                        {getSocialIcon(link.platform)}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {expandedMember === member.id && (
                  <div className="absolute inset-0 bg-white/95 p-4 flex flex-col justify-between z-30">
                    <div>
                      <h4 className="text-lg font-bold text-[#1D1046]">{member.name}</h4>
                      <p className="text-[#1D1046] text-sm font-medium">{member.role}</p>
                      <p className="text-gray-500 text-xs mt-1">Spécialité: {member.specialty}</p>
                      <p className="text-gray-600 text-sm mt-2">{member.bio}</p>
                    </div>
                    <div className="flex justify-end">
                      <button className="text-sm text-[#1D1046] font-medium">Fermer</button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}