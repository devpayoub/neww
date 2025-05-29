"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

export default function ProcessSection() {
    const steps = [
        {
            number: "1",
            title: "Consultation",
            description:
                "Nous commençons par comprendre vos objectifs et vos besoins afin de pouvoir déterminer quel type de service serait le plus adapté.",
            image: "/images/1_fe98d0a647.png?height=400&width=600",
        },
        {
            number: "2",
            title: "Design",
            description:
                "Nous créerons et partagerons avec vous le premier prototype, afin que nous puissions discuter des retours et l'adapter avant que la version finale ne soit validée !",
            image: "/images/2_aecf4994fe.png?height=400&width=600",
        },
        {
            number: "3",
            title: "Développement et Lancement",
            description:
                "Nous travaillons en étroite collaboration avec les développeurs, gérons les demandes supplémentaires et présentons le projet final avec un espace de retour d'information.",
            image: "/images/3_30781f6f78.png?height=400&width=600",
        },
    ]

    return (
        <section className="py-20 px-4 max-w-7xl mx-auto relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1D1046]/5 rounded-full -translate-x-20 -translate-y-20 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full translate-x-10 translate-y-20 blur-3xl pointer-events-none" />

            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-sm font-semibold text-[#1D1046] uppercase tracking-wider mb-3">
                        Notre processus
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Comment ça se passe ?
                    </h3>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Nous suivons une approche structurée et agile pour répondre aux
                        besoins de nos clients.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#1D1046] to-purple-500 hidden md:block z-0"></div>


                    {steps.map((step, index) => (
                        <TimelineStep key={index} step={step} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

interface Step {
    number: string
    title: string
    description: string
    image: string
}

function TimelineStep({ step, index }: { step: Step; index: number }) {
    const controls = useAnimation()
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    const isEven = index % 2 === 0

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} mb-16 md:mb-24 items-center`}
        >
            {/* Image */}
            <motion.div
                variants={itemVariants}
                className="w-full md:w-5/12 mb-8 md:mb-0"
            >
                <div
                    className={`relative overflow-hidden rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-[1.02] ${isEven ? "md:mr-8" : "md:ml-8"
                        }`}
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#1D1046]/20 to-transparent z-10" />
                    <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-64 md:h-80 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-[#1D1046] font-bold z-20 text-sm">
                        Étape {step.number}
                    </div>
                </div>
            </motion.div>

            {/* Timeline indicator - Desktop */}
            <motion.div
                variants={itemVariants}
                className="hidden md:flex md:w-2/12 justify-center items-center"
            >
                <div className="w-10 h-10 rounded-full bg-white border-2 border-[#1D1046] flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-[#1D1046] text-white text-sm font-semibold flex items-center justify-center">
                        {step.number}
                    </div>
                </div>
            </motion.div>

            {/* Content */}
            <motion.div
                variants={itemVariants}
                className={`w-full md:w-5/12 ${isEven ? "md:text-left" : "md:text-right"}`}
            >
                <div
                    className={`bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-[#1D1046] ${isEven ? "md:ml-8" : "md:mr-8"
                        }`}
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
            </motion.div>
        </motion.div>
    )
}
