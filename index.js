import express from 'express';
import dotenv from 'dotenv';
import productoRoutes from './routes/productoRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import proveedorRoutes from './routes/proveedor.Routes.js';
import clienteRoutes from './routes/cliente.Routes.js';
import empleadoRoutes from './routes/empleadoRoutes.js';
import envioRoutes from './routes/envioRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';

// Cargar variables de entorno desde el archivo .env

dotenv.config();
// Crear una instancia de la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas de la API
app.use('/api/productos', productoRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/envios', envioRoutes);
app.use('/api/pedidos', pedidoRoutes);


// Route 404 para endpoints que no existen
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Middleware global de errores (siempre va al final)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});