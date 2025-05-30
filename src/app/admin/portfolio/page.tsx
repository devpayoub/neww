"use client"

import { useState, useEffect } from 'react'
import { portfolioApi } from '@/lib/api'
import type { Portfolio } from '@/lib/types'
import { PlusCircle, Edit, Trash } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<Portfolio[]>([])

  useEffect(() => {
    loadProjects()
  }, [])

  async function loadProjects() {
    try {
      const data = await portfolioApi.getAll()
      setProjects(data)
    } catch (error) {
      console.error('Error loading projects:', error)
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await portfolioApi.delete(id)
        setProjects(projects.filter(project => project.id !== id))
      } catch (error) {
        console.error('Error deleting project:', error)
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Portfolio Management</h1>
        <Link
          href="/admin/portfolio/new"
          className="bg-[#1D1046] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#2d1a69]"
        >
          <PlusCircle className="w-5 h-5" />
          New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                {project.category}
              </span>
              <div className="mt-4 flex justify-end space-x-2">
                <Link
                  href={`/admin/portfolio/edit/${project.id}`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <Edit className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}