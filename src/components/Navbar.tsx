import { useRef } from "react"
import { Button } from "./ui/button"
import Image from "next/image"
// import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
// bg-gradient-to-r from-black via-purple-500 to-blue-950 
//bg-gradient-to-r from-violet-900 via-purple-700 to-blue-800
//bg-gradient-to-r from-violet-700 via-blue-900 to-blue-800
const navItems =['Slots','Games','Pricing','Contact']
const Navbar = ()=> {
    const navContainerRef = useRef(null)
    return(
        <div ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none 
        transition-all duration-700 sm:inset-x-6 border rounded-xl   bg-transparent     ">
            <header className="absolute top-1/2 w-full -translate-y-1/2">
            <nav className="flex size-full items-center justify-between p-4">
                <div className="flex items-center gap-7">
                    <Link href="/">
                    <Image src="/logo.png" width={10} height={100} alt="logo" 
                    className="w-10"/>
                    </Link>
                </div>
                <div className="flex h-full items-center">
                    <div className="hidden md:block">
                        {navItems .map((item)=>(
                            <a key={item} href={`#${item.toLowerCase()}`}
                             className="relative ms-10  text-xs uppercase font-bold text-yellow-400 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-yellow-400 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100
                              dark:after:bg-orange cursor-pointer">
                                {item}
                            </a>
                        ))}

                    </div>
                    <Button asChild
                    size="sm"
                    variant="ghost" className="text-xs bg-transparent border-b-2 border-yellow-500 text-yellow-500 uppercase ml-10 font-bold space-x-0.5">
                          <Link href="/admin/login"> Admin Login</Link>
                    </Button>
                   

                </div>
            </nav>
            </header>
        </div>
    )
} 
export default Navbar;