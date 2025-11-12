import { useUser } from "@/lib/context/UserContext";
import { redirect } from "next/navigation";

export default function Dashboard() {

  const {user, loading} = useUser();

  if (user?.user_metadata.userType === "college") redirect("/dashboard/college");
  if (user?.user_metadata.userType === "company") redirect("/dashboard/company");

  return null;
};