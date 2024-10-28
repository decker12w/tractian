import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

async function main(): Promise<void> {
  await seedTools()
}

async function seedTools(): Promise<void> {}

main()
  .then(async () => {
    await prismaClient.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prismaClient.$disconnect()
    process.exit(1)
  })
