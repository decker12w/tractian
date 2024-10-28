import { ReadStream } from 'node:fs'

export abstract class AudioTranslator {
  abstract translate(file: ReadStream): Promise<string>
}
