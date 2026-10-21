import { PrismaClient } from '@prisma/client';

// Inicializamos el cliente de Prisma centralizado para toda la app
const prisma = new PrismaClient();

export default prisma;