import { Injectable } from '@nestjs/common'
import OpenAIApi from 'openai'
import { ConfigService } from '@nestjs/config'
import { ReadStream } from 'node:fs'
import { Env } from '@/env'
import { AudioTranslator } from './contracts/contract-audio-translator'
import {
  TextAnalyzer,
  AnalyzerResponse
} from './contracts/contract-text-analyzer'
import { OpenAIError } from '@/services/errors/open-ai-error'
import { ToolsRecommenderRequest, ToolsRecommenderResponse } from './contracts/contract-tools-recommender'
import { Order } from '@prisma/client'

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


  async recommendTools(order: Order): Promise<ToolsRecommenderResponse> {
    try {
      // Construct the order details for the prompt
      const orderDetails = `
      Order Title: ${order.title}
      Description: ${order.description}
      Type: ${order.type}
      Machine Name: ${order.machineName}
      `;

      // Build the prompt with the required context and instructions
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

      Detalhes da Ordem de Serviço Industrial:
      ${orderDetails}
      `;

      // Call the OpenAI API to get the recommended tools
      const response = await this.openAiClient.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
      });

      // Extract and parse the assistant's reply
      const assistantReply = response.choices[0].message?.content?.trim();
      const tools: ToolsRecommenderResponse = JSON.parse(assistantReply || '[]');

      // Return the list of recommended tools
      return tools;
    } catch (error) {
      throw new OpenAIError();
    }
  }
}
