import { Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';

// MODELO de Empleados: es la ÚNICA capa que habla con la base de datos (a través de Prisma).
// No sabe nada de HTTP: recibe datos, consulta y devuelve resultados.

type Filtros = { nombre?: string; dni?: string };

// READ + filtros + JOIN (include)
export const listar = (filtros: Filtros) =>
  prisma.empleado.findMany({
    where: {
      nombreApellido: { contains: filtros.nombre },
      dni: filtros.dni,
    },
    include: { _count: { select: { pedidos: true } } },
    orderBy: { id: 'asc' },
  });

// READ de un registro, con JOIN a las tablas relacionadas
export const buscarPorId = (id: number) =>
  prisma.empleado.findUnique({ where: { id }, include: { pedidos: true } });

// CREATE
export const crear = (datos: Prisma.EmpleadoUncheckedCreateInput) =>
  prisma.empleado.create({ data: datos });

// UPDATE (si el id no existe, Prisma lanza el error P2025 y el errorHandler responde 404)
export const actualizar = (id: number, datos: Prisma.EmpleadoUncheckedUpdateInput) =>
  prisma.empleado.update({ where: { id }, data: datos });

// DELETE (si el id no existe, error P2025 -> 404; si tiene datos relacionados, P2003 -> 400)
export const eliminar = (id: number) =>
  prisma.empleado.delete({ where: { id } });

// Agregación: cantidad de pedidos (ventas) que hizo cada empleado (_count)
export const estadisticas = () =>
  prisma.empleado.findMany({
    select: { id: true, nombreApellido: true, _count: { select: { pedidos: true } } },
    orderBy: { id: 'asc' },
  });
