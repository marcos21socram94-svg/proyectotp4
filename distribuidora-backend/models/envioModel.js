import pool from '../config/db.js';

///Maneja las consultas SQL parametrizadas para la tabla 'companias_envio'


// Obtener todas las compañías de envío
export const getAllCompaniasEnvio = async () => {
  const [rows] = await pool.query('SELECT * FROM companias_envio');
  return rows;
};

// Obtener una compañía de envío por su ID
export const getCompaniaEnvioById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM companias_envio WHERE id_compania_envio = ?', [id]);
  return rows[0];
};

// Crear una nueva compañía de envío
export const createCompaniaEnvio = async (compania) => {
  const { nombre, telefono, email } = compania;
  const [result] = await pool.query(
    'INSERT INTO companias_envio (nombre, telefono, email) VALUES (?, ?, ?)',
    [nombre, telefono, email]
  );
  return { id_compania_envio: result.insertId, ...compania };
};

// Actualizar los datos de una compañía de envío
export const updateCompaniaEnvio = async (id, compania) => {
  const { nombre, telefono, email } = compania;
  const [result] = await pool.query(
    'UPDATE companias_envio SET nombre = ?, telefono = ?, email = ? WHERE id_compania_envio = ?',
    [nombre, telefono, email, id]
  );
  return result.affectedRows;
};

// Eliminar una compañía de envío por su ID
export const deleteCompaniaEnvio = async (id) => {
  const [result] = await pool.query('DELETE FROM companias_envio WHERE id_compania_envio = ?', [id]);
  return result.affectedRows;
};