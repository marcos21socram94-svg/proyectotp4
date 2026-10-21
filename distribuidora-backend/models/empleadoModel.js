import prisma from '../config/db.js';

export const getAllEmpleados = async () => {
  return await prisma.empleado.findMany();
};

export const getEmpleadoById = async (id) => {
  return await prisma.empleado.findUnique({
    where: { id: Number(id) }
  });
};

export const createEmpleado = async (empleado) => {
  const { nombre, puesto } = empleado;
  return await prisma.empleado.create({
    data: { nombre, puesto }
  });
};

export const updateEmpleado = async (id, empleadoData) => {
  try {
    await prisma.empleado.update({
      where: { id: Number(id) },
      data: empleadoData
    });
    return 1;
  } catch (error) {
    return 0;
  }
};

export const deleteEmpleado = async (id) => {
  try {
    await prisma.empleado.delete({
      where: { id: Number(id) }
    });
    return 1;
  } catch (error) {
    return 0;
  }
};