"use client"
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { CustomerSlotViewer } from "@/components/Public-slot";
import Contact from "@/components/contact";
import { Footer } from "@/components/footer";
import {Pricing} from "@/components/pricing";
export default function Home() {
  return (
    <main className="bg-[conic-gradient(var(--tw-gradient-stops))] from-[#f3f8ff] via-[#deecff] to-[#c6cfff]">
      <Navbar/>
      <Hero/>
      <CustomerSlotViewer/>
      <Pricing/>
      <Contact/>
      <Footer/>
    </main>
  );
}
///bg-[conic-gradient(var(--tw-gradient-stops))] from-[#f3f8ff] via-[#deecff] to-[#c6cfff]
//bg-gradient-to-tr from-neutral-500 via-gray-300 to-cyan-900