import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

// ARCHIVO DE CONEXIÓN (consigna 2.4)
// Prisma administra internamente un Connection Pool: un grupo de conexiones abiertas
// que se reutilizan entre peticiones, en lugar de abrir y cerrar una conexión por cada consulta.
// El tamaño del pool se configura en el .env, dentro de DATABASE_URL:
//   ?connection_limit=10   -> máximo de conexiones simultáneas
//   &pool_timeout=20       -> segundos que espera una petición si todas las conexiones están ocupadas
// Se crea UNA sola instancia de PrismaClient y se importa desde los modelos.
export const prisma = new PrismaClient({
  log: ['warn', 'error'],
});
