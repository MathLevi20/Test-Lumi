// prismaTest.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Exemplo de uso
async function main() {
    const allInvoices = await prisma.invoice.findMany();
    console.log(allInvoices);
}

main()
    .catch(e => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
