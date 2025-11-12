"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const Navbar = () => {

   const pathname = usePathname();

   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const navLinks = [
      { name: "Home", href: "/" },
      { name: "About", href: "/#about" },
      { name: "Placements", href: "/#placements" },
      { name: "T&C", href: "/#t&c" },
      { name: "Contact", href: "/#contact" },
      { name: "Login", href: "/login" },
      { name: "Register", href: "/register" },
   ];

   return (
      <nav className="w-full h-16 bg-gray-200 flex items-center justify-between px-4">
         <h1 className="text-black text-lg font-semibold">GrindUp</h1>
         <Button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 rounded bg-gray-400 font-bold text-lg"
         > {isMenuOpen ? "-" : "+"} </Button>
         {isMenuOpen && (
            <ul className="flex flex-col absolute top-16 left-0 w-full bg-gray-200 md:hidden">
               {navLinks.map((link) => (
                  <li key={link.name} className="border-b border-gray-300 p-4">
                     <Link href={link.href} className="text-black hover:text-gray-700">
                        {link.name}
                     </Link>
                  </li>
               ))}
            </ul>
         )}
         {
            <ul className="hidden md:flex space-x-10">
               {navLinks.map((link) => (
                  <li key={link.name}>
                     <Link href={link.href} 
                        className={cn(
                           (pathname === link.href) ? "text-blue-600 font-bold" : "text-black hover:text-gray-700"
                        )}>
                        {link.name}
                     </Link>
                  </li>
               ))}
            </ul>
         }
      </nav>
   );
}