import prisma from '../config/db.js';

export const getAllPedidos = async () => {
  return await prisma.pedido.findMany({
    include: { cliente: true, empleado: true, detalles: { include: { producto: true } }, envio: true }
  });
};

export const getPedidoById = async (id) => {
  return await prisma.pedido.findUnique({
    where: { id: Number(id) },
    include: { cliente: true, empleado: true, detalles: { include: { producto: true } }, envio: true }
  });
};

export const createPedido = async (pedidoData) => {
  const { clienteId, empleadoId, estado } = pedidoData;
  return await prisma.pedido.create({
    data: {
      clienteId: Number(clienteId),
      empleadoId: empleadoId ? Number(empleadoId) : null,
      estado: estado || "Pendiente"
    },
    include: { cliente: true, empleado: true }
  });
};

export const updatePedido = async (id, pedidoData) => {
  try {
    const { clienteId, empleadoId, ...rest } = pedidoData;
    await prisma.pedido.update({
      where: { id: Number(id) },
      data: {
        ...rest,
        ...(clienteId && { clienteId: Number(clienteId) }),
        ...(empleadoId !== undefined && { empleadoId: empleadoId ? Number(empleadoId) : null })
      }
    });
    return 1;
  } catch (error) {
    return 0;
  }
};

export const deletePedido = async (id) => {
  try {
    await prisma.pedido.delete({
      where: { id: Number(id) }
    });
    return 1;
  } catch (error) {
    return 0;
  }
};