import { z } from "zod";
import { OrderType } from "../types";

const ServiceOrderFormSchema = z.object({
  title: z.string().min(1, "Campo obrigatório"),
  description: z.string().min(1, "Campo obrigatório"),
  machineName: z.string().min(1, "Campo obrigatório"),
  orderType: z.nativeEnum(OrderType),
});

const ServiceOrderAudioSchema = z.object({
  // Outros campos do formulário, se houver
  audioUpload: z
    .any()
    .optional()
    .refine((file) => {
      if (!file || file.length === 0) return true;
      return file.length === 1 && file[0].type.startsWith("audio/");
    }, "Por favor, envie um arquivo de áudio válido."),
  recordedAudio: z
    .any()
    .optional()
    .refine((file) => {
      if (!file) return true;
      return file instanceof Blob && file.type.startsWith("audio/");
    }, "Áudio gravado inválido."),
});

type ServiceOrderFormDTO = z.infer<typeof ServiceOrderFormSchema>;
type ServiceOrderAudioDTO = z.infer<typeof ServiceOrderAudioSchema>;

export {
  ServiceOrderFormSchema,
  type ServiceOrderFormDTO,
  ServiceOrderAudioSchema,
  type ServiceOrderAudioDTO,
};
