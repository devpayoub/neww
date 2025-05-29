import React from 'react';
import {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    Youtube,
    Mail,
    Phone,
    MapPin,
    ArrowRight
} from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: <Facebook size={20} />, url: "#", name: "Facebook" },
        { icon: <Instagram size={20} />, url: "#", name: "Instagram" },
        { icon: <Twitter size={20} />, url: "#", name: "Twitter" },
        { icon: <Linkedin size={20} />, url: "#", name: "LinkedIn" },
        { icon: <Youtube size={20} />, url: "#", name: "YouTube" }
    ];

    return (
        <footer className="bg-[#1D1046] text-white">
            {/* Section principale du footer */}
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Colonne 1: Brand avec description et réseaux sociaux */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Think Trend</h2>
                        <p className="text-sm text-gray-300 mb-6">
                            Rejoignez-nous dans notre mission de transformer le digital en créant des expériences numériques innovantes et efficaces pour votre entreprise.
                        </p>

                        {/* Réseaux sociaux */}
                        <div className="flex space-x-4 mt-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    aria-label={`Visitez notre page ${social.name}`}
                                    className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors duration-300"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Colonne 2: Navigation */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-white/10">Navigation</h3>
                        <ul className="space-y-3">
                            {['Accueil', 'Marketing Digital', 'Développement Web', 'Design', 'Think Trend Training', 'Blog', 'Contact'].map((item, index) => (
                                <li key={index} className="flex items-center transition-transform hover:translate-x-1">
                                    <ArrowRight size={14} className="mr-2 text-gray-300" />
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Colonne 3: Contact avec icônes */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-white/10">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <Mail size={18} className="mr-3 mt-1 text-gray-300" />
                                <div>
                                    <p className="text-sm text-gray-300">Email:</p>
                                    <a href="mailto:info.thinktrend@gmail.com" className="hover:underline text-white">
                                        info.thinktrend@gmail.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <Phone size={18} className="mr-3 mt-1 text-gray-300" />
                                <div>
                                    <p className="text-sm text-gray-300">Téléphone:</p>
                                    <a href="tel:+21628804890" className="hover:underline text-white">
                                        +216 28 804 890
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <MapPin size={18} className="mr-3 mt-1 text-gray-300" />
                                <div>
                                    <p className="text-sm text-gray-300">Adresse:</p>
                                    <p className="text-white">Tunis, Nabeul</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Colonne 4: Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-white/10">Rejoignez-nous</h3>
                        <p className="text-sm text-gray-300 mb-4">
                            Inscrivez-vous à notre newsletter pour recevoir les dernières actualités et offres exclusives.
                        </p>
                        <form className="flex flex-col gap-3">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Votre email"
                                    className="w-full px-4 py-3 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-white text-[#1D1046] px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
                            >
                                S'abonner <ArrowRight size={16} className="ml-2" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Barre de copyright */}
            <div className="border-t border-white/10 py-6">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-sm text-gray-300 mb-4 md:mb-0">
                        © {currentYear} Think Trend. Tous droits réservés.
                    </div>
                    <div className="flex space-x-4 text-sm text-gray-300">
                        <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
                        <span className="hidden md:inline">•</span>
                        <a href="#" className="hover:text-white transition-colors">Conditions d'utilisation</a>
                        <span className="hidden md:inline">•</span>
                        <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}