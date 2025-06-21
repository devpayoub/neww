"use client"

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import About from "@/components/About";
import Hero from "@/components/Hero";
import PartnersCarousel from "@/components/partners-carousel";
import ProcessSection from "@/components/ProcessSection";
import ServiceSection from "@/components/Service";
import Team from "@/components/Team";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Section wrapper component with animations
const AnimatedSection = ({ 
  children, 
  className = "", 
  id = "",
  index = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  id?: string;
  index?: number;
}) => {
  return (
    <section id={id} className={`relative ${className}`}>
      {/* Animated background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {index % 2 === 0 && (
          <motion.div 
            className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-purple-500/5"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          />
        )}
        {index % 2 === 1 && (
          <motion.div 
            className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-blue-500/5"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity, 
              repeatType: "reverse",
              delay: 1
            }}
          />
        )}
        
        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#1D1046]/20"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Main content with AOS animation */}
      <div 
        data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
        data-aos-duration="800"
        data-aos-delay={`${index * 50}`}
        className="relative z-10"
      >
        {children}
      </div>
    </section>
  );
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 100,
    });
    
    // Refresh AOS when window is resized
    window.addEventListener('resize', () => {
      AOS.refresh();
    });
    
    // Simulate loading for smooth entrance animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => {
      window.removeEventListener('resize', () => {
        AOS.refresh();
      });
      clearTimeout(timer);
    };
  }, []);

  // Page entrance animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 } 
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!isLoading && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={pageVariants}
          className="relative overflow-hidden"
        >
          {/* Page transition overlay */}
          <motion.div 
            className="fixed inset-0 bg-[#1D1046] z-50"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
          
          {/* Main content */}
          <div className="relative">
            {/* Hero doesn't need a wrapper as it already has animations */}
            <Hero />
            
            {/* Service section with animation wrapper */}
            <AnimatedSection index={1}>
              <ServiceSection />
            </AnimatedSection>
            
            {/* About section with animation wrapper */}
            <AnimatedSection index={2}>
              <About />
            </AnimatedSection>
            
            {/* Process section with animation wrapper */}
            <AnimatedSection index={3}>
              <ProcessSection />
            </AnimatedSection>
            
            {/* Partners section with animation wrapper */}
            <AnimatedSection index={4}>
              <PartnersCarousel />
            </AnimatedSection>
            
            {/* Team section with animation wrapper */}
            <AnimatedSection index={5}>
              <Team/>
            </AnimatedSection>
            
            {/* Scroll progress indicator */}
            <motion.div 
              className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1D1046] to-purple-500 origin-left z-50"
              style={{ 
                scaleX: 0 
              }}
              animate={{ 
                scaleX: [0, 1]
              }}
              transition={{
                duration: 0.5,
                ease: "linear",
                delay: 0.5
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Home;
