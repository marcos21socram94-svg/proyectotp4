import { Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';

// MODELO de Pedidos: única capa que habla con la base de datos (a través de Prisma).

type Filtros = { clienteId?: number; empleadoId?: number; desde?: Date; hasta?: Date };

type DetalleNuevo = { productoId: number; cantidad: number; precioUnitario: Prisma.Decimal | number | string };

// JOIN: trae junto al pedido su cliente, empleado, compañía de envío y el detalle con el nombre del producto
const incluir = {
  cliente: { select: { id: true, nombreApellido: true } },
  empleado: { select: { id: true, nombreApellido: true } },
  compania: { select: { id: true, nombre: true } },
  detalles: { include: { producto: { select: { id: true, nombre: true } } } },
};

// READ + filtros (cliente, empleado, rango de fechas) + JOIN
export const listar = (filtros: Filtros) =>
  prisma.pedido.findMany({
    where: {
      clienteId: filtros.clienteId,
      empleadoId: filtros.empleadoId,
      fecha: { gte: filtros.desde, lte: filtros.hasta },
    },
    include: incluir,
    orderBy: { fecha: 'desc' },
  });

export const buscarPorId = (id: number) =>
  prisma.pedido.findUnique({ where: { id }, include: incluir });

// CREATE: crea el pedido y sus detalles juntos (Prisma lo hace en una sola transacción)
export const crear = (
  datos: { fecha: Date; clienteId: number; empleadoId: number; companiaId?: number | null },
  detalles: DetalleNuevo[]
) =>
  prisma.pedido.create({
    data: { ...datos, detalles: { create: detalles } },
    include: incluir,
  });

// UPDATE de la cabecera del pedido
export const actualizar = (id: number, datos: Prisma.PedidoUncheckedUpdateInput) =>
  prisma.pedido.update({ where: { id }, data: datos, include: incluir });

// DELETE: al borrar el pedido se borran sus detalles (ON DELETE CASCADE)
export const eliminar = (id: number) => prisma.pedido.delete({ where: { id } });

// Agregaciones: total de pedidos (count), unidades y precio promedio (aggregate) y pedidos por cliente (groupBy)
export const estadisticas = () =>
  prisma.$transaction([
    prisma.pedido.count(),
    prisma.detallePedido.aggregate({
      _sum: { cantidad: true },
      _avg: { precioUnitario: true },
      _count: { _all: true },
    }),
    prisma.pedido.groupBy({
      by: ['clienteId'],
      _count: { _all: true },
      orderBy: { clienteId: 'asc' },
    }),
  ]);
