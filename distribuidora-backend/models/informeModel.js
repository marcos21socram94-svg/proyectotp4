import prisma from '../config/db.js';

export const getInformeStockValorizado = async () => {
  // Usamos $queryRaw para ejecutar SQL puro de forma segura
  const informe = await prisma.$queryRaw`
    SELECT 
      p.id AS producto_id,
      p.nombre AS producto_nombre,
      p.precio,
      p.stock,
      (p.precio * p.stock) AS valor_total_stock,
      pr.nombre AS proveedor_nombre
    FROM Producto p
    JOIN Proveedor pr ON p.proveedorId = pr.id
    ORDER BY valor_total_stock DESC;
  `;
  
  return informe;
};