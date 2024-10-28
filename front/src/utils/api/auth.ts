import { LoginDTO, RegisterDTO } from "../schemas/auth";
import { api } from "./api";

const login = async (data: LoginDTO) => {
  const response = await api.post("", {
    email: data.username,
    password: data.password,
  });
  return response.data;
};

const register = async (data: RegisterDTO) => {
  const response = await api.post("/admins/create", data);
  return response.data;
};

export { login, register };
