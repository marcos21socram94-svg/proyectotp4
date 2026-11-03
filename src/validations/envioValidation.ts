import { Reglas, validarBody } from './validador';

// Reglas de Compañías de envío (largos iguales a los de prisma/schema.prisma)
const reglas: Reglas = {
  nombre: { tipo: 'texto', requerido: true, largoMax: 50 },
  correo: { tipo: 'email', requerido: true, largoMax: 50 },
  telefono: { tipo: 'telefono', requerido: true, largoMax: 20 },
};

export const validarCrearEnvio = validarBody(reglas);
export const validarActualizarEnvio = validarBody(reglas, true);
