import {
  ServiceOrderAudioDTO,
  ServiceOrderFormDTO,
} from "../schemas/serviceOrder";
import { api } from "./api";

const orderForm = async (data: ServiceOrderFormDTO) => {
  const response = await api.post("", {
    email: data.username,
    password: data.password,
  });
  return response.data;
};

const orderAudio = async (data: ServiceOrderAudioDTO) => {
  const response = await api.post("/admins/create", data);
  return response.data;
};

export { login, register };
