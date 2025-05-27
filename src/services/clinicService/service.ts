import { ActiveStatus } from "@/types/authTypes";
import { BaseService } from "../api";
import { ResponseDTO } from "../api/types";

export class BaseClinicService extends BaseService {
  disable = async <T>(id: string, data: ActiveStatus) => {
    const res = await this.getApi()?.put<ResponseDTO<T>, string>(
      `${this.getURL()}/${id}/status`,
      data
    );
    return res;
  };
}

export const ClinicService = new BaseClinicService("/clinic");
