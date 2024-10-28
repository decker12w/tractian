import { ZodValidationPipe } from '@/http/pipes/zod-validation-pipe'
import {
  Body,
  Controller,
  Get,
  HttpCode,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { Express } from 'express'
import {
  AnalyzeAudioOrTextBodySchema,
  analyzeAudioOrTextBodySchema,
} from '@/http/schemas/order-schemas'
import { AnalyzeAudioOrTextService } from '@/services/analyze-audio-or-text.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { multerOptions } from '@/storage/multer-options'

const bodyValidationPipe = new ZodValidationPipe(analyzeAudioOrTextBodySchema)

@Controller('/orders/analyze')
export class AnalyzeAudioOrTextController {
  constructor(private analyzeAudioOrTextService: AnalyzeAudioOrTextService) {}

  @Get()
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('audio', multerOptions))
  async handle(
    @Body(bodyValidationPipe)
    { text }: AnalyzeAudioOrTextBodySchema,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 10,
            message: 'Max audio size: 10MB',
          }),
        ],
        fileIsRequired: false,
      }),
    )
    audio?: Express.Multer.File,
  ) {
    const { result } = await this.analyzeAudioOrTextService.execute({
      text,
      audio: audio ? audio.filename : undefined,
    })

    return {
      result,
    }
  }
}
