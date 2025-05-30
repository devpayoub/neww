"use client"

import { useState, useEffect } from 'react'
import { blogApi } from '@/lib/api'
import type { BlogPost } from '@/lib/types'
import { PlusCircle, Edit, Trash } from 'lucide-react'
import Link from 'next/link'

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    loadPosts()
  }, [])

  async function loadPosts() {
    try {
      const data = await blogApi.getAll()
      setPosts(data)
    } catch (error) {
      console.error('Error loading posts:', error)
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await blogApi.delete(id)
        setPosts(posts.filter(post => post.id !== id))
      } catch (error) {
        console.error('Error deleting post:', error)
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Blog Posts Management</h1>
        <Link
          href="/admin/blog/new"
          className="bg-[#1D1046] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#2d1a69]"
        >
          <PlusCircle className="w-5 h-5" />
          New Post
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{post.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {post.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link
                      href={`/admin/blog/edit/${post.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}