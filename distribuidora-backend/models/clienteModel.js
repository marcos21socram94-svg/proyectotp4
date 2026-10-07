import pool from '../config/db.js';

export const getAllClientes = async () => {
  const [rows] = await pool.query('SELECT * FROM clientes');
  return rows;
};

export const getClienteById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
  return rows[0];
};

export const createCliente = async (cliente) => {
  const { NombreYApellido, Telefono, DNI, Correo } = cliente;
  const [result] = await pool.query(
    'INSERT INTO clientes (NombreYApellido, Telefono, DNI, Correo) VALUES (?, ?, ?, ?)',
    [NombreYApellido, Telefono, DNI, Correo]
  );
  return { id: result.insertId, ...cliente };
};