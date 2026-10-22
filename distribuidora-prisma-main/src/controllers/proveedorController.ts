import { Request, Response } from 'express';
import * as modelo from '../models/proveedorModel';
import { AppError, leerId, exigirCampos, tomarCampos, texto } from '../utils/helpers';

// CONTROLADOR de Proveedores: recibe la petición HTTP, valida los datos,
// le pide el trabajo al modelo y arma la respuesta. Los errores los atrapa el errorHandler.

const CAMPOS = ['nombre', 'telefono', 'correo'];
const OBLIGATORIOS = ['nombre', 'telefono', 'correo'];

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
  exigirCampos(req.body, OBLIGATORIOS);
  const datos = tomarCampos(req.body, CAMPOS);
  const nuevo = await modelo.crear(datos);
  res.status(201).json(nuevo);
};

// PUT /api/proveedores/:id
export const actualizar = async (req: Request, res: Response) => {
  const id = leerId(req.params.id);
  const datos = tomarCampos(req.body, CAMPOS);
  if (Object.keys(datos).length === 0) throw new AppError(400, 'No se envió ningún campo para actualizar');
  const actualizado = await modelo.actualizar(id, datos);
  res.json(actualizado);
};

// DELETE /api/proveedores/:id
export const eliminar = async (req: Request, res: Response) => {
  const id = leerId(req.params.id);
  await modelo.eliminar(id);
  res.json({ mensaje: 'Proveedor eliminado correctamente' });
};

// GET /api/proveedores/estadisticas
export const estadisticas = async (_req: Request, res: Response) => {
  res.json(await modelo.estadisticas());
};
