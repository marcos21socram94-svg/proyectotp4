import pool from '../config/db.js';

/**
 * Capa de Acceso a Datos (Model) - Entidad: Clientes
 * Maneja la interacción SQL pura con la tabla 'clientes' en MySQL.
 */

// Obtener todos los clientes
export const getAllClientes = async () => {
  const [rows] = await pool.query('SELECT * FROM clientes');
  return rows;
};

// Obtener un cliente por ID
export const getClienteById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM clientes WHERE id_cliente = ?', [id]);
  return rows[0];
};

// Crear un nuevo cliente
export const createCliente = async (cliente) => {
  const { nombre, telefono, email, direccion } = cliente;
  const [result] = await pool.query(
    'INSERT INTO clientes (nombre, telefono, email, direccion) VALUES (?, ?, ?, ?)',
    [nombre, telefono, email, direccion]
  );
  return { id_cliente: result.insertId, ...cliente };
};

// Actualizar un cliente existente
export const updateCliente = async (id, cliente) => {
  const { nombre, telefono, email, direccion } = cliente;
  const [result] = await pool.query(
    'UPDATE clientes SET nombre = ?, telefono = ?, email = ?, direccion = ? WHERE id_cliente = ?',
    [nombre, telefono, email, direccion, id]
  );
  return result.affectedRows;
};

// Eliminar un cliente por ID
export const deleteCliente = async (id) => {
  const [result] = await pool.query('DELETE FROM clientes WHERE id_cliente = ?', [id]);
  return result.affectedRows;
};