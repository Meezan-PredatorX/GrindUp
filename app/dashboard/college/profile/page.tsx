/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/context/UserContext";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function CollegeProfile() {
  const { user, loading } = useUser();
  const supabase = supabaseBrowserClient();

  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    location: "",
    mobile_no: "",
    no_of_students: 0,
    naac_grade: "",
    affiliated_university: "",
    tpo_name: "",
    current_highest_cgpa: 0.0,
    l3y_no_of_students_placed: 0,
    l3y_avg_ctc_offered: 0.0,
    l3y_placement_perc: 0.0,
    courses_offered: "",
    created_at: "",
    last_updated: "",
  });

  const [formLoading, setFormLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && user) {
      const getProfile = async () => {
        const { data, error } = await supabase
          .from("college_profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          setError("Unable to fetch profile. Please try again.");
          console.error(error);
        } else {
          setForm(data);
        }
        setFormLoading(false);
      };

      getProfile();
    }
  }, [user, loading, supabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setError("");

    const { error } = await supabase
      .from("college_profiles")
      .update({
        ...form,
        last_updated: new Date().toISOString(),
      })
      .eq("id", user?.id);

    if (error) {
      setError("Error updating profile: " + error.message);
    } else {
        const { error: userUpdateError } = await supabase
          .from("users")
          .update({ is_profile_completed: true })
          .eq("id", user.id);

        if (userUpdateError) {
          console.error("Error updating is_profile_completed:", userUpdateError.message);
        }
      alert("Profile updated successfully!");
    }

    setFormLoading(false);
  };

  if (formLoading) return <p>Loading your profile...</p>;

  return (
    <main className="p-6 flex flex-col w-full min-h-screen items-center justify-start">
      {(error) && <p className="w-full p-3 bg-red-300 text-red-700 border-2 border-red-700">{error}!</p>}
      <h1 className="text-3xl font-bold mb-4">
        Your College Profile, {user?.user_metadata?.name}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="my-10 w-full md:w-2/3 flex flex-col gap-4 p-8 rounded shadow-lg border-2 border-gray-200"
      >
        <InputField
          label="College Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <InputField
          label="Official Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <InputField
          label="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
        />
        <InputField
          label="Mobile No."
          name="mobile_no"
          value={form.mobile_no}
          onChange={handleChange}
        />
        <InputField
          label="No. of Students"
          name="no_of_students"
          type="number"
          value={form.no_of_students}
          onChange={handleChange}
        />
        <InputField
          label="NAAC Grade"
          name="naac_grade"
          value={form.naac_grade}
          onChange={handleChange}
        />
        <InputField
          label="Affiliated University"
          name="affiliated_university"
          value={form.affiliated_university}
          onChange={handleChange}
        />
        <InputField
          label="TPO Name"
          name="tpo_name"
          value={form.tpo_name}
          onChange={handleChange}
        />
        <InputField
          label="Current highest CGPA"
          name="current_highest_cgpa"
          value={form.current_highest_cgpa}
          onChange={handleChange}
        />
        <InputField
          label="Last 3 years student placed"
          name="l3y_no_of_students_placed"
          value={form.l3y_no_of_students_placed}
          onChange={handleChange}
        />
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

        <div className="mt-3 flex items-center justify-between">
          <p className="text-gray-600">
            <strong>Last Updated:</strong>{" "}
            {form.last_updated ? form.last_updated.substring(0, 10) : "N/A"}
          </p>
          <Button
            type="submit"
            disabled={formLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-lg"
          >
            {formLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </main>
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
