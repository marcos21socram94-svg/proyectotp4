import express from 'express';
import dotenv from 'dotenv';
import productoRoutes from './routes/productoRoutes.js';
import proveedorRoutes from './routes/proveedorRoutes.js';
import clienteRoutes from './routes/clienteRoutes.js';
import empleadoRoutes from './routes/empleadoRoutes.js';
import envioRoutes from './routes/envioRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import informeRoutes from './routes/informeRoutes.js';

// Cargar las variables de entorno del archivo .env
dotenv.config();

// 1. Inicializar Express primero
const app = express();

// 2. Middleware obligatorio para que el servidor entienda JSON
app.use(express.json());

// 3. Rutas de la API (6 Entidades)
app.use('/api/productos', productoRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/envios', envioRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/informes', informeRoutes);

// 4. Ruta 404 para endpoints inexistentes
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// 5. Middleware global de errores
app.use(errorHandler);

// 6. Definir el puerto y encender el servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});