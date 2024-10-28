import { ServiceOrderDTO } from "../schemas/serviceOrder";
import { api } from "./api";

// Função para enviar ordem de serviço
export const submitServiceOrder = async (data: ServiceOrderDTO) => {
  const formData = new FormData();

  console.log(data)

  if (data.text) {
    formData.append("text", data.text);
  }

  if (data.audioUpload && data.audioUpload.length > 0) {
    formData.append("audio", data.audioUpload[0]);
  }

  if (data.recordedAudio) {
    formData.append("audio", data.recordedAudio, "recordedAudio.webm");
  }

  const response = await api.post("/orders/analyze", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.result;
};
