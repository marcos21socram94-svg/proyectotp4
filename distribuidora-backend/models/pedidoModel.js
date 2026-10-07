import pool from '../config/db.js';

///Maneja las consultas SQL parametrizadas para la tabla 'pedidos'

// Obtener la lista completa de pedidos
export const getAllPedidos = async () => {
  const [rows] = await pool.query('SELECT * FROM pedidos');
  return rows;
};

// Obtener un pedido por su ID
export const getPedidoById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM pedidos WHERE id_pedido = ?', [id]);
  return rows[0];
};

// Registrar un nuevo pedido
export const createPedido = async (pedido) => {
  const { fecha_pedido, id_cliente, id_empleado, id_compania_envio } = pedido;
  const [result] = await pool.query(
    'INSERT INTO pedidos (fecha_pedido, id_cliente, id_empleado, id_compania_envio) VALUES (?, ?, ?, ?)',
    [fecha_pedido, id_cliente, id_empleado, id_compania_envio]
  );
  return { id_pedido: result.insertId, ...pedido };
};

// Actualizar datos de un pedido existente
export const updatePedido = async (id, pedido) => {
  const { fecha_pedido, id_cliente, id_empleado, id_compania_envio } = pedido;
  const [result] = await pool.query(
    'UPDATE pedidos SET fecha_pedido = ?, id_cliente = ?, id_empleado = ?, id_compania_envio = ? WHERE id_pedido = ?',
    [fecha_pedido, id_cliente, id_empleado, id_compania_envio, id]
  );
  return result.affectedRows;
};

// Eliminar un pedido por su ID
export const deletePedido = async (id) => {
  const [result] = await pool.query('DELETE FROM pedidos WHERE id_pedido = ?', [id]);
  return result.affectedRows;
};