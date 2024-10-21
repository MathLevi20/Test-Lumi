import { Request, Response } from 'express';
import { InvoiceService } from '../services/processInvoices';

export class InvoiceController {
    static async getAllInvoices(req: Request, res: Response): Promise<void> {
        try {
            const invoices = await InvoiceService.getAllInvoices();
            res.status(200).json(invoices);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar faturas.' });
        }
    }

    static async getInvoiceById(req: Request, res: Response): Promise<void> {
        try {
            const invoiceId = req.params.id; // Mantenha como string
            const invoice = await InvoiceService.getInvoiceById(invoiceId);
            if (invoice) {
                res.status(200).json(invoice);
            } else {
                res.status(404).json({ error: 'Fatura não encontrada.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar fatura.' });
        }
    }

    static async createInvoice(req: Request, res: Response): Promise<void> {
        try {
            const newInvoice = await InvoiceService.createInvoice(req.body);
            res.status(201).json(newInvoice);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar fatura.' });
        }
    }

    static async updateInvoice(req: Request, res: Response): Promise<void> {
        try {
            const invoiceId = req.params.id; // Mantenha como string
            const updatedInvoice = await InvoiceService.updateInvoice(invoiceId, req.body);
            if (updatedInvoice) {
                res.status(200).json(updatedInvoice);
            } else {
                res.status(404).json({ error: 'Fatura não encontrada.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar fatura.' });
        }
    }

    static async deleteInvoice(req: Request, res: Response): Promise<void> {
        try {
            const invoiceId = req.params.id; // Mantenha como string
            const success = await InvoiceService.deleteInvoice(invoiceId);
            if (success) {
                res.status(200).json({ message: 'Fatura deletada com sucesso.' });
            } else {
                res.status(404).json({ error: 'Fatura não encontrada.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar fatura.' });
        }
    }
}
