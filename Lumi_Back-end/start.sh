#!/bin/bash

# Execute o comando Prisma para gerar o cliente
npx prisma generate

# Execute as migrações do Prisma
npx prisma migrate deploy

# Inicie a aplicação
npm start
