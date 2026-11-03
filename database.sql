-- =====================================================================
-- database.sql  -  Recrea la base de datos de la distribuidora (MySQL)
-- Se puede importar completo desde phpMyAdmin (XAMPP) o con:
--   mysql -u root < database.sql
-- Es equivalente a prisma/schema.prisma (mismas tablas y relaciones).
-- =====================================================================

CREATE DATABASE IF NOT EXISTS distribuidora_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE distribuidora_db;

-- Se borran las tablas (si existen) para poder importar el archivo varias veces
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS detalle_pedidos;
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS proveedores;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS empleados;
DROP TABLE IF EXISTS companias_envio;
SET FOREIGN_KEY_CHECKS = 1;

-- ---------------------------------------------------------------------
-- TABLAS
-- ---------------------------------------------------------------------

CREATE TABLE proveedores (
  id       INT NOT NULL AUTO_INCREMENT,
  nombre   VARCHAR(40) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  correo   VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE productos (
  id           INT NOT NULL AUTO_INCREMENT,
  tipo         VARCHAR(30) NOT NULL,
  nombre       VARCHAR(30) NOT NULL,
  precio       DECIMAL(10,2) NOT NULL DEFAULT 0,
  vencimiento  DATE NOT NULL,
  id_proveedor INT NULL,
  PRIMARY KEY (id),
  INDEX productos_id_proveedor_idx (id_proveedor),
  CONSTRAINT productos_id_proveedor_fkey FOREIGN KEY (id_proveedor)
    REFERENCES proveedores (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE clientes (
  id              INT NOT NULL AUTO_INCREMENT,
  nombre_apellido VARCHAR(50) NOT NULL,
  telefono        VARCHAR(20) NOT NULL,
  dni             VARCHAR(20) NOT NULL,
  correo          VARCHAR(50) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX clientes_dni_key (dni)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE empleados (
  id               INT NOT NULL AUTO_INCREMENT,
  dni              VARCHAR(20) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  nombre_apellido  VARCHAR(50) NOT NULL,
  correo           VARCHAR(50) NOT NULL,
  telefono         VARCHAR(20) NOT NULL,
  obra_social      VARCHAR(30) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX empleados_dni_key (dni)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE companias_envio (
  id       INT NOT NULL AUTO_INCREMENT,
  nombre   VARCHAR(50) NOT NULL,
  correo   VARCHAR(50) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Cabecera del pedido: quién compró (cliente), quién vendió (empleado) y cómo se envía (compañía)
CREATE TABLE pedidos (
  id          INT NOT NULL AUTO_INCREMENT,
  fecha       DATE NOT NULL,
  id_cliente  INT NOT NULL,
  id_compania INT NULL,
  id_empleado INT NOT NULL,
  PRIMARY KEY (id),
  INDEX pedidos_id_cliente_idx (id_cliente),
  INDEX pedidos_id_compania_idx (id_compania),
  INDEX pedidos_id_empleado_idx (id_empleado),
  CONSTRAINT pedidos_id_cliente_fkey FOREIGN KEY (id_cliente)
    REFERENCES clientes (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT pedidos_id_compania_fkey FOREIGN KEY (id_compania)
    REFERENCES companias_envio (id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT pedidos_id_empleado_fkey FOREIGN KEY (id_empleado)
    REFERENCES empleados (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla intermedia: qué productos tiene cada pedido, con cantidad y precio del momento de la compra
CREATE TABLE detalle_pedidos (
  id              INT NOT NULL AUTO_INCREMENT,
  id_pedido       INT NOT NULL,
  id_producto     INT NOT NULL,
  cantidad        INT NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id),
  INDEX detalle_pedidos_id_pedido_idx (id_pedido),
  INDEX detalle_pedidos_id_producto_idx (id_producto),
  CONSTRAINT detalle_pedidos_id_pedido_fkey FOREIGN KEY (id_pedido)
    REFERENCES pedidos (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT detalle_pedidos_id_producto_fkey FOREIGN KEY (id_producto)
    REFERENCES productos (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- DATOS DE PRUEBA
-- ---------------------------------------------------------------------

INSERT INTO proveedores (id, nombre, telefono, correo) VALUES
(1, 'Alimentos del Sur',  '2984001122', 'ventas@alimentosdelsur.com'),
(2, 'Bebidas Patagonia',  '2984003344', 'contacto@bebidaspatagonia.com');

INSERT INTO productos (id, tipo, nombre, precio, vencimiento, id_proveedor) VALUES
(1, 'Alimenticio', 'Fideos Tallarín 500g',   1200.00, '2027-03-15', 1),
(2, 'Alimenticio', 'Arroz Largo Fino 1kg',   1800.00, '2027-06-30', 1),
(3, 'Alimenticio', 'Aceite de Girasol 1L',   2500.00, '2027-01-20', 1),
(4, 'Bebida',      'Gaseosa Cola 2L',        2200.00, '2027-02-10', 2),
(5, 'Bebida',      'Agua Mineral 1.5L',       900.00, '2027-08-05', 2);

INSERT INTO clientes (id, nombre_apellido, telefono, dni, correo) VALUES
(1, 'Lucía Fernández', '2984111111', '30111222', 'lucia.fernandez@ejemplo.com'),
(2, 'Martín Gómez',    '2984222222', '28333444', 'martin.gomez@ejemplo.com'),
(3, 'Sofía Herrera',   '2984333333', '35555666', 'sofia.herrera@ejemplo.com');

INSERT INTO empleados (id, dni, fecha_nacimiento, nombre_apellido, correo, telefono, obra_social) VALUES
(1, '27888999', '1990-04-12', 'Carolina Ruiz',  'carolina.ruiz@distribuidora.com',  '2984444444', 'OSDE'),
(2, '31222333', '1995-09-03', 'Diego Navarro',  'diego.navarro@distribuidora.com',  '2984555555', 'Swiss Medical');

INSERT INTO companias_envio (id, nombre, correo, telefono) VALUES
(1, 'Envíos Rápidos',  'info@enviosrapidos.com',  '2984666666'),
(2, 'Logística Norte', 'info@logisticanorte.com', '2984777777');

INSERT INTO pedidos (id, fecha, id_cliente, id_compania, id_empleado) VALUES
(1, '2026-09-10', 1, 1, 1),
(2, '2026-09-25', 2, 2, 2),
(3, '2026-10-05', 1, NULL, 1);

INSERT INTO detalle_pedidos (id, id_pedido, id_producto, cantidad, precio_unitario) VALUES
(1, 1, 1, 10, 1200.00),
(2, 1, 4,  6, 2200.00),
(3, 2, 2,  5, 1800.00),
(4, 2, 5, 12,  900.00),
(5, 3, 3,  4, 2500.00),
(6, 3, 1,  8, 1200.00);
