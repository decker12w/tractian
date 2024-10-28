import { Injectable } from '@nestjs/common'
import {
  AnalyzerResponse,
  TextAnalyzer,
} from '@/ai/contracts/contract-text-analyzer'
import { AudioTranslator } from '@/ai/contracts/contract-audio-translator'
import { Folder, Storage } from '@/storage/contracts/contract-storage'
import { InvalidFieldError } from './errors/invalid-field-error'

type AnalyzeAudioOrTextServiceRequest = {
  text?: string
  audio?: string
}

type AnalyzeAudioOrTextServiceResponse = {
  result: AnalyzerResponse
}

@Injectable()
export class AnalyzeAudioOrTextService {
  constructor(
    private audioTranslator: AudioTranslator,
    private textAnalyzer: TextAnalyzer,
    private storage: Storage,
  ) {}

  async execute({
    text,
    audio,
  }: AnalyzeAudioOrTextServiceRequest): Promise<AnalyzeAudioOrTextServiceResponse> {
    let translatedText: string

    if (audio !== undefined && text !== undefined) {
      throw new InvalidFieldError('Áudio e texto')
    }

    if (audio !== undefined) {
      const audioFile = await this.storage.get(audio, Folder.ROOT)
      translatedText = await this.audioTranslator.translate(audioFile)
    } else if (text !== undefined) {
      translatedText = text
    } else {
      throw new InvalidFieldError('Áudio e texto')
    }

    const result = await this.textAnalyzer.analyze(translatedText)

    return {
      result,
    }
  }
}
