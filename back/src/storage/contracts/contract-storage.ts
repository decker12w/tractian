import { type ReadStream } from 'node:fs'

export enum Folder {
  AVATARS = 'avatars',
  BANNERS = 'banners',
  ROOT = '',
}

export abstract class Storage {
  abstract save: (file: string, folder: Folder) => Promise<string>
  abstract delete: (file: string, folder: Folder) => Promise<void>
  abstract get: (file: string, folder: Folder) => Promise<ReadStream>
}
