import { RegisterForm } from "@/components/RegisterForm";

export default function RegisterPage() {
   return (
      <div className="flex flex-col items-center justify-start min-h-screen py-10 bg-orange-50">
         <h1 className="text-3xl text-orange-800 font-bold mb-8">Register to GrindUp</h1>
         <RegisterForm/>
      </div>
   );
}