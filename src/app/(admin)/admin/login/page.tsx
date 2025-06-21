"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import LoadingSpinner from "@/components/ui/loading-spinner"
import AOS from "aos"
import "aos/dist/aos.css"
import { supabase } from "@/lib/supabase"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    })
    
    // Check if already logged in
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        console.log("Initial session check:", data.session ? "Session exists" : "No session")
        
        if (error) {
          console.error("Session check error:", error.message)
          return
        }
        
        if (data.session) {
          console.log("User is already logged in, redirecting to dashboard")
          // Use a hard redirect to ensure cookies are properly sent
          window.location.href = "/admin/dashboard"
        }
      } catch (err) {
        console.error("Error checking session:", err)
      }
    }
    
    checkSession()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    console.log("Attempting login with:", email)

    try {
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      console.log("Auth response:", { data: data ? "data exists" : "no data", error })
      
      if (error) {
        console.error("Login error from Supabase:", error)
        setError("Invalid email or password")
        setLoading(false)
        return
      }
      
      if (!data.session) {
        console.error("No session returned from Supabase")
        setError("Authentication failed - no session created")
        setLoading(false)
        return
      }
      
      console.log("Login successful, session created with ID:", data.session.user.id)
      
      // Store user info in localStorage as a fallback authentication method
      localStorage.setItem('adminUser', JSON.stringify({
        id: data.session.user.id,
        email: data.session.user.email,
        isAuthenticated: true,
        timestamp: new Date().toISOString()
      }))
      
      // Explicitly set the session
      try {
        await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token
        })
        
        console.log("Session explicitly set")
      } catch (sessionError) {
        console.error("Error setting session:", sessionError)
        // Continue anyway since we have localStorage fallback
      }
      
      // Redirect to dashboard with a slight delay to ensure everything is saved
      console.log("Redirecting to dashboard...")
      setTimeout(() => {
        window.location.href = "/admin/dashboard"
      }, 500)
      
    } catch (err) {
      console.error("Login error:", err)
      setError("An error occurred during login")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1D1046] to-[#3a1d8a] p-4">
      <div 
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md"
        data-aos="fade-up"
      >
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo.png"
            alt="Think Trend Logo"
            width={180}
            height={60}
            className="h-12 w-auto"
          />
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Login</h1>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <LoadingSpinner size="sm" />
                <span className="ml-2">Signing in...</span>
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
