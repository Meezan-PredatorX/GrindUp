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
import Link from "next/link";

export const RegisterForm = () => {
  const supabase = supabaseBrowserClient();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "college",
    isProfileCompleted: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    const { name, email, password, userType } = form;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, userType, isProfileCompleted:false},
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    alert("Please verify your email before logging in!");
    router.push("/login");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 w-full max-w-sm p-6 border border-orange-300 bg-white rounded-xl shadow-md"
    >
      <h1 className="text-xl font-bold text-center">
        Create your <i>{form.userType}</i> account
      </h1>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="mt-1 block w-full px-3 py-2 border border-orange-500 rounded-md shadow-sm"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="mt-1 block w-full px-3 py-2 border border-orange-500 rounded-md shadow-sm"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="mt-1 block w-full px-3 py-2 border border-orange-500 rounded-md shadow-sm"
        required
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        className="mt-1 block w-full px-3 py-2 border border-orange-500 rounded-md shadow-sm"
        required
      />

      <div>
        <label className="text-sm font-medium">I am a</label>
        <Select
          onValueChange={(value) => setForm({ ...form, userType: value })}
          defaultValue={form.userType}
        >
          <SelectTrigger className="w-full p-2 border border-orange-500 rounded-md">
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
        className="bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
      >
        {loading ? "Creating Account..." : "Register"}
      </button>

      <p className="flex justify-center text-lg gap-2">Already have an account? 
         <Link href="/login" className="text-orange-500 underline hover:text-orange-800">Login Here</Link>
      </p>
    </form>
  );
};
