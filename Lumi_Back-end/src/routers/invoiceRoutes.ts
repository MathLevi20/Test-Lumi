import { Router } from 'express';
import { InvoiceController } from '../controllers/invoiceController';
import { PrismaClient } from '@prisma/client';

const router = Router();

// Função para configurar rotas de faturas
export default function invoiceRoutes(prisma: PrismaClient) {
    // Rota para buscar todas as faturas
    router.get('/', async (req, res) => {
        try {
            const invoices = await prisma.invoice.findMany();
            res.json(invoices);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar faturas' });
        }
    });

    // Rota para buscar uma fatura por ID
    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const invoice = await prisma.invoice.findUnique({ where: { id: Number(id) } }); // Converte id para número
            if (invoice) {
                res.json(invoice);
            } else {
                res.status(404).json({ error: 'Fatura não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar fatura' });
        }
    });

    // Rota para criar uma nova fatura
    router.post('/', async (req, res) => {
        const data = req.body;
        try {
            const newInvoice = await prisma.invoice.create({ data });
            res.status(201).json(newInvoice);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar fatura' });
        }
    });

    // Rota para atualizar uma fatura existente
    router.put('/:id', async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        try {
            const updatedInvoice = await prisma.invoice.update({
                where: { id: Number(id) }, // Converte id para número
                data,
            });
            res.json(updatedInvoice);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar fatura' });
        }
    });

    // Rota para deletar uma fatura
    router.delete('/:id', async (req, res) => {
        const { id } = req.params;
        try {
            await prisma.invoice.delete({ where: { id: Number(id) } }); // Converte id para número
            res.status(204).send(); // No content
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar fatura' });
        }
    });

    return router;
}
