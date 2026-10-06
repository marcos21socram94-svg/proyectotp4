export const errorHandler = (err, req, res, next) => {
  console.error('Error detectado:', err);

  // Manejo de errores específicos de MySQL
  if (err.code) {
    return res.status(500).json({
      status: 'error',
      mensaje: 'Error en la base de datos',
      detalle: err.sqlMessage || err.code
    });
  }

  // Errores controlados de la aplicación
  res.status(err.status || 500).json({
    status: 'error',
    mensaje: err.message || 'Error interno del servidor'
  });
};