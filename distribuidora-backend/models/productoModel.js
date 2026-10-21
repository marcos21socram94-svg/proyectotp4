import prisma from '../config/db.js';

// Obtener todos los productos (incluyendo los datos de su proveedor)
export const getAllProductos = async () => {
  return await prisma.producto.findMany({
    include: { proveedor: true }
  });
};

// Obtener un producto por ID
export const getProductoById = async (id) => {
  return await prisma.producto.findUnique({
    where: { id: Number(id) },
    include: { proveedor: true }
  });
};

// Crear un producto nuevo
export const createProducto = async (producto) => {
  const { nombre, precio, stock, proveedorId } = producto;
  
  return await prisma.producto.create({
    data: {
      nombre,
      precio: Number(precio),     // Convertimos a número para el campo Decimal de Prisma
      stock: Number(stock),       // Convertimos a número entero
      proveedorId: Number(proveedorId) // Llave foránea hacia Proveedor
    },
    include: { proveedor: true }
  });
};