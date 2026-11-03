import { Request, Response } from 'express';
import * as modelo from '../models/envioModel';
import { AppError, leerId, texto } from '../utils/helpers';

// CONTROLADOR de Compañías de envío: recibe la petición HTTP, valida los datos,
// le pide el trabajo al modelo y arma la respuesta. Los errores los atrapa el errorHandler.

// GET /api/envios   (filtros opcionales por URL)
export const listar = async (req: Request, res: Response) => {
  const lista = await modelo.listar({ nombre: texto(req.query.nombre) });
  res.json(lista);
};

// GET /api/envios/:id
export const obtener = async (req: Request, res: Response) => {
  const id = leerId(req.params.id);
  const item = await modelo.buscarPorId(id);
  if (!item) throw new AppError(404, 'Compañía de envío no encontrada');
  res.json(item);
};

// POST /api/envios
export const crear = async (req: Request, res: Response) => {
  // req.body ya llega validado y limpio desde la capa de validación
  const nuevo = await modelo.crear(req.body);
  res.status(201).json({ status: 'ok', mensaje: 'Compañía de envío creada con éxito', data: nuevo });
};

// PUT /api/envios/:id
export const actualizar = async (req: Request, res: Response) => {
  const id = leerId(req.params.id);
  const actualizado = await modelo.actualizar(id, req.body);
  res.json({ status: 'ok', mensaje: 'Compañía de envío actualizada con éxito', data: actualizado });
};

// DELETE /api/envios/:id
export const eliminar = async (req: Request, res: Response) => {
  const id = leerId(req.params.id);
  await modelo.eliminar(id);
  res.json({ status: 'ok', mensaje: 'Compañía de envío eliminada con éxito' });
};

// GET /api/envios/estadisticas
export const estadisticas = async (_req: Request, res: Response) => {
  res.json(await modelo.estadisticas());
};
