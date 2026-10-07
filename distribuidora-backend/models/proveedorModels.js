import pool from '../config/db.js';

/// Encargada de ejecutar las consultas SQL puras mediante el Pool de conexiones.
 

// Obtener todos los proveedores
export const getAllProveedores = async () => {
  const [rows] = await pool.query('SELECT * FROM proveedores');
  return rows;
};

// Obtener un proveedor por su ID
export const getProveedorById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM proveedores WHERE id_proveedor = ?', [id]);
  return rows[0];
};

// Insertar un nuevo proveedor
export const createProveedor = async (proveedor) => {
  const { nombre, contacto, telefono, direccion } = proveedor;
  const [result] = await pool.query(
    'INSERT INTO proveedores (nombre, contacto, telefono, direccion) VALUES (?, ?, ?, ?)',
    [nombre, contacto, telefono, direccion]
  );
  return { id_proveedor: result.insertId, ...proveedor };
};

// Actualizar los datos de un proveedor existente
export const updateProveedor = async (id, proveedor) => {
  const { nombre, contacto, telefono, direccion } = proveedor;
  const [result] = await pool.query(
    'UPDATE proveedores SET nombre = ?, contacto = ?, telefono = ?, direccion = ? WHERE id_proveedor = ?',
    [nombre, contacto, telefono, direccion, id]
  );
  return result.affectedRows; // Retorna la cantidad de filas modificadas
};

// Eliminar un proveedor por su ID
export const deleteProveedor = async (id) => {
  const [result] = await pool.query('DELETE FROM proveedores WHERE id_proveedor = ?', [id]);
  return result.affectedRows; // Retorna la cantidad de filas eliminadas
};