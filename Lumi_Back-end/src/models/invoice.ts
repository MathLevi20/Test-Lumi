import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type Invoice = {
    id: number;
    clientNumber: string;
    referenceMonth: string;
    electricEnergyKwh: number;
    electricEnergyValue: number;
    sceeValue: number;
    compensatedEnergyKwh: number;
    publicLightingContribution: number;
    total: number; // Removido o '?' para tornar obrigatório
};
