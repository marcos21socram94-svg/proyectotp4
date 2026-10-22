// Funciones chicas que usan los controladores para validar datos.

// Error "esperado" de la aplicación, con su código HTTP (400, 404, etc.)
export class AppError extends Error {
  status: number;

  constructor(status: number, mensaje: string) {
    super(mensaje);
    this.status = status;
  }
}

// Convierte el :id de la URL en número. Si no es válido responde 400.
export const leerId = (valor: string): number => {
  const id = Number(valor);
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError(400, 'El id debe ser un número entero positivo');
  }
  return id;
};

// Verifica que el body traiga todos los campos obligatorios. Si falta alguno responde 400.
export const exigirCampos = (body: any, campos: string[]): void => {
  const faltan = campos.filter(
    (c) => body?.[c] === undefined || body[c] === null || body[c] === ''
  );
  if (faltan.length > 0) {
    throw new AppError(400, `Faltan campos obligatorios: ${faltan.join(', ')}`);
  }
};

// Copia del body solo los campos permitidos (ignora cualquier otro dato que llegue).
export const tomarCampos = (body: any, campos: string[]): any => {
  const resultado: any = {};
  for (const campo of campos) {
    if (body?.[campo] !== undefined) resultado[campo] = body[campo];
  }
  return resultado;
};

// Convierte un texto "AAAA-MM-DD" en Date (Prisma necesita objetos Date). Si es inválido responde 400.
export const aFecha = (valor: any): Date => {
  const fecha = new Date(valor);
  if (Number.isNaN(fecha.getTime())) {
    throw new AppError(400, 'Fecha inválida, usar el formato AAAA-MM-DD');
  }
  return fecha;
};

// --- Lectura de parámetros opcionales de la URL (?nombre=...&clienteId=...) ---

export const texto = (valor: unknown): string | undefined =>
  typeof valor === 'string' && valor !== '' ? valor : undefined;

export const numero = (valor: unknown): number | undefined => {
  if (valor === undefined || valor === '') return undefined;
  const n = Number(valor);
  if (Number.isNaN(n)) throw new AppError(400, 'Un parámetro numérico de la URL no es válido');
  return n;
};

export const fechaOpcional = (valor: unknown): Date | undefined =>
  texto(valor) === undefined ? undefined : aFecha(valor);
