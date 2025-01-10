import price from "../assets/price.webp"
import Image from "next/image"
export function Pricing () {
  return (
    <section id="pricing" className="w-full h-50 bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a]">
        <h2 className="p-4 flex items-center justify-center font-zentry text-3xl text-yellow-400 underline special-font"><b>P</b><b>R</b>I<b>c</b>I<b>n</b>G</h2>
        <div className="h-30px flex bg-black mx-auto items-center container  rounded-lg  object-contain">
        <Image src={price} alt="price" />
    </div>
    </section>
  )
}

