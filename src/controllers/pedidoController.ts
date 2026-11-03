import { Request, Response } from 'express';
import * as modelo from '../models/pedidoModel';
import * as productoModelo from '../models/productoModel';
import { AppError, leerId, numero, fechaOpcional } from '../utils/helpers';

// CONTROLADOR de Pedidos. Un pedido se crea junto con su lista de detalles (productos y cantidades).

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
// La capa de validación ya revisó tipos, campos obligatorios y que no haya productos repetidos.
export const crear = async (req: Request, res: Response) => {
  const { detalles, ...cabecera } = req.body;

  // Antes de grabar se controla que existan el cliente, el empleado y la compañía,
  // para responder un mensaje claro en lugar de un error genérico de la base.
  await modelo.verificarRelaciones(cabecera.clienteId, cabecera.empleadoId, cabecera.companiaId);

  const detallesListos: any[] = [];
  for (const d of detalles) {
    const producto = await productoModelo.buscarPorId(d.productoId);
    if (!producto) throw new AppError(404, `Producto ${d.productoId} no encontrado`);
    // Si no se envía precio, se guarda el precio actual del producto (precio "del momento de la compra")
    detallesListos.push({
      productoId: d.productoId,
      cantidad: d.cantidad,
      precioUnitario: d.precioUnitario ?? producto.precio,
    });
  }

  const nuevo = await modelo.crear(cabecera, detallesListos);
  res.status(201).json({ status: 'ok', mensaje: 'Pedido creado con éxito', data: nuevo });
};

// PUT /api/pedidos/:id   (modifica la cabecera: fecha, cliente, empleado o compañía)
export const actualizar = async (req: Request, res: Response) => {
  const id = leerId(req.params.id);
  await modelo.verificarRelaciones(req.body.clienteId, req.body.empleadoId, req.body.companiaId);
  const actualizado = await modelo.actualizar(id, req.body);
  res.json({ status: 'ok', mensaje: 'Pedido actualizado con éxito', data: actualizado });
};

// DELETE /api/pedidos/:id
export const eliminar = async (req: Request, res: Response) => {
  const id = leerId(req.params.id);
  await modelo.eliminar(id);
  res.json({ status: 'ok', mensaje: 'Pedido eliminado con éxito' });
};

// GET /api/pedidos/estadisticas
export const estadisticas = async (_req: Request, res: Response) => {
  const [totalPedidos, detalle, pedidosPorCliente] = await modelo.estadisticas();
  res.json({ totalPedidos, detalle, pedidosPorCliente });
};
