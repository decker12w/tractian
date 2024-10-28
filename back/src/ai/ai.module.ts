import { Module } from '@nestjs/common'
import { AudioTranslator } from './contracts/contract-audio-translator'
import { TextAnalyzer } from './contracts/contract-text-analyzer'
import { OpenAI } from './open-ai'
import { ToolsRecommender } from './contracts/contract-tools-recommender'
import { TechnicalRecommender } from './contracts/contract-technical-recommender'

@Module({
  providers: [
    { provide: AudioTranslator, useClass: OpenAI },
    { provide: TextAnalyzer, useClass: OpenAI },
    { provide: ToolsRecommender, useClass: OpenAI },
    { provide: TechnicalRecommender, useClass: OpenAI },
  ],
  exports: [
    AudioTranslator,
    TextAnalyzer,
    ToolsRecommender,
    TechnicalRecommender,
  ],
})
export class AiModule {}
