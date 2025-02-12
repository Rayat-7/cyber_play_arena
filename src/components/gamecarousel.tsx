"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MessagesSquare, Calendar } from "lucide-react"

interface Game {
  id: number
  name: string
  image: string
  type: string
  multiplayer: boolean
  maxPlayers: number
  pricePerHour: {
    onePlayer: number
    twoPlayers: number
    threePlayers: number
    fourPlayers: number
  }
  pricePerHalfHour: {
    onePlayer: number
    twoPlayers: number
    threePlayers: number
    fourPlayers: number
  }
  description: string
}

const games: Game[] = [
  { 
    id: 1, 
    name: "FIFA 24", 
    image: "/fifa.webp",
    type: "Sports",
    multiplayer: true,
    maxPlayers: 4,
    pricePerHour: {
      onePlayer: 80,
      twoPlayers: 140,
      threePlayers: 180,
      fourPlayers: 240
    },
    pricePerHalfHour: {
      onePlayer: 50,
      twoPlayers: 80,
      threePlayers: 120,
      fourPlayers: 160
    },
    description: "Experience the beautiful game with FIFA 24. Features latest teams and enhanced gameplay mechanics."
  },
  { 
    id: 2, 
    name: "Mortal Kombat 11", 
    image: "/mortalcombat.webp",
    type: "Fighting",
    multiplayer: true,
    maxPlayers: 2,
    pricePerHour: {
      onePlayer: 80,
      twoPlayers: 140,
      threePlayers: 0,
      fourPlayers: 0
    },
    pricePerHalfHour: {
      onePlayer: 50,
      twoPlayers: 80,
      threePlayers: 0,
      fourPlayers: 0
    },
    description: "Ultimate fighting game with brutal finishing moves and competitive gameplay."
  },
  { 
    id: 3, 
    name: "GTA V", 
    image: "/GTA.webp",
    type: "Action-Adventure",
    multiplayer: false,
    maxPlayers: 1,
    pricePerHour: {
      onePlayer: 140,
      twoPlayers: 0,
      threePlayers: 0,
      fourPlayers: 0
    },
    pricePerHalfHour: {
      onePlayer: 80,
      twoPlayers: 0,
      threePlayers: 0,
      fourPlayers: 0
    },
    description: "Experience the criminal underworld of Los Santos in this action-packed open-world game."
  },
  { 
    id: 4, 
    name: "UFC 4", 
    image: "/ufc.webp",
    type: "Fighting/Sports",
    multiplayer: true,
    maxPlayers: 2,
    pricePerHour: {
      onePlayer: 80,
      twoPlayers: 140,
      threePlayers: 0,
      fourPlayers: 0
    },
    pricePerHalfHour: {
      onePlayer: 50,
      twoPlayers: 80,
      threePlayers: 0,
      fourPlayers: 0
    },
    description: "Step into the octagon with the most authentic UFC fighting experience."
  },
  { 
    id: 5, 
    name: "WWE 2K23", 
    image: "/wwe2k23.webp",
    type: "Sports/Fighting",
    multiplayer: true,
    maxPlayers: 4,
    pricePerHour: {
      onePlayer: 80,
      twoPlayers: 140,
      threePlayers: 180,
      fourPlayers: 240
    },
    pricePerHalfHour: {
      onePlayer: 50,
      twoPlayers: 80,
      threePlayers: 120,
      fourPlayers: 160
    },
    description: "Experience the excitement of WWE with stunning graphics and realistic wrestling action."
  },
  { 
    id: 6, 
    name: "Spider-Man 2", 
    image: "/spidermanmiles.webp",
    type: "Action-Adventure",
    multiplayer: false,
    maxPlayers: 1,
    pricePerHour: {
      onePlayer: 140,
      twoPlayers: 0,
      threePlayers: 0,
      fourPlayers: 0
    },
    pricePerHalfHour: {
      onePlayer: 80,
      twoPlayers: 0,
      threePlayers: 0,
      fourPlayers: 0
    },
    description: "Swing through New York City as Spider-Man in this thrilling superhero adventure."
  },
  { 
    id: 7, 
    name: "God of War Ragnarök", 
    image: "/godofwar.webp",
    type: "Action-Adventure",
    multiplayer: false,
    maxPlayers: 1,
    pricePerHour: {
      onePlayer: 140,
      twoPlayers: 0,
      threePlayers: 0,
      fourPlayers: 0
    },
    pricePerHalfHour: {
      onePlayer: 80,
      twoPlayers: 0,
      threePlayers: 0,
      fourPlayers: 0
    },
    description: "Join Kratos and Atreus in their epic Norse mythology adventure."
  },
  { 
    id: 8, 
    name: "Ghost of Tsushima", 
    image: "/ghost.webp",
    type: "Action-Adventure",
    multiplayer: false,
    maxPlayers: 1,
    pricePerHour: {
      onePlayer: 140,
      twoPlayers: 0,
      threePlayers: 0,
      fourPlayers: 0
    },
    pricePerHalfHour: {
      onePlayer: 80,
      twoPlayers: 0,
      threePlayers: 0,
      fourPlayers: 0
    },
    description: "Become a legendary samurai warrior in feudal Japan with stunning visuals and combat."
  },
  { 
    id: 9, 
    name: "Injustice 2", 
    image: "/injustice2.webp",
    type: "Fighting",
    multiplayer: true,
    maxPlayers: 2,
    pricePerHour: {
      onePlayer: 80,
      twoPlayers: 140,
      threePlayers: 0,
      fourPlayers: 0
    },
    pricePerHalfHour: {
      onePlayer: 50,
      twoPlayers: 80,
      threePlayers: 0,
      fourPlayers: 0
    },
    description: "Battle with DC superheroes and villains in epic fighting matches."
  },
  { 
    id: 10, 
    name: "Need for Speed", 
    image: "/nfs.webp",
    type: "Racing",
    multiplayer: false,
    maxPlayers: 1,
    pricePerHour: {
      onePlayer: 140,
      twoPlayers: 0,
      threePlayers: 0,
      fourPlayers: 0
    },
    pricePerHalfHour: {
      onePlayer: 80,
      twoPlayers: 0,
      threePlayers: 0,
      fourPlayers: 0
    },
    description: "Experience high-speed street racing with the most exotic cars."
  },
  { 
    id: 11, 
    name: "Jump Force", 
    image: "/jumpforce.webp",
    type: "Fighting",
    multiplayer: true,
    maxPlayers: 2,
    pricePerHour: {
      onePlayer: 80,
      twoPlayers: 140,
      threePlayers: 0,
      fourPlayers: 0
    },
    pricePerHalfHour: {
      onePlayer: 50,
      twoPlayers: 80,
      threePlayers: 0,
      fourPlayers: 0
    },
    description: "Fight with your favorite anime characters in spectacular battles."
  },
  { 
    id: 12,
    name: "Red Dead Redemption",
    image: "/red-dead.webp",
    type: "Action-Adventure",
    multiplayer: false,
    maxPlayers: 1,
    pricePerHour: {
      onePlayer: 140,
      twoPlayers: 0,
      threePlayers: 0,
      fourPlayers: 0
    },
    pricePerHalfHour: {
      onePlayer: 80,
      twoPlayers: 0,
      threePlayers: 0,
      fourPlayers: 0
    },
    description: "Experience the Wild West in this epic open-world adventure."
  }
]

export default function GamesCarousel() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
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
    if (!isVisible || !containerRef.current || isPaused || isDragging) return

    const scrollContainer = containerRef.current
    let animationFrameId: number

    const scroll = () => {
      if (!isPaused && !isDragging && scrollContainer) {
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
  }, [isVisible, isPaused, isDragging])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - containerRef.current!.offsetLeft)
    setScrollLeft(containerRef.current!.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - containerRef.current!.offsetLeft
    const walk = (x - startX) * 2
    containerRef.current!.scrollLeft = scrollLeft - walk
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX - containerRef.current!.offsetLeft)
    setScrollLeft(containerRef.current!.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const x = e.touches[0].pageX - containerRef.current!.offsetLeft
    const walk = (x - startX) * 2
    containerRef.current!.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const handleBooking = (gameName: string) => {
    window.open(`https://m.me/415263521680217?source=qr_link_share&ref=${encodeURIComponent(gameName)}`, '_blank')
  }

  const handleCheckAvailability = () => {
    const slotsSection = document.getElementById('slots')
    if (slotsSection) {
      slotsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!isVisible) {
    return (
      <section ref={sectionRef} className="w-full py-16 bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a]">
        <h2 className="text-center font-zentry bg-gradient-to-r from-yellow-900 via-red-600 to-orange-400 bg-clip-text text-transparent mb-12">
          Games
        </h2>
        <div className="w-full h-[400px] bg-gray-800/50 animate-pulse rounded-lg"></div>
      </section>
    )
  }

  return (
    <section id="games" className="w-full py-16 bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a] overflow-hidden">
      <h2 className="text-center font-zentry text-6xl bg-gradient-to-t from-yellow-900 via-red-600 to-orange-400 bg-clip-text text-transparent special-font mb-12">
        <span className="font-bold">G</span>
        <span className="font-bold">A</span>
        <span>M</span>
        <span className="font-bold">E</span>
        <span>S</span>
      </h2>
      <div className="relative w-screen">
        <div
          ref={containerRef}
          className="overflow-x-hidden relative scroll-smooth cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false)
            setIsDragging(false)
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex gap-3 sm:gap-4 md:gap-6 py-4 animate-scroll hover:animation-play-state-paused">
            {[...games, ...games].map((game, index) => (
              <Dialog key={`${game.id}-${index}`}>
                <DialogTrigger asChild>
                  <div className="flex-none w-32 sm:w-40 md:w-48 lg:w-56 cursor-pointer">
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
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] w-[95vw] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl sm:text-2xl font-bold">{game.name}</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="relative md:aspect-[3.5/4] aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={game.image || "/placeholder.svg"}
                        alt={game.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg object-center top"
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Game Details</h4>
                        <p className="text-sm text-muted-foreground">{game.description}</p>
                        <p className="mt-2 text-sm">
                          <span className="font-semibold">Type:</span> {game.type}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Multiplayer:</span> {game.multiplayer ? 'Yes' : 'No'}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Max Players:</span> {game.maxPlayers}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2 underline flex">Pricing </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm mb-1 font-semibold text-violet-600">Per Hour</h5>
                            <ul className="text-sm space-y-1">
                              <li>1 Player: ৳{game.pricePerHour.onePlayer}</li>
                              {game.pricePerHour.twoPlayers > 0 && (
                                <li>2 Players: ৳{game.pricePerHour.twoPlayers}</li>
                              )}
                              {game.pricePerHour.threePlayers > 0 && (
                                <li>3 Players: ৳{game.pricePerHour.threePlayers}</li>
                              )}
                              {game.pricePerHour.fourPlayers > 0 && (
                                <li>4 Players: ৳{game.pricePerHour.fourPlayers}</li>
                              )}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-sm mb-1 font-semibold text-violet-600">Per 30 Minutes</h5>
                            <ul className="text-sm space-y-1">
                              <li>1 Player: ৳{game.pricePerHalfHour.onePlayer}</li>
                              {game.pricePerHalfHour.twoPlayers > 0 && (
                                <li>2 Players: ৳{game.pricePerHalfHour.twoPlayers}</li>
                              )}
                              {game.pricePerHalfHour.threePlayers > 0 && (
                                <li>3 Players: ৳{game.pricePerHalfHour.threePlayers}</li>
                              )}
                              {game.pricePerHalfHour.fourPlayers > 0 && (
                                <li>4 Players: ৳{game.pricePerHalfHour.fourPlayers}</li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4 flex-col sm:flex-row">
                        <Button 
                          className="flex-1"
                          onClick={() => handleBooking(game.name)}
                        >
                          <MessagesSquare className="mr-2 h-4 w-4" />
                          Book Now
                        </Button>
                        <DialogTrigger asChild>
                          <Button 
                            variant="secondary"
                            className="flex-1"
                            onClick={handleCheckAvailability}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            Check Slots
                          </Button>
                        </DialogTrigger>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// export { GamesCarousel }










// "use client"

// import { useState, useEffect, useRef } from "react"
// import Image from "next/image"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { MessagesSquare, Calendar, ChevronLeft, ChevronRight } from "lucide-react"

// interface Game {
//   id: number
//   name: string
//   image: string
//   type: string
//   multiplayer: boolean
//   maxPlayers: number
//   pricePerHour: {
//     onePlayer: number
//     twoPlayers: number
//     threePlayers: number
//     fourPlayers: number
//   }
//   pricePerHalfHour: {
//     onePlayer: number
//     twoPlayers: number
//     threePlayers: number
//     fourPlayers: number
//   }
//   description: string
// }

// const games: Game[] = [
//   {
//     id: 1,
//     name: "FIFA 24",
//     image: "/fifa.webp",
//     type: "Sports",
//     multiplayer: true,
//     maxPlayers: 4,
//     pricePerHour: {
//       onePlayer: 140,
//       twoPlayers: 140,
//       threePlayers: 240,
//       fourPlayers: 240,
//     },
//     pricePerHalfHour: {
//       onePlayer: 80,
//       twoPlayers: 80,
//       threePlayers: 160,
//       fourPlayers: 160,
//     },
//     description: "Experience the beautiful game with FIFA 24. Features latest teams and enhanced gameplay mechanics.",
//   },
//   {
//     id: 2,
//     name: "Mortal Kombat 11",
//     image: "/mortalcombat.webp",
//     type: "Fighting",
//     multiplayer: true,
//     maxPlayers: 2,
//     pricePerHour: {
//       onePlayer: 140,
//       twoPlayers: 140,
//       threePlayers: 0,
//       fourPlayers: 0,
//     },
//     pricePerHalfHour: {
//       onePlayer: 80,
//       twoPlayers: 80,
//       threePlayers: 0,
//       fourPlayers: 0,
//     },
//     description: "Ultimate fighting game with brutal finishing moves and competitive gameplay.",
//   },
//   {
//     id: 3,
//     name: "GTA V",
//     image: "/GTA.webp",
//     type: "Action-Adventure",
//     multiplayer: false,
//     maxPlayers: 1,
//     pricePerHour: {
//       onePlayer: 140,
//       twoPlayers: 0,
//       threePlayers: 0,
//       fourPlayers: 0,
//     },
//     pricePerHalfHour: {
//       onePlayer: 80,
//       twoPlayers: 0,
//       threePlayers: 0,
//       fourPlayers: 0,
//     },
//     description: "Experience the criminal underworld of Los Santos in this action-packed open-world game.",
//   },
//   {
//     id: 4,
//     name: "UFC 4",
//     image: "/ufc.webp",
//     type: "Fighting/Sports",
//     multiplayer: true,
//     maxPlayers: 2,
//     pricePerHour: {
//       onePlayer: 140,
//       twoPlayers: 140,
//       threePlayers: 0,
//       fourPlayers: 0,
//     },
//     pricePerHalfHour: {
//       onePlayer: 80,
//       twoPlayers: 80,
//       threePlayers: 0,
//       fourPlayers: 0,
//     },
//     description: "Step into the octagon with the most authentic UFC fighting experience.",
//   },
//   {
//     id: 5,
//     name: "WWE 2K23",
//     image: "/wwe2k23.webp",
//     type: "Sports/Fighting",
//     multiplayer: true,
//     maxPlayers: 4,
//     pricePerHour: {
//       onePlayer: 140,
//       twoPlayers: 140,
//       threePlayers: 240,
//       fourPlayers: 240,
//     },
//     pricePerHalfHour: {
//       onePlayer: 80,
//       twoPlayers: 80,
//       threePlayers: 160,
//       fourPlayers: 160,
//     },
//     description: "Experience the excitement of WWE with stunning graphics and realistic wrestling action.",
//   },
//   {
//     id: 6,
//     name: "Spider-Man 2",
//     image: "/spidermanmiles.webp",
//     type: "Action-Adventure",
//     multiplayer: false,
//     maxPlayers: 1,
//     pricePerHour: {
//       onePlayer: 140,
//       twoPlayers: 0,
//       threePlayers: 0,
//       fourPlayers: 0,
//     },
//     pricePerHalfHour: {
//       onePlayer: 80,
//       twoPlayers: 0,
//       threePlayers: 0,
//       fourPlayers: 0,
//     },
//     description: "Swing through New York City as Spider-Man in this thrilling superhero adventure.",
//   },
//   {
//     id: 7,
//     name: "God of War Ragnarök",
//     image: "/godofwar.webp",
//     type: "Action-Adventure",
//     multiplayer: false,
//     maxPlayers: 1,
//     pricePerHour: {
//       onePlayer: 140,
//       twoPlayers: 0,
//       threePlayers: 0,
//       fourPlayers: 0,
//     },
//     pricePerHalfHour: {
//       onePlayer: 80,
//       twoPlayers: 0,
//       threePlayers: 0,
//       fourPlayers: 0,
//     },
//     description: "Join Kratos and Atreus in their epic Norse mythology adventure.",
//   },
//   {
//     id: 8,
//     name: "Ghost",
//     image: "/ghost.webp",
//     type: "Action-Adventure",
//     multiplayer: false,
//     maxPlayers: 1,
//     pricePerHour: {
//       onePlayer: 140,
//       twoPlayers: 0,
//       threePlayers: 0,
//       fourPlayers: 0,
//     },
//     pricePerHalfHour: {
//       onePlayer: 80,
//       twoPlayers: 0,
//       threePlayers: 0,
//       fourPlayers: 0,
//     },
//     description: "Become a legendary samurai warrior in feudal Japan with stunning visuals and combat.",
//   },
//   {
//     id: 9,
//     name: "Injustice 2",
//     image: "/injustice2.webp",
//     type: "Fighting",
//     multiplayer: true,
//     maxPlayers: 2,
//     pricePerHour: {
//       onePlayer: 140,
//       twoPlayers: 140,
//       threePlayers: 0,
//       fourPlayers: 0,
//     },
//     pricePerHalfHour: {
//       onePlayer: 80,
//       twoPlayers: 80,
//       threePlayers: 0,
//       fourPlayers: 0,
//     },
//     description: "Battle with DC superheroes and villains in epic fighting matches.",
//   },
//   {
//     id: 10,
//     name: "Need for Speed",
//     image: "/nfs.webp",
//     type: "Racing",
//     multiplayer: true,
//     maxPlayers: 2,
//     pricePerHour: {
//       onePlayer: 140,
//       twoPlayers: 140,
//       threePlayers: 0,
//       fourPlayers: 0,
//     },
//     pricePerHalfHour: {
//       onePlayer: 80,
//       twoPlayers: 80,
//       threePlayers: 0,
//       fourPlayers: 0,
//     },
//     description: "Experience high-speed street racing with the most exotic cars.",
//   },
//   {
//     id: 11,
//     name: "Jump Force",
//     image: "/jumpforce.webp",
//     type: "Fighting",
//     multiplayer: true,
//     maxPlayers: 2,
//     pricePerHour: {
//       onePlayer: 140,
//       twoPlayers: 140,
//       threePlayers: 0,
//       fourPlayers: 0,
//     },
//     pricePerHalfHour: {
//       onePlayer: 80,
//       twoPlayers: 80,
//       threePlayers: 0,
//       fourPlayers: 0,
//     },
//     description: "Fight with your favorite anime characters in spectacular battles.",
//   },
//   {
//     id: 12,
//     name: "Red Dead Redemption",
//     image: "/red-dead.webp",
//     type: "Action-Adventure",
//     multiplayer: false,
//     maxPlayers: 1,
//     pricePerHour: {
//       onePlayer: 140,
//       twoPlayers: 0,
//       threePlayers: 0,
//       fourPlayers: 0,
//     },
//     pricePerHalfHour: {
//       onePlayer: 80,
//       twoPlayers: 0,
//       threePlayers: 0,
//       fourPlayers: 0,
//     },
//     description: "Experience the Wild West in this epic open-world adventure.",
//   },
// ]

// export function GamesCarousel() {
//   const [isVisible, setIsVisible] = useState(false)
//   const [isPaused, setIsPaused] = useState(false)
//   const containerRef = useRef<HTMLDivElement>(null)
//   const sectionRef = useRef<HTMLElement>(null)

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true)
//           observer.unobserve(entry.target)
//         }
//       },
//       { threshold: 0.1 },
//     )

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current)
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current)
//       }
//     }
//   }, [])

//   // 
//   useEffect(() => {
//     if (!isVisible || !containerRef.current || isPaused) return;
  
//     const scrollContainer = containerRef.current;
//     let animationFrameId: number;
  
//     const scroll = () => {
//       if (!scrollContainer) return;
  
//       scrollContainer.scrollLeft += 1;
  
//       if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
//         scrollContainer.scrollLeft = 0;
//       }
  
//       animationFrameId = requestAnimationFrame(scroll);
//     };
  
//     animationFrameId = requestAnimationFrame(scroll);
  
//     return () => cancelAnimationFrame(animationFrameId);
//   }, [isVisible, isPaused]);
  

//   const handleBooking = (gameName: string) => {
//     window.open(`https://m.me/415263521680217?source=qr_link_share&ref=${encodeURIComponent(gameName)}`, "_blank")
//   }

//   const handleCheckAvailability = () => {
//     const slotsSection = document.getElementById("slots")
//     if (slotsSection) {
//       slotsSection.scrollIntoView({ behavior: "smooth" })
//     }
//   }

//   const scroll = (direction: "left" | "right") => {
//     if (containerRef.current) {
//       const scrollAmount = direction === "left" ? -300 : 300
//       containerRef.current.scrollBy({
//         left: scrollAmount,
//         behavior: "smooth",
//       })
//     }
//   }

//   if (!isVisible) {
//     return (
//       <section ref={sectionRef} className="w-full py-16 bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a]">
//         <h2 className="text-center font-zentry bg-gradient-to-r from-yellow-900 via-red-600 to-orange-400 bg-clip-text text-transparent mb-12">
//           Games
//         </h2>
//         <div className="w-full h-[400px] bg-gray-800/50 animate-pulse rounded-lg"></div>
//       </section>
//     )
//   }

//   return (
//     <section
//       id="games"
//       className="w-full py-16 bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a] "
//     >
//       <h2 className="text-center font-zentry text-6xl bg-gradient-to-t from-yellow-900 via-red-600 to-orange-400 bg-clip-text text-transparent special-font mb-12">
//         <span className="font-bold">G</span>
//         <span className="font-bold">A</span>
//         <span>M</span>
//         <span className="font-bold">E</span>
//         <span>S</span>
//       </h2>
//       <div className="relative w-screen">
//         <button
//           onClick={() => scroll("left")}
//           className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white rounded-full p-2"
//           aria-label="Scroll left"
//         >
//           <ChevronLeft className="w-6 h-6" />
//         </button>
//         <button
//           onClick={() => scroll("right")}
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white rounded-full p-2"
//           aria-label="Scroll right"
//         >
//           <ChevronRight className="w-6 h-6" />
//         </button>
//         <div
//           ref={containerRef}
//           className="overflow-x-auto scrollbar-hide  custom-scrollbar relative scroll-smooth"
//           onMouseEnter={() => setIsPaused(true)}
//           onMouseLeave={() => setIsPaused(false)}
//         >
//           <div className="flex gap-3 sm:gap-4 scrollbar-hide md:gap-6 py-4 animate-scroll  hover:animation-play-state-paused">
//             {[...games, ...games].map((game, index) => (
//               <Dialog key={`${game.id}-${index}`}>
//                 <DialogTrigger asChild>
//                   <div className="flex-none w-32 sm:w-40 md:w-48 lg:w-56 cursor-pointer overflow-hidden">
//                     <div className="relative aspect-[3/4] rounded-lg overflow-hidden group">
//                       <Image
//                         src={game.image || "/placeholder.svg"}
//                         alt={game.name}
//                         layout="fill"
//                         objectFit="cover"
//                         className="transition-transform duration-300 group-hover:scale-110"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                     </div>
//                     <h3 className="mt-4 uppercase text-center text-xs sm:text-sm md:text-base font-bold text-yellow-400 truncate">
//                       {game.name}
//                     </h3>
//                   </div>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
//                   <DialogHeader>
//                     <DialogTitle className="text-2xl font-bold">{game.name}</DialogTitle>
//                   </DialogHeader>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
//                       <Image
//                         src={game.image || "/placeholder.svg"}
//                         alt={game.name}
//                         layout="fill"
//                         objectFit="cover"
//                         className="rounded-lg"
//                       />
//                     </div>
//                     <div className="space-y-4">
//                       <div>
//                         <h4 className="font-semibold text-lg mb-2">Game Details</h4>
//                         <p className="text-sm text-muted-foreground">{game.description}</p>
//                         <p className="mt-2 text-sm">
//                           <span className="font-semibold">Type:</span> {game.type}
//                         </p>
//                         <p className="text-sm">
//                           <span className="font-semibold">Multiplayer:</span> {game.multiplayer ? "Yes" : "No"}
//                         </p>
//                         <p className="text-sm">
//                           <span className="font-semibold">Max Players:</span> {game.maxPlayers}
//                         </p>
//                       </div>
//                       <div>
//                         <h4 className="font-semibold text-lg mb-2">Pricing</h4>
//                         <div className="grid grid-cols-2 gap-4">
//                           <div>
//                             <h5 className="font-medium text-sm mb-1">Per Hour</h5>
//                             <ul className="text-sm space-y-1">
//                               <li>1 Player: {game.pricePerHour.onePlayer} taka</li>
//                               {game.pricePerHour.twoPlayers > 0 && (
//                                 <li>2 Players: {game.pricePerHour.twoPlayers} taka</li>
//                               )}
//                               {game.pricePerHour.threePlayers > 0 && (
//                                 <li>3 Players: {game.pricePerHour.threePlayers} taka</li>
//                               )}
//                               {game.pricePerHour.fourPlayers > 0 && (
//                                 <li>4 Players: {game.pricePerHour.fourPlayers} taka</li>
//                               )}
//                             </ul>
//                           </div>
//                           <div>
//                             <h5 className="font-medium text-sm mb-1">Per 30 Minutes</h5>
//                             <ul className="text-sm space-y-1">
//                               <li>1 Player: {game.pricePerHalfHour.onePlayer} taka</li>
//                               {game.pricePerHalfHour.twoPlayers > 0 && (
//                                 <li>2 Players: {game.pricePerHalfHour.twoPlayers} taka</li>
//                               )}
//                               {game.pricePerHalfHour.threePlayers > 0 && (
//                                 <li>3 Players: {game.pricePerHalfHour.threePlayers} taka</li>
//                               )}
//                               {game.pricePerHalfHour.fourPlayers > 0 && (
//                                 <li>4 Players: {game.pricePerHalfHour.fourPlayers} taka</li>
//                               )}
//                             </ul>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex gap-4">
//                         <Button className="flex-1" onClick={() => handleBooking(game.name)}>
//                           <MessagesSquare className="mr-2 h-4 w-4" />
//                           Book Now
//                         </Button>
//                         <DialogTrigger asChild>
//                           <Button variant="secondary" className="flex-1" onClick={handleCheckAvailability}>
//                             <Calendar className="mr-2 h-4 w-4" />
//                             Check Slots
//                           </Button>
//                         </DialogTrigger>
//                       </div>
//                     </div>
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }



















// "use client"

// import { useState, useEffect, useRef } from "react"
// import Image from "next/image"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { MessagesSquare, Calendar } from "lucide-react"

// interface Game {
//   id: number
//   name: string
//   image: string
//   type: string
//   multiplayer: boolean
//   maxPlayers: number
//   pricePerHour: {
//     onePlayer: number
//     twoPlayers: number
//     threePlayers: number
//     fourPlayers: number
//   }
//   pricePerHalfHour: {
//     onePlayer: number
//     twoPlayers: number
//     threePlayers: number
//     fourPlayers: number
//   }
//   description: string
// }

// const games: Game[] = [
//   { 
//     id: 1, 
//     name: "FIFA 24", 
//     image: "/fifa.webp",
//     type: "Sports",
//     multiplayer: true,
//     maxPlayers: 4,
//     pricePerHour: {
//       onePlayer: 10,
//       twoPlayers: 15,
//       threePlayers: 20,
//       fourPlayers: 25
//     },
//     pricePerHalfHour: {
//       onePlayer: 6,
//       twoPlayers: 9,
//       threePlayers: 12,
//       fourPlayers: 15
//     },
//     description: "Experience the beautiful game with FIFA 24. Features latest teams and enhanced gameplay mechanics."
//   },
//   { 
//     id: 2, 
//     name: "Mortal Kombat 11", 
//     image: "/mortalcombat.webp",
//     type: "Fighting",
//     multiplayer: true,
//     maxPlayers: 2,
//     pricePerHour: {
//       onePlayer: 12,
//       twoPlayers: 18,
//       threePlayers: 0,
//       fourPlayers: 0
//     },
//     pricePerHalfHour: {
//       onePlayer: 7,
//       twoPlayers: 10,
//       threePlayers: 0,
//       fourPlayers: 0
//     },
//     description: "Ultimate fighting game with brutal finishing moves and competitive gameplay."
//   },
//   { 
//     id: 3, 
//     name: "GTA V", 
//     image: "/GTA.webp",
//     type: "Action-Adventure",
//     multiplayer: false,
//     maxPlayers: 1,
//     pricePerHour: {
//       onePlayer: 15,
//       twoPlayers: 0,
//       threePlayers: 0,
//       fourPlayers: 0
//     },
//     pricePerHalfHour: {
//       onePlayer: 8,
//       twoPlayers: 0,
//       threePlayers: 0,
//       fourPlayers: 0
//     },
//     description: "Experience the criminal underworld of Los Santos in this action-packed open-world game."
//   },
//   { 
//     id: 4, 
//     name: "UFC 4", 
//     image: "/ufc.webp",
//     type: "Fighting/Sports",
//     multiplayer: true,
//     maxPlayers: 2,
//     pricePerHour: {
//       onePlayer: 12,
//       twoPlayers: 18,
//       threePlayers: 0,
//       fourPlayers: 0
//     },
//     pricePerHalfHour: {
//       onePlayer: 7,
//       twoPlayers: 10,
//       threePlayers: 0,
//       fourPlayers: 0
//     },
//     description: "Step into the octagon with the most authentic UFC fighting experience."
//   },
//   { 
//     id: 5, 
//     name: "WWE 2K23", 
//     image: "/wwe2k23.webp",
//     type: "Sports/Fighting",
//     multiplayer: true,
//     maxPlayers: 4,
//     pricePerHour: {
//       onePlayer: 12,
//       twoPlayers: 18,
//       threePlayers: 22,
//       fourPlayers: 25
//     },
//     pricePerHalfHour: {
//       onePlayer: 7,
//       twoPlayers: 10,
//       threePlayers: 13,
//       fourPlayers: 15
//     },
//     description: "Experience the excitement of WWE with stunning graphics and realistic wrestling action."
//   },
//   { 
//     id: 6, 
//     name: "Spider-Man 2", 
//     image: "/spidermanmiles.webp",
//     type: "Action-Adventure",
//     multiplayer: false,
//     maxPlayers: 1,
//     pricePerHour: {
//       onePlayer: 15,
//       twoPlayers: 0,
//       threePlayers: 0,
//       fourPlayers: 0
//     },
//     pricePerHalfHour: {
//       onePlayer: 8,
//       twoPlayers: 0,
//       threePlayers: 0,
//       fourPlayers: 0
//     },
//     description: "Swing through New York City as Spider-Man in this thrilling superhero adventure."
//   },
//   { 
//     id: 7, 
//     name: "God of War Ragnarök", 
//     image: "/godofwar.webp",
//     type: "Action-Adventure",
//     multiplayer: false,
//     maxPlayers: 1,
//     pricePerHour: {
//       onePlayer: 15,
//       twoPlayers: 0,
//       threePlayers: 0,
//       fourPlayers: 0
//     },
//     pricePerHalfHour: {
//       onePlayer: 8,
//       twoPlayers: 0,
//       threePlayers: 0,
//       fourPlayers: 0
//     },
//     description: "Join Kratos and Atreus in their epic Norse mythology adventure."
//   },
//   { 
//     id: 8, 
//     name: "Ghost", 
//     image: "/ghost.webp",
//     type: "Action-Adventure",
//     multiplayer: false,
//     maxPlayers: 1,
//     pricePerHour: {
//       onePlayer: 15,
//       twoPlayers: 0,
//       threePlayers: 0,
//       fourPlayers: 0
//     },
//     pricePerHalfHour: {
//       onePlayer: 8,
//       twoPlayers: 0,
//       threePlayers: 0,
//       fourPlayers: 0
//     },
//     description: "Become a legendary samurai warrior in feudal Japan with stunning visuals and combat."
//   },
//   { 
//     id: 9, 
//     name: "Injustice 2", 
//     image: "/injustice2.webp",
//     type: "Fighting",
//     multiplayer: true,
//     maxPlayers: 2,
//     pricePerHour: {
//       onePlayer: 12,
//       twoPlayers: 18,
//       threePlayers: 0,
//       fourPlayers: 0
//     },
//     pricePerHalfHour: {
//       onePlayer: 7,
//       twoPlayers: 10,
//       threePlayers: 0,
//       fourPlayers: 0
//     },
//     description: "Battle with DC superheroes and villains in epic fighting matches."
//   },
//   { 
//     id: 10, 
//     name: "Need for Speed", 
//     image: "/nfs.webp",
//     type: "Racing",
//     multiplayer: true,
//     maxPlayers: 2,
//     pricePerHour: {
//       onePlayer: 12,
//       twoPlayers: 18,
//       threePlayers: 0,
//       fourPlayers: 0
//     },
//     pricePerHalfHour: {
//       onePlayer: 7,
//       twoPlayers: 10,
//       threePlayers: 0,
//       fourPlayers: 0
//     },
//     description: "Experience high-speed street racing with the most exotic cars."
//   },
//   { 
//     id: 11, 
//     name: "Jump Force", 
//     image: "/jumpforce.webp",
//     type: "Fighting",
//     multiplayer: true,
//     maxPlayers: 2,
//     pricePerHour: {
//       onePlayer: 12,
//       twoPlayers: 18,
//       threePlayers: 0,
//       fourPlayers: 0
//     },
//     pricePerHalfHour: {
//       onePlayer: 7,
//       twoPlayers: 10,
//       threePlayers: 0,
//       fourPlayers: 0
//     },
//     description: "Fight with your favorite anime characters in spectacular battles."
//   },
//   { 
//     id: 12,
//     name: "Red Dead Redemption",
//     image: "/red-dead.webp",
//     type: "Action-Adventure",
//     multiplayer: false,
//     maxPlayers: 1,
//     pricePerHour: {
//       onePlayer: 15,
//       twoPlayers: 0,
//       threePlayers: 0,
//       fourPlayers: 0
//     },
//     pricePerHalfHour: {
//       onePlayer: 8,
//       twoPlayers: 0,
//       threePlayers: 0,
//       fourPlayers: 0
//     },
//     description: "Experience the Wild West in this epic open-world adventure."
//   }
// ]

// export function GamesCarousel() {
//   const [isVisible, setIsVisible] = useState(false)
//   const [isPaused, setIsPaused] = useState(false)
//   const containerRef = useRef<HTMLDivElement>(null)
//   const sectionRef = useRef<HTMLElement>(null)

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true)
//           observer.unobserve(entry.target)
//         }
//       },
//       { threshold: 0.1 },
//     )

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current)
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current)
//       }
//     }
//   }, [])

//   useEffect(() => {
//     if (!isVisible || !containerRef.current || isPaused) return

//     const scrollContainer = containerRef.current
//     let animationFrameId: number

//     const scroll = () => {
//       if (!isPaused && scrollContainer) {
//         scrollContainer.scrollLeft += 1
//         if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
//           scrollContainer.scrollLeft = 0
//         }
//         animationFrameId = requestAnimationFrame(scroll)
//       }
//     }

//     animationFrameId = requestAnimationFrame(scroll)

//     return () => {
//       cancelAnimationFrame(animationFrameId)
//     }
//   }, [isVisible, isPaused])

//   const handleBooking = (gameName: string) => {
//     // Replace with your messenger link
//     window.open(`https://m.me/yourgamingcenter?ref=${encodeURIComponent(gameName)}`, '_blank')
//   }

//   const handleCheckAvailability = () => {
//     // Scroll to slots section
//     const slotsSection = document.getElementById('slots')
//     if (slotsSection) {
//       slotsSection.scrollIntoView({ behavior: 'smooth' })
//     }
//   }

//   if (!isVisible) {
//     return (
//       <section ref={sectionRef} className="w-full py-16 bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a]">
//         <h2 className="text-center font-zentry bg-gradient-to-r from-yellow-900 via-red-600 to-orange-400 bg-clip-text text-transparent mb-12">
//           Games
//         </h2>
//         <div className="w-full h-[400px] bg-gray-800/50 animate-pulse rounded-lg"></div>
//       </section>
//     )
//   }

//   return (
//     <section id="games" className="w-full py-16 bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a] overflow-hidden">
//       <h2 className="text-center font-zentry text-6xl bg-gradient-to-t from-yellow-900 via-red-600 to-orange-400 bg-clip-text text-transparent special-font mb-12">
//         <span className="font-bold">G</span>
//         <span className="font-bold">A</span>
//         <span>M</span>
//         <span className="font-bold">E</span>
//         <span>S</span>
//       </h2>
//       <div className="relative w-screen">
//         <div
//           ref={containerRef}
//           className="overflow-x-hidden relative scroll-smooth"
//           onMouseEnter={() => setIsPaused(true)}
//           onMouseLeave={() => setIsPaused(false)}
//         >
//           <div className="flex gap-3 sm:gap-4 md:gap-6 py-4 animate-scroll hover:animation-play-state-paused">
//             {[...games, ...games].map((game, index) => (
//               <Dialog key={`${game.id}-${index}`}>
//                 <DialogTrigger asChild>
//                   <div className="flex-none w-32 sm:w-40 md:w-48 lg:w-56 cursor-pointer">
//                     <div className="relative aspect-[3/4] rounded-lg overflow-hidden group">
//                       <Image
//                         src={game.image || "/placeholder.svg"}
//                         alt={game.name}
//                         layout="fill"
//                         objectFit="cover"
//                         className="transition-transform duration-300 group-hover:scale-110"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                     </div>
//                     <h3 className="mt-4 uppercase text-center text-xs sm:text-sm md:text-base font-bold text-yellow-400 truncate">
//                       {game.name}
//                     </h3>
//                   </div>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-[800px]">
//                   <DialogHeader>
//                     <DialogTitle className="text-2xl font-bold">{game.name}</DialogTitle>
//                   </DialogHeader>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
//                       <Image
//                         src={game.image || "/placeholder.svg"}
//                         alt={game.name}
//                         layout="fill"
//                         objectFit="cover"
//                         className="rounded-lg"
//                       />
//                     </div>
//                     <div className="space-y-4">
//                       <div>
//                         <h4 className="font-semibold text-lg mb-2">Game Details</h4>
//                         <p className="text-sm text-muted-foreground">{game.description}</p>
//                         <p className="mt-2 text-sm">
//                           <span className="font-semibold">Type:</span> {game.type}
//                         </p>
//                         <p className="text-sm">
//                           <span className="font-semibold">Multiplayer:</span> {game.multiplayer ? 'Yes' : 'No'}
//                         </p>
//                         <p className="text-sm">
//                           <span className="font-semibold">Max Players:</span> {game.maxPlayers}
//                         </p>
//                       </div>
//                       <div>
//                         <h4 className="font-semibold text-lg mb-2">Pricing</h4>
//                         <div className="grid grid-cols-2 gap-4">
//                           <div>
//                             <h5 className="font-medium text-sm mb-1">Per Hour</h5>
//                             <ul className="text-sm space-y-1">
//                               <li>1 Player: ${game.pricePerHour.onePlayer}</li>
//                               {game.pricePerHour.twoPlayers > 0 && (
//                                 <li>2 Players: ${game.pricePerHour.twoPlayers}</li>
//                               )}
//                               {game.pricePerHour.threePlayers > 0 && (
//                                 <li>3 Players: ${game.pricePerHour.threePlayers}</li>
//                               )}
//                               {game.pricePerHour.fourPlayers > 0 && (
//                                 <li>4 Players: ${game.pricePerHour.fourPlayers}</li>
//                               )}
//                             </ul>
//                           </div>
//                           <div>
//                             <h5 className="font-medium text-sm mb-1">Per 30 Minutes</h5>
//                             <ul className="text-sm space-y-1">
//                               <li>1 Player: ${game.pricePerHalfHour.onePlayer}</li>
//                               {game.pricePerHalfHour.twoPlayers > 0 && (
//                                 <li>2 Players: ${game.pricePerHalfHour.twoPlayers}</li>
//                               )}
//                               {game.pricePerHalfHour.threePlayers > 0 && (
//                                 <li>3 Players: ${game.pricePerHalfHour.threePlayers}</li>
//                               )}
//                               {game.pricePerHalfHour.fourPlayers > 0 && (
//                                 <li>4 Players: ${game.pricePerHalfHour.fourPlayers}</li>
//                               )}
//                             </ul>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex gap-4">
//                         <Button 
//                           className="flex-1"
//                           onClick={() => handleBooking(game.name)}
//                         >
//                           <MessagesSquare className="mr-2 h-4 w-4" />
//                           Book Now
//                         </Button>
//                         <DialogTrigger asChild>
//                           <Button 
//                             variant="secondary"
//                             className="flex-1"
//                             onClick={handleCheckAvailability}
//                           >
//                             <Calendar className="mr-2 h-4 w-4" />
//                             Check Slots
//                           </Button>
//                         </DialogTrigger>
//                       </div>
//                     </div>
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }















// "use client"

// import { useState, useEffect, useRef } from "react"
// import Image from "next/image"

// const games = [
//   { id: 1, name: "FIFA 24", image: "/fifa.webp" },
//   { id: 2, name: "Mortal Kombat 11", image: "/mortalcombat.webp" },
//   { id: 3, name: "GTA V", image: "/GTA.webp" },
//   { id: 4, name: "UFC 4", image: "/ufc.webp" },
//   { id: 5, name: "WWE 2K23", image: "/wwe2k23.webp" },
//   { id: 6, name: "Spider-Man 2", image: "/spidermanmiles.webp" },
//   { id: 7, name: "God of War Ragnarök", image: "/godofwar.webp" },
//   { id: 8, name: "Ghost", image: "/ghost.webp" },
//   { id: 9, name: "Injustice 2", image: "/injustice2.webp" },
//   { id: 10, name: "Need for Speed", image: "/nfs.webp" },
//   { id: 11, name: "Jump Force", image: "/jumpforce.webp" },
//   {id:  12,name:"Red Dead Redemption",image:"/red-dead.webp"}
// ]

// export function GamesCarousel() {
//   const [isVisible, setIsVisible] = useState(false)
//   const [isPaused, setIsPaused] = useState(false)
//   const containerRef = useRef<HTMLDivElement>(null)
//   const sectionRef = useRef<HTMLElement>(null)

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true)
//           observer.unobserve(entry.target)
//         }
//       },
//       { threshold: 0.1 },
//     )

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current)
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current)
//       }
//     }
//   }, [])

