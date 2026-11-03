import { Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';

// MODELO de Productos: es la ÚNICA capa que habla con la base de datos (a través de Prisma).
// No sabe nada de HTTP: recibe datos, consulta y devuelve resultados.

type Filtros = { tipo?: string; nombre?: string; proveedorId?: number; vencenAntes?: Date };

// READ + filtros + JOIN (include)
export const listar = (filtros: Filtros) =>
  prisma.producto.findMany({
    where: {
      tipo: filtros.tipo,
      nombre: { contains: filtros.nombre },
      proveedorId: filtros.proveedorId,
      vencimiento: { lt: filtros.vencenAntes },
    },
    include: { proveedor: { select: { id: true, nombre: true } } },
    orderBy: { id: 'asc' },
  });

// READ de un registro, con JOIN a las tablas relacionadas
export const buscarPorId = (id: number) =>
  prisma.producto.findUnique({ where: { id }, include: { proveedor: true } });

// CREATE
export const crear = (datos: Prisma.ProductoUncheckedCreateInput) =>
  prisma.producto.create({ data: datos });

// UPDATE (si el id no existe, Prisma lanza el error P2025 y el errorHandler responde 404)
export const actualizar = (id: number, datos: Prisma.ProductoUncheckedUpdateInput) =>
  prisma.producto.update({ where: { id }, data: datos });

// DELETE (si el id no existe, error P2025 -> 404; si tiene datos relacionados, P2003 -> 400)
export const eliminar = (id: number) =>
  prisma.producto.delete({ where: { id } });

// Agregaciones: aggregate (conteo, promedio, mín, máx) y groupBy por tipo
export const estadisticas = () =>
  prisma.$transaction([
    // Agregación sobre toda la tabla: cantidad, promedio, mínimo y máximo de precio
    prisma.producto.aggregate({
      _count: { _all: true },
      _avg: { precio: true },
      _min: { precio: true },
      _max: { precio: true },
    }),
    // Agrupación: cantidad de productos por tipo (Alimenticio, Bebida, etc.)
    prisma.producto.groupBy({
      by: ['tipo'],
      _count: { _all: true },
      orderBy: { tipo: 'asc' },
    }),
  ]);

// SQL PURO con $executeRaw: sube (o baja) el precio de los productos en un porcentaje.
// $executeRaw se usa para INSERT / UPDATE / DELETE y devuelve la CANTIDAD DE FILAS afectadas (un número).
// Las variables ${...} viajan como parámetros: Prisma las separa del texto SQL (no hay inyección).
export const ajustarPrecios = (porcentaje: number, tipo?: string) => {
  if (tipo) {
    return prisma.$executeRaw`UPDATE productos SET precio = ROUND(precio * (1 + ${porcentaje} / 100), 2) WHERE tipo = ${tipo}`;
  }
  return prisma.$executeRaw`UPDATE productos SET precio = ROUND(precio * (1 + ${porcentaje} / 100), 2)`;
};
