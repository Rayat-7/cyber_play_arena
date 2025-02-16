"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "./ui/button"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Facebook, Instagram } from "lucide-react"

const navItems = ["Slots", "Games", "Pricing", "Contact", "Admin"]

const Navbar = () => {
  const navContainerRef = useRef<HTMLDivElement>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <div
        ref={navContainerRef}
        className={`fixed inset-x-0 top-4 z-50 h-16 border-none 
                transition-all duration-700 sm:inset-x-6 border rounded-xl
                ${isScrolled ? "bg-black" : "bg-transparent"}`}
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            <div className="flex items-center gap-7">
              <Link href="/">
                <Image src="/logo.png" width={50} height={50} alt="logo"  />
              </Link>
              <Link 
    href="https://www.facebook.com/profile.php?id=61568297034414" 
    target="_blank"
    className=" p-1 sm:p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group"
  >
    <Facebook className="w-6 h-6 sm:w-5 sm:h-5 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
              </Link>
            <Link 
    href="https://www.instagram.com/cyberplayarena/?hl=en" 
    target="_blank"
    className="p-1 sm:p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group"
  >
    <Instagram className="w-6 h-6 sm:w-5 sm:h-5 text-pink-500 group-hover:scale-110 transition-transform duration-300" />
            </Link>
            </div>
            <div className="flex h-full items-center">
              <div className="hidden md:block">
                {navItems.slice(0, -1).map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="relative ms-10 text-xs uppercase font-bold text-yellow-400 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-yellow-400 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100 dark:after:bg-orange cursor-pointer"
                  >
                    {item}
                  </a>
                ))}
              </div>
              <Button
                asChild
                size="sm"
                variant="ghost"
                className="hidden md:inline-flex text-xs bg-transparent border-b-2 border-yellow-500 text-yellow-500 uppercase ml-7 font-bold space-x-0.5 sm:mr-15"
              >
                <Link href="/admin/login">Admin</Link>
              </Button>
              <div className="md:hidden ml-4">
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
                  <Menu className="h-6 w-6 text-yellow-400" />
                </Button>
              </div>
            </div>
          </nav>
        </header>
      </div>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 md:hidden">
          <div className="flex justify-end p-4">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="h-6 w-6 text-yellow-400" />
            </Button>
          </div>
          <div className="flex flex-col items-center space-y-8 pt-16">
            {navItems.map((item) => (
              <a
                key={item}
                href={item === "Admin" ? "/admin/login" : `#${item.toLowerCase()}`}
                className="text-xl font-medium text-yellow-400 hover:text-yellow-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar

