/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { supabaseBrowserClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useUser } from "@/lib/context/UserContext";
import { useEffect, useState } from "react";

export default function CollegePage() {
  const { user, loading } = useUser();
  const supabase = supabaseBrowserClient();

  const [jobs, setJobs] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      // 2️⃣ Fetch job posts
      const { data: jobsData } = await supabase
        .from("job_posts")
        .select("*")
        .eq("status", "open")
        .order("created_at", { ascending: false });

      setJobs(jobsData || []);
      setFetching(false);
    };

    if (!loading) fetchData();
  }, [user, loading, supabase]);

  if (fetching) return <p className="p-5">Loading dashboard...</p>;

  return (
    <main className="flex flex-col w-full min-h-full">
      {!user.user_metadata.isProfileCompleted && (
        <div className="w-full p-3 flex gap-5 items-center rounded border-2 border-yellow-500 bg-yellow-200 text-amber-700">
          <p>Completing your profile can help you get better job opportunities!</p>
          <Link
            href="/dashboard/college/profile"
            className="p-2 bg-yellow-700 text-white rounded shadow-lg hover:bg-yellow-800"
          >
            Complete your Profile Here
          </Link>
        </div>
      )}

      <div className="my-5 w-full flex items-center justify-start gap-10">
        <h1 className="text-4xl font-bold">Actively Hiring Companies</h1>
        <div className="w-full h-1 flex-1 bg-gray-300 rounded"></div>
      </div>

      {/* 🧩 Job Cards */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length === 0 ? (
          <p>No job posts available right now.</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="p-5 flex flex-col rounded-lg shadow border border-orange-500 hover:shadow-lg transition-all duration-200 bg-white"
            >
              <h2 className="text-2xl font-semibold">{job.role}</h2>
              <p className="text-gray-600 mt-1">{job.company_name}</p>
              <p className="mt-2 text-gray-800 line-clamp-3">{job.job_description}</p>
              <div className="mt-3 flex justify-between text-sm text-gray-500">
                <span>{job.location}</span>
                <span>{job.employment_type}</span>
              </div>
              <div className="mt-4">
                <Link
                  href={`/dashboard/college/jobs/${job.id}`}
                  className="text-orange-800 hover:underline font-medium"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
