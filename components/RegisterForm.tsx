"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { supabaseBrowserClient } from "@/lib/supabase/client";


export const RegisterForm = () => {

   const supabase = supabaseBrowserClient();

   const router = useRouter();
   const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "college"
   });
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      const {name, email, password, confirmPassword, userType} = form;

      const {data, error} = await supabase.auth.signUp({
         email, 
         password,
         options: {
            data: {name, userType},
            emailRedirectTo: `${window.location.origin}/auth/callback`,
         }
      });

      setLoading(false)

      if (error) {setError(error.message)}
      else {
         alert("Please verify your email before logging in!");
         router.push('/login')
      }
   }

   return (
      <form
         onSubmit={handleSubmit}
         className="flex flex-col space-y-4 w-full max-w-sm p-6 border border-orange-300 bg-white rounded-xl shadow-md"
      >
         <h1 className="text-xl font-bold text-center">Create your Account</h1>

         <input
         type="text"
         name="name"
         placeholder="Full Name"
         value={form.name}
         onChange={(e) => setForm({ ...form, name: e.target.value })}
         className="border p-2 rounded"
         required
         />

         <input
         type="email"
         name="email"
         placeholder="Email Address"
         value={form.email}
         onChange={(e) => setForm({ ...form, email: e.target.value })}
         className="border p-2 rounded"
         required
         />

         <input
         type="password"
         name="password"
         placeholder="Password"
         value={form.password}
         onChange={(e) => setForm({ ...form, password: e.target.value })}
         className="border p-2 rounded"
         required
         />
         
         <input
         type="confirmPassword"
         name="confirmPassword"
         placeholder="Confirm Password"
         value={form.confirmPassword}
         onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
         className="border p-2 rounded"
         required
         />

         {/* 👇 shadcn Select for userType */}
         <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
               I am a
            </label>
            <Select
               onValueChange={(value) => setForm({ ...form, userType: value })}
               defaultValue={form.userType}
            >
               <SelectTrigger className="w-full border rounded p-2">
                  <SelectValue placeholder="Select type" />
               </SelectTrigger>
               <SelectContent className="bg-white">
                  <SelectItem value="college">College</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
               </SelectContent>
            </Select>
         </div>

         {error && <p className="text-red-500 text-sm">{error}</p>}

         <button
         type="submit"
         disabled={loading}
         className="mt-3 bg-orange-600 text-white py-2 rounded hover:bg-orange-700 "
         >
         {loading ? "Creating Account..." : "Register"}
         </button>
      </form>
   );
}