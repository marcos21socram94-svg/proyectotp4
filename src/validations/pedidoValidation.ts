import { Reglas, validarBody, validarObjeto, validarCon } from './validador';

// Reglas de la cabecera del pedido
const reglasCabecera: Reglas = {
  fecha: { tipo: 'fecha', requerido: true },
  clienteId: { tipo: 'entero', requerido: true, min: 1 },
  empleadoId: { tipo: 'entero', requerido: true, min: 1 },
  companiaId: { tipo: 'entero', min: 1, nullable: true },
};

// Reglas de cada renglón del detalle
const reglasDetalle: Reglas = {
  productoId: { tipo: 'entero', requerido: true, min: 1 },
  cantidad: { tipo: 'entero', requerido: true, min: 1 },
  precioUnitario: { tipo: 'decimal', min: 0 },
};

// POST /api/pedidos: valida la cabecera y la lista de detalles
export const validarCrearPedido = validarCon((body) => {
  const { detalles, ...cabecera } = body ?? {};
  const r = validarObjeto(cabecera, reglasCabecera);

  if (!Array.isArray(detalles) || detalles.length === 0) {
    r.errores.push('detalles debe ser una lista con al menos un producto');
    return r;
  }

  const limpios: any[] = [];
  const vistos = new Set<number>();

  detalles.forEach((d: any, i: number) => {
    const rd = validarObjeto(d, reglasDetalle, false, `detalles[${i}].`);
    r.errores.push(...rd.errores);

    // Un mismo producto no puede repetirse en el pedido: si se quiere más, se suma la cantidad
    const productoId = rd.limpio.productoId as number | undefined;
    if (productoId !== undefined) {
      if (vistos.has(productoId)) {
        r.errores.push(`El producto ${productoId} está repetido en el detalle. Cargalo una sola vez con la cantidad total`);
      }
      vistos.add(productoId);
    }
    limpios.push(rd.limpio);
  });

  return { limpio: { ...r.limpio, detalles: limpios }, errores: r.errores };
});

// PUT /api/pedidos/:id: solo la cabecera
export const validarActualizarPedido = validarBody(reglasCabecera, true);
