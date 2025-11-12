import { JobPost } from "./JobPost";
import { CollegeUser } from "./Users";

enum JobApplicationStatus {
   APPLIED = "applied",
   REVIEWED = "reviewed",
   ACCEPTED = "accepted",
   REJECTED = "rejected"
}

export interface JobApplication {
   id: string,
   jobId: JobPost["id"],
   collegeId: CollegeUser["id"],
   status: JobApplicationStatus,
}