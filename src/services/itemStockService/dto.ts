import { ActiveStatus } from "@/types/authTypes";

export interface CreateItemStockRequest {
  name: string;
  description?: string;
  code: string;
}

export interface ItemStock {
  id: string;
  name: string;
  description?: string;
  status: ActiveStatus;
  clinicId: string;
  code: string;
  createdAt: string;
}
