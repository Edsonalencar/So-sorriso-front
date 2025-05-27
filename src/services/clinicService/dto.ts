import { User } from "@/types/authTypes";

export interface CreateClinicDTO {
  name: string;
  username?: string;
  password?: string;
  ownerName?: string;
  document?: string;
  phone?: string;
  birthDate?: string | Date;
  role?: RoleType;
}

export interface Clinic {
  id: string;
  name: string;
  owner: User;
  createdAt: string;
}

export enum RoleType {
  ROLE_ATTENDANT = "ATTENDANT",
  ROLE_DENTIST = "DENTIST",
  ROLE_ADMIN = "ADMIN",
  ROLE_SUPER_ADMIN = "SUPER_ADMIN",
}
