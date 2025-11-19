/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { supabaseBrowserClient } from "@/lib/supabase/client";

type CollegeProfile = {
  id: string;
  name: string;
  email: string;
  location: string;
  mobile_no: string;
  no_of_students: number;
  naac_grade: string;
  affiliated_university: string;
  tpo_name: string;
  current_highest_cgpa: number;
  l3y_no_of_students_placed: string;
  l3y_avg_ctc_offered: number;
  l3y_placement_perc: number;
  courses_offered: string;
  created_at: string;
  last_updated_at: string;
};

type UserType = {
  id: string;
  user_metadata: {
    name: string;
    userType: string;
    isProfileCompleted: boolean;
  };
};

export function CollegeProfileForm({
  initialProfile,
  user,
}: {
  initialProfile: CollegeProfile;
  user: UserType;
}) {
   const supabase = supabaseBrowserClient();

   const [form, setForm] = useState(initialProfile);
   const [placementFile, setPlacementFile] = useState<File | null>(null);
   const [formLoading, setFormLoading] = useState(false);
   const [error, setError] = useState("");
   const [existingFileUrl, setExistingFileUrl] = useState<string | null>(
      initialProfile.l3y_no_of_students_placed || null
   );

   // Generate a signed download URL for existing file
   useEffect(() => {
   const loadUrl = async () => {
      if (!initialProfile.l3y_no_of_students_placed) return;

      const { data } = await supabase.storage
         .from("college-placement-data")
         .createSignedUrl(
            initialProfile.l3y_no_of_students_placed,
            60 * 10 // 10 minutes
         );

      if (data?.signedUrl) {
         setExistingFileUrl(data.signedUrl);
      }
   };

   loadUrl();
   }, [initialProfile.l3y_no_of_students_placed, supabase.storage]);

   const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      const { name, value, type } = e.target;
      const newValue = type === "number" ? (value === "" ? 0 : Number(value)) : value;

      setForm((prev) => ({
         ...prev,
         [name]: newValue,
      }));
   };

   // file handling
   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      setPlacementFile(file);
   };

   const handleDeleteFile = async () => {
      if (!initialProfile.l3y_no_of_students_placed) return;

      const { error: deleteError } = await supabase.storage
         .from("college-placement-data")
         .remove([initialProfile.l3y_no_of_students_placed]);

      if (deleteError) {
         setError("Failed to delete file: " + deleteError.message);
         return;
      }

      // Remove from DB
      await supabase
         .from("college_profiles")
         .update({ l3y_no_of_students_placed: null })
         .eq("id", user.id);

      setExistingFileUrl(null);
      alert("File deleted successfully");
   };


   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setFormLoading(true);
      setError("");

      let uploadedFilePath: string | null = null;

      // 1️⃣ Upload file if selected
      if (placementFile) {
         const filePath = `${user.id}/placement-data-${Date.now()}`;

         const { error: uploadErr } = await supabase.storage
         .from("college-placement-data")
         .upload(filePath, placementFile);

         if (uploadErr) {
         setError("Failed to upload placement file: " + uploadErr.message);
         setFormLoading(false);
         return;
         }

         uploadedFilePath = filePath;
      }

      // 2️⃣ Update profile in DB
      const { error: profileErr } = await supabase
         .from("college_profiles")
         .update({
         ...form,
         last_updated_at: new Date().toISOString(),
         ...(uploadedFilePath && {
            l3y_no_of_students_placed: uploadedFilePath,
         }),
         })
         .eq("id", user?.id);

      if (profileErr) {
         setError("Error updating profile: " + profileErr.message);
         setFormLoading(false);
         return;
      }

      // 3️⃣ Update user metadata
      const { error: userUpdateError } = await supabase.auth.updateUser({
         data: { isProfileCompleted: true },
      });

      if (userUpdateError) {
         console.error("Error updating isProfileCompleted:", userUpdateError.message);
      }

      alert("Profile updated successfully!");
      setFormLoading(false);
   };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-3 w-full lg:w-2/3 flex flex-col gap-4 p-8 rounded shadow-lg border-2 border-gray-200"
    >
      <InputField label="College Name" name="name" value={form.name} onChange={handleChange} />
      <InputField label="Official Email" name="email" value={form.email} onChange={handleChange} />
      <InputField label="Location" name="location" value={form.location} onChange={handleChange} />
      <InputField label="Mobile No." name="mobile_no" value={form.mobile_no} onChange={handleChange} />
      <InputField
        label="No. of Students"
        name="no_of_students"
        type="number"
        value={form.no_of_students}
        onChange={handleChange}
      />
      <InputField label="NAAC Grade" name="naac_grade" value={form.naac_grade} onChange={handleChange} />
      <InputField
        label="Affiliated University"
        name="affiliated_university"
        value={form.affiliated_university}
        onChange={handleChange}
      />
      <InputField label="TPO Name" name="tpo_name" value={form.tpo_name} onChange={handleChange} />
      <InputField
        label="Current highest CGPA"
        name="current_highest_cgpa"
        value={form.current_highest_cgpa}
        onChange={handleChange}
      />

      {/* Last 3yrs placement sheet */}
      <div className="flex w-full items-start gap-5">
         <label className="w-40 font-medium">
            Last 3yrs. placement sheet:
         </label>

         <div className="flex flex-col gap-2 flex-1">

            {/* If file exists — show preview actions */}
            {existingFileUrl && (
               <div className="flex items-center gap-3 bg-gray-100 border p-2 rounded">
               
               <span className="text-gray-600 text-sm flex-1">
                  📄 Existing file
               </span>

               <a
                  href={existingFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline text-sm"
               >
                  View
               </a>

               <button
                  type="button"
                  onClick={handleDeleteFile}
                  className="text-red-500 hover:underline text-sm"
               >
                  Delete
               </button>
               </div>
            )}

            {/* Upload new file */}
            <input
               type="file"
               accept=".xlsx,.xls,.csv"
               onChange={handleFileChange}
               className="border p-2 rounded"
            />

            <p className="text-xs text-gray-500">
               Uploading a new file will override the existing one.
            </p>
         </div>
      </div>


      <InputField
        label="Last 3 years avg. CTC offered"
        name="l3y_avg_ctc_offered"
        value={form.l3y_avg_ctc_offered}
        onChange={handleChange}
      />
      <InputField
        label="Last 3 years placement %"
        name="l3y_placement_perc"
        value={form.l3y_placement_perc}
        onChange={handleChange}
      />

      <div className="flex w-full items-center gap-5">
        <label htmlFor="courses_offered" className="w-40 font-medium">
          Courses Offered
        </label>
        <textarea
          name="courses_offered"
          value={form.courses_offered}
          onChange={handleChange}
          className="flex-1 w-full border p-2 rounded"
          required
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-3 flex items-center justify-between">
        <p className="text-gray-600">
          <strong>Last Updated:</strong> {form.last_updated_at ? form.last_updated_at.substring(0,10) : "N/A"}
        </p>
        <Button type="submit" disabled={formLoading} className="text-white text-lg shadow px-2 py-3 rounded bg-orange-500 hover:bg-amber-700 hover:cursor-pointer">
          {formLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: string;
  value: any;
  onChange: any;
  type?: string;
}) {
  return (
    <div className="flex w-full items-center gap-5">
      <label htmlFor={name} className="w-40 font-medium">
        {label}:
      </label>
      <input
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        className="flex-1 w-full border p-2 rounded"
        required
      />
    </div>
  );
}
