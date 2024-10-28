import { Injectable } from '@nestjs/common'
import OpenAIApi from 'openai'
import { ConfigService } from '@nestjs/config'
import { ReadStream } from 'node:fs'
import { Env } from '@/env'
import { AudioTranslator } from './contracts/contract-audio-translator'
import {
  TextAnalyzer,
  AnalyzerResponse,
} from './contracts/contract-text-analyzer'
import { OpenAIError } from '@/services/errors/open-ai-error'

@Injectable()
export class OpenAI implements AudioTranslator, TextAnalyzer {
  private openAiClient: OpenAIApi

  constructor(config: ConfigService<Env, true>) {
    this.openAiClient = new OpenAIApi({
      apiKey: config.get('OPEN_AI_KEY', { infer: true }),
    })
  }

  async translate(file: ReadStream): Promise<string> {
    try {
      const transcription = await this.openAiClient.audio.transcriptions.create(
        {
          file,
          model: 'whisper-1',
          response_format: 'text',
        },
      )

      return transcription
    } catch (error) {
      throw new OpenAIError()
    }
  }

  async analyze(text: string): Promise<AnalyzerResponse> {
    try {
      const prompt = `
      Faça a análise utilizando o seguinte contexto: um planejador deseja gerar uma ordem de serviço para um técnico de uma indústria. Analise o texto a seguir e retorne um objeto JSON com a estrutura:
      {
        "analysisResult": [
          {
            "title": "string",
            "description": "string",
            "type": "PREDITIVA | PREVENTIVA | CORRETIVA | INSPECAO",
            "machineName": "string"
          }
        ]
      }
      Text: "${text}"
      `

      const response = await this.openAiClient.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
      })

      const result = JSON.parse(response.choices[0].message?.content || '{}')

      return result
    } catch (error) {
      throw new OpenAIError()
    }
  }
}
