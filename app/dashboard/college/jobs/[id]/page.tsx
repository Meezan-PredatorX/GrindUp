/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";

export default async function JobPage ({ params }:any) {

   const {id} = await params;
   console.log(id);

   const supabase = await createClient();
   const {data: job,error} = await supabase
      .from('job_posts')
      .select('*')
      .eq('id', id)
      .eq('status', 'open')
      .single();

   if (error || !job) {
      console.error(error);
      return (
         <div className="p-6 mt-10 md:mt-0 w-full rounded bg-red-200 border-2 border-red-500">
            <h2 className="text-xl font-semibold text-red-500">Job Not Found</h2>
         </div>
      );
   }

   return (
      <main className="w-full flex flex-col items-center justify-start">
         <h1 className="text-3xl font-bold">Job Details</h1>
         <Card className="my-6 shadow-lg border border-gray-200 bg-orange-50 rounded-2xl p-4">
            <CardHeader>
               <CardTitle className="text-2xl font-semibold">
               {job.role}
               </CardTitle>
               <p className="text-md text-muted-foreground mt-1">At {job.company_name}</p>
            </CardHeader>
            <CardContent className="space-y-4">
               
               {/* Basic Info */}
               <div className="grid grid-cols-2 gap-4 text-sm">
               <div className="flex gap-3">
               <p className="font-semibold">Location:</p>
               <p className="text-muted-foreground">{job.location}</p>
               </div>
               <div className="flex gap-3">
               <p className="font-semibold">Employment Type:</p>
               <p className="text-muted-foreground">{job.employment_type}</p>
               </div>
               <div className="flex gap-3">
               <p className="font-semibold">Vacancies:</p>
               <p className="text-muted-foreground">{job.no_of_vacancies}</p>
               </div>
               <div className="flex gap-3">
               <p className="font-semibold">Salary:</p>
               <p className="text-muted-foreground">{job.salary}</p>
               </div>
               </div>

               <Separator />

               {/* Skills */}
               <div className="space-y-2">
               <p className="font-semibold">Required Skills:</p>
               <div className="flex flex-wrap gap-2">
               {job.required_skills?.split(",").map((skill:string, i:number) => (
               <Badge key={i} variant="default" className="px-3 py-1 bg-orange-500 text-white rounded-full">
               {skill.trim()}
               </Badge>
               ))}
               </div>
               </div>

               {job.additional_skills && (
               <div className="space-y-2">
               <p className="font-semibold">Additional Skills:</p>
               <div className="flex flex-wrap gap-2">
               {job.additional_skills?.split(",").map((skill:string, i:number) => (
               <Badge key={i} variant="outline" className="px-3 py-1 bg-orange-200 text-orange-800 border border-orange-800 rounded-full">
               {skill.trim()}
               </Badge>
               ))}
               </div>
               </div>
               )}

               <Separator />

               {/* Description */}
               <div>
               <p className="font-semibold">Job Description:</p>
               <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
               {job.description}
               </p>
               </div>

               {/* Application Deadline */}
               <div>
               <p className="text-sm font-semibold">Application Deadline:</p>
               <p className="text-muted-foreground">{job.application_end_date}</p>
               </div>
            </CardContent>
            <CardFooter>
               <Button className="w-full rounded py-3 px-2 bg-orange-500 text-white font-bold my-3 hover:bg-orange-700 hover:cursor-pointer">
                  Apply Now
               </Button>
            </CardFooter>
         </Card>
      </main>
   );
}