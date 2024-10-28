import { OrderType } from '@prisma/client'
import { z } from 'zod'

const analyzeAudioOrTextBodySchema = z.object({
  text: z.string().optional(),
})

const createOrderBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  type: z.nativeEnum(OrderType),
  machineName: z.string(),
  technicalId: z.string().uuid(),
})

type AnalyzeAudioOrTextBodySchema = z.infer<typeof analyzeAudioOrTextBodySchema>
type CreateOrderBodySchema = z.infer<typeof createOrderBodySchema>

export {
  analyzeAudioOrTextBodySchema,
  createOrderBodySchema,
  AnalyzeAudioOrTextBodySchema,
  CreateOrderBodySchema,
}
