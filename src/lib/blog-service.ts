import { supabase } from './supabase'
import { BlogPost as UIBlogPost, ArticleDetail, Author as UIAuthor } from './blog-data'

// Database types
export type BlogPost = {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image: string
  category_id: number
  author_id: number
  tags: string | string[]
  meta_title?: string
  meta_description?: string
  created_at: string
  updated_at: string
  views?: number
}

export type Category = {
  id: number
  name: string
  count: number
}

export type Author = {
  id: number
  name: string
  avatar: string
  role: string
  bio?: string
}

// Blog statistics type
export type BlogStats = {
  totalPosts: number
  totalAuthors: number
  totalViews: number
  recentPosts: {
    id: number
    title: string
    slug: string
    created_at: string
    author: string
    category: string
  }[]
}

// Post CRUD operations
export async function getAllBlogPosts(
  page = 1,
  limit = 10,
  search = '',
  categoryId?: number
): Promise<{ posts: BlogPost[], total: number }> {
  try {
    let query = supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)

    // Apply filters if provided
    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%,excerpt.ilike.%${search}%`)
    }

    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }

    const { data, error, count } = await query

    if (error) throw error

    return { 
      posts: data as BlogPost[], 
      total: count || 0 
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return { posts: [], total: 0 }
  }
}

export async function getBlogPostById(id: number): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    return data as BlogPost
  } catch (error) {
    console.error(`Error fetching blog post with id ${id}:`, error)
    return null
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) throw error

    return data as BlogPost
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error)
    return null
  }
}

export async function createBlogPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert([{
        ...post,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()

    if (error) throw error

    return data as BlogPost
  } catch (error) {
    console.error('Error creating blog post:', error)
    throw error
  }
}

export async function updateBlogPost(
  id: number, 
  post: Partial<Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>>
): Promise<BlogPost> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .update({
        ...post,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return data as BlogPost
  } catch (error) {
    console.error(`Error updating blog post with id ${id}:`, error)
    throw error
  }
}

export async function deleteBlogPost(id: number): Promise<void> {
  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    console.error(`Error deleting blog post with id ${id}:`, error)
    throw error
  }
}

// Category CRUD operations
export async function getAllCategories(): Promise<Category[]> {
  try {
    // First get all categories
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (categoriesError) throw categoriesError

    // Then get post counts for each category
    const { data: counts, error: countsError } = await supabase
      .from('posts')
      .select('category_id, count')
      .groupBy('category_id')

    if (countsError) throw countsError

    // Combine the data
    return categories.map(category => ({
      ...category,
      count: counts.find(c => c.category_id === category.id)?.count || 0
    })) as Category[]
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function getCategoryById(id: number): Promise<Category | null> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    // Get post count for this category
    const { data: countData, error: countError } = await supabase
      .from('posts')
      .select('id', { count: 'exact' })
      .eq('category_id', id)

    if (countError) throw countError

    return {
      ...data,
      count: countData.length
    } as Category
  } catch (error) {
    console.error(`Error fetching category with id ${id}:`, error)
    return null
  }
}

export async function createCategory(category: { name: string }): Promise<Category> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .insert([category])
      .select()
      .single()

    if (error) throw error

    return {
      ...data,
      count: 0
    } as Category
  } catch (error) {
    console.error('Error creating category:', error)
    throw error
  }
}

export async function updateCategory(id: number, category: { name: string }): Promise<Category> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .update(category)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    // Get post count for this category
    const { data: countData, error: countError } = await supabase
      .from('posts')
      .select('id', { count: 'exact' })
      .eq('category_id', id)

    if (countError) throw countError

    return {
      ...data,
      count: countData.length
    } as Category
  } catch (error) {
    console.error(`Error updating category with id ${id}:`, error)
    throw error
  }
}

export async function deleteCategory(id: number): Promise<void> {
  try {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    console.error(`Error deleting category with id ${id}:`, error)
    throw error
  }
}

// Author CRUD operations
export async function getAllAuthors(): Promise<Author[]> {
  try {
    const { data, error } = await supabase
      .from('authors')
      .select('*')
      .order('name')

    if (error) throw error

    return data as Author[]
  } catch (error) {
    console.error('Error fetching authors:', error)
    return []
  }
}

export async function getAuthorById(id: number): Promise<Author | null> {
  try {
    const { data, error } = await supabase
      .from('authors')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    return data as Author
  } catch (error) {
    console.error(`Error fetching author with id ${id}:`, error)
    return null
  }
}

export async function createAuthor(author: Omit<Author, 'id'>): Promise<Author> {
  try {
    const { data, error } = await supabase
      .from('authors')
      .insert([author])
      .select()
      .single()

    if (error) throw error

    return data as Author
  } catch (error) {
    console.error('Error creating author:', error)
    throw error
  }
}

export async function updateAuthor(id: number, author: Partial<Omit<Author, 'id'>>): Promise<Author> {
  try {
    const { data, error } = await supabase
      .from('authors')
      .update(author)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return data as Author
  } catch (error) {
    console.error(`Error updating author with id ${id}:`, error)
    throw error
  }
}

export async function deleteAuthor(id: number): Promise<void> {
  try {
    const { error } = await supabase
      .from('authors')
      .delete()
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    console.error(`Error deleting author with id ${id}:`, error)
    throw error
  }
}

// Blog statistics for admin dashboard
export async function getBlogStats(): Promise<BlogStats> {
  try {
    // Get total posts count
    const { count: totalPosts, error: postsError } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })

    if (postsError) throw postsError

    // Get total authors count
    const { count: totalAuthors, error: authorsError } = await supabase
      .from('authors')
      .select('*', { count: 'exact', head: true })

    if (authorsError) throw authorsError

    // Get total views (sum of all post views)
    const { data: viewsData, error: viewsError } = await supabase
      .from('posts')
      .select('views')

    if (viewsError) throw viewsError

    const totalViews = viewsData.reduce((sum, post) => sum + (post.views || 0), 0)

    // Get recent posts with author and category names
    const { data: recentPostsData, error: recentError } = await supabase
      .from('posts')
      .select(`
        id, 
        title, 
        slug, 
        created_at,
        authors(name),
        categories(name)
      `)
      .order('created_at', { ascending: false })
      .limit(5)

    if (recentError) throw recentError

    const recentPosts = recentPostsData.map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      created_at: post.created_at,
      author: post.authors?.name || 'Unknown',
      category: post.categories?.name || 'Uncategorized'
    }))

    return {
      totalPosts: totalPosts || 0,
      totalAuthors: totalAuthors || 0,
      totalViews,
      recentPosts
    }
  } catch (error) {
    console.error('Error fetching blog statistics:', error)
    return {
      totalPosts: 0,
      totalAuthors: 0,
      totalViews: 0,
      recentPosts: []
    }
  }
}

// Convert database blog post to UI blog post format
export function convertToUIBlogPost(
  post: BlogPost, 
  author?: Author, 
  category?: Category
): UIBlogPost {
  return {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    image: post.featured_image,
    category: category?.name || 'Uncategorized',
    author: {
      name: author?.name || 'Unknown',
      avatar: author?.avatar || '/placeholder.svg?height=100&width=100',
      bio: author?.bio
    },
    date: new Date(post.created_at).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    readTime: '5 min', // This could be calculated based on content length
    slug: post.slug,
    tags: Array.isArray(post.tags) ? post.tags : post.tags?.split(',').map(tag => tag.trim()) || [],
    views: post.views || 0
  }
}

// Convert database blog post to article detail format
export async function convertToArticleDetail(post: BlogPost): Promise<ArticleDetail> {
  // Get author data
  const author = await getAuthorById(post.author_id)
  
  // Get category data
  const category = await getCategoryById(post.category_id)
  
  // Get related posts (simplified implementation)
  const { posts: relatedPosts } = await getAllBlogPosts(1, 3)
  
  const uiPost = convertToUIBlogPost(post, author || undefined, category || undefined)
  
  return {
    ...uiPost,
    content: post.content,
    relatedPosts: relatedPosts
      .filter(p => p.id !== post.id)
      .slice(0, 3)
      .map(p => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        image: p.featured_image
      }))
  }
}
