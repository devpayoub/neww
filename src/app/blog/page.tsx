import type { Metadata } from "next"
import BlogHeader from "@/components/blog/blog-header"
import BlogFeatured from "@/components/blog/blog-featured"
import BlogGrid from "@/components/blog/blog-grid"
import BlogCategories from "@/components/blog/blog-categories"
import BlogNewsletter from "@/components/blog/blog-newsletter"
import BlogPopular from "@/components/blog/blog-popular"

export const metadata: Metadata = {
  title: "Blog - Think Trend | Actualités et conseils sur le marketing digital",
  description:
    "Découvrez nos articles, guides et conseils sur le marketing digital, le développement web et les dernières tendances du digital. Restez informé avec Think Trend.",
  keywords: "blog marketing digital, tendances web, développement web, SEO, réseaux sociaux, Think Trend",
  openGraph: {
    title: "Blog - Think Trend | Actualités et conseils sur le marketing digital",
    description:
      "Découvrez nos articles, guides et conseils sur le marketing digital, le développement web et les dernières tendances du digital.",
    url: "https://thinktrend.com/blog",
    type: "website",
    images: [
      {
        url: "https://thinktrend.com/images/blog-og.jpg",
        width: 1200,
        height: 630,
        alt: "Think Trend Blog",
      },
    ],
  },
}

export default function BlogPage() {
  return (
    <main>
      <BlogHeader />
      <BlogFeatured />
      <BlogCategories />
      <BlogGrid />
      <BlogPopular />
      <BlogNewsletter />
    </main>
  )
}
