/*
  Warnings:

  - You are about to drop the `invoices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "invoices";

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "clientNumber" TEXT NOT NULL,
    "referenceMonth" TEXT NOT NULL,
    "electricEnergyKwh" DOUBLE PRECISION NOT NULL,
    "electricEnergyValue" DOUBLE PRECISION NOT NULL,
    "sceeValue" DOUBLE PRECISION NOT NULL,
    "compensatedEnergyKwh" DOUBLE PRECISION NOT NULL,
    "publicLightingContribution" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
