import * as pedidoModel from '../models/pedidoModel.js';

///Procesa peticiones HTTP para la gestión de pedidos y deriva excepciones al errorHandler

// GET /api/pedidos
export const getPedidos = async (req, res, next) => {
  try {
    const pedidos = await pedidoModel.getAllPedidos();
    res.json(pedidos);
  } catch (error) {
    next(error);
  }
};

// GET /api/pedidos/:id
export const getPedido = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pedido = await pedidoModel.getPedidoById(id);

    if (!pedido) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }

    res.json(pedido);
  } catch (error) {
    next(error);
  }
};

// POST /api/pedidos
export const createPedido = async (req, res, next) => {
  try {
    const nuevoPedido = await pedidoModel.createPedido(req.body);
    res.status(201).json(nuevoPedido);
  } catch (error) {
    next(error);
  }
};

// PUT /api/pedidos/:id
export const updatePedido = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filasAfectadas = await pedidoModel.updatePedido(id, req.body);

    if (filasAfectadas === 0) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado para actualizar' });
    }

    res.json({ mensaje: 'Pedido actualizado correctamente', id_pedido: id, ...req.body });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/pedidos/:id
export const deletePedido = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filasAfectadas = await pedidoModel.deletePedido(id);

    if (filasAfectadas === 0) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado para eliminar' });
    }

    res.json({ mensaje: 'Pedido eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};