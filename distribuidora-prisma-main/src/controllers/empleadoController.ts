import { Request, Response } from 'express';
import * as modelo from '../models/empleadoModel';
import { AppError, leerId, exigirCampos, tomarCampos, texto, aFecha } from '../utils/helpers';

// CONTROLADOR de Empleados: recibe la petición HTTP, valida los datos,
// le pide el trabajo al modelo y arma la respuesta. Los errores los atrapa el errorHandler.

const CAMPOS = ['dni', 'fechaNacimiento', 'nombreApellido', 'correo', 'telefono', 'obraSocial'];
const OBLIGATORIOS = ['dni', 'fechaNacimiento', 'nombreApellido', 'correo', 'telefono', 'obraSocial'];

// GET /api/empleados   (filtros opcionales por URL)
export const listar = async (req: Request, res: Response) => {
  const lista = await modelo.listar({ nombre: texto(req.query.nombre), dni: texto(req.query.dni) });
  res.json(lista);
};

// GET /api/empleados/:id
export const obtener = async (req: Request, res: Response) => {
  const id = leerId(req.params.id);
  const item = await modelo.buscarPorId(id);
  if (!item) throw new AppError(404, 'Empleado no encontrado');
  res.json(item);
};

// POST /api/empleados
export const crear = async (req: Request, res: Response) => {
  exigirCampos(req.body, OBLIGATORIOS);
  const datos = tomarCampos(req.body, CAMPOS);
  if (datos.fechaNacimiento !== undefined) datos.fechaNacimiento = aFecha(datos.fechaNacimiento);
  const nuevo = await modelo.crear(datos);
  res.status(201).json(nuevo);
};

// PUT /api/empleados/:id
export const actualizar = async (req: Request, res: Response) => {
  const id = leerId(req.params.id);
  const datos = tomarCampos(req.body, CAMPOS);
  if (datos.fechaNacimiento !== undefined) datos.fechaNacimiento = aFecha(datos.fechaNacimiento);
  if (Object.keys(datos).length === 0) throw new AppError(400, 'No se envió ningún campo para actualizar');
  const actualizado = await modelo.actualizar(id, datos);
  res.json(actualizado);
};

// DELETE /api/empleados/:id
export const eliminar = async (req: Request, res: Response) => {
  const id = leerId(req.params.id);
  await modelo.eliminar(id);
  res.json({ mensaje: 'Empleado eliminado correctamente' });
};

// GET /api/empleados/estadisticas
export const estadisticas = async (_req: Request, res: Response) => {
  res.json(await modelo.estadisticas());
};
