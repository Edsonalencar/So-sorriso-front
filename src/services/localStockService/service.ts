import { ActiveStatus } from "@/types/authTypes";
import { BaseService } from "../api";

export class BaseLocalStockService extends BaseService {
  updateStatus = async (id: string, data: { status: ActiveStatus }) => {
    return await this.getApi()?.put(`${this.getURL()}/${id}/status`, data);
  };
}

export const LocalStockService = new BaseLocalStockService("/local");
