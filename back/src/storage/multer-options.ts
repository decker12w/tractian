import { diskStorage } from 'multer'
import e from 'express'
import { randomUUID } from 'node:crypto'
import { extname } from 'node:path'

export const multerOptions = {
  storage: diskStorage({
    destination: './.tmp',
    filename(
      req: e.Request,
      file: Express.Multer.File,
      callback: (error: Error | null, filename: string) => void,
    ) {
      const randomName = randomUUID()
      callback(null, `${randomName}${extname(file.originalname)}`)
    },
  }),
}
