import { Module } from '@nestjs/common'
import { AudioTranslator } from './contracts/contract-audio-translator'
import { TextAnalyzer } from './contracts/contract-text-analyzer'
import { OpenAI } from './open-ai'
import { ToolsRecommender } from './contracts/contract-tools-recommender'

@Module({
  providers: [
    { provide: AudioTranslator, useClass: OpenAI },
    { provide: TextAnalyzer, useClass: OpenAI },
    { provide: ToolsRecommender, useClass: OpenAI },
  ],
  exports: [AudioTranslator, TextAnalyzer, ToolsRecommender],
})
export class AiModule {}
