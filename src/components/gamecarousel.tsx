"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

const games = [
  { id: 1, name: "FIFA 24", image: "/fifa.webp" },
  { id: 2, name: "Mortal Kombat 11", image: "/mortalcombat.webp" },
  { id: 3, name: "GTA V", image: "/GTA.webp" },
  { id: 4, name: "UFC 4", image: "/ufc.webp" },
  { id: 5, name: "WWE 2K23", image: "/wwe2k23.webp" },
  { id: 6, name: "Spider-Man 2", image: "/spidermanmiles.webp" },
  { id: 7, name: "God of War Ragnarök", image: "/godofwar.webp" },
  { id: 8, name: "Ghost", image: "/ghost.webp" },
  { id: 9, name: "Injustice 2", image: "/injustice2.webp" },
  { id: 10, name: "Need for Speed", image: "/nfs.webp" },
  { id: 11, name: "Jump Force", image: "/jumpforce.webp" },
  {id:  12,name:"Red Dead Redemption",image:"/red-dead.webp"}
]

export function GamesCarousel() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible || !containerRef.current || isPaused) return

    const scrollContainer = containerRef.current
    let animationFrameId: number

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollContainer.scrollLeft += 1
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollContainer.scrollLeft = 0
        }
        animationFrameId = requestAnimationFrame(scroll)
      }
    }

    animationFrameId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isVisible, isPaused])

  if (!isVisible) {
    return (
      <section  ref={sectionRef} className="w-full py-16 bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a]">
        <h2 className="text-center font-zentry bg-gradient-to-r from-yellow-900 via-red-600 to-orange-400 bg-clip-text text-transparent mb-12">
          Games
        </h2>
        <div className="w-full h-[400px] bg-gray-800/50 animate-pulse rounded-lg"></div>
      </section>
    )
  }

  return (
    <section id="games" className="w-full py-16 bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a] overflow-hidden">
      <h2 className="text-center font-zentry text-6xl bg-gradient-to-t from-yellow-900 via-red-600 to-orange-400 bg-clip-text text-transparent  special-font mb-12">
        <span className="font-bold">G</span>
        <span className="font-bold">A</span>
        <span>M</span>
        <span className="font-bold">E</span>
        <span>S</span>
      </h2>
      <div className="relative  w-screen    ">
        <div
          ref={containerRef}
          className="overflow-x-hidden relative scroll-smooth"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex gap-3 sm:gap-4 md:gap-6 py-4 animate-scroll hover:animation-play-state-paused">
            {[...games, ...games].map((game, index) => (
              <div key={`${game.id}-${index}`} className="flex-none w-32 sm:w-40 md:w-48 lg:w-56">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden group">
                  <Image
                    src={game.image || "/placeholder.svg"}
                    alt={game.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="mt-4 uppercase text-center text-xs sm:text-sm md:text-base font-bold text-yellow-400 truncate">
                  {game.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}











