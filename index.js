import express from 'express';
import dotenv from 'dotenv';
import productoRoutes from './routes/productoRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas de la API
app.use('/api/productos', productoRoutes);

// Route 404 para endpoints que no existen
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Middleware global de errores (siempre va al final)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});