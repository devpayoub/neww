const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          data-aos="fade-down"
        >
          Pourquoi <span className="text-purple-600">Think Trend</span> ?
        </h2>
        
        <p 
          className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Une agence au service de l'innovation numérique où chaque stratégie digitale s'ajuste 
          parfaitement pour révéler le potentiel de votre marque.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: "🎯",
              title: "Innovation",
              description: "Des solutions créatives et avant-gardistes pour transformer votre vision en réalité digitale."
            },
            {
              icon: "⚡",
              title: "Excellence",
              description: "Une approche rigoureuse et un savoir-faire technique pour des résultats exceptionnels."
            },
            {
              icon: "🤝",
              title: "Engagement",
              description: "Un partenariat durable basé sur la confiance et l'accompagnement personnalisé."
            },
            {
              icon: "🚀",
              title: "Transformation",
              description: "Accélérez votre croissance avec nos stratégies digitales innovantes et performantes."
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              data-aos="zoom-in"
              data-aos-delay={100 * (index + 1)}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs; 