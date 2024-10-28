import { Injectable } from '@nestjs/common'
import { Order, OrderType } from '@prisma/client'
import { ReadStream } from 'node:fs'
import pdf, { type CreateOptions } from 'html-pdf'
import { TechnicalsRepository } from '@/database/contracts/contract-technicals-repository'
import { PlannersRepository } from '@/database/contracts/contract-planners-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PdfError } from './errors/pdf-error'
import { Folder, Storage } from '@/storage/contracts/contract-storage'
import { randomUUID } from 'node:crypto'
import { OrdersRepository } from '@/database/contracts/contract-orders-repository'
import { TechnicalRecommender } from '@/ai/contracts/contract-technical-recommender'

type CreateOrderServiceRequest = {
  title: string
  description: string
  type: OrderType
  machineName: string
  plannerId: string
}

type CreateOrderServiceResponse = {
  order: Order
}

@Injectable()
export class CreateOrderService {
  constructor(
    private technicalsRepository: TechnicalsRepository,
    private plannersRepository: PlannersRepository,
    private ordersRepository: OrdersRepository,
    private storage: Storage,
    private technicalRecommender: TechnicalRecommender,
  ) {}

  async execute({
    title,
    description,
    type,
    machineName,
    plannerId,
  }: CreateOrderServiceRequest): Promise<CreateOrderServiceResponse> {
    const planner = await this.plannersRepository.findById(plannerId)
    if (planner === null) {
      throw new ResourceNotFoundError('Planejador', 'id', plannerId)
    }

    const orders = await this.ordersRepository.findAll()
    const technicals = await this.technicalsRepository.findAll()

    const technicalId = await this.technicalRecommender.recommendTechnical({
      orders,
      technicals,
    })

    console.log(technicalId)

    const technical = await this.technicalsRepository.findById(technicalId)
    if (technical === null) {
      throw new ResourceNotFoundError('Técnico', 'id', technicalId)
    }

    const options: CreateOptions = {
      type: 'pdf',
      format: 'A3',
      orientation: 'landscape',
    }
    const now = new Date()

    const html = `
      <body style="max-width: 1190px; width: 100%; background-color: #fff; padding: 8px;">
        <table style="width: 100%; table-layout: fixed; border-collapse: collapse; margin-top: 8px; margin-bottom: 8px;">
          <thead>
            <tr>
              <th style="width: 15%; word-wrap: break-word; white-space: normal;">Título</th>
              <th style="width: 20%; word-wrap: break-word; white-space: normal;">Descrição</th>
              <th style="width: 10%; word-wrap: break-word; white-space: normal;">Tipo</th>
              <th style="width: 15%; word-wrap: break-word; white-space: normal;">Máquina</th>
              <th style="width: 15%; word-wrap: break-word; white-space: normal;">Planejador</th>
              <th style="width: 15%; word-wrap: break-word; white-space: normal;">Técnico</th>
              <th style="width: 10%; word-wrap: break-word; white-space: normal;">Data de criação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="word-wrap: break-word; white-space: normal;">${title}</td>
              <td style="word-wrap: break-word; white-space: normal;">${description}</td>
              <td style="word-wrap: break-word; white-space: normal;">${type}</td>
              <td style="word-wrap: break-word; white-space: normal;">${machineName}</td>
              <td style="word-wrap: break-word; white-space: normal;">${planner.fullName}</td>
              <td style="word-wrap: break-word; white-space: normal;">${technical.fullName}</td>
              <td style="word-wrap: break-word; white-space: normal;">${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</td>
            </tr>
            </tbody>
          </table>
      </body>

      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif; color: #121214 }
        table, th, td { border: 1px solid black; padding: 4px; text-align: left; font-size: 10px; }
        th { background-color: #f2f2f2; }
        td { word-wrap: break-word; white-space: nowrap; }
      </style>
    `

    const stream: ReadStream = await new Promise((resolve, reject) => {
      pdf.create(html, options).toStream((err, stream: ReadStream) => {
        if (err !== null) {
          reject(new PdfError())
          return
        }
        resolve(stream)
      })
    })

    const fileName = `${randomUUID()}.pdf`
    await this.storage.streamToFile(stream, fileName, Folder.ORDERS)

    const order = await this.ordersRepository.create({
      title,
      description,
      type,
      machineName,
      file: fileName,
      plannerId,
      technicalId,
    })

    return {
      order,
    }
  }
}
