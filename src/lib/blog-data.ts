// Types
export type Author = {
  name: string;
  avatar: string;
  bio?: string;
};

export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: Author;
  date: string;
  readTime: string;
  slug: string;
  tags?: string[];
  views?: number;
};

export type ArticleDetail = BlogPost & {
  content: string;
  relatedPosts: {
    id: number;
    title: string;
    slug: string;
    image: string;
  }[];
};


export function getArticleData(slug: string): ArticleDetail {
  return {
    id: 1,
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
    slug: "strategies-seo-incontournables-2025",
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
  };
}

/**
 * Get featured article for the homepage
 */
export function getFeaturedArticle(): BlogPost {
  return {
    id: 1,
    title: "10 stratégies SEO incontournables pour améliorer votre classement en 2025",
    excerpt:
      "Découvrez les dernières stratégies SEO qui vous permettront de propulser votre site web dans les premiers résultats de recherche et d'augmenter votre trafic organique.",
    image: "/placeholder.svg?height=600&width=1200",
    category: "SEO",
    author: {
      name: "Marie Dupont",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    date: "15 avril 2025",
    readTime: "8 min",
    slug: "strategies-seo-incontournables-2025",
  };
}

/**
 * Get all blog articles
 */
export function getAllArticles(): BlogPost[] {
  return [
    {
      id: 1,
      title: "Comment créer une stratégie de contenu efficace pour votre entreprise",
      excerpt:
        "Apprenez à développer une stratégie de contenu qui engage votre audience et convertit les visiteurs en clients.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Marketing Digital",
      author: {
        name: "Sophie Martin",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: "10 avril 2025",
      readTime: "6 min",
      slug: "strategie-contenu-efficace-entreprise",
    },
    {
      id: 2,
      title: "Les tendances UX/UI qui domineront en 2025",
      excerpt:
        "Découvrez les dernières tendances en matière de design d'interface utilisateur et d'expérience utilisateur.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Design",
      author: {
        name: "Thomas Leroy",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: "5 avril 2025",
      readTime: "5 min",
      slug: "tendances-ux-ui-2025",
    },
    {
      id: 3,
      title: "Comment optimiser votre site pour la recherche vocale",
      excerpt:
        "La recherche vocale change la façon dont les utilisateurs trouvent du contenu. Voici comment adapter votre SEO.",
      image: "/placeholder.svg?height=400&width=600",
      category: "SEO",
      author: {
        name: "Marie Dupont",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: "28 mars 2025",
      readTime: "7 min",
      slug: "optimiser-site-recherche-vocale",
    },
    {
      id: 4,
      title: "Les frameworks JavaScript à surveiller en 2025",
      excerpt:
        "Un aperçu des frameworks JavaScript les plus prometteurs qui façonneront le développement web cette année.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Développement Web",
      author: {
        name: "Lucas Bernard",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: "20 mars 2025",
      readTime: "8 min",
      slug: "frameworks-javascript-2025",
    },
    {
      id: 5,
      title: "Comment créer des campagnes publicitaires performantes sur TikTok",
      excerpt: "Tirez parti de la popularité de TikTok avec ces stratégies publicitaires éprouvées.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Réseaux Sociaux",
      author: {
        name: "Emma Leclerc",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: "15 mars 2025",
      readTime: "6 min",
      slug: "campagnes-publicitaires-tiktok",
    },
    {
      id: 6,
      title: "L'importance de l'accessibilité web pour votre entreprise",
      excerpt: "Découvrez pourquoi l'accessibilité web est essentielle et comment la mettre en œuvre sur votre site.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Développement Web",
      author: {
        name: "Thomas Leroy",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: "8 mars 2025",
      readTime: "7 min",
      slug: "importance-accessibilite-web",
    },
  ];
}

/**
 * Get popular blog posts
 */
export function getPopularPosts(): (BlogPost & { views: number })[] {
  return [
    {
      id: 1,
      title: "Comment augmenter votre taux de conversion avec l'A/B testing",
      image: "/placeholder.svg?height=200&width=300",
      category: "Marketing Digital",
      date: "2 avril 2025",
      slug: "augmenter-taux-conversion-ab-testing",
      views: 1245,
      excerpt: "",
      author: {
        name: "Sophie Martin",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      readTime: "6 min",
    },
    {
      id: 2,
      title: "Les meilleures pratiques SEO pour 2025",
      image: "/placeholder.svg?height=200&width=300",
      category: "SEO",
      date: "28 mars 2025",
      slug: "meilleures-pratiques-seo-2025",
      views: 982,
      excerpt: "",
      author: {
        name: "Marie Dupont",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      readTime: "7 min",
    },
    {
      id: 3,
      title: "Comment créer une stratégie de contenu qui convertit",
      image: "/placeholder.svg?height=200&width=300",
      category: "Content Marketing",
      date: "15 mars 2025",
      slug: "strategie-contenu-convertit",
      views: 876,
      excerpt: "",
      author: {
        name: "Lucas Bernard",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      readTime: "5 min",
    },
  ];
}

/**
 * Get categories for the blog
 */
export function getCategories(): { name: string; count: number; slug: string }[] {
  return [
    { name: "SEO", count: 12, slug: "seo" },
    { name: "Marketing Digital", count: 8, slug: "marketing-digital" },
    { name: "Développement Web", count: 15, slug: "developpement-web" },
    { name: "Design", count: 7, slug: "design" },
    { name: "Réseaux Sociaux", count: 10, slug: "reseaux-sociaux" },
  ];
}

/**
 * Get tags for the blog
 */
export function getTags(): { name: string; count: number; slug: string }[] {
  return [
    { name: "SEO", count: 12, slug: "seo" },
    { name: "Marketing", count: 8, slug: "marketing" },
    { name: "Web", count: 15, slug: "web" },
    { name: "Design", count: 7, slug: "design" },
    { name: "Social Media", count: 10, slug: "social-media" },
    { name: "JavaScript", count: 6, slug: "javascript" },
    { name: "React", count: 5, slug: "react" },
    { name: "Next.js", count: 4, slug: "nextjs" },
    { name: "CSS", count: 9, slug: "css" },
    { name: "Tailwind", count: 3, slug: "tailwind" },
  ];
}

/**
 * Get related posts for a given article
 */
export function getRelatedPosts(ids: number[]): BlogPost[] {
  const allPosts = getAllArticles();
  return allPosts.filter(post => ids.includes(post.id));
}
