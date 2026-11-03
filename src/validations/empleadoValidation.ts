import { Reglas, validarBody } from './validador';

// Reglas de Clientes (largos iguales a los de prisma/schema.prisma)
const reglas: Reglas = {
  nombreApellido: { tipo: 'texto', requerido: true, largoMax: 50 },
  telefono: { tipo: 'telefono', requerido: true, largoMax: 20 },
  dni: { tipo: 'dni', requerido: true },
  correo: { tipo: 'email', requerido: true, largoMax: 50 },
};

export const validarCrearCliente = validarBody(reglas);
export const validarActualizarCliente = validarBody(reglas, true);
