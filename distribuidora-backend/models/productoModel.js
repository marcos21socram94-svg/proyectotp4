import pool from '../config/db.js';

// Obtener todos los productos
export const getAllProductos = async () => {
  const [rows] = await pool.query('SELECT * FROM productos');
  return rows;
};

// Obtener un producto por ID (Consulta parametrizada por seguridad)
export const getProductoById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM productos WHERE id_producto = ?', [id]);
  return rows[0];
};

// Crear un nuevo producto
export const createProducto = async (producto) => {
  const { nombre, precio, stock, id_proveedor } = producto;
  const [result] = await pool.query(
    'INSERT INTO productos (nombre, precio, stock, id_proveedor) VALUES (?, ?, ?, ?)',
    [nombre, precio, stock, id_proveedor]
  );
  return { id_producto: result.insertId, ...producto };
};