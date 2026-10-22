import { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { AppError } from '../utils/helpers';

// MANEJO GLOBAL DE ERRORES (consigna 2.5)
// Cualquier error que ocurra en una ruta llega acá. El detalle técnico (stack trace, SQL)
// solo se muestra en la consola del servidor; al cliente SIEMPRE se le devuelve un JSON controlado.
export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error detectado:', err);

  // 1) Errores propios de la aplicación (validaciones, "no encontrado", etc.)
  if (err instanceof AppError) {
    return res.status(err.status).json({ status: 'error', mensaje: err.message });
  }

  // 2) Errores conocidos de la base de datos, identificados por el código de Prisma
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002': // valor único repetido (ej: DNI ya cargado)
        return res.status(400).json({ status: 'error', mensaje: 'Ya existe un registro con ese valor único (por ejemplo, un DNI repetido)' });
      case 'P2003': // clave foránea inválida o registro con datos relacionados
        return res.status(400).json({ status: 'error', mensaje: 'Relación inválida: el registro referenciado no existe o tiene datos relacionados' });
      case 'P2025': // registro no encontrado (al actualizar o eliminar)
        return res.status(404).json({ status: 'error', mensaje: 'Registro no encontrado' });
      default:
        return res.status(500).json({ status: 'error', mensaje: 'Error en la base de datos' });
    }
  }

  // 3) Datos con formato incorrecto (ej: un texto donde va un número)
  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({ status: 'error', mensaje: 'Datos inválidos: revisá los tipos de los campos enviados' });
  }

  // 4) JSON mal escrito en el body de la petición
  if (err?.type === 'entity.parse.failed') {
    return res.status(400).json({ status: 'error', mensaje: 'El JSON enviado no es válido' });
  }

  // 5) Cualquier otro error inesperado
  return res.status(500).json({ status: 'error', mensaje: 'Error interno del servidor' });
};
