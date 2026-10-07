import * as proveedorModel from '../models/proveedorModel.js';

//Maneja las peticiones HTTP, responde al cliente y deriva errores al middleware global.

// GET /api/proveedores
export const getProveedores = async (req, res, next) => {
  try {
    const proveedores = await proveedorModel.getAllProveedores();
    res.json(proveedores);
  } catch (error) {
    next(error);
  }
};

// GET /api/proveedores/:id
export const getProveedor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const proveedor = await proveedorModel.getProveedorById(id);

    if (!proveedor) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    }

    res.json(proveedor);
  } catch (error) {
    next(error);
  }
};

// POST /api/proveedores
export const createProveedor = async (req, res, next) => {
  try {
    const nuevoProveedor = await proveedorModel.createProveedor(req.body);
    res.status(201).json(nuevoProveedor);
  } catch (error) {
    next(error);
  }
};

// PUT /api/proveedores/:id
export const updateProveedor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filasAfectadas = await proveedorModel.updateProveedor(id, req.body);

    if (filasAfectadas === 0) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado para actualizar' });
    }

    res.json({ mensaje: 'Proveedor actualizado correctamente', id_proveedor: id, ...req.body });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/proveedores/:id
export const deleteProveedor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filasAfectadas = await proveedorModel.deleteProveedor(id);

    if (filasAfectadas === 0) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado para eliminar' });
    }

    res.json({ mensaje: 'Proveedor eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};