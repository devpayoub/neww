"use client"

import React, { useMemo } from 'react';
import { ChevronRight, Calendar, FileText } from 'lucide-react';

export default function Hero() {
    // Generate random positions once on component mount
    const floatingPoints = useMemo(() => {
        return Array(24).fill(null).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.25,
            duration: `${Math.random() * 10 + 10}s`,
            delay: `${Math.random() * 5}s`
        }));
    }, []);

    const codeLines = [
        'class ThinkTrend {',
        '  constructor() {',
        '    this.creativity = 100;',
        '    this.innovation = true;',
        '    this.success = "guaranteed";',
        '  }',
        '',
        '  launchCampaign(brand) {',
        '    return `${brand} transformed`;',
        '  }',
        '}'
    ];

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1D1046] to-[#3a1d8a] min-h-[85vh] flex items-center">
            {/* Éléments d'animation en arrière-plan */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Cercles animés */}
                <div className="absolute w-96 h-96 rounded-full bg-blue-500/10 -top-20 -left-20 animate-pulse"></div>
                <div className="absolute w-64 h-64 rounded-full bg-purple-500/10 bottom-10 right-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute w-32 h-32 rounded-full bg-indigo-500/10 top-40 right-40 animate-pulse" style={{ animationDelay: '2s' }}></div>

                {/* Motifs géométriques */}
                <svg className="absolute bottom-0 left-0 w-full opacity-10" viewBox="0 0 1000 200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,100 Q250,200 500,100 T1000,100 V200 H0 Z" fill="url(#gradient1)"></path>
                    <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Points flottants */}
                <div className="absolute inset-0 grid grid-cols-12 gap-4 pointer-events-none opacity-30">
                    {floatingPoints.map((point) => (
                        <div
                            key={point.id}
                            className="w-2 h-2 rounded-full bg-white floating-point"
                            style={{
                                left: point.left,
                                top: point.top,
                                opacity: point.opacity,
                                animation: `float ${point.duration} infinite linear`,
                                animationDelay: point.delay
                            }}
                        ></div>
                    ))}
                </div>

                {/* Lignes de code stylisées */}
                <div className="hidden lg:block absolute right-10 top-20 opacity-20 font-mono text-xs text-green-300">
                    {codeLines.map((line, i) => (
                        <div
                            key={i}
                            className="leading-relaxed code-line"
                            style={{
                                opacity: 0,
                                animation: 'fadeIn 0.5s forwards',
                                animationDelay: `${i * 0.1}s`
                            }}
                        >
                            {line}
                        </div>
                    ))}
                </div>
            </div>

            {/* Contenu principal */}
            <div className="container mx-auto px-6 py-24 relative z-10">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Révélez tout le potentiel de votre marque avec
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300"> Think Trend</span>
                    </h1>

                    <h2 className="text-xl md:text-2xl text-blue-100 mb-8">
                        Votre partenaire de succès digital
                    </h2>

                    <p className="text-lg text-gray-300 mb-10 max-w-2xl">
                        Nous transformons votre vision en stratégies digitales innovantes,
                        pour vous démarquer dans un monde numérique en constante évolution.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="bg-white text-[#1D1046] px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transform hover:-translate-y-1 transition-all flex items-center shadow-lg">
                            <Calendar className="mr-2 h-5 w-5" />
                            Consultation gratuite
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </button>

                        <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transform hover:-translate-y-1 transition-all flex items-center">
                            <FileText className="mr-2 h-5 w-5" />
                            Obtenir un devis
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </button>
                    </div>

                    {/* Badge de confiance */}
                    <div className="mt-16 flex flex-col sm:flex-row items-center gap-4 text-white/80">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(num => (
                                <div key={num} className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-300 to-purple-400 border-2 border-white flex items-center justify-center text-xs font-bold">
                                    {num}
                                </div>
                            ))}
                        </div>
                        <div className="text-sm">
                            <span className="font-bold text-white">+500 clients satisfaits</span> font confiance à Think Trend
                        </div>
                    </div>
                </div>
            </div>

            {/* Global styles */}
            <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-15px) translateX(10px); }
          50% { transform: translateY(5px) translateX(-5px); }
          75% { transform: translateY(-5px) translateX(-10px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
