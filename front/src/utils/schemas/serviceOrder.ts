import { z } from "zod";
import { OrderType } from "../types";

const CreateOrderFormSchema = z.object({
  title: z.string().min(1, "Campo obrigatório"),
  description: z.string().min(1, "Campo obrigatório"),
  machineName: z.string().min(1, "Campo obrigatório"),
  orderType: z.nativeEnum(OrderType),
});

export const ServiceOrderSchema = z
  .object({
    text: z.string().optional(),
    audioUpload: z.any().optional(),
    recordedAudio: z.any().optional(),
  })
  .refine(
    (data) =>
      (data.text && !data.audioUpload && !data.recordedAudio) ||
      (!data.text && (data.audioUpload || data.recordedAudio)),
    {
      message: "Você deve fornecer apenas texto ou áudio, não ambos.",
    }
  );

export type ServiceOrderDTO = z.infer<typeof ServiceOrderSchema>;

type ServiceOrderFormDTO = z.infer<typeof CreateOrderFormSchema>;

export { CreateOrderFormSchema, type ServiceOrderFormDTO };
