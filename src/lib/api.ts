import { supabase } from './supabase'
import type { BlogPost, Portfolio } from './types'

// Blog CRUD operations
export const blogApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as BlogPost[]
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    return data as BlogPost
  },

  async create(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([post])
      .select()
    
    if (error) throw error
    return data[0] as BlogPost
  },

  async update(id: string, post: Partial<BlogPost>) {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(post)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0] as BlogPost
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Portfolio CRUD operations
export const portfolioApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Portfolio[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Portfolio
  },

  async create(project: Omit<Portfolio, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('portfolio')
      .insert([project])
      .select()
    
    if (error) throw error
    return data[0] as Portfolio
  },

  async update(id: string, project: Partial<Portfolio>) {
    const { data, error } = await supabase
      .from('portfolio')
      .update(project)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0] as Portfolio
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('portfolio')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}