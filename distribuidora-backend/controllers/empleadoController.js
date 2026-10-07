import * as empleadoModel from '../models/empleadoModel.js';

///Procesa las peticiones HTTP y delega excepciones al errorHandler

// GET /api/empleados
export const getEmpleados = async (req, res, next) => {
  try {
    const empleados = await empleadoModel.getAllEmpleados();
    res.json(empleados);
  } catch (error) {
    next(error);
  }
};

// GET /api/empleados/:id
export const getEmpleado = async (req, res, next) => {
  try {
    const { id } = req.params;
    const empleado = await empleadoModel.getEmpleadoById(id);

    if (!empleado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }

    res.json(empleado);
  } catch (error) {
    next(error);
  }
};

// POST /api/empleados
export const createEmpleado = async (req, res, next) => {
  try {
    const nuevoEmpleado = await empleadoModel.createEmpleado(req.body);
    res.status(201).json(nuevoEmpleado);
  } catch (error) {
    next(error);
  }
};

// PUT /api/empleados/:id
export const updateEmpleado = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filasAfectadas = await empleadoModel.updateEmpleado(id, req.body);

    if (filasAfectadas === 0) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado para actualizar' });
    }

    res.json({ mensaje: 'Empleado actualizado correctamente', id_empleado: id, ...req.body });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/empleados/:id
export const deleteEmpleado = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filasAfectadas = await empleadoModel.deleteEmpleado(id);

    if (filasAfectadas === 0) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado para eliminar' });
    }

    res.json({ mensaje: 'Empleado eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};