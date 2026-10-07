import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// En lugar de abrir y cerrar una conexión por cada consulta HTTP un Connection Pool gestiona un conjunto de conexiones 
// reutilizables para atender múltiples peticiones concurrentes de manera eficiente//

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'distribuidora_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;