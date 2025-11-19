/* eslint-disable @typescript-eslint/no-explicit-any */
import { CollegeProfileForm } from "@/components/CollegeProfileForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function CollegeProfile() {
  const supabase = await createClient();
  const {data:{user}} = await supabase.auth.getUser();

  if (!user) redirect('/login');  

  const {data:profile, error} = await supabase
    .from('college_profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  
  if (error) return <p className="w-full p-3 rounded bg-red-300 text-red-700 border-2 border-red-700">Error fetching profile data!</p>

  return (
    <main className="p-6 flex flex-col w-full min-h-screen items-center justify-start">
      <h1 className="text-3xl font-bold mb-4">
        Your College Profile, {user?.user_metadata?.name}
      </h1>
      <CollegeProfileForm initialProfile={profile} user={user as any}/>
    </main>
  );
}
