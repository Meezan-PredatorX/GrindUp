
// File to include all functions that handle supabase db actions

import { createClient } from "./server"

// Get is_profile_completed status from users table.
export const getIsProfileCompletedStatus = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("users")
    .select("is_profile_completed")
    .eq("id", user.id)
    .single();

  return data?.is_profile_completed ?? null;
};
