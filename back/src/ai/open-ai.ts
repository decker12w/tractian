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
import {
  ToolsRecommender,
  ToolsRecommenderRequest,
} from './contracts/contract-tools-recommender'
import { Tool } from '@prisma/client'
import {
  TechnicalRecommender,
  TechnicalRecommenderRequest,
} from './contracts/contract-technical-recommender'

@Injectable()
export class OpenAI
  implements
    AudioTranslator,
    TextAnalyzer,
    ToolsRecommender,
    TechnicalRecommender
{
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

  async recommendTools({
    order,
    tools,
  }: ToolsRecommenderRequest): Promise<Tool[]> {
    try {
      const orderDetails = `
      Título ordem: ${order.title}
      Descrição: ${order.description}
      Tipo: ${order.type}
      Nome da máquina: ${order.machineName}
      `

      const prompt = `
      Com base na seguinte ordem de serviço industrial, recomende uma lista de ferramentas necessárias para concluir o trabalho. Retorne o resultado estritamente como um array JSON de objetos de ferramentas, sem qualquer texto ou explicação adicional. Cada objeto de ferramenta deve ter a seguinte estrutura:
      [
        {
          "id": "string",
          "category": "string",
          "description": "string",
          "sap": "string",
          "quantity": number,
          "quantityInUse": number
        },
        ...
      ]
      Use como base essas ferramentas já criadas: 
      ${tools.map((tool) => {
        return `
            {
              "id": "${tool.id}",
              "category": "${tool.category}",
              "description": "${tool.description}",
              "sap": "${tool.sap}",
              "quantity": ${tool.quantity},
              "quantityInUse": ${tool.quantityInUse}
            }
          `
      })}
      Detalhes da Ordem de Serviço Industrial:
      ${orderDetails}
      `

      console.log(prompt)

      const response = await this.openAiClient.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
      })

      const assistantReply = response.choices[0].message?.content?.trim()
      const toolsRecommended = JSON.parse(assistantReply || '[]')

      return toolsRecommended
    } catch (error) {
      throw new OpenAIError()
    }
  }

  async recommendTechnical({
    orders,
    technicals,
  }: TechnicalRecommenderRequest): Promise<string> {
    try {
      const prompt = `
      Com base nas seguinte ordems de serviço industrial, finalizadas, abertas e iniciadas, recomende 1 técnico que está com menos tarefas marcadas para concluir o trabalho. Retorne o resultado estritamente como um uuid do técnico, sem qualquer texto ou explicação adicional.
      Use como base essas ordens já criadas: 
      ${orders.map((order) => {
        return `
            {
              "id": "${order.id}",
              "createdAt": "${order.createdAt}",
              "startedAt": "${order.startedAt}",
              "finishedAt": "${order.finishedAt}",
              "technicalId": ${order.technicalId}
            }
          `
      })}
      Use como base esses técnicos:
      ${technicals.map((technical) => {
        return `
          {
            "id": "${technical.id}"
          }
        `
      })}
      `

      const response = await this.openAiClient.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
      })

      return response.choices[0].message.content!
    } catch (error) {
      console.log(error)
      throw new OpenAIError()
    }
  }
}
