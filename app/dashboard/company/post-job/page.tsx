import { createClient } from "@/lib/supabase/server";
import { PostJobForm } from "@/components/PostJobForm";

export default async function PostJobPage() {
  const supabase = await createClient();
  const {data:{user}} = await supabase.auth.getUser();

  return (
    <main className="flex flex-col w-full min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>
      <PostJobForm
        userId={user?.id}
        userName={user?.user_metadata.name}
      />
    </main>
  );
}
