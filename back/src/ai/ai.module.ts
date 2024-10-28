import { Module } from '@nestjs/common'
import { AudioTranslator } from './contracts/contract-audio-translator'
import { TextAnalyzer } from './contracts/contract-text-analyzer'
import { OpenAI } from './open-ai'

@Module({
  providers: [
    { provide: AudioTranslator, useClass: OpenAI },
    { provide: TextAnalyzer, useClass: OpenAI },
  ],
  exports: [AudioTranslator, TextAnalyzer],
})
export class AiModule {}
