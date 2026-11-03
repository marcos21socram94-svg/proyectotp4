import { NextFunction, Request, Response } from 'express';

// CAPA DE VALIDACIÓN
// Se ejecuta como middleware ANTES del controlador. Revisa el body (o el :id de la URL)
// y, si algo está mal, corta la petición con un 400 y la lista completa de errores.
// Si todo está bien, deja en req.body solo los campos permitidos y ya convertidos
// (textos sin espacios de más, números como number, fechas como Date).

export type Tipo = 'texto' | 'entero' | 'decimal' | 'fecha' | 'email' | 'dni' | 'telefono';

export type Regla = {
  tipo: Tipo;
  requerido?: boolean;
  largoMax?: number; // para textos
  min?: number;      // para números
  nullable?: boolean; // acepta null (ej: companiaId, proveedorId)
};

export type Reglas = Record<string, Regla>;

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_DNI = /^\d{7,8}$/;
const REGEX_TELEFONO = /^\d{6,15}$/;
const REGEX_FECHA = /^\d{4}-\d{2}-\d{2}$/;

// Valida UN campo. Devuelve el valor ya convertido o un mensaje de error.
export const validarCampo = (
  nombre: string,
  valor: unknown,
  regla: Regla
): { valor?: unknown; error?: string } => {
  if (valor === null && regla.nullable) return { valor: null };

  switch (regla.tipo) {
    case 'texto':
    case 'email':
    case 'dni':
    case 'telefono': {
      if (typeof valor !== 'string' && typeof valor !== 'number') {
        return { error: `${nombre} debe ser un texto` };
      }
      const t = String(valor).trim();
      if (t === '') return { error: `${nombre} no puede estar vacío` };
      if (regla.largoMax && t.length > regla.largoMax) {
        return { error: `${nombre} admite como máximo ${regla.largoMax} caracteres` };
      }
      if (regla.tipo === 'email' && !REGEX_EMAIL.test(t)) return { error: `${nombre} no es un correo válido` };
      if (regla.tipo === 'dni' && !REGEX_DNI.test(t)) return { error: `${nombre} debe tener 7 u 8 números, sin puntos` };
      if (regla.tipo === 'telefono' && !REGEX_TELEFONO.test(t)) return { error: `${nombre} debe tener entre 6 y 15 números, sin espacios ni guiones` };
      return { valor: t };
    }

    case 'entero': {
      const n = typeof valor === 'string' && valor.trim() !== '' ? Number(valor) : valor;
      if (typeof n !== 'number' || !Number.isInteger(n)) return { error: `${nombre} debe ser un número entero` };
      if (regla.min !== undefined && n < regla.min) return { error: `${nombre} debe ser mayor o igual a ${regla.min}` };
      return { valor: n };
    }

    case 'decimal': {
      const n = typeof valor === 'string' && valor.trim() !== '' ? Number(valor) : valor;
      if (typeof n !== 'number' || !Number.isFinite(n)) return { error: `${nombre} debe ser un número` };
      if (regla.min !== undefined && n < regla.min) return { error: `${nombre} debe ser mayor o igual a ${regla.min}` };
      return { valor: n };
    }

    case 'fecha': {
      if (typeof valor !== 'string' || !REGEX_FECHA.test(valor)) {
        return { error: `${nombre} debe tener el formato AAAA-MM-DD` };
      }
      const f = new Date(valor);
      // Controla fechas imposibles como 2026-02-31
      if (Number.isNaN(f.getTime()) || f.toISOString().slice(0, 10) !== valor) {
        return { error: `${nombre} no es una fecha válida` };
      }
      return { valor: f };
    }
  }
};

// Valida un objeto completo contra sus reglas.
// parcial = true se usa en los PUT: ningún campo es obligatorio, pero debe venir al menos uno.
export const validarObjeto = (
  datos: any,
  reglas: Reglas,
  parcial = false,
  prefijo = ''
): { limpio: Record<string, unknown>; errores: string[] } => {
  const limpio: Record<string, unknown> = {};
  const errores: string[] = [];

  if (typeof datos !== 'object' || datos === null || Array.isArray(datos)) {
    return { limpio, errores: [`${prefijo || 'El body'} debe ser un objeto JSON`] };
  }

  for (const [campo, regla] of Object.entries(reglas)) {
    const valor = datos[campo];
    const nombre = prefijo + campo;
    const falta = valor === undefined || valor === '';

    if (falta) {
      if (regla.requerido && !parcial) errores.push(`${nombre} es obligatorio`);
      continue;
    }

    const r = validarCampo(nombre, valor, regla);
    if (r.error) errores.push(r.error);
    else limpio[campo] = r.valor;
  }

  // Campos que no existen en el recurso: se avisa en vez de ignorarlos en silencio
  const desconocidos = Object.keys(datos).filter((c) => !(c in reglas));
  if (desconocidos.length > 0) errores.push(`Campos no permitidos: ${desconocidos.map((c) => prefijo + c).join(', ')}`);

  if (parcial && Object.keys(limpio).length === 0 && errores.length === 0) {
    errores.push('No se envió ningún campo para actualizar');
  }

  return { limpio, errores };
};

// Respuesta estándar cuando la validación falla
const responderErrores = (res: Response, errores: string[]) =>
  res.status(400).json({ status: 'error', mensaje: 'Datos inválidos', errores });

// Middleware para el body de un POST (parcial = false) o de un PUT (parcial = true)
export const validarBody =
  (reglas: Reglas, parcial = false) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { limpio, errores } = validarObjeto(req.body, reglas, parcial);
    if (errores.length > 0) return responderErrores(res, errores);
    req.body = limpio;
    next();
  };

// Middleware para el :id de la URL
export const validarId = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return responderErrores(res, ['El id debe ser un número entero positivo']);
  }
  next();
};

// Middleware con una función de validación propia (para casos especiales como el pedido)
export const validarCon =
  (fn: (body: any) => { limpio: any; errores: string[] }) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { limpio, errores } = fn(req.body);
    if (errores.length > 0) return responderErrores(res, errores);
    req.body = limpio;
    next();
  };
