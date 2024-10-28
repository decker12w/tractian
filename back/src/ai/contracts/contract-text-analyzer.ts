import { OrderType } from '@prisma/client'

export type AnalyzerResponse = {
  analysisResult: {
    title: string
    description: string
    type: OrderType
    machineName: string
  }[]
}

export abstract class TextAnalyzer {
  abstract analyze(text: string): Promise<AnalyzerResponse>
}
