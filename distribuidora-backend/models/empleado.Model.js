import pool from '../config/db.js';

 ///Ejecuta consultas SQL parametrizadas sobre la tabla 'empleados'.
 

// Obtener la lista completa de empleados
export const getAllEmpleados = async () => {
  const [rows] = await pool.query('SELECT * FROM empleados');
  return rows;
};

// Obtener un empleado por su ID
export const getEmpleadoById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM empleados WHERE id_empleado = ?', [id]);
  return rows[0];
};

// Registrar un nuevo empleado
export const createEmpleado = async (empleado) => {
  const { nombre, apellido, puesto, email, telefono } = empleado;
  const [result] = await pool.query(
    'INSERT INTO empleados (nombre, apellido, puesto, email, telefono) VALUES (?, ?, ?, ?, ?)',
    [nombre, apellido, puesto, email, telefono]
  );
  return { id_empleado: result.insertId, ...empleado };
};

// Actualizar información de un empleado
export const updateEmpleado = async (id, empleado) => {
  const { nombre, apellido, puesto, email, telefono } = empleado;
  const [result] = await pool.query(
    'UPDATE empleados SET nombre = ?, apellido = ?, puesto = ?, email = ?, telefono = ? WHERE id_empleado = ?',
    [nombre, apellido, puesto, email, telefono, id]
  );
  return result.affectedRows;
};

// Eliminar un empleado de la base de datos
export const deleteEmpleado = async (id) => {
  const [result] = await pool.query('DELETE FROM empleados WHERE id_empleado = ?', [id]);
  return result.affectedRows;
};