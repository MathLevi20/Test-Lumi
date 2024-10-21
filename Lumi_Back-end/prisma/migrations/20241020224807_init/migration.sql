-- CreateTable
CREATE TABLE "invoices" (
    "id" UUID NOT NULL,
    "clientNumber" TEXT NOT NULL,
    "referenceMonth" TEXT NOT NULL,
    "electricEnergyKwh" INTEGER NOT NULL,
    "electricEnergyValue" DOUBLE PRECISION NOT NULL,
    "sceeValue" DOUBLE PRECISION NOT NULL,
    "compensatedEnergyKwh" INTEGER NOT NULL,
    "publicLightingContribution" DOUBLE PRECISION NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);
