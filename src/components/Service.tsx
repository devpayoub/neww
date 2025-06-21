import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function ServicesSection() {
    const services = [
        {
            title: "Développement Web",
            description:
                "Conception de sites vitrines, plateformes e-commerce et solutions sur-mesure pour répondre à vos besoins spécifiques.",
            icon: (
                <Image
                    src="/icons/Frame-dev.svg"
                    alt="Développement Web"
                    width={40}
                    height={40}
                />
            ),
        },

        {
            title: "Marketing Digital",
            description:
                "Gestion professionnelle des réseaux sociaux, campagnes publicitaires ciblées, et optimisation SEO pour améliorer votre visibilité sur les moteurs de recherche.",
            icon: (
                <Image
                    src="/icons/marketing.svg"
                    alt="Marketing Digital"
                    width={40}
                    height={40}
                />
            ),
        },

        {
            title: "Design Graphique",
            description:
                "Création d'identités visuelles uniques. Conception de maquettes graphiques modernes. Expériences utilisateurs engageantes et intuitives.",
            icon: (
                <Image
                    src="/icons/desg.svg"
                    alt="Design Graphique"
                    width={40}
                    height={40}
                />
            ),
        },
        {
            title: "Formations sur Mesure",
            description: "Sessions pratiques pour maîtriser les compétences en marketing digital et développement web.",
            icon: (
                <Image
                    src="/icons/formation.svg"
                    alt="Formations sur Mesure"
                    width={40}
                    height={40}
                />
            ),
        },
    ]

    return (

        <section className="py-20 bg-white relative overflow-hidden">

            {/* Élément décoratif */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1D1046]/10 rounded-full -translate-x-20 -translate-y-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full translate-x-10 translate-y-20 blur-3xl"></div>

            <div className="container mx-auto px-6">

                {/* En-tête de section */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-sm font-semibold text-[#1D1046] uppercase tracking-wider mb-3">
                        Our diversified services
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Nos services pour votre réussite digitale
                    </h3>
                    <p className="text-gray-600 text-lg">
                        Nous stimulons la croissance de nos clients grâce à l'innovation et au travail acharné.
                    </p>
                </div>

                {/* Grille de services */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative group"
                        >
                            {/* Ligne colorée à gauche */}
                            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#1D1046] to-purple-500 rounded-l-xl"></div>

                            {/* Contenu */}
                            <div className="pl-2">
                                <div className="text-4xl mb-4">{service.icon}</div>

                                <h4 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h4>

                                <p className="text-gray-600 mb-6 text-sm">{service.description}</p>

                                <button className="flex items-center text-[#1D1046] font-medium group-hover:text-purple-700 transition-colors">
                                    En savoir plus
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
