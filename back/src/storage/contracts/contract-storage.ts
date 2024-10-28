import { type ReadStream } from 'node:fs'

export enum Folder {
  ORDERS = 'orders',
  ROOT = '',
}

export abstract class Storage {
  abstract streamToFile: (
    stream: ReadStream,
    fileName: string,
    folder: Folder,
  ) => Promise<void>

  abstract save: (file: string, folder: Folder) => Promise<string>
  abstract delete: (file: string, folder: Folder) => Promise<void>
  abstract get: (file: string, folder: Folder) => Promise<ReadStream>
}
