import { Request, Response } from 'express';
import * as modelo from '../models/productoModel';
import { AppError, leerId, texto, numero, fechaOpcional } from '../utils/helpers';

// CONTROLADOR de Productos: recibe la petición HTTP, valida los datos,
// le pide el trabajo al modelo y arma la respuesta. Los errores los atrapa el errorHandler.

// GET /api/productos   (filtros opcionales por URL)
export const listar = async (req: Request, res: Response) => {
  const lista = await modelo.listar({ tipo: texto(req.query.tipo), nombre: texto(req.query.nombre), proveedorId: numero(req.query.proveedorId), vencenAntes: fechaOpcional(req.query.vencenAntes) });
  res.json(lista);
};

// GET /api/productos/:id
export const obtener = async (req: Request, res: Response) => {
  const id = leerId(req.params.id);
  const item = await modelo.buscarPorId(id);
  if (!item) throw new AppError(404, 'Producto no encontrado');
  res.json(item);
};

// POST /api/productos
export const crear = async (req: Request, res: Response) => {
  // req.body ya llega validado y limpio desde la capa de validación
  const nuevo = await modelo.crear(req.body);
  res.status(201).json({ status: 'ok', mensaje: 'Producto creado con éxito', data: nuevo });
};

// PUT /api/productos/:id
export const actualizar = async (req: Request, res: Response) => {
  const id = leerId(req.params.id);
  const actualizado = await modelo.actualizar(id, req.body);
  res.json({ status: 'ok', mensaje: 'Producto actualizado con éxito', data: actualizado });
};

// DELETE /api/productos/:id
export const eliminar = async (req: Request, res: Response) => {
  const id = leerId(req.params.id);
  await modelo.eliminar(id);
  res.json({ status: 'ok', mensaje: 'Producto eliminado con éxito' });
};

// GET /api/productos/estadisticas
export const estadisticas = async (_req: Request, res: Response) => {
  res.json(await modelo.estadisticas());
};

// PATCH /api/productos/ajustar-precios   body: { "porcentaje": 10, "tipo": "Bebida" (opcional) }
export const ajustarPrecios = async (req: Request, res: Response) => {
  // porcentaje y tipo ya vienen validados por la capa de validación
  const filas = await modelo.ajustarPrecios(req.body.porcentaje, req.body.tipo);
  res.json({ status: 'ok', mensaje: 'Precios actualizados con éxito', filasAfectadas: filas });
};
