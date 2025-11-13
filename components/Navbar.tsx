"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent body scroll when menu is open (mobile)
  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Placements", href: "/#placements" },
    { name: "Contact", href: "/#contact" },
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="GrindUp Logo"
            width={120}
            height={60}
            priority
          />
        </Link>

        {/* Mobile Menu Toggle */}
        <Button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 bg-orange-100 text-orange-800 font-bold text-xl rounded-lg hover:bg-orange-200 transition"
        >
          {isMenuOpen ? "✕" : "☰"}
        </Button>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-10">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={cn(
                  pathname === link.href
                    ? "text-orange-600 font-semibold"
                    : "text-gray-800 hover:text-orange-700 transition"
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <ul className="md:hidden flex flex-col bg-white border-t border-gray-200 shadow-lg absolute w-full left-0 top-16 animate-slide-down">
          {navLinks.map((link) => (
            <li key={link.name} className="border-b border-gray-100">
              <Link
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-6 py-3 text-gray-800 hover:bg-orange-50 hover:text-orange-700 transition"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};
