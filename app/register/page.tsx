import { RegisterForm } from "@/components/RegisterForm";

export default function RegisterPage() {
   return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
         <h1 className="text-3xl font-bold mb-8">Register to GrindUp</h1>
         <RegisterForm/>
      </div>
   );
}