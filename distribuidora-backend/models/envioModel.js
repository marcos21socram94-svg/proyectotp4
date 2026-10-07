// models/envioModel.js
import pool from '../config/db.js';

export const getAllCompaniasEnvio = async () => {
  const [rows] = await pool.query('SELECT * FROM `compañia de envios`');
  return rows;
};

export const getCompaniaEnvioById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM `compañia de envios` WHERE id_compañia = ?', [id]);
  return rows[0];
};

export const createCompaniaEnvio = async (compania) => {
  const { correo, telefono, nombre } = compania;
  const [result] = await pool.query(
    'INSERT INTO `compañia de envios` (correo, telefono, nombre) VALUES (?, ?, ?)',
    [correo, telefono, nombre]
  );
  return { id_compañia: result.insertId, ...compania };
};