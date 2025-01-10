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
"use client"

import { Button } from "@/components/ui/button"

const Hero = () => {
    const scrollToSlots = () => {
        const slotsSection = document.getElementById('slots');
        slotsSection?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <section className="relative h-screen flex items-center bg-cover justify-center bg-[url('../assets/IMG_0796.JPG')] ">
           <div className="relative z-10 text-center space-y-5 max-w-4xl mx-auto px-4">
            <div className="text-2xl md:text-6xl font-bold leading-tight">
                <h1 className="text-xl md:text-2xl md:pb-0  font-bold leading-tight bg-gradient-to-b from-[#f59e0b] via-[#f59e0b] to-[#ea580c] text-transparent bg-[image]  bg-clip-text uppercase">Welcome To</h1> 
                <h1 className="text-6xl md:text-8xl font-bold leading-tight bg-gradient-to-l from-yellow-400 via-orange-500 to-yellow-500 text-transparent  bg-clip-text font-zentry special-font uppercase">C<b>y</b>ber Pl<b>a</b>y Are<b>n</b>a</h1>
            </div>
            <p className=" text-lg md:text-2xl opacity-0 md:opacity-100 bg-gradient-to-r from-[#ff7a70]  to-[#f59e0b] text-transparent pb-6 bg-clip-text capitalize font-semibold">
            Your ultimate destination for immersive gaming experiences
            </p>
            <Button
            size="lg"
            // variant="default"
            className="bg-gradient-to-b from-[#f59e0b] via-[#f59e0b] to-[#ea580c] text-black font-bold uppercase animate-bounce rounded-3xl"
            onClick={scrollToSlots}>
                Check Available Slots
            </Button>
           </div>
        </section>
    )
}

export default Hero

