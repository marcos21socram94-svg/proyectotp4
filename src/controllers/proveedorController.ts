import { Request, Response } from 'express';
import * as modelo from '../models/proveedorModel';
import { AppError, leerId, texto } from '../utils/helpers';

// CONTROLADOR de Proveedores: recibe la petición HTTP, valida los datos,
// le pide el trabajo al modelo y arma la respuesta. Los errores los atrapa el errorHandler.

// GET /api/proveedores   (filtros opcionales por URL)
export const listar = async (req: Request, res: Response) => {
  const lista = await modelo.listar({ nombre: texto(req.query.nombre) });
  res.json(lista);
};

// GET /api/proveedores/:id
export const obtener = async (req: Request, res: Response) => {
  const id = leerId(req.params.id);
  const item = await modelo.buscarPorId(id);
  if (!item) throw new AppError(404, 'Proveedor no encontrado');
  res.json(item);
};

// POST /api/proveedores
export const crear = async (req: Request, res: Response) => {
  // req.body ya llega validado y limpio desde la capa de validación
  const nuevo = await modelo.crear(req.body);
  res.status(201).json({ status: 'ok', mensaje: 'Proveedor creado con éxito', data: nuevo });
};

// PUT /api/proveedores/:id
export const actualizar = async (req: Request, res: Response) => {
  const id = leerId(req.params.id);
  const actualizado = await modelo.actualizar(id, req.body);
  res.json({ status: 'ok', mensaje: 'Proveedor actualizado con éxito', data: actualizado });
};

// DELETE /api/proveedores/:id
export const eliminar = async (req: Request, res: Response) => {
  const id = leerId(req.params.id);
  await modelo.eliminar(id);
  res.json({ status: 'ok', mensaje: 'Proveedor eliminado con éxito' });
};

// GET /api/proveedores/estadisticas
export const estadisticas = async (_req: Request, res: Response) => {
  res.json(await modelo.estadisticas());
};
