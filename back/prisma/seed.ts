import { PrismaClient } from '@prisma/client'
import csv from 'csv-parser'
import path from 'node:path'
import fs from 'node:fs'

const prismaClient = new PrismaClient()

async function main(): Promise<void> {
  await seedTools()
}

async function seedTools(): Promise<void> {
  const csvFilePath = path.resolve('.', 'toolsSeed.csv') // Adjust path if needed

  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', async (row) => {
        await prismaClient.tool.create({
          data: {
            category: row.category,
            description: row.description,
            sap: row.sap,
            quantity: 1,
            quantityInUse: 0,
          },
        })
      })
      .on('end', () => {
        resolve()
      })
      .on('error', (error) => {
        reject(error)
      })
  })
}

main()
  .then(async () => {
    await prismaClient.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prismaClient.$disconnect()
    process.exit(1)
  })
