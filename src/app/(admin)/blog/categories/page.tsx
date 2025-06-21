"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"
import { getAllCategories, createCategory, updateCategory, deleteCategory } from "@/lib/blog-service"
import LoadingSpinner from "@/components/ui/loading-spinner"

type Category = {
  id: number
  name: string
  count: number
}

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Form state
  const [newCategory, setNewCategory] = useState("")
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editName, setEditName] = useState("")

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true)
        const data = await getAllCategories()
        setCategories(data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    })
  }, [])

  // Handle adding a new category
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newCategory.trim()) {
      return
    }
    
    try {
      setIsSubmitting(true)
      const newCategoryData = await createCategory({ name: newCategory.trim() })
      setCategories([...categories, newCategoryData])
      setNewCategory("")
    } catch (error) {
      console.error("Error adding category:", error)
      alert("Failed to add category. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle editing a category
  const startEditing = (category: Category) => {
    setEditingCategory(category)
    setEditName(category.name)
  }

  const cancelEditing = () => {
    setEditingCategory(null)
    setEditName("")
  }

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!editName.trim() || !editingCategory) {
      return
    }
    
    try {
      setIsSubmitting(true)
      await updateCategory(editingCategory.id, { name: editName.trim() })
      
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id ? { ...cat, name: editName.trim() } : cat
      ))
      
      setEditingCategory(null)
      setEditName("")
    } catch (error) {
      console.error("Error updating category:", error)
      alert("Failed to update category. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle deleting a category
  const handleDeleteCategory = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this category? This action cannot be undone.")) {
      try {
        setIsSubmitting(true)
        await deleteCategory(id)
        setCategories(categories.filter(cat => cat.id !== id))
      } catch (error) {
        console.error("Error deleting category:", error)
        alert("Failed to delete category. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="space-y-8">
      <div data-aos="fade-up" className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
        <p className="text-gray-600 mt-2">Manage blog categories</p>
      </div>

      {/* Add New Category */}
      <div data-aos="fade-up" className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Add New Category</h2>
        
        <form onSubmit={handleAddCategory} className="flex items-end gap-4">
          <div className="flex-1">
            <label htmlFor="newCategory" className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              id="newCategory"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent"
              placeholder="Enter category name"
              disabled={isSubmitting}
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting || !newCategory.trim()}
            className="inline-flex items-center bg-[#1D1046] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#2d1a69] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <LoadingSpinner size="small" className="mr-2" />
            ) : (
              <Plus className="h-5 w-5 mr-2" />
            )}
            Add Category
          </button>
        </form>
      </div>

      {/* Categories List */}
      <div data-aos="fade-up" data-aos-delay="100" className="bg-white rounded-xl shadow-md overflow-hidden">
        <h2 className="text-xl font-bold text-gray-800 p-6 border-b">All Categories</h2>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="large" />
          </div>
        ) : categories.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posts Count
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingCategory?.id === category.id ? (
                        <form onSubmit={handleUpdateCategory} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D1046] focus:border-transparent"
                            autoFocus
                          />
                          <button
                            type="submit"
                            disabled={isSubmitting || !editName.trim()}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Save className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            onClick={cancelEditing}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </form>
                      ) : (
                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{category.count}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {editingCategory?.id !== category.id && (
                        <>
                          <button
                            onClick={() => startEditing(category)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                            disabled={isSubmitting}
                          >
                            <Edit className="h-5 w-5 inline" />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className="text-red-600 hover:text-red-900"
                            disabled={isSubmitting}
                          >
                            <Trash2 className="h-5 w-5 inline" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No categories found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
