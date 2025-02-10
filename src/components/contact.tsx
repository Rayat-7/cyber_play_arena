import { Facebook, Instagram, MapPin, Phone } from 'lucide-react'
import Link from "next/link"
import banner1 from "/banner1.png"
import Image from 'next/image'
export default function Contact() {
  return (
    <section id="contact" className="bg-gradient-to-r from-[#061161] via-[#3b0b47] to-[#780206] text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-white font-zentry">Find Us</h2>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-2">
              <MapPin className="w-5 h-5 mr-2 text-gray-400" />
              <span>Ecb Chattar, Army Market Second Floor, Shop Number 4 ., Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2 text-gray-400" />
              <span>01870-252590</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <Link href="https://maps.app.goo.gl/q7dHozY3mxcDEgqY6" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-white transition-colors">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Google Maps</span>
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=61568297034414" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-white transition-colors">
              <Facebook className="w-5 h-5 mr-2" />
              <span>Facebook</span>
            </Link>
            <Link href="https://www.instagram.com/cyberplayarena/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-white transition-colors">
              <Instagram className="w-5 h-5 mr-2" />
              <span>Instagram</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

