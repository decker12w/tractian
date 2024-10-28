import fs, { createWriteStream, type ReadStream } from 'node:fs'
import { resolve } from 'node:path'
import { Injectable } from '@nestjs/common'
import { type Folder, type Storage } from '@/storage/contracts/contract-storage'

@Injectable()
export class LocalStorage implements Storage {
  async streamToFile(
    stream: ReadStream,
    fileName: string,
    folder: Folder,
  ): Promise<void> {
    const folderPath = resolve(`./.tmp/${folder}`)
    const filePath = resolve(folderPath, fileName)

    return new Promise((resolve, reject) => {
      const writable = createWriteStream(filePath)
      stream.pipe(writable)

      writable.on('finish', () => resolve())
      writable.on('error', (err) => reject(err))
      stream.on('error', (err) => reject(err))
    })
  }

  async save(file: string, folder: Folder): Promise<string> {
    const currentLocal = resolve('./.tmp', file)
    const moveTo = resolve(`./.tmp/${folder}`, file)
    await fs.promises.rename(currentLocal, moveTo)

    return file
  }

  async delete(file: string, folder: Folder): Promise<void> {
    const fileName = resolve(`./.tmp/${folder}`, file)
    if (fs.existsSync(fileName)) {
      await fs.promises.unlink(fileName)
    }
  }

  async get(file: string, folder: Folder): Promise<ReadStream> {
    const fileName = resolve(`./.tmp/${folder}`, file)

    return fs.createReadStream(resolve(fileName))
  }
}
