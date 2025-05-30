export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  featured_image: string
  category: string
  author: {
    name: string
    avatar: string
  }
  date: string
  read_time: string
  tags: string[]
  created_at: string
  updated_at: string
}

export interface Portfolio {
  id: string
  title: string
  description: string
  category: 'development' | 'marketing' | 'design'
  image: string
  link: string
  technologies?: string[]
  client?: string
  date: string
  created_at: string
  updated_at: string
}