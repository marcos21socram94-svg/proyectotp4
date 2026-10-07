import * as clienteModel from '../models/clienteModel.js';

/**
 * Capa de Controlador - Entidad: Clientes
 * Gestiona el flujo HTTP (petición/respuesta) y canaliza errores hacia errorHandler.js
 */

// GET /api/clientes
export const getClientes = async (req, res, next) => {
  try {
    const clientes = await clienteModel.getAllClientes();
    res.json(clientes);
  } catch (error) {
    next(error);
  }
};

// GET /api/clientes/:id
export const getCliente = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cliente = await clienteModel.getClienteById(id);

    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    res.json(cliente);
  } catch (error) {
    next(error);
  }
};

// POST /api/clientes
export const createCliente = async (req, res, next) => {
  try {
    const nuevoCliente = await clienteModel.createCliente(req.body);
    res.status(201).json(nuevoCliente);
  } catch (error) {
    next(error);
  }
};

// PUT /api/clientes/:id
export const updateCliente = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filasAfectadas = await clienteModel.updateCliente(id, req.body);

    if (filasAfectadas === 0) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado para actualizar' });
    }

    res.json({ mensaje: 'Cliente actualizado correctamente', id_cliente: id, ...req.body });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/clientes/:id
export const deleteCliente = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filasAfectadas = await clienteModel.deleteCliente(id);

    if (filasAfectadas === 0) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado para eliminar' });
    }

    res.json({ mensaje: 'Cliente eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};