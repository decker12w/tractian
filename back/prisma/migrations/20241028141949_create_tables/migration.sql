-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('PREDITIVA', 'PREVENTIVA', 'CORRETIVA', 'INSPECAO');

-- CreateTable
CREATE TABLE "technicals" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "technicals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planners" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "planners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "OrderType" NOT NULL,
    "machineName" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "plannerId" TEXT NOT NULL,
    "technicalId" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_tools" (
    "orderId" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,

    CONSTRAINT "order_tools_pkey" PRIMARY KEY ("orderId","toolId")
);

-- CreateTable
CREATE TABLE "tools" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sap" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "quantityInUse" INTEGER NOT NULL,

    CONSTRAINT "tools_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "technicals_username_key" ON "technicals"("username");

-- CreateIndex
CREATE UNIQUE INDEX "planners_username_key" ON "planners"("username");

-- CreateIndex
CREATE UNIQUE INDEX "tools_sap_key" ON "tools"("sap");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_plannerId_fkey" FOREIGN KEY ("plannerId") REFERENCES "planners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_technicalId_fkey" FOREIGN KEY ("technicalId") REFERENCES "technicals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_tools" ADD CONSTRAINT "order_tools_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_tools" ADD CONSTRAINT "order_tools_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "tools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
