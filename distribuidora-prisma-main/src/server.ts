import 'dotenv/config';
import app from './app';
import { prisma } from './config/prisma';

const PORT = process.env.PORT || 3000;

const servidor = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Al cerrar el servidor (Ctrl+C) se cierran también las conexiones del pool
process.on('SIGINT', async () => {
  servidor.close();
  await prisma.$disconnect();
  process.exit(0);
});
