export enum UserType {
  CoOLLEGE = "college",
  COMPANY = "company",
}

export interface User {
  id: string
  email: string
  userType: UserType
}

export interface CollegeUser {
  collegName: string
  username: string
  password: string
  email: string
  phoneNumber: string
}

export interface CompanyUser {
  companyName: string
  username: string
  password: string
  email: string
  phoneNumber: string
}