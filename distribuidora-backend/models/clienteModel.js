import prisma from '../config/db.js';

// Obtener todos los clientes
export const getAllClientes = async () => {
  return await prisma.cliente.findMany();
};

// Obtener un cliente por ID
export const getClienteById = async (id) => {
  return await prisma.cliente.findUnique({
    where: { id: Number(id) }
  });
};

// Crear un cliente nuevo
export const createCliente = async (cliente) => {
  const { nombre, email, telefono, direccion } = cliente;
  
  return await prisma.cliente.create({
    data: {
      nombre,
      email,
      telefono,
      direccion
    }
  });
};

// Actualizar un cliente
export const updateCliente = async (id, clienteData) => {
  try {
    await prisma.cliente.update({
      where: { id: Number(id) },
      data: clienteData
    });
    return 1; // Retorna 1 para indicar que se afectó una fila con éxito
  } catch (error) {
    return 0; // Si Prisma no encuentra el ID, lanza error y retorna 0 filas afectadas
  }
};

// Eliminar un cliente
export const deleteCliente = async (id) => {
  try {
    await prisma.cliente.delete({
      where: { id: Number(id) }
    });
    return 1; // Retorna 1 para éxito
  } catch (error) {
    return 0; // Si no existe el registro
  }
};