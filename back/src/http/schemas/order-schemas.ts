import { z } from 'zod'

const analyzeAudioOrTextBodySchema = z.object({
  text: z.string().optional(),
})

type AnalyzeAudioOrTextBodySchema = z.infer<typeof analyzeAudioOrTextBodySchema>

export { analyzeAudioOrTextBodySchema, AnalyzeAudioOrTextBodySchema }
