import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import pdfParse from 'pdf-parse'; // Certifique-se de ter a biblioteca pdf-parse instalada
import { extractInvoiceData } from './dataExtrator';

const prisma = new PrismaClient();

// Definição do tipo Invoice se necessário
export type Invoice = {
    id: number;
    clientNumber: string;
    referenceMonth: string;
    electricEnergyKwh: number;
    electricEnergyValue: number;
    sceeValue: number;
    compensatedEnergyKwh: number;
    publicLightingContribution: number;
    total?: number;
};

export class InvoiceService {
    static async getAllInvoices(): Promise<Invoice[]> {
        return await prisma.invoice.findMany();
    }

    static async getInvoiceById(id: string): Promise<Invoice | null> {
        return await prisma.invoice.findUnique({
            where: { id: Number(id) },
        });
    }

    static async createInvoice(data: Omit<Invoice, 'id'>): Promise<Invoice> {
        return await prisma.invoice.create({ data });
    }

    static async updateInvoice(id: string, data: Partial<Omit<Invoice, 'id'>>): Promise<Invoice | null> {
        return await prisma.invoice.update({
            where: { id: Number(id) },
            data,
        });
    }

    static async deleteInvoice(id: string): Promise<boolean> {
        const invoice = await prisma.invoice.findUnique({
            where: { id: Number(id) },
        });
        if (invoice) {
            await prisma.invoice.delete({
                where: { id: Number(id) },
            });
            return true;
        }
        return false;
    }

    static async processPDF(filePath: string): Promise<Invoice> {
        const fileBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(fileBuffer);
        const extractedData = extractInvoiceData(pdfData.text);

        // Garantir que todos os campos tenham valores padrão caso sejam undefined
        const invoice = await this.createInvoice({
            clientNumber: extractedData.customerNumber,
            referenceMonth: `${extractedData.referenceMonth}/${extractedData.referenceYear}`,
            electricEnergyKwh: extractedData.electricEnergyKwh ?? 0, // Usando operador de coalescência nula
            electricEnergyValue: extractedData.electricEnergyValue ?? 0,
            sceeValue: extractedData.sceeValue ?? 0,
            compensatedEnergyKwh: extractedData.compensatedEnergyKwh ?? 0,
            publicLightingContribution: extractedData.publicLightingContribution ?? 0,
            total: extractedData.total ?? 0, // Garantindo que total nunca seja undefined
        });

        this.removeTempFile(filePath);
        return invoice;
    }

    static removeTempFile(filePath: string): void {
        try {
            fs.unlinkSync(filePath);
            console.log(`Arquivo temporário ${filePath} removido com sucesso.`);
        } catch (error) {
            console.error(`Erro ao remover o arquivo ${filePath}:`, error);
        }
    }
}
