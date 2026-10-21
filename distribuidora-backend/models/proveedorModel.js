import prisma from '../config/db.js';

export const getAllProveedores = async () => {
  return await prisma.proveedor.findMany({
    include: { productos: true }
  });
};

export const getProveedorById = async (id) => {
  return await prisma.proveedor.findUnique({
    where: { id: Number(id) },
    include: { productos: true }
  });
};

export const createProveedor = async (proveedorData) => {
  const { nombre, contacto } = proveedorData;
  return await prisma.proveedor.create({
    data: { nombre, contacto }
  });
};

export const updateProveedor = async (id, proveedorData) => {
  try {
    await prisma.proveedor.update({
      where: { id: Number(id) },
      data: proveedorData
    });
    return 1;
  } catch (error) {
    return 0;
  }
};

export const deleteProveedor = async (id) => {
  try {
    await prisma.proveedor.delete({
      where: { id: Number(id) }
    });
    return 1;
  } catch (error) {
    return 0;
  }
};