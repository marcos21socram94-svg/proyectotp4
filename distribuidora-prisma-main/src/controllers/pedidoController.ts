import { Request, Response } from 'express';
import * as modelo from '../models/pedidoModel';
import * as productoModelo from '../models/productoModel';
import { AppError, leerId, exigirCampos, tomarCampos, aFecha, numero, fechaOpcional } from '../utils/helpers';

// CONTROLADOR de Pedidos. Un pedido se crea junto con su lista de detalles (productos y cantidades).

const CAMPOS = ['fecha', 'clienteId', 'companiaId', 'empleadoId'];

// GET /api/pedidos?clienteId=1&empleadoId=2&desde=2026-09-01&hasta=2026-09-30
export const listar = async (req: Request, res: Response) => {
  const lista = await modelo.listar({
    clienteId: numero(req.query.clienteId),
    empleadoId: numero(req.query.empleadoId),
    desde: fechaOpcional(req.query.desde),
    hasta: fechaOpcional(req.query.hasta),
  });
  res.json(lista);
};

// GET /api/pedidos/:id
export const obtener = async (req: Request, res: Response) => {
  const id = leerId(req.params.id);
  const pedido = await modelo.buscarPorId(id);
  if (!pedido) throw new AppError(404, 'Pedido no encontrado');
  res.json(pedido);
};

// POST /api/pedidos
// body: { fecha, clienteId, empleadoId, companiaId (opcional), detalles: [{ productoId, cantidad, precioUnitario (opcional) }] }
export const crear = async (req: Request, res: Response) => {
  exigirCampos(req.body, ['fecha', 'clienteId', 'empleadoId']);
  const { detalles } = req.body;
  if (!Array.isArray(detalles) || detalles.length === 0) {
    throw new AppError(400, 'El pedido debe incluir al menos un detalle (productoId y cantidad)');
  }

  const detallesListos: any[] = [];
  for (const d of detalles) {
    exigirCampos(d, ['productoId', 'cantidad']);
    if (!Number.isInteger(d.cantidad) || d.cantidad <= 0) {
      throw new AppError(400, 'La cantidad debe ser un número entero mayor a 0');
    }
    const producto = await productoModelo.buscarPorId(d.productoId);
    if (!producto) throw new AppError(404, `Producto ${d.productoId} no encontrado`);
    // Si no se envía precio, se guarda el precio actual del producto (precio "del momento de la compra")
    detallesListos.push({
      productoId: d.productoId,
      cantidad: d.cantidad,
      precioUnitario: d.precioUnitario ?? producto.precio,
    });
  }

  const datos = tomarCampos(req.body, CAMPOS);
  datos.fecha = aFecha(datos.fecha);
  const nuevo = await modelo.crear(datos, detallesListos);
  res.status(201).json(nuevo);
};

// PUT /api/pedidos/:id   (modifica la cabecera: fecha, cliente, empleado o compañía)
export const actualizar = async (req: Request, res: Response) => {
  const id = leerId(req.params.id);
  const datos = tomarCampos(req.body, CAMPOS);
  if (datos.fecha !== undefined) datos.fecha = aFecha(datos.fecha);
  if (Object.keys(datos).length === 0) throw new AppError(400, 'No se envió ningún campo para actualizar');
  const actualizado = await modelo.actualizar(id, datos);
  res.json(actualizado);
};

// DELETE /api/pedidos/:id
export const eliminar = async (req: Request, res: Response) => {
  const id = leerId(req.params.id);
  await modelo.eliminar(id);
  res.json({ mensaje: 'Pedido eliminado correctamente' });
};

// GET /api/pedidos/estadisticas
export const estadisticas = async (_req: Request, res: Response) => {
  const [totalPedidos, detalle, pedidosPorCliente] = await modelo.estadisticas();
  res.json({ totalPedidos, detalle, pedidosPorCliente });
};