//   useEffect(() => {
//     if (!isVisible || !containerRef.current || isPaused) return

//     const scrollContainer = containerRef.current
//     let animationFrameId: number

//     const scroll = () => {
//       if (!isPaused && scrollContainer) {
//         scrollContainer.scrollLeft += 1
//         if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
//           scrollContainer.scrollLeft = 0
//         }
//         animationFrameId = requestAnimationFrame(scroll)
//       }
//     }

//     animationFrameId = requestAnimationFrame(scroll)

//     return () => {
//       cancelAnimationFrame(animationFrameId)
//     }
//   }, [isVisible, isPaused])

//   if (!isVisible) {
//     return (
//       <section  ref={sectionRef} className="w-full py-16 bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a]">
//         <h2 className="text-center font-zentry bg-gradient-to-r from-yellow-900 via-red-600 to-orange-400 bg-clip-text text-transparent mb-12">
//           Games
//         </h2>
//         <div className="w-full h-[400px] bg-gray-800/50 animate-pulse rounded-lg"></div>
//       </section>
//     )
//   }

//   return (
//     <section id="games" className="w-full py-16 bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a] overflow-hidden">
//       <h2 className="text-center font-zentry text-6xl bg-gradient-to-t from-yellow-900 via-red-600 to-orange-400 bg-clip-text text-transparent  special-font mb-12">
//         <span className="font-bold">G</span>
//         <span className="font-bold">A</span>
//         <span>M</span>
//         <span className="font-bold">E</span>
//         <span>S</span>
//       </h2>
//       <div className="relative  w-screen    ">
//         <div
//           ref={containerRef}
//           className="overflow-x-hidden relative scroll-smooth"
//           onMouseEnter={() => setIsPaused(true)}
//           onMouseLeave={() => setIsPaused(false)}
//         >
//           <div className="flex gap-3 sm:gap-4 md:gap-6 py-4 animate-scroll hover:animation-play-state-paused">
//             {[...games, ...games].map((game, index) => (
//               <div key={`${game.id}-${index}`} className="flex-none w-32 sm:w-40 md:w-48 lg:w-56">
//                 <div className="relative aspect-[3/4] rounded-lg overflow-hidden group">
//                   <Image
//                     src={game.image || "/placeholder.svg"}
//                     alt={game.name}
//                     layout="fill"
//                     objectFit="cover"
//                     className="transition-transform duration-300 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </div>
//                 <h3 className="mt-4 uppercase text-center text-xs sm:text-sm md:text-base font-bold text-yellow-400 truncate">
//                   {game.name}
//                 </h3>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }











