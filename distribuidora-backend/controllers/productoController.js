import * as productoModel from '../models/productoModel.js';

// Controlador para manejar las solicitudes relacionadas con los productos
export const getProductos = async (req, res, next) => {
  try {         //
    const productos = await productoModel.getAllProductos();
    res.json(productos);
  } catch (error) {
    next(error);
  }
};

// Controlador para manejar la solicitud de obtener un producto por su ID
export const getProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const producto = await productoModel.getProductoById(id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    next(error);
  }
};

// Controlador para manejar la solicitud de crear un nuevo producto
export const createProducto = async (req, res, next) => {
  try {
    const nuevoProducto = await productoModel.createProducto(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    next(error);
  }
};