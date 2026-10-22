import express from 'express';
import proveedorRoutes from './routes/proveedorRoutes';
import productoRoutes from './routes/productoRoutes';
import clienteRoutes from './routes/clienteRoutes';
import empleadoRoutes from './routes/empleadoRoutes';
import envioRoutes from './routes/envioRoutes';
import pedidoRoutes from './routes/pedidoRoutes';
import informeRoutes from './routes/informeRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// Para que Express entienda el JSON que llega en el body
app.use(express.json());

// Los resultados de SQL puro ($queryRaw) pueden traer números BigInt, que JSON no soporta.
// Este "replacer" los convierte a número normal al armar la respuesta.
app.set('json replacer', (_clave: string, valor: unknown) =>
  typeof valor === 'bigint' ? Number(valor) : valor
);

app.get('/', (_req, res) => {
  res.json({ mensaje: 'API de la distribuidora funcionando' });
});

// Rutas RESTful, una por cada recurso
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/envios', envioRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/informes', informeRoutes);

// Ruta no encontrada (404)
app.use((_req, res) => {
  res.status(404).json({ status: 'error', mensaje: 'Ruta no encontrada' });
});

// El manejador de errores SIEMPRE va al final
app.use(errorHandler);

export default app;
