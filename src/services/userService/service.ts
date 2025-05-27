import { User, ActiveStatus } from "@/types/authTypes";
import { LoginType } from "../../types";
import { apiNoAuth, api } from "../api";
import { AbstractException } from "../api/handler/exceptions/AbstractException";
import { ResponseDTO } from "../api/types";
import { CreateOrUpdateUserDTO } from "./dto";

export class UserService {
  static async login({
    username,
    password,
  }: LoginType): Promise<ResponseDTO<string>> {
    const res = await apiNoAuth.post("/users/login", {
      username,
      password,
    });

    if (res == undefined)
      throw new AbstractException("Alguma coisa aconteceu errado!");

    return res;
  }

  static async updateStatus(userId: string, status: ActiveStatus) {
    const res = await api.put(`/users/${userId}/status`, {
      status,
    });
    return res as ResponseDTO<User>;
  }

  static async getById(userId: string) {
    const res = await api.get(`/users/${userId}`);
    return res as ResponseDTO<User>;
  }

  static async create(data: CreateOrUpdateUserDTO) {
    const res = await api.post(`/users/register`, data);
    return res as ResponseDTO<User>;
  }

  static async update(userId: string, data: CreateOrUpdateUserDTO) {
    const res = await api.put(`/users/${userId}`, data);
    return res as ResponseDTO<User>;
  }
}
