import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function CompanyPage() {

   const supabase = await createClient();
   const {data:{user}} = await supabase.auth.getUser();

   if (!(user?.user_metadata.userType === 'company')) redirect('/dashboard');

   return (
      <main className="p-6 w-full min-h-screen flex flex-col items-center justify-start">
         <h1>Company Page</h1>
      </main>
   )
}