import Link from "next/link";

export function Footer() {
    return (
      <footer className="bg-black text-gray-400 py-2 text-xs sm:flex">
        <div className="container mx-auto px-4 flex-col justify-end items-center ">
          <p>&copy; {new Date().getFullYear()} Cyber Play Arena. All rights reserved. </p><div className="flex"><p>Developed by : </p> <Link className="underline" href="www.linkedin.com/in/raisoul-rayat-48781a263"> Raisul Rayat</Link></div>
        </div>
      </footer>
    )
  }
  
  