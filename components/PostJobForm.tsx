"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";
import { supabaseBrowserClient } from "@/lib/supabase/client";

export const PostJobForm = ({userId, userName} : {userId:string|undefined, userName: string}) => {

   const supabase = supabaseBrowserClient()
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const [formData, setFormData] = useState({
      location: "",
      role: "",
      description: "",
      employment_type: "full-time",
      required_skills: "",
      additional_skills: "",
      salary: "",
      no_of_vacancies: "",
      application_end_date: "",
   });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      setLoading(true);

      const { error } = await supabase.from("job_posts").insert([
         {
         company_id: userId,
         company_name: userName,
         ...formData,
         no_of_vacancies: parseInt(formData.no_of_vacancies) || 1,
         status: "open"
         },
      ]);

      setLoading(false);

      if (error) {
         toast.error("Failed to post job");
      } else {
         toast.success("Job posted successfully!");
         router.push("/dashboard/company/job-applications");
      }
   };

   return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-3xl">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <Label>Role</Label>
            <Input name="role" value={formData.role} onChange={handleChange} required />
          </div>

          <div>
            <Label>No. of Vacancies</Label>
            <Input
              type="number"
              name="no_of_vacancies"
              value={formData.no_of_vacancies}
              onChange={handleChange}
              min="1"
            />
          </div>

          <div>
            <Label>Location</Label>
            <Input name="location" value={formData.location} onChange={handleChange} required />
          </div>

          <div>
            <Label>Employment Type</Label>
            <select
              name="employment_type"
              value={formData.employment_type}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>

        <div>
          <Label>Salary</Label>
          <Input type="number" name="salary" value={formData.salary} onChange={handleChange} />
        </div>

        <div>
          <Label>Required Skills (comma separated)</Label>
          <Input name="required_skills" value={formData.required_skills} onChange={handleChange} />
        </div>

        <div>
          <Label>Additional Skills (comma separated)</Label>
          <Input name="additional_skills" value={formData.additional_skills} onChange={handleChange} />
        </div>

        <div>
          <Label>Job Description</Label>
          <Textarea name="description" value={formData.description} onChange={handleChange} rows={5} />
        </div>

        <div>
          <Label>Application End Date</Label>
          <Input
            type="date"
            name="application_end_date"
            value={formData.application_end_date}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="w-fit mt-5 p-3 bg-blue-500 text-white rounded hover:bg-blue-700" disabled={loading}>
          {loading ? "Posting..." : "Post Job"}
        </Button>
      </form>
   );
}