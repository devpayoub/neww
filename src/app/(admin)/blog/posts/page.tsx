"use client"

import { useEffect, useState } from "react"
import { PenSquare, Trash2, Eye, Search, Plus, Filter } from "lucide-react"
import Link from "next/link"
import AOS from "aos"
import "aos/dist/aos.css"
import { getAllBlogPosts, deleteBlogPost } from "@/lib/blog-service"
import { BlogPost } from "@/lib/blog-data"
import LoadingSpinner from "@/components/ui/loading-spinner"

export default function BlogPostsAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10

  // Fetch blog posts
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        const allPosts = await getAllBlogPosts()
        setPosts(allPosts)
        
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(allPosts.map(post => post.category)))
        setCategories(uniqueCategories)
      } catch (error) {
        console.error("Error fetching blog posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    })
  }, [])

  // Filter posts based on search query and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "" || post.category === categoryFilter
    
    return matchesSearch && matchesCategory
  })

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  // Handle post deletion
  const handleDeletePost = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      try {
        setIsDeleting(true)
        await deleteBlogPost(id)
        setPosts(posts.filter(post => post.id !== id))
      } catch (error) {
        console.error("Error deleting post:", error)
        alert("Failed to delete post. Please try again.")
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <div className="space-y-8">
      <div data-aos="fade-up" className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Blog Posts</h1>
          <p className="text-gray-600 mt-2">Manage your blog posts</p>
        </div>
        
        <Link
          href="/admin/blog/posts/new"
          className="inline-flex items-center bg-[#1D1046] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#2d1a69] transition-all duration-300 hover:shadow-md"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Post
        </Link>
      </div>

      {/* Filters */}
      <div data-aos="fade-up" className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search posts..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D1046] focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D1046] focus:border-transparent appearance-none bg-white"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div data-aos="fade-up" data-aos-delay="100" className="bg-white rounded-xl shadow-md overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="large" />
          </div>
        ) : currentPosts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-[#1D1046]">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{post.author.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{post.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{post.views || 0}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        href={`/admin/blog/posts/edit/${post.id}`} 
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <PenSquare className="h-5 w-5 inline" />
                      </Link>
                      <Link 
                        href={`/blog/${post.slug}`} 
                        className="text-blue-600 hover:text-blue-900 mr-4"
                        target="_blank"
                      >
                        <Eye className="h-5 w-5 inline" />
                      </Link>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        disabled={isDeleting}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No posts found matching your criteria.</p>
            <Link
              href="/admin/blog/posts/new"
              className="inline-flex items-center bg-[#1D1046] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#2d1a69] transition-all duration-300"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Post
            </Link>
          </div>
        )}

        {/* Pagination */}
        {filteredPosts.length > postsPerPage && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-white text-[#1D1046] hover:bg-gray-100 border border-gray-300'
              }`}
            >
              Previous
            </button>
            
            <div className="text-sm text-gray-700">
              Page <span className="font-medium">{currentPage}</span> of{" "}
              <span className="font-medium">{totalPages}</span>
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-white text-[#1D1046] hover:bg-gray-100 border border-gray-300'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
