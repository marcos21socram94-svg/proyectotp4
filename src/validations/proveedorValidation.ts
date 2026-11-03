import { Reglas, validarBody } from './validador';

// Reglas de Proveedores (largos iguales a los de prisma/schema.prisma)
const reglas: Reglas = {
  nombre: { tipo: 'texto', requerido: true, largoMax: 40 },
  telefono: { tipo: 'telefono', requerido: true, largoMax: 20 },
  correo: { tipo: 'email', requerido: true, largoMax: 50 },
};

export const validarCrearProveedor = validarBody(reglas);
export const validarActualizarProveedor = validarBody(reglas, true);
