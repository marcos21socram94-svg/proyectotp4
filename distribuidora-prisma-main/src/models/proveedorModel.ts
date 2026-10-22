import { Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';

// MODELO de Proveedores: es la ÚNICA capa que habla con la base de datos (a través de Prisma).
// No sabe nada de HTTP: recibe datos, consulta y devuelve resultados.

type Filtros = { nombre?: string };

// READ + filtros + JOIN (include)
export const listar = (filtros: Filtros) =>
  prisma.proveedor.findMany({
    where: {
      nombre: { contains: filtros.nombre }
    },
    include: { _count: { select: { productos: true } } },
    orderBy: { id: 'asc' },
  });

// READ de un registro, con JOIN a las tablas relacionadas
export const buscarPorId = (id: number) =>
  prisma.proveedor.findUnique({ where: { id }, include: { productos: true } });

// CREATE
export const crear = (datos: Prisma.ProveedorUncheckedCreateInput) =>
  prisma.proveedor.create({ data: datos });

// UPDATE (si el id no existe, Prisma lanza el error P2025 y el errorHandler responde 404)
export const actualizar = (id: number, datos: Prisma.ProveedorUncheckedUpdateInput) =>
  prisma.proveedor.update({ where: { id }, data: datos });

// DELETE (si el id no existe, error P2025 -> 404; si tiene datos relacionados, P2003 -> 400)
export const eliminar = (id: number) =>
  prisma.proveedor.delete({ where: { id } });

// Agregación: cantidad de productos que ofrece cada proveedor (_count)
export const estadisticas = () =>
  prisma.proveedor.findMany({
    select: { id: true, nombre: true, _count: { select: { productos: true } } },
    orderBy: { id: 'asc' },
  });
