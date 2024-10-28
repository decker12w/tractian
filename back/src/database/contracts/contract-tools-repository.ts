import { Tool } from '@prisma/client'
export abstract class ToolsRepository {
    abstract findAll: () => Promise<Tool[]>
}
