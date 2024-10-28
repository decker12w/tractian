import { Tool } from '@prisma/client'

export abstract class ToolsRepository {
  abstract findById: (id: string) => Promise<Tool | null>
  abstract findAll: () => Promise<Tool[]>
}
