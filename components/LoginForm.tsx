"use client";

import { supabaseBrowserClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const LoginForm = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [errorMessage, setErrorMessage] = useState("");
   const router = useRouter();
   
   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const supabase = supabaseBrowserClient()
      const {data:{user}} = await supabase.auth.getUser();
      const { error } = await supabase.auth.signInWithPassword({
         email,
         password,
      });
      if (error) {
         setErrorMessage(error.message);
      } else {
         return router.push('/dashboard')
      }
   }

   return (
      <form 
         onSubmit={handleSubmit}
         className="flex flex-col space-y-4 w-full max-w-sm p-6 border border-orange-300 rounded-md shadow-md bg-white">
         <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
               Email
            </label>
            <input
               type="email"
               id="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"   
               placeholder="Enter your email"
            />
         </div>   
         <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
               Password
            </label>
            <input
               type="password"
               id="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
               placeholder="Enter your password"
            />
         </div>
         {errorMessage && (
            <div className="mt-3 py-2 px-4 bg-red-100 border border-red-400 rounded-md">
               <p className="text-red-600 text-md">{errorMessage}</p>
            </div>
         )}
         <button
            type="submit"
            className="w-full mt-3 py-2 px-4 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
         > 
            Login 
         </button>

         <p className="flex justify-center text-lg gap-2">Don&apos;t have an account? 
            <Link href="/register" className="text-orange-500 underline hover:text-orange-800">Register Here</Link>
         </p>
      </form>
   );
}