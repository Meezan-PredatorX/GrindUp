import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage () {
   const supabase = await createClient();
   const {data:{user}} = await supabase.auth.getUser();
   const userType = user?.user_metadata.userType;

   if (userType === 'college') return redirect('/dashboard/college');
   if (userType === 'company') return redirect('/dashboard/company');
}