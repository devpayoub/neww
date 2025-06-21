import type { Metadata } from "next"
import { getArticleData } from "@/lib/blog-data"

// Génération des métadonnées dynamiques pour chaque article
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticleData(params.slug)

  return {
    title: `${article.title} | Blog Think Trend`,
    description: article.excerpt,
    keywords: article.tags?.join(", ") || "",
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

// Importing the client component
import BlogPostContent from "@/components/blog/blog-post-content"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPostContent slug={params.slug} />
}
