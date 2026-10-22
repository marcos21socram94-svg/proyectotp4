import { Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';

// MODELO de Compañías de envío: es la ÚNICA capa que habla con la base de datos (a través de Prisma).
// No sabe nada de HTTP: recibe datos, consulta y devuelve resultados.

type Filtros = { nombre?: string };

// READ + filtros + JOIN (include)
export const listar = (filtros: Filtros) =>
  prisma.companiaEnvio.findMany({
    where: {
      nombre: { contains: filtros.nombre }
    },
    include: { _count: { select: { pedidos: true } } },
    orderBy: { id: 'asc' },
  });

// READ de un registro, con JOIN a las tablas relacionadas
export const buscarPorId = (id: number) =>
  prisma.companiaEnvio.findUnique({ where: { id }, include: { pedidos: true } });

// CREATE
export const crear = (datos: Prisma.CompaniaEnvioUncheckedCreateInput) =>
  prisma.companiaEnvio.create({ data: datos });

// UPDATE (si el id no existe, Prisma lanza el error P2025 y el errorHandler responde 404)
export const actualizar = (id: number, datos: Prisma.CompaniaEnvioUncheckedUpdateInput) =>
  prisma.companiaEnvio.update({ where: { id }, data: datos });

// DELETE (si el id no existe, error P2025 -> 404; si tiene datos relacionados, P2003 -> 400)
export const eliminar = (id: number) =>
  prisma.companiaEnvio.delete({ where: { id } });

// Agregación: cantidad de pedidos que transportó cada compañía (_count)
export const estadisticas = () =>
  prisma.companiaEnvio.findMany({
    select: { id: true, nombre: true, _count: { select: { pedidos: true } } },
    orderBy: { id: 'asc' },
  });
