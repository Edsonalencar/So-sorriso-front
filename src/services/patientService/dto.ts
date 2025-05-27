import { Address, Profile, ActiveStatus } from "@/types/authTypes";
import { Clinic } from "../clinicService/dto";

export interface Patient {
  id: string;
  profile: Profile;
  clinic: Clinic;
  createdAt?: string;
}

export interface CreatePatientDTO {
  status?: ActiveStatus;
  name?: string;
  document?: string;
  phone?: string;
  birthDate?: string;
  address?: Address;
}
