"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Save, X, Image as ImageIcon } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"
import { getAllAuthors, createAuthor, updateAuthor, deleteAuthor } from "@/lib/blog-service"
import LoadingSpinner from "@/components/ui/loading-spinner"

type Author = {
  id: number
  name: string
  avatar: string
  role: string
  bio?: string
}

export default function AuthorsAdmin() {
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Form states
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null)
  
  // New author form
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    role: "",
    avatar: "",
    bio: ""
  })
  
  // Edit author form
  const [editForm, setEditForm] = useState({
    name: "",
    role: "",
    avatar: "",
    bio: ""
  })
  
  // Form errors
  const [errors, setErrors] = useState({
    name: "",
    role: "",
    avatar: ""
  })

  // Fetch authors
  useEffect(() => {
    async function fetchAuthors() {
      try {
        setLoading(true)
        const data = await getAllAuthors()
        setAuthors(data)
      } catch (error) {
        console.error("Error fetching authors:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAuthors()
  }, [])

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    })
  }, [])

  // Handle form input changes
  const handleNewAuthorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    setNewAuthor(prev => ({
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

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Validate form
  const validateAuthorForm = (data: typeof newAuthor) => {
    const newErrors = {
      name: "",
      role: "",
      avatar: ""
    }
    
    let isValid = true
    
    if (!data.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    }
    
    if (!data.role.trim()) {
      newErrors.role = "Role is required"
      isValid = false
    }
    
    if (!data.avatar.trim()) {
      newErrors.avatar = "Avatar URL is required"
      isValid = false
    }
    
    setErrors(newErrors)
    return isValid
  }

  // Handle adding a new author
  const handleAddAuthor = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateAuthorForm(newAuthor)) {
      return
    }
    
    try {
      setIsSubmitting(true)
      const newAuthorData = await createAuthor(newAuthor)
      setAuthors([...authors, newAuthorData])
      
      // Reset form
      setNewAuthor({
        name: "",
        role: "",
        avatar: "",
        bio: ""
      })
      
      setShowAddForm(false)
    } catch (error) {
      console.error("Error adding author:", error)
      alert("Failed to add author. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle editing an author
  const startEditing = (author: Author) => {
    setEditingAuthor(author)
    setEditForm({
      name: author.name,
      role: author.role,
      avatar: author.avatar,
      bio: author.bio || ""
    })
  }

  const cancelEditing = () => {
    setEditingAuthor(null)
    setEditForm({
      name: "",
      role: "",
      avatar: "",
      bio: ""
    })
  }

  const handleUpdateAuthor = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateAuthorForm(editForm) || !editingAuthor) {
      return
    }
    
    try {
      setIsSubmitting(true)
      await updateAuthor(editingAuthor.id, editForm)
      
      setAuthors(authors.map(author => 
        author.id === editingAuthor.id ? { ...author, ...editForm } : author
      ))
      
      cancelEditing()
    } catch (error) {
      console.error("Error updating author:", error)
      alert("Failed to update author. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle deleting an author
  const handleDeleteAuthor = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this author? This action cannot be undone.")) {
      try {
        setIsSubmitting(true)
        await deleteAuthor(id)
        setAuthors(authors.filter(author => author.id !== id))
      } catch (error) {
        console.error("Error deleting author:", error)
        alert("Failed to delete author. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="space-y-8">
      <div data-aos="fade-up" className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Authors</h1>
          <p className="text-gray-600 mt-2">Manage blog authors</p>
        </div>
        
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center bg-[#1D1046] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#2d1a69] transition-all duration-300"
        >
          {showAddForm ? (
            <>
              <X className="h-5 w-5 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="h-5 w-5 mr-2" />
              Add New Author
            </>
          )}
        </button>
      </div>

      {/* Add New Author Form */}
      {showAddForm && (
        <div data-aos="fade-up" className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Add New Author</h2>
          
          <form onSubmit={handleAddAuthor} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newAuthor.name}
                onChange={handleNewAuthorChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Author name"
                disabled={isSubmitting}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
            
            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Role <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={newAuthor.role}
                onChange={handleNewAuthorChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent ${
                  errors.role ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g. Content Writer, Editor"
                disabled={isSubmitting}
              />
              {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
            </div>
            
            {/* Avatar */}
            <div className="col-span-2">
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
                Avatar URL <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ImageIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="avatar"
                    name="avatar"
                    value={newAuthor.avatar}
                    onChange={handleNewAuthorChange}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent ${
                      errors.avatar ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="https://example.com/avatar.jpg"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              {errors.avatar && <p className="mt-1 text-sm text-red-500">{errors.avatar}</p>}
              {newAuthor.avatar && (
                <div className="mt-2 flex items-center">
                  <img 
                    src={newAuthor.avatar} 
                    alt="Avatar preview" 
                    className="h-10 w-10 rounded-full object-cover border border-gray-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/40?text=Error"
                    }}
                  />
                  <span className="ml-2 text-sm text-gray-500">Avatar preview</span>
                </div>
              )}
            </div>
            
            {/* Bio */}
            <div className="col-span-2">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={newAuthor.bio}
                onChange={handleNewAuthorChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent"
                placeholder="Author biography (optional)"
                disabled={isSubmitting}
              ></textarea>
            </div>
            
            {/* Submit Button */}
            <div className="col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center bg-[#1D1046] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#2d1a69] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <LoadingSpinner size="small" className="mr-2" />
                ) : (
                  <Save className="h-5 w-5 mr-2" />
                )}
                Save Author
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Authors List */}
      <div data-aos="fade-up" data-aos-delay="100" className="bg-white rounded-xl shadow-md overflow-hidden">
        <h2 className="text-xl font-bold text-gray-800 p-6 border-b">All Authors</h2>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="large" />
          </div>
        ) : authors.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bio
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {authors.map((author) => (
                  <tr key={author.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            src={author.avatar} 
                            alt={author.name} 
                            className="h-10 w-10 rounded-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://via.placeholder.com/40?text=Error"
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{author.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{author.role}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 line-clamp-2">{author.bio || "—"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => startEditing(author)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        disabled={isSubmitting || !!editingAuthor}
                      >
                        <Edit className="h-5 w-5 inline" />
                      </button>
                      <button
                        onClick={() => handleDeleteAuthor(author.id)}
                        className="text-red-600 hover:text-red-900"
                        disabled={isSubmitting}
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
            <p className="text-gray-500 mb-4">No authors found.</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center bg-[#1D1046] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#2d1a69] transition-all duration-300"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Your First Author
            </button>
          </div>
        )}
      </div>

      {/* Edit Author Modal */}
      {editingAuthor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Edit Author</h2>
                <button
                  onClick={cancelEditing}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleUpdateAuthor} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="edit-name"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent"
                    placeholder="Author name"
                    disabled={isSubmitting}
                  />
                </div>
                
                {/* Role */}
                <div>
                  <label htmlFor="edit-role" className="block text-sm font-medium text-gray-700 mb-1">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="edit-role"
                    name="role"
                    value={editForm.role}
                    onChange={handleEditFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent"
                    placeholder="e.g. Content Writer, Editor"
                    disabled={isSubmitting}
                  />
                </div>
                
                {/* Avatar */}
                <div className="col-span-2">
                  <label htmlFor="edit-avatar" className="block text-sm font-medium text-gray-700 mb-1">
                    Avatar URL <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ImageIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="edit-avatar"
                        name="avatar"
                        value={editForm.avatar}
                        onChange={handleEditFormChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent"
                        placeholder="https://example.com/avatar.jpg"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  {editForm.avatar && (
                    <div className="mt-2 flex items-center">
                      <img 
                        src={editForm.avatar} 
                        alt="Avatar preview" 
                        className="h-10 w-10 rounded-full object-cover border border-gray-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://via.placeholder.com/40?text=Error"
                        }}
                      />
                      <span className="ml-2 text-sm text-gray-500">Avatar preview</span>
                    </div>
                  )}
                </div>
                
                {/* Bio */}
                <div className="col-span-2">
                  <label htmlFor="edit-bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="edit-bio"
                    name="bio"
                    value={editForm.bio}
                    onChange={handleEditFormChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent"
                    placeholder="Author biography (optional)"
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                
                {/* Submit Button */}
                <div className="col-span-2 flex justify-end">
                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 mr-3"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center bg-[#1D1046] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#2d1a69] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <LoadingSpinner size="small" className="mr-2" />
                    ) : (
                      <Save className="h-5 w-5 mr-2" />
                    )}
                    Update Author
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
