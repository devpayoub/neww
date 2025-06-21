"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Save, X, Image as ImageIcon } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"
import { createBlogPost, getAllCategories, getAllAuthors } from "@/lib/blog-service"
import LoadingSpinner from "@/components/ui/loading-spinner"

type Author = {
  id: number
  name: string
  avatar: string
  role: string
}

type Category = {
  id: number
  name: string
  count: number
}

export default function NewBlogPost() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  const [loadingData, setLoadingData] = useState(true)
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    authorId: 0,
    featuredImage: "",
    tags: "",
    metaTitle: "",
    metaDescription: ""
  })
  
  // Validation state
  const [errors, setErrors] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    authorId: "",
    featuredImage: ""
  })

  // Fetch categories and authors
  useEffect(() => {
    async function fetchData() {
      try {
        setLoadingData(true)
        const [categoriesData, authorsData] = await Promise.all([
          getAllCategories(),
          getAllAuthors()
        ])
        
        setCategories(categoriesData)
        setAuthors(authorsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoadingData(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    })
  }, [])

  // Generate slug from title
  useEffect(() => {
    if (formData.title && !formData.slug) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-')
      
      setFormData(prev => ({
        ...prev,
        slug: generatedSlug
      }))
    }
  }, [formData.title])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when field is being edited
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      authorId: "",
      featuredImage: ""
    }
    
    let isValid = true
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
      isValid = false
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required"
      isValid = false
    }
    
    if (!formData.excerpt.trim()) {
      newErrors.excerpt = "Excerpt is required"
      isValid = false
    }
    
    if (!formData.content.trim()) {
      newErrors.content = "Content is required"
      isValid = false
    }
    
    if (!formData.category) {
      newErrors.category = "Category is required"
      isValid = false
    }
    
    if (!formData.authorId) {
      newErrors.authorId = "Author is required"
      isValid = false
    }
    
    if (!formData.featuredImage.trim()) {
      newErrors.featuredImage = "Featured image URL is required"
      isValid = false
    }
    
    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    try {
      setLoading(true)
      
      // Convert authorId to number
      const postData = {
        ...formData,
        authorId: Number(formData.authorId),
        tags: formData.tags.split(',').map(tag => tag.trim())
      }
      
      await createBlogPost(postData)
      
      // Redirect to posts list
      router.push('/admin/blog/posts')
    } catch (error) {
      console.error("Error creating post:", error)
      alert("Failed to create post. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div data-aos="fade-up" className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Create New Post</h1>
          <p className="text-gray-600 mt-2">Add a new blog post to your website</p>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={() => router.push('/admin/blog/posts')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
          >
            <X className="h-5 w-5 mr-2" />
            Cancel
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="inline-flex items-center bg-[#1D1046] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#2d1a69] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <LoadingSpinner size="small" className="mr-2" />
            ) : (
              <Save className="h-5 w-5 mr-2" />
            )}
            Save Post
          </button>
        </div>
      </div>

      {loadingData ? (
        <div className="flex justify-center py-20">
          <LoadingSpinner size="large" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div data-aos="fade-up" className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Post Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter post title"
                />
                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
              </div>
              
              {/* Slug */}
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent ${
                    errors.slug ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="enter-post-slug"
                />
                {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug}</p>}
              </div>
              
              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent appearance-none ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
              </div>
              
              {/* Author */}
              <div>
                <label htmlFor="authorId" className="block text-sm font-medium text-gray-700 mb-1">
                  Author <span className="text-red-500">*</span>
                </label>
                <select
                  id="authorId"
                  name="authorId"
                  value={formData.authorId}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent appearance-none ${
                    errors.authorId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value={0}>Select an author</option>
                  {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.name} - {author.role}
                    </option>
                  ))}
                </select>
                {errors.authorId && <p className="mt-1 text-sm text-red-500">{errors.authorId}</p>}
              </div>
              
              {/* Featured Image */}
              <div className="col-span-2">
                <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-1">
                  Featured Image URL <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ImageIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="featuredImage"
                      name="featuredImage"
                      value={formData.featuredImage}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent ${
                        errors.featuredImage ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                {errors.featuredImage && <p className="mt-1 text-sm text-red-500">{errors.featuredImage}</p>}
                {formData.featuredImage && (
                  <div className="mt-2">
                    <img 
                      src={formData.featuredImage} 
                      alt="Featured image preview" 
                      className="h-20 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x200?text=Invalid+Image+URL"
                      }}
                    />
                  </div>
                )}
              </div>
              
              {/* Excerpt */}
              <div className="col-span-2">
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                  Excerpt <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent ${
                    errors.excerpt ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Brief summary of the post"
                ></textarea>
                {errors.excerpt && <p className="mt-1 text-sm text-red-500">{errors.excerpt}</p>}
              </div>
              
              {/* Content */}
              <div className="col-span-2">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={12}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent ${
                    errors.content ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Write your post content here..."
                ></textarea>
                {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
              </div>
            </div>
          </div>
          
          {/* SEO and Tags */}
          <div data-aos="fade-up" data-aos-delay="100" className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">SEO & Tags</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent"
                  placeholder="tag1, tag2, tag3"
                />
              </div>
              
              {/* Meta Title */}
              <div>
                <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  id="metaTitle"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent"
                  placeholder="SEO title (defaults to post title if empty)"
                />
              </div>
              
              {/* Meta Description */}
              <div className="col-span-2">
                <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description
                </label>
                <textarea
                  id="metaDescription"
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent"
                  placeholder="SEO description (defaults to excerpt if empty)"
                ></textarea>
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center bg-[#1D1046] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#2d1a69] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <LoadingSpinner size="small" className="mr-2" />
              ) : (
                <Save className="h-5 w-5 mr-2" />
              )}
              Save Post
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
