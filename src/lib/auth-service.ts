import { supabase } from './supabase'

export type User = {
  id: string
  email: string
  user_metadata?: {
    full_name?: string
    avatar_url?: string
  }
}

export type AuthError = {
  message: string
}

export async function signIn(email: string, password: string): Promise<{ user: User | null; error: AuthError | null }> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { user: null, error: { message: error.message } }
    }

    return { user: data.user as User, error: null }
  } catch (error) {
    console.error('Error signing in:', error)
    return { user: null, error: { message: 'An unexpected error occurred' } }
  }
}

export async function signOut(): Promise<{ error: AuthError | null }> {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      return { error: { message: error.message } }
    }

    return { error: null }
  } catch (error) {
    console.error('Error signing out:', error)
    return { error: { message: 'An unexpected error occurred' } }
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data } = await supabase.auth.getUser()
    return data?.user as User || null
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return !!user
}

export async function getUserSession() {
  try {
    const { data, error } = await supabase.auth.getSession()
    
    if (error || !data.session) {
      return null
    }
    
    return data.session
  } catch (error) {
    console.error('Error getting user session:', error)
    return null
  }
}
