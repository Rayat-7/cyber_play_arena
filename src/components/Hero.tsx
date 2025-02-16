"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  const scrollToSlots = () => {
    const slotsSection = document.getElementById("slots")
    slotsSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative h-[100svh] md:h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/IMG_0798.webp"
          alt="Hero background"
          fill
          
          quality={100}
          placeholder="blur"
          blurDataURL="data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center top",
          }}
          onLoadingComplete={() => setIsLoaded(true)}
          className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        />
      </div>


      <div className="relative z-10 text-center space-y-5 max-w-4xl mx-auto px-4">
      
        <div className="text-2xl md:text-6xl font-bold leading-tight">
          <h1 className="text-xl md:text-2xl md:pb-0 font-bold leading-tight bg-gradient-to-b from-[#f59e0b] via-[#f59e0b] to-[#ea580c] text-transparent bg-clip-text uppercase">
            Welcome To
          </h1>
          <h1 className="text-6xl md:text-8xl font-bold leading-tight bg-gradient-to-l from-yellow-400 via-orange-500 to-yellow-500 text-transparent bg-clip-text font-zentry special-font uppercase">
            C<b>y</b>ber Pl<b>a</b>y <b>A</b>re<b>n</b><b>A</b>
          </h1>
        </div>
        <p className="hidden md:block text-lg md:text-2xl opacity-100 bg-gradient-to-r from-[#ff7a70] to-[#f59e0b] text-transparent pb-6 bg-clip-text capitalize font-semibold">
        Game. Laugh. Win. Repeat – The Place to Be!
</p>

        <Button
          size="lg"
          className="bg-gradient-to-b from-[#f59e0b] via-[#f59e0b] to-[#ea580c] text-black font-bold uppercase animate-bounce rounded-3xl"
          onClick={scrollToSlots}
        >
          Check Available Slots
        </Button>
      </div>
    </section>
  )
}

export default Hero




// "use client"

// import { Button } from "@/components/ui/button"
// import Image from "next/image"
// import { useState, useEffect } from "react"

// const Hero = () => {
//   const [isLoaded, setIsLoaded] = useState(false)

//   useEffect(() => {
//     // Remove the manual preloading as Next.js Image component handles this
//     setIsLoaded(true)
//   }, [])

//   const scrollToSlots = () => {
//     const slotsSection = document.getElementById("slots")
//     slotsSection?.scrollIntoView({ behavior: "smooth" })
//   }

//   return (
//     <section className="relative h-[100svh] md:h-screen flex items-center justify-center overflow-hidden">
//       <div className="absolute inset-0">
//         <Image
//           src="/IMG_0798.webp"
//           alt="Hero background"
//           fill
//           priority
//           quality={100}
//           sizes="(max-width: 768px) 100vw, 100vw"
//           style={{
//             objectFit: "cover",
//             objectPosition: "center top",
//           }}
//           className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
//         />
//       </div>
//       <div className="absolute inset-0 bg-black/30 z-[1]" aria-hidden="true" />
//       <div className="relative z-10 text-center space-y-5 max-w-4xl mx-auto px-4">
//         <div className="text-2xl md:text-6xl font-bold leading-tight">
//           <h1 className="text-xl md:text-2xl md:pb-0 font-bold leading-tight bg-gradient-to-b from-[#f59e0b] via-[#f59e0b] to-[#ea580c] text-transparent bg-clip-text uppercase">
//             Welcome To
//           </h1>
//           <h1 className="text-6xl md:text-8xl font-bold leading-tight bg-gradient-to-l from-yellow-400 via-orange-500 to-yellow-500 text-transparent bg-clip-text font-zentry special-font uppercase">
//             C<b>y</b>ber Pl<b>a</b>y Are<b>n</b>a
//           </h1>
//         </div>
//         <p className="text-lg md:text-2xl opacity-100 bg-gradient-to-r sm:hidden from-[#ff7a70] to-[#f59e0b] text-transparent pb-6 bg-clip-text capitalize font-semibold">
//           Your ultimate destination for immersive gaming experiences
//         </p>
//         <Button
//           size="lg"
//           className="bg-gradient-to-b from-[#f59e0b] via-[#f59e0b] to-[#ea580c] text-black font-bold uppercase animate-bounce rounded-3xl"
//           onClick={scrollToSlots}
//         >
//           Check Available Slots
//         </Button>
//       </div>
//     </section>
//   )
// }

// export default Hero




















// import {Button} from "@/components/ui/button"
// const Hero =() =>{
//     return(
//         // bg-gradient-to-b from-black via-gray-900 to-black
//         // bg-gradient-to-bl from-[#ffe4e6] to-[#ccfbf1]
//         <section className=" relative h-screen flex items-center justify-center bg-gradient-to-bl from-[#ffe4e6] to-[#ccfbf1]">
//            <div className="relative z-10 text-center space-y-5 max-w-4xl mx-auto px-4">
//             <div className="text-2xl  md:text-6xl font-bold leading-tight">
//                 <h1 className="text-xl  md:text-3xl font-bold leading-tight">Welcome To</h1> 
//                 <h1 className="text-3xl  md:text-6xl font-bold leading-tight bg-gradient-to-tl from-slate-800
// via-violet-500 to-zinc-400 bg-clip-text text-transparent">Cyber Play Arena</h1>
//             </div>
//             <p className="text-xl md:text-2xl text-foreground capitalize ">
//             Your ultimate destination for immersive gaming experiences
//             </p>
//             <Button
//             size="lg"
//             variant="default">
//                 <a href="#slots">Check Avialable Slots</a>
                
//             </Button>
//            </div>
//         </section>
//     )
// }
// export default Hero



// bg-gradient-to-b from-black via-gray-900 to-black
// bg-gradient-to-bl from-[#ffe4e6] to-[#ccfbf1]
//bg-gradient-to-tr from-black via-purple-800 to-blue-950

//bg-gradient-to-tr from-black via-purple-700 to-blue-950