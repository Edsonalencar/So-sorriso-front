import { Address, ActiveStatus } from "@/types/authTypes";

export interface CreateOrUpdateUserDTO {
  name?: string;
  username?: string;
  document?: string;
  phone?: string;
  password?: string;
  status?: ActiveStatus;
  birthDate?: string;
  address?: Address;
}