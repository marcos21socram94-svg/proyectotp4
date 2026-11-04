import { Reglas, validarBody } from './validador';

// Reglas de Empleados con todos sus campos
const reglas: Reglas = {
  nombreApellido: { tipo: 'texto', requerido: true, largoMax: 50 },
  fechaNacimiento: { tipo: 'fecha', requerido: true },
  telefono: { tipo: 'telefono', requerido: true, largoMax: 20 },
  dni: { tipo: 'dni', requerido: true },
  correo: { tipo: 'email', requerido: true, largoMax: 50 },
  obraSocial: { tipo: 'texto', requerido: true, largoMax: 30 },
};

export const validarCrearEmpleado = validarBody(reglas);
export const validarActualizarEmpleado = validarBody(reglas, true);