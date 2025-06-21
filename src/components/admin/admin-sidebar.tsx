"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  ChevronDown, 
  ChevronRight,
  PenSquare,
  List,
  Tag,
  User,
  LogOut
} from "lucide-react"
import { signOut } from "@/lib/auth-service"
import { useRouter } from "next/navigation"

type MenuItem = {
  title: string
  path?: string
  icon: React.ReactNode
  submenu?: MenuItem[]
}

export default function AdminSidebar() {
  const pathname = usePathname()
  const [openSubmenu, setOpenSubmenu] = useState<string | null>("blog")
  const router = useRouter()

  const menuItems: MenuItem[] = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      title: "Blog",
      icon: <FileText className="w-5 h-5" />,
      submenu: [
        {
          title: "All Posts",
          path: "/admin/blog/posts",
          icon: <List className="w-4 h-4" />,
        },
        {
          title: "Add New Post",
          path: "/admin/blog/posts/new",
          icon: <PenSquare className="w-4 h-4" />,
        },
        {
          title: "Categories",
          path: "/admin/blog/categories",
          icon: <Tag className="w-4 h-4" />,
        },
        {
          title: "Authors",
          path: "/admin/blog/authors",
          icon: <User className="w-4 h-4" />,
        }
      ],
    },
    {
      title: "Users",
      path: "/admin/users",
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "Settings",
      path: "/admin/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ]

  const toggleSubmenu = (title: string) => {
    if (openSubmenu === title) {
      setOpenSubmenu(null)
    } else {
      setOpenSubmenu(title)
    }
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (!error) {
      router.push("/admin/login")
    }
  }

  const renderMenuItem = (item: MenuItem) => {
    // Item with submenu
    if (item.submenu) {
      return (
        <div key={item.title} className="mb-1">
          <button
            onClick={() => toggleSubmenu(item.title)}
            className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-300 hover:bg-[#2d1a69] rounded-lg transition-colors"
          >
            <div className="flex items-center">
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </div>
            {openSubmenu === item.title ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          
          {openSubmenu === item.title && (
            <div className="pl-4 mt-1 space-y-1">
              {item.submenu.map((subItem) => (
                <Link
                  key={subItem.title}
                  href={subItem.path || "#"}
                  className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                    isActive(subItem.path || "") 
                      ? "bg-[#3a1d8a] text-white" 
                      : "text-gray-300 hover:bg-[#2d1a69]"
                  }`}
                >
                  {subItem.icon}
                  <span className="ml-3">{subItem.title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )
    }
    
    // Regular menu item
    return (
      <Link
        key={item.title}
        href={item.path || "#"}
        className={`flex items-center px-4 py-3 mb-1 rounded-lg transition-colors ${
          isActive(item.path || "") 
            ? "bg-[#3a1d8a] text-white" 
            : "text-gray-300 hover:bg-[#2d1a69]"
        }`}
      >
        {item.icon}
        <span className="ml-3">{item.title}</span>
      </Link>
    )
  }

  return (
    <div className="w-64 bg-[#1D1046] text-white min-h-screen p-4">
      <div className="flex items-center justify-center p-4 mb-6">
        <div className="relative h-12 w-full flex items-center justify-center">
          <Image 
            src="/images/logo.png" 
            alt="Think Trend Logo" 
            width={140} 
            height={40} 
            className="object-contain"
          />
        </div>
      </div>
      
      <div className="space-y-1">
        {menuItems.map(renderMenuItem)}
      </div>

      <div className="mt-8 pt-4 border-t border-[#2d1a69]">
        <button
          onClick={handleSignOut}
          className="flex items-center px-4 py-3 w-full text-left rounded-lg text-gray-300 hover:bg-[#2d1a69] transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="ml-3">Sign Out</span>
        </button>
      </div>
    </div>
  )
}
