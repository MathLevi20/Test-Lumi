import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import extractInvoiceData from './services/pdfExtractor';
import invoiceRoutes from './routers/invoiceRoutes';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3005;
const prisma = new PrismaClient(); // Inicializa o Prisma Client

// Middleware
app.use(express.json());

// Rotas
app.get('/', (req: Request, res: Response) => {
    res.send('API de Faturas de Energia');
});

// Configura as rotas
app.use('/invoices', invoiceRoutes(prisma)); // Passa o Prisma Client para as rotas

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

// Lida com o encerramento do servidor
process.on('SIGINT', async () => {
    await prisma.$disconnect(); // Desconecta o Prisma Client ao encerrar o servidor
    console.log('Prisma Client desconectado.');
    process.exit(0);
});
