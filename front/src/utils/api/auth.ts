import { LoginDTO, RegisterDTO } from "../schemas/auth";
import { api } from "./api";

// Função de Login
const login = async (data: LoginDTO) => {
  const response = await api.post("/users/login", {
    username: data.username,
    password: data.password,
  });
  return response.data;
};

// Função de Registro
const registerUser = async (data: RegisterDTO) => {
  const response = await api.post("/users", data);
  return response.data;
};

export { login, registerUser, api };
