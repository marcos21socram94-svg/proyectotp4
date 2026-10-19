-- Crear y usar la base de datos
CREATE DATABASE IF NOT EXISTS backend;
USE backend;

-- 1. Tabla Proveedores
CREATE TABLE IF NOT EXISTS proveedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(40) NOT NULL,
    Telefono VARCHAR(20) NOT NULL,
    Correo VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 2. Tabla Productos (Relacionada correctamente con Proveedores)
CREATE TABLE IF NOT EXISTS productos (
    prod_id INT AUTO_INCREMENT PRIMARY KEY,
    Tipo VARCHAR(30) NOT NULL,
    Nombre VARCHAR(30) NOT NULL,
    Vencimiento DATE NOT NULL,
    id_proveedor INT,
    CONSTRAINT fk_producto_proveedor FOREIGN KEY (id_proveedor) 
        REFERENCES proveedores(id) 
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 3. Tabla Clientes
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    NombreYApellido VARCHAR(50) NOT NULL,
    Telefono VARCHAR(20) NOT NULL,
    DNI VARCHAR(20) NOT NULL,
    Correo VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 4. Tabla Empleados
CREATE TABLE IF NOT EXISTS empleados (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    DNI VARCHAR(20) NOT NULL,
    FechNacimiento DATE NOT NULL,
    NombreYApellido VARCHAR(50) NOT NULL,
    Correo VARCHAR(50) NOT NULL,
    Telefono VARCHAR(20) NOT NULL,
    ObraSocial VARCHAR(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 5. Tabla Compañía de Envíos
CREATE TABLE IF NOT EXISTS compañia_envios (
    id_compañia INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    telefono VARCHAR(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 6. Tabla Pedidos (Cabecera)
CREATE TABLE IF NOT EXISTS pedidos (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    FechaPedido DATE NOT NULL,
    id_cliente INT NOT NULL,
    id_compañia INT,
<<<<<<< HEAD
    id_empleado INT NOT NULL,
    CONSTRAINT fk_pedido_cliente FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE CASCADE,
    CONSTRAINT fk_pedido_envio FOREIGN KEY (id_compañia) REFERENCES compañia_envios(id_compañia) ON DELETE SET NULL
    CONSTRAINT fk_pedido_empleado FOREIGN KEY (id_empleado) REFERENCES empleados(Id) ON DELETE RESTRICT
=======
    CONSTRAINT fk_pedido_cliente FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE CASCADE,
    CONSTRAINT fk_pedido_envio FOREIGN KEY (id_compañia) REFERENCES compañia_envios(id_compañia) ON DELETE SET NULL
>>>>>>> 2ff545241cffa543a7ab1a86676f3c14311b5df6
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 7. Tabla Intermedia: Detalle de Pedidos
CREATE TABLE IF NOT EXISTS detalle_pedidos (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_detalle_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(Id) ON DELETE CASCADE,
    CONSTRAINT fk_detalle_producto FOREIGN KEY (id_producto) REFERENCES productos(prod_id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- ==========================================
-- VOLCADO DE DATOS (INSERTS DE PRUEBA)
-- ==========================================

INSERT INTO proveedores (id, Nombre, Telefono, Correo) VALUES
(1, 'Proveedores Internacionales', '2983823', 'pepeEJ@ejemplo.com');

INSERT INTO productos (prod_id, Tipo, Nombre, Vencimiento, id_proveedor) VALUES
(1, 'Alimenticio', 'Fideos Marolio', '2005-06-06', 1);

INSERT INTO clientes (id, NombreYApellido, Telefono, DNI, Correo) VALUES
(1, 'Facundo Jelvez', '29840080', '11111111', 'correoejemplo@hotmail.com');

INSERT INTO empleados (Id, DNI, FechNacimiento, NombreYApellido, Correo, Telefono, ObraSocial) VALUES
(1, '24958571', '2008-08-01', 'Natalia Figueroa', 'example@example.com', '298451001', 'Sancord Seguros');

INSERT INTO compañia_envios (id_compañia, nombre, correo, telefono) VALUES
(1, 'Envios Internacionales', 'ejemplo@ejemplo.com', '298459600');

INSERT INTO pedidos (Id, FechaPedido, id_cliente, id_compañia) VALUES
(1, '2020-05-01', 1, 1);

INSERT INTO detalle_pedidos (id_pedido, id_producto, cantidad, precio_unitario) VALUES
(1, 1, 20, 100.00);