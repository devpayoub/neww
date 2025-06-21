"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  FileText, 
  Tag, 
  Users, 
  PlusCircle, 
  Eye
} from "lucide-react"
import { getBlogStats } from "@/lib/blog-service"
import LoadingSpinner from "@/components/ui/loading-spinner"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AOS from "aos"
import "aos/dist/aos.css"
import { supabase } from "@/lib/supabase"

type BlogStats = {
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

export default function AdminDashboard() {
  const [stats, setStats] = useState<BlogStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    })

    // Check authentication
    const checkAuth = async () => {
      try {
        // First try to get session from Supabase
        const { data } = await supabase.auth.getSession()
        
        if (data.session) {
          console.log("Dashboard: User authenticated via Supabase session")
          setIsAuthenticated(true)
          fetchStats()
          return
        }
        
        // Fallback to localStorage check
        const adminUser = localStorage.getItem('adminUser')
        if (adminUser) {
          const userData = JSON.parse(adminUser)
          const isValid = userData && userData.isAuthenticated
          
          if (isValid) {
            console.log("Dashboard: User authenticated via localStorage")
            setIsAuthenticated(true)
            fetchStats()
            return
          }
        }
        
        // Not authenticated, redirect to login
        console.log("Dashboard: User not authenticated, redirecting to login")
        window.location.href = "/admin/login"
      } catch (error) {
        console.error("Error checking authentication:", error)
        window.location.href = "/admin/login"
      }
    }
    
    const fetchStats = async () => {
      try {
        const blogStats = await getBlogStats()
        setStats(blogStats)
      } catch (error) {
        console.error("Error fetching blog stats:", error)
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }
  
  if (!isAuthenticated) {
    return null // This shouldn't render as we redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar />
        
        {/* Main content */}
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-8" data-aos="fade-up">Blog Dashboard</h1>
          
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div 
              className="bg-white rounded-lg shadow-md p-6" 
              data-aos="fade-up" 
              data-aos-delay="100"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Posts</p>
                  <h3 className="text-2xl font-bold">{stats?.totalPosts || 0}</h3>
                </div>
              </div>
            </div>
            
            <div 
              className="bg-white rounded-lg shadow-md p-6" 
              data-aos="fade-up" 
              data-aos-delay="200"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Authors</p>
                  <h3 className="text-2xl font-bold">{stats?.totalAuthors || 0}</h3>
                </div>
              </div>
            </div>
            
            <div 
              className="bg-white rounded-lg shadow-md p-6" 
              data-aos="fade-up" 
              data-aos-delay="300"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-pink-100 text-pink-600 mr-4">
                  <Eye className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Views</p>
                  <h3 className="text-2xl font-bold">{stats?.totalViews || 0}</h3>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent posts */}
          <div 
            className="bg-white rounded-lg shadow-md p-6 mb-8" 
            data-aos="fade-up" 
            data-aos-delay="400"
          >
            <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats?.recentPosts && stats.recentPosts.length > 0 ? (
                    stats.recentPosts.map((post) => (
                      <tr key={post.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{post.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{post.author}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                            {post.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(post.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link 
                            href={`/admin/blog/posts/edit/${post.id}`} 
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            Edit
                          </Link>
                          <Link 
                            href={`/blog/${post.slug}`} 
                            className="text-gray-600 hover:text-gray-900"
                            target="_blank"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                        No recent posts found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Quick actions */}
          <div 
            className="bg-white rounded-lg shadow-md p-6" 
            data-aos="fade-up" 
            data-aos-delay="500"
          >
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link 
                href="/admin/blog/posts/new" 
                className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <PlusCircle className="h-6 w-6 text-purple-600 mr-3" />
                <span className="text-purple-800">Create New Post</span>
              </Link>
              
              <Link 
                href="/admin/blog/categories" 
                className="flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                <Tag className="h-6 w-6 text-indigo-600 mr-3" />
                <span className="text-indigo-800">Manage Categories</span>
              </Link>
              
              <Link 
                href="/admin/blog/authors" 
                className="flex items-center p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
              >
                <Users className="h-6 w-6 text-pink-600 mr-3" />
                <span className="text-pink-800">Manage Authors</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
