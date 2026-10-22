import { prisma } from '../config/prisma';

// MODELO del informe: consultas en SQL PURO con $queryRaw (consigna 3.4).
// $queryRaw se usa para SELECT y devuelve un ARRAY de filas (objetos).
// Se escribe con "tagged template": las variables ${...} NO se pegan al texto, viajan como parámetros.
// MySQL devuelve los resultados de SUM/CAST como BigInt, que no se puede sumar con números comunes
// ni convertir a JSON. Por eso, al final, pasamos esos valores a Number.

type FilaVenta = {
  pedido: number;
  fecha: Date;
  cliente: string;
  empleado: string;
  unidades: number;
  total: number;
};

type FilaProducto = { producto: string; tipo: string; unidades: number; recaudado: number };

// Ventas por pedido (JOIN de 4 tablas + SUM + GROUP BY), filtradas por rango de fechas
export const ventasPorPedido = async (desde: Date, hasta: Date): Promise<FilaVenta[]> => {
  const filas = await prisma.$queryRaw<FilaVenta[]>`
    SELECT p.id AS pedido,
           p.fecha AS fecha,
           c.nombre_apellido AS cliente,
           e.nombre_apellido AS empleado,
           CAST(SUM(d.cantidad) AS SIGNED) AS unidades,
           CAST(SUM(d.cantidad * d.precio_unitario) AS DOUBLE) AS total
    FROM pedidos p
    JOIN clientes c ON c.id = p.id_cliente
    JOIN empleados e ON e.id = p.id_empleado
    JOIN detalle_pedidos d ON d.id_pedido = p.id
    WHERE p.fecha >= ${desde} AND p.fecha <= ${hasta}
    GROUP BY p.id, p.fecha, c.nombre_apellido, e.nombre_apellido
    ORDER BY p.fecha DESC`;

  return filas.map((f) => ({
    ...f,
    pedido: Number(f.pedido),
    unidades: Number(f.unidades),
    total: Number(f.total),
  }));
};

// Los 5 productos más vendidos (JOIN + SUM + GROUP BY + ORDER BY + LIMIT)
export const productosMasVendidos = async (): Promise<FilaProducto[]> => {
  const filas = await prisma.$queryRaw<FilaProducto[]>`
    SELECT pr.nombre AS producto,
           pr.tipo AS tipo,
           CAST(SUM(d.cantidad) AS SIGNED) AS unidades,
           CAST(SUM(d.cantidad * d.precio_unitario) AS DOUBLE) AS recaudado
    FROM detalle_pedidos d
    JOIN productos pr ON pr.id = d.id_producto
    GROUP BY pr.id, pr.nombre, pr.tipo
    ORDER BY unidades DESC
    LIMIT 5`;

  return filas.map((f) => ({
    ...f,
    unidades: Number(f.unidades),
    recaudado: Number(f.recaudado),
  }));
};
