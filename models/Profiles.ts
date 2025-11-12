export interface CollegeProfile {
  name: string,
  city: string,
  mobile: string,
  no_of_students: number,
  affiliated_university: string,
  college_grade: string,
  tpo_name: string,
  current_highest_cgpa: number,
  l3y_no_of_students_placed: number,
  l3y_placement_perc: number,
  l3y_average_ctc_offered: number,
  courses_offered: string[],
  isProfileCompleted: boolean
}

export interface CompanyProfile {
  id: string
  companyId: string
  industry: string
  companySize: number
  headquarters: string
}