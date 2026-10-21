import prisma from '../config/db.js';

export const getAllCompaniasEnvio = async () => {
  return await prisma.envio.findMany({
    include: { pedido: true }
  });
};

export const getCompaniaEnvioById = async (id) => {
  return await prisma.envio.findUnique({
    where: { id: Number(id) },
    include: { pedido: true }
  });
};

export const createCompaniaEnvio = async (compania) => {
  const { pedidoId, fechaEnvio, estadoEnvio, codigoSeguimiento } = compania;
  return await prisma.envio.create({
    data: {
      pedidoId: Number(pedidoId),
      fechaEnvio: fechaEnvio ? new Date(fechaEnvio) : null,
      estadoEnvio: estadoEnvio || "En preparación",
      codigoSeguimiento
    }
  });
};

export const updateCompaniaEnvio = async (id, companiaData) => {
  try {
    const { fechaEnvio, ...rest } = companiaData;
    await prisma.envio.update({
      where: { id: Number(id) },
      data: {
        ...rest,
        ...(fechaEnvio && { fechaEnvio: new Date(fechaEnvio) })
      }
    });
    return 1;
  } catch (error) {
    return 0;
  }
};

export const deleteCompaniaEnvio = async (id) => {
  try {
    await prisma.envio.delete({
      where: { id: Number(id) }
    });
    return 1;
  } catch (error) {
    return 0;
  }
};