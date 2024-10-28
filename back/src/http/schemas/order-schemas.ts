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
})

const getToolsRecommendationByOrderParamSchema = z.object({
  orderId: z.string().uuid(),
})

const updateOrderStatusParamSchema = z.object({
  id: z.string().uuid(),
})

const updateOrderStatusBodySchema = z.object({
  status: z.enum(['STARTED', 'FINISHED']),
})

const updateOrderToolsParamSchema = z.object({
  id: z.string().uuid(),
})

const updateOrderToolsBodySchema = z.object({
  toolsIds: z.string().uuid().array(),
})

type AnalyzeAudioOrTextBodySchema = z.infer<typeof analyzeAudioOrTextBodySchema>
type CreateOrderBodySchema = z.infer<typeof createOrderBodySchema>
type GetToolsRecommendationByOrderParamSchema = z.infer<
  typeof getToolsRecommendationByOrderParamSchema
>
type UpdateOrderStatusParamSchema = z.infer<typeof updateOrderStatusParamSchema>
type UpdateOrderStatusBodySchema = z.infer<typeof updateOrderStatusBodySchema>
type UpdateOrderToolsParamSchema = z.infer<typeof updateOrderToolsParamSchema>
type UpdateOrderToolsBodySchema = z.infer<typeof updateOrderToolsBodySchema>

export {
  analyzeAudioOrTextBodySchema,
  createOrderBodySchema,
  getToolsRecommendationByOrderParamSchema,
  updateOrderStatusParamSchema,
  updateOrderStatusBodySchema,
  updateOrderToolsParamSchema,
  updateOrderToolsBodySchema,
  AnalyzeAudioOrTextBodySchema,
  CreateOrderBodySchema,
  GetToolsRecommendationByOrderParamSchema,
  UpdateOrderStatusParamSchema,
  UpdateOrderStatusBodySchema,
  UpdateOrderToolsParamSchema,
  UpdateOrderToolsBodySchema,
}
