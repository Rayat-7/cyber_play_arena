"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export function Pricing() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }, // Trigger when 10% of the section is visible
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

  return (
    <section ref={sectionRef} id="pricing" className="relative w-full py-16 overflow-hidden">
      {isVisible && (
        <>
          {/* Blurred background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/price.webp"
              alt=""
              layout="fill"
              objectFit="cover"
              quality={100}
              className="filter blur-md scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-bl from-[#0f172a]/70 via-[#1e1a78]/70 to-[#0f172a]/70"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <h2 className="mb-12 text-center font-zentry text-5xl bg-gradient-to-bl from-yellow-400 via-pink-300 to-gray-50 bg-clip-text text-transparent special-font">
              <span className="font-bold">P</span>
              <span className="font-bold">R</span>I<span className="font-bold">c</span>I
              <span className="font-bold">n</span>G
            </h2>
            <div className="relative w-full max-w-3xl mx-auto aspect-[16/9] rounded-lg overflow-hidden shadow-2xl">
              <Image src="/price.webp" alt="Pricing information" layout="fill" objectFit="cover" quality={100} />
            </div>
          </div>
        </>
      )}
    </section>
  )
}

