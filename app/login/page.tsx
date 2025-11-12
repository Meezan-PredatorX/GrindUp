
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Login to GrindUp</h1>
      <LoginForm />
    </div>
  );
}