import { CompanyUser } from "./Users";

export enum JobType {
   FULL_TIME = "Full-Time",
   PART_TIME = "Part-Time",
   INTERNSHIP = "Internship",
   CONTRACT = "Contract",
}

export enum JobLocation {
   REMOTE = "Remote",
   ONSITE = "Onsite",
   HYBRID = "Hybrid",
}

export type JobPost = {
   id: string,
   companyId: CompanyUser["id"],
   title: string,
   description: string,
   skillsRequired: string[],
   salary: string,
   jobType: JobType,
   location: JobLocation,
   companyLocation: CompanyUser["location"],
}