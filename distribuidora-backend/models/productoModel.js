import pool from '../config/db.js';

export const getAllProductos = async () => {
  const [rows] = await pool.query('SELECT * FROM productos');
  return rows;
};

export const getProductoById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM productos WHERE prod_id = ?', [id]);
  return rows[0];
};

export const createProducto = async (producto) => {
  const { Tipo, Nombre, Vencimiento } = producto;
  const [result] = await pool.query(
    'INSERT INTO productos (Tipo, Nombre, Vencimiento) VALUES (?, ?, ?)',
    [Tipo, Nombre, Vencimiento]
  );
  return { prod_id: result.insertId, ...producto };
};