import AboutSection from "@/components/AboutSection"
import ContactSection from "@/components/ContactSection"
import { Navbar } from "@/components/Navbar"
import PlacementSection from "@/components/PlacementSection"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="flex flex-col w-full min-h-screen overflow-x-hidden scroll-smooth">
      <Navbar />

      {/* 🏠 Hero Section */}
      <section
        id="/"
        className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-20 bg-linear-to-r from-orange-50 to-orange-100"
      >
        <div className="flex flex-col gap-5 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Connecting Colleges & Companies for Smarter Placements
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            GrindUp helps colleges and companies collaborate effortlessly — streamlining the hiring process and unlocking better opportunities.
          </p>
          <div className="flex gap-4">
            <Link
              href="/register"
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Get Started
            </Link>
            <Link
              href="/#about"
              className="border border-orange-600 text-orange-600 hover:bg-orange-100 px-6 py-3 rounded-lg font-semibold transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        <Image
          src="/landing_hero.png"
          alt="Students and recruiters connecting"
          width={200} height={200}
          className="w-full md:w-[600px] mt-10 md:mt-0"
        />
      </section>

      <AboutSection/>

      <PlacementSection/>

      <ContactSection/>

      {/* ⚙️ Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        <p>© {new Date().getFullYear()} GrindUp. All rights reserved.</p>
      </footer>
    </main>
  )
}
