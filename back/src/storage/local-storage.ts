import fs, { type ReadStream } from 'node:fs'
import { resolve } from 'node:path'
import { Injectable } from '@nestjs/common'
import { type Folder, type Storage } from '@/storage/contracts/contract-storage'

@Injectable()
export class LocalStorage implements Storage {
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
