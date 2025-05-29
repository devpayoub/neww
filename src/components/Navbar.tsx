"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronRight, Code, Palette, Megaphone, GraduationCap, Home, Info, Briefcase, BookOpen, Phone, Calendar } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from '@/components/ui/sheet';
import Link from "next/link"
import Image from "next/image";

export default function Navbar() {
    const [open, setOpen] = useState(false)

    const menuItems = [
        { name: "Accueil", href: "/", icon: <Home className="w-5 h-5" /> },
        { name: "À propos", href: "/about", icon: <Info className="w-5 h-5" /> },
        {
            name: "Nos services",
            href: "#",
            icon: <Briefcase className="w-5 h-5" />,
            submenu: [
                { name: "Développement web", href: "/services/development", icon: <Code className="w-5 h-5" /> },
                { name: "Marketing digital", href: "/services/marketing", icon: <Megaphone className="w-5 h-5" /> },
                { name: "Design", href: "/services/design", icon: <Palette className="w-5 h-5" /> },
                { name: "Training", href: "/services/training", icon: <GraduationCap className="w-5 h-5" /> },
            ]
        },
        { name: "Réalisations", href: "/portfolio", icon: <Briefcase className="w-5 h-5" /> },
        { name: "Blog", href: "/blog", icon: <BookOpen className="w-5 h-5" /> },
        { name: "Contact", href: "/contact", icon: <Phone className="w-5 h-5" /> },
    ]

    return (
        <div>
            {/* Bandeau supérieur */}
            <div className="flex text-center justify-center items-center bg-[#1D1046] p-2">
                <h1 className="text-white text-xs sm:text-sm md:text-base px-2 text-center">
                    Prêts à collaborer ? Construisons l&apos;avenir ensemble. Head to Réservez votre appel gratuit maintenant !
                </h1>
            </div>

            {/* Barre de navigation */}
            <div className="bg-white p-2 px-4 md:px-10 sticky top-0 z-50 shadow-sm">
                <nav className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-bold text-[#1D1046]">
                        <Image src="/images/logo.png" alt="Think Trend Logo" width={150} height={150} />
                    </Link>

                    {/* Menu - Desktop */}
                    <ul className="hidden md:flex gap-4 lg:gap-10 items-center">
                        {menuItems.map((item) => (
                            <li key={item.name} className="relative group">
                                {item.submenu ? (
                                    <div className="cursor-pointer flex items-center gap-1 hover:text-[#1D1046]">
                                        <span className="flex items-center gap-1">
                                            {item.icon}
                                            {item.name}
                                        </span>
                                        <ChevronRight className="w-4 h-4 transform group-hover:rotate-90 transition-transform" />
                                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                            {item.submenu.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-[#1D1046]"
                                                >
                                                    {subItem.icon}
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link 
                                        href={item.href} 
                                        className="flex items-center gap-1 hover:text-[#1D1046] transition-colors"
                                    >
                                        {item.icon}
                                        {item.name}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Boutons - Desktop */}
                    <div className="hidden md:flex gap-4">
                        <Link href="/consultation">
                            <Button className="text-white bg-[#1D1046] hover:bg-[#2d1a69] px-4 py-2 rounded-[20px] flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                Consultation gratuite
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="px-4 py-2 rounded-[20px] border-[#1D1046] text-[#1D1046] hover:bg-[#1D1046] hover:text-white">
                                Obtenir un devis
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden flex items-center gap-2">
                        <Link href="/consultation">
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-white bg-[#1D1046] hover:bg-[#2d1a69] px-3 py-1 rounded-[20px] text-xs flex items-center gap-1"
                            >
                                <Calendar className="w-4 h-4" />
                                Consultation
                            </Button>
                        </Link>

                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-[#1D1046] hover:bg-[#1D1046]/10">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Menu</span>
                                </Button>
                            </SheetTrigger>

                            <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-white p-0 border-l-4 border-[#1D1046]">
                                <SheetHeader className="bg-[#1D1046] text-white p-4 flex flex-row justify-between items-center">
                                    <SheetTitle className="text-xl font-bold text-white">Think Trend</SheetTitle>
                                    <SheetClose asChild>
                                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                                            <X className="h-5 w-5" />
                                            <span className="sr-only">Fermer</span>
                                        </Button>
                                    </SheetClose>
                                </SheetHeader>

                                <div className="py-6">
                                    <nav className="flex flex-col">
                                        {menuItems.map((item) => (
                                            <div key={item.name}>
                                                {item.submenu ? (
                                                    <>
                                                        <div className="flex items-center justify-between py-3 px-6 border-b border-gray-100">
                                                            <span className="text-lg font-medium text-gray-800 flex items-center gap-2">
                                                                {item.icon}
                                                                {item.name}
                                                            </span>
                                                            <ChevronRight className="h-4 w-4 text-gray-400" />
                                                        </div>
                                                        <div className="bg-gray-50">
                                                            {item.submenu.map((subItem) => (
                                                                <SheetClose asChild key={subItem.name}>
                                                                    <Link
                                                                        href={subItem.href}
                                                                        className="flex items-center gap-2 py-2 px-8 hover:bg-gray-100 text-gray-700"
                                                                    >
                                                                        {subItem.icon}
                                                                        {subItem.name}
                                                                    </Link>
                                                                </SheetClose>
                                                            ))}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <SheetClose asChild>
                                                        <Link
                                                            href={item.href}
                                                            className="flex items-center gap-2 py-3 px-6 hover:bg-gray-50 border-b border-gray-100 group"
                                                        >
                                                            {item.icon}
                                                            <span className="text-lg font-medium text-gray-800 group-hover:text-[#1D1046] transition-colors">
                                                                {item.name}
                                                            </span>
                                                            <ChevronRight className="h-4 w-4 text-gray-400 ml-auto group-hover:text-[#1D1046] transition-transform group-hover:translate-x-1" />
                                                        </Link>
                                                    </SheetClose>
                                                )}
                                            </div>
                                        ))}
                                    </nav>

                                    <div className="px-6 mt-8">
                                        <SheetClose asChild>
                                            <Link href="/contact">
                                                <Button className="w-full bg-[#1D1046] hover:bg-[#2d1a69] text-white rounded-lg py-3 px-4 text-base font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center">
                                                    Obtenir un devis
                                                    <ChevronRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </SheetClose>

                                        <div className="mt-8 flex justify-center space-x-4">
                                            {/* Social links */}
                                            <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-[#1D1046]/10 hover:text-[#1D1046] transition-colors">
                                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                                </svg>
                                            </a>
                                            <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-[#1D1046]/10 hover:text-[#1D1046] transition-colors">
                                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                                                </svg>
                                            </a>
                                            <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-[#1D1046]/10 hover:text-[#1D1046] transition-colors">
                                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </nav>
            </div>
        </div>
    )
}