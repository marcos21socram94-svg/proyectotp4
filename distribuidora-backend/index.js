import express from 'express';
import dotenv from 'dotenv';
import productoRoutes from './routes/productoRoutes.js';
import proveedorRoutes from './routes/proveedorRoutes.js';
import clienteRoutes from './routes/clienteRoutes.js';
import empleadoRoutes from './routes/empleadoRoutes.js';
import envioRoutes from './routes/envioRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas de la API (6 Entidades)
app.use('/api/productos', productoRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/envios', envioRoutes);
app.use('/api/pedidos', pedidoRoutes);

// Ruta 404 para endpoints inexistentes
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Middleware global de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});