"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useUser } from "@/lib/context/UserContext";

type NavLink = {
   id:number,
   name:string,
   href:string
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const {user, loading} = useUser()

   let navLinks: NavLink[] = [];

   const handleLogout = async () => {
      await fetch("/api/logout", { method: "POST" });
      window.location.href = "/";
   };

   if (loading) {
      return <p>Loading...</p>;
   }

   if (user?.user_metadata.userType === "college") {
      navLinks = [
         {id:1, name: "Home", href: "/dashboard/college"},
         {id:2, name: "My Applications", href: "/dashboard/college/my-applications"},
         {id:3, name: "Profile", href: "/dashboard/college/profile"}
      ];
   } else {
      navLinks = [
         {id:1, name: "Home", href: "/dashboard/company"},
         {id:2, name: "Post a Job", href: "/dashboard/company/post-job"},
         {id:3, name: "Job Applications", href: "/dashboard/company/job-applications"},
         {id:4, name: "Invite a College", href: "/dashboard/company/invite-college"},
         {id:5, name: "Profile", href: "/dashboard/company/profile"},
      ];
   }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-60 bg-gray-800 text-white p-4 z-40 transform 
        transition-transform duration-300 ease-in-out 
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
         <div className="flex flex-col">
            <h2 className="text-4xl font-bold">GrindUp</h2>
            <div className="mt-10 mb-3 w-full h-[3px] rounded bg-gray-500"></div>
            <div className="flex flex-col gap-2">
               <h4 className="text-xl">Hi, {user?.user_metadata.name}</h4>
               <p className="text-sm">{user?.email}</p>
            </div>
         </div>
         <nav>
            <ul className="flex flex-col w-full gap-4">
               {
                  navLinks.map(({id, name, href}) => (
                     <Link key={id} href={href}>
                        <li className="w-full p-3 rounded hover:bg-gray-500">{name}</li>
                     </Link>
                  ))
               }
            </ul>
         </nav>
         <Button 
            onClick={handleLogout}
            className="mt-8 w-full bg-red-400 hover:bg-red-600">Logout</Button>
      </aside>
    </>
  );
}
