import { supabase } from './supabase'

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
  count?: number
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
): Promise<{ posts: any[], total: number }> {
  try {
    let query = supabase
      .from('posts')
      .select(`
        *,
        categories(name),
        authors(name, avatar, role)
      `, { count: 'exact' })
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

    // Transform data to match UI expectations
    const transformedPosts = data?.map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      image: post.featured_image,
      category: post.categories?.name || 'Uncategorized',
      author: {
        name: post.authors?.name || 'Unknown',
        avatar: post.authors?.avatar || '/placeholder.svg?height=100&width=100',
        role: post.authors?.role || 'Author'
      },
      date: new Date(post.created_at).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      readTime: '5 min',
      tags: Array.isArray(post.tags) ? post.tags : post.tags?.split(',').map((tag: string) => tag.trim()) || [],
      views: post.views || 0
    })) || []

    return { 
      posts: transformedPosts, 
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

export async function createBlogPost(postData: any): Promise<BlogPost> {
  try {
    // Get category ID by name
    const { data: categoryData } = await supabase
      .from('categories')
      .select('id')
      .eq('name', postData.category)
      .single()

    const post = {
      title: postData.title,
      slug: postData.slug,
      excerpt: postData.excerpt,
      content: postData.content,
      featured_image: postData.featuredImage,
      category_id: categoryData?.id || 1,
      author_id: postData.authorId,
      tags: Array.isArray(postData.tags) ? postData.tags.join(', ') : postData.tags,
      meta_title: postData.metaTitle || postData.title,
      meta_description: postData.metaDescription || postData.excerpt,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('posts')
      .insert([post])
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
  postData: any
): Promise<BlogPost> {
  try {
    // Get category ID by name if category is provided
    let categoryId = postData.category_id
    if (postData.category && typeof postData.category === 'string') {
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id')
        .eq('name', postData.category)
        .single()
      categoryId = categoryData?.id
    }

    const updateData: any = {
      updated_at: new Date().toISOString()
    }

    // Only update fields that are provided
    if (postData.title) updateData.title = postData.title
    if (postData.slug) updateData.slug = postData.slug
    if (postData.excerpt) updateData.excerpt = postData.excerpt
    if (postData.content) updateData.content = postData.content
    if (postData.featured_image) updateData.featured_image = postData.featured_image
    if (categoryId) updateData.category_id = categoryId
    if (postData.author_id) updateData.author_id = postData.author_id
    if (postData.tags) updateData.tags = Array.isArray(postData.tags) ? postData.tags.join(', ') : postData.tags
    if (postData.meta_title) updateData.meta_title = postData.meta_title
    if (postData.meta_description) updateData.meta_description = postData.meta_description

    const { data, error } = await supabase
      .from('posts')
      .update(updateData)
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
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error) throw error

    // Get post counts for each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const { count } = await supabase
          .from('posts')
          .select('*', { count: 'exact', head: true })
          .eq('category_id', category.id)

        return {
          ...category,
          count: count || 0
        }
      })
    )

    return categoriesWithCounts as Category[]
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
    const { count } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', id)

    return {
      ...data,
      count: count || 0
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
    const { count } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', id)

    return {
      ...data,
      count: count || 0
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

    const totalViews = viewsData?.reduce((sum, post) => sum + (post.views || 0), 0) || 0

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

    const recentPosts = recentPostsData?.map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      created_at: post.created_at,
      author: post.authors?.name || 'Unknown',
      category: post.categories?.name || 'Uncategorized'
    })) || []

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