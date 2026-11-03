import { Reglas, validarBody, validarObjeto, validarCon } from './validador';

// Reglas de Productos (largos iguales a los de prisma/schema.prisma)
const reglas: Reglas = {
  tipo: { tipo: 'texto', requerido: true, largoMax: 30 },
  nombre: { tipo: 'texto', requerido: true, largoMax: 30 },
  precio: { tipo: 'decimal', requerido: true, min: 0 },
  vencimiento: { tipo: 'fecha', requerido: true },
  proveedorId: { tipo: 'entero', min: 1, nullable: true },
};

export const validarCrearProducto = validarBody(reglas);
export const validarActualizarProducto = validarBody(reglas, true);

// PATCH /api/productos/ajustar-precios
export const validarAjustePrecios = validarCon((body) => {
  const r = validarObjeto(body, {
    porcentaje: { tipo: 'decimal', requerido: true },
    tipo: { tipo: 'texto', largoMax: 30 },
  });
  if (r.limpio.porcentaje !== undefined && (r.limpio.porcentaje as number) <= -100) {
    r.errores.push('porcentaje debe ser mayor a -100');
  }
  return r;
});
