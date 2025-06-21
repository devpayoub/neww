"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Save, X, Image as ImageIcon } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"
import { getBlogPostById, updateBlogPost, getAllCategories, getAllAuthors } from "@/lib/blog-service"

type BlogPost = {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image: string
  category_id: number
  author_id: number
  tags: string[]
  meta_title: string
  meta_description: string
  created_at: string
  updated_at: string
}

type Category = {
  id: number
  name: string
}

type Author = {
  id: number
  name: string
  avatar: string
  role: string
}

export default function EditBlogPost({ params }: { params: { id: string } }) {
  const router = useRouter()
  const postId = parseInt(params.id)
  
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  
  // Form state
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: "",
    category_id: 0,
    author_id: 0,
    tags: [],
    meta_title: "",
    meta_description: ""
  })
  
  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  // Tags input
  const [tagInput, setTagInput] = useState("")
  
  // Fetch post data and options (categories, authors)
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        
        // Fetch post data
        const post = await getBlogPostById(postId)
        if (!post) {
          alert("Post not found")
          router.push("/admin/blog/posts")
          return
        }
        
        // Fetch categories and authors for dropdowns
        const [categoriesData, authorsData] = await Promise.all([
          getAllCategories(),
          getAllAuthors()
        ])
        
        setFormData({
          ...post,
          tags: Array.isArray(post.tags) ? post.tags : (post.tags ? post.tags.split(",").map(tag => tag.trim()) : [])
        })
        setCategories(categoriesData)
        setAuthors(authorsData)
      } catch (error) {
        console.error("Error fetching data:", error)
        alert("Failed to load post data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [postId, router])

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    })
  }, [])

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
    
    // Auto-generate slug from title if slug is empty
    if (name === "title" && (!formData.slug || formData.slug === "")) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
      
      setFormData(prev => ({
        ...prev,
        slug
      }))
    }
  }

  // Handle number inputs (category_id, author_id)
  const handleNumberInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value)
    }))
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  // Handle tag input
  const handleAddTag = () => {
    if (!tagInput.trim()) return
    
    const newTag = tagInput.trim()
    if (!formData.tags?.includes(newTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag]
      }))
    }
    
    setTagInput("")
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: (prev.tags || []).filter(tag => tag !== tagToRemove)
    }))
  }

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.title?.trim()) {
      newErrors.title = "Title is required"
    }
    
    if (!formData.slug?.trim()) {
      newErrors.slug = "Slug is required"
    }
    
    if (!formData.excerpt?.trim()) {
      newErrors.excerpt = "Excerpt is required"
    }
    
    if (!formData.content?.trim()) {
      newErrors.content = "Content is required"
    }
    
    if (!formData.featured_image?.trim()) {
      newErrors.featured_image = "Featured image URL is required"
    }
    
    if (!formData.category_id) {
      newErrors.category_id = "Category is required"
    }
    
    if (!formData.author_id) {
      newErrors.author_id = "Author is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0]
      const element = document.getElementById(firstErrorField)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return
    }
    
    try {
      setIsSubmitting(true)
      
      // Format tags for submission
      const formattedData = {
        ...formData,
        tags: formData.tags?.join(",") || ""
      }
      
      await updateBlogPost(postId, formattedData)
      
      alert("Post updated successfully!")
      router.push("/admin/blog/posts")
    } catch (error) {
      console.error("Error updating post:", error)
      alert("Failed to update post. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div data-aos="fade-up" className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Edit Blog Post</h1>
          <p className="text-gray-600 mt-2">Update an existing blog post</p>
        </div>
        
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/blog/posts")}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
          >
            <X className="h-5 w-5 mr-2" />
            Cancel
          </button>
        </div>
      </div>

      <div data-aos="fade-up" className="bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title and Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title || ""}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Post title"
                disabled={isSubmitting}
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
            </div>
            
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug || ""}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent ${
                  errors.slug ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="post-url-slug"
                disabled={isSubmitting}
              />
              {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug}</p>}
              <p className="mt-1 text-sm text-gray-500">
                URL-friendly version of the title. Auto-generated if left empty.
              </p>
            </div>
          </div>
          
          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
              Excerpt <span className="text-red-500">*</span>
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt || ""}
              onChange={handleInputChange}
              rows={2}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent ${
                errors.excerpt ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Brief summary of the post"
              disabled={isSubmitting}
            ></textarea>
            {errors.excerpt && <p className="mt-1 text-sm text-red-500">{errors.excerpt}</p>}
          </div>
          
          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content || ""}
              onChange={handleInputChange}
              rows={12}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent ${
                errors.content ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Post content (Markdown supported)"
              disabled={isSubmitting}
            ></textarea>
            {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
            <p className="mt-1 text-sm text-gray-500">
              Markdown formatting is supported.
            </p>
          </div>
          
          {/* Featured Image */}
          <div>
            <label htmlFor="featured_image" className="block text-sm font-medium text-gray-700 mb-1">
              Featured Image URL <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ImageIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="featured_image"
                  name="featured_image"
                  value={formData.featured_image || ""}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent ${
                    errors.featured_image ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="https://example.com/image.jpg"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            {errors.featured_image && <p className="mt-1 text-sm text-red-500">{errors.featured_image}</p>}
            {formData.featured_image && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-2">Image preview:</p>
                <img 
                  src={formData.featured_image} 
                  alt="Featured image preview" 
                  className="h-40 object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x400?text=Image+Error"
                  }}
                />
              </div>
            )}
          </div>
          
          {/* Category and Author */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id || ""}
                onChange={handleNumberInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent ${
                  errors.category_id ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category_id && <p className="mt-1 text-sm text-red-500">{errors.category_id}</p>}
            </div>
            
            <div>
              <label htmlFor="author_id" className="block text-sm font-medium text-gray-700 mb-1">
                Author <span className="text-red-500">*</span>
              </label>
              <select
                id="author_id"
                name="author_id"
                value={formData.author_id || ""}
                onChange={handleNumberInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent ${
                  errors.author_id ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              >
                <option value="">Select an author</option>
                {authors.map(author => (
                  <option key={author.id} value={author.id}>
                    {author.name} ({author.role})
                  </option>
                ))}
              </select>
              {errors.author_id && <p className="mt-1 text-sm text-red-500">{errors.author_id}</p>}
            </div>
          </div>
          
          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex">
              <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent"
                placeholder="Add a tag and press Enter"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-[#1D1046] text-white rounded-r-lg hover:bg-[#2d1a69] transition-all duration-300 disabled:opacity-50"
                disabled={isSubmitting || !tagInput.trim()}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags?.map(tag => (
                <span 
                  key={tag} 
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#1D1046]/10 text-[#1D1046]"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1.5 text-[#1D1046] hover:text-[#2d1a69] focus:outline-none"
                    disabled={isSubmitting}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
              {formData.tags?.length === 0 && (
                <span className="text-sm text-gray-500">No tags added yet</span>
              )}
            </div>
          </div>
          
          {/* SEO Metadata */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">SEO Metadata</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="meta_title" className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  id="meta_title"
                  name="meta_title"
                  value={formData.meta_title || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent"
                  placeholder="SEO title (defaults to post title if empty)"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="meta_description" className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description
                </label>
                <textarea
                  id="meta_description"
                  name="meta_description"
                  value={formData.meta_description || ""}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent"
                  placeholder="SEO description (defaults to excerpt if empty)"
                  disabled={isSubmitting}
                ></textarea>
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t">
            <button
              type="button"
              onClick={() => router.push("/admin/blog/posts")}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 mr-3"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center bg-[#1D1046] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#2d1a69] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <LoadingSpinner size="small" className="mr-2" />
              ) : (
                <Save className="h-5 w-5 mr-2" />
              )}
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
