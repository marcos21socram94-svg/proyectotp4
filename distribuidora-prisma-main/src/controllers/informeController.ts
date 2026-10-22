import { Request, Response } from 'express';
import * as modelo from '../models/informeModel';
import { fechaOpcional } from '../utils/helpers';

// GET /api/informes/ventas?desde=2026-09-01&hasta=2026-10-31   (las fechas son opcionales)
export const informeVentas = async (req: Request, res: Response) => {
  const desde = fechaOpcional(req.query.desde) ?? new Date('1900-01-01');
  const hasta = fechaOpcional(req.query.hasta) ?? new Date('2999-12-31');

  const ventas = await modelo.ventasPorPedido(desde, hasta);
  const topProductos = await modelo.productosMasVendidos();

  // El resumen general se calcula sumando las filas que devolvió el SQL
  const resumen = {
    cantidadPedidos: ventas.length,
    unidadesVendidas: ventas.reduce((suma, v) => suma + v.unidades, 0),
    totalVendido: ventas.reduce((suma, v) => suma + v.total, 0),
  };

  res.json({ generadoEn: new Date(), resumen, ventasPorPedido: ventas, topProductos });
};
