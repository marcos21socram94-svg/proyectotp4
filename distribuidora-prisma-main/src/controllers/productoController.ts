import { Request, Response } from 'express';
import * as modelo from '../models/productoModel';
import { AppError, leerId, exigirCampos, tomarCampos, texto, numero, fechaOpcional, aFecha } from '../utils/helpers';

// CONTROLADOR de Productos: recibe la petición HTTP, valida los datos,
// le pide el trabajo al modelo y arma la respuesta. Los errores los atrapa el errorHandler.

const CAMPOS = ['tipo', 'nombre', 'precio', 'vencimiento', 'proveedorId'];
const OBLIGATORIOS = ['tipo', 'nombre', 'precio', 'vencimiento'];

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
  exigirCampos(req.body, OBLIGATORIOS);
  const datos = tomarCampos(req.body, CAMPOS);
  if (datos.vencimiento !== undefined) datos.vencimiento = aFecha(datos.vencimiento);
  const nuevo = await modelo.crear(datos);
  res.status(201).json(nuevo);
};

// PUT /api/productos/:id
export const actualizar = async (req: Request, res: Response) => {
  const id = leerId(req.params.id);
  const datos = tomarCampos(req.body, CAMPOS);
  if (datos.vencimiento !== undefined) datos.vencimiento = aFecha(datos.vencimiento);
  if (Object.keys(datos).length === 0) throw new AppError(400, 'No se envió ningún campo para actualizar');
  const actualizado = await modelo.actualizar(id, datos);
  res.json(actualizado);
};

// DELETE /api/productos/:id
export const eliminar = async (req: Request, res: Response) => {
  const id = leerId(req.params.id);
  await modelo.eliminar(id);
  res.json({ mensaje: 'Producto eliminado correctamente' });
};

// GET /api/productos/estadisticas
export const estadisticas = async (_req: Request, res: Response) => {
  res.json(await modelo.estadisticas());
};

// PATCH /api/productos/ajustar-precios   body: { "porcentaje": 10, "tipo": "Bebida" (opcional) }
export const ajustarPrecios = async (req: Request, res: Response) => {
  exigirCampos(req.body, ['porcentaje']);
  const porcentaje = Number(req.body.porcentaje);
  if (Number.isNaN(porcentaje) || porcentaje <= -100) {
    throw new AppError(400, 'El porcentaje debe ser un número mayor a -100');
  }
  const filas = await modelo.ajustarPrecios(porcentaje, texto(req.body.tipo));
  res.json({ mensaje: 'Precios actualizados', filasAfectadas: filas });
};
