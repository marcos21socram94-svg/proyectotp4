-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-10-2026 a las 21:59:07
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `backend`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `NombreYApellido` varchar(50) NOT NULL,
  `Telefono` int(15) NOT NULL,
  `DNI` int(15) NOT NULL,
  `Correo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla de clientes';

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `NombreYApellido`, `Telefono`, `DNI`, `Correo`) VALUES
(1, 'Facundo Jelvez', 29840080, 1111111111, 'correoejemplo@hotmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compañia de envios`
--

CREATE TABLE `compañia de envios` (
  `id_compañia` int(15) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `telefono` int(15) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Compañia de envios';

--
-- Volcado de datos para la tabla `compañia de envios`
--

INSERT INTO `compañia de envios` (`id_compañia`, `correo`, `telefono`, `nombre`) VALUES
(1, 'ejemplo@ejemplo.com', 298459600, 'Envios Internacionales');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `Id` int(15) NOT NULL,
  `DNI` int(15) NOT NULL,
  `FechNacimiento` date NOT NULL,
  `NombreYApellido` varchar(50) NOT NULL,
  `Correo` varchar(30) NOT NULL,
  `Telefono` int(15) NOT NULL,
  `ObraSocial` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla de Empleados';

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`Id`, `DNI`, `FechNacimiento`, `NombreYApellido`, `Correo`, `Telefono`, `ObraSocial`) VALUES
(1, 249585719, '2001-01-01', 'Natalia Figueroa', 'example@example.com', 298451001, 'Sancord seguros');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `Id` int(15) NOT NULL,
  `FechaPedido` date NOT NULL,
  `Cantidad` int(40) NOT NULL,
  `PrecioUnit` int(40) NOT NULL,
  `CodigoProd` int(15) NOT NULL,
  `PrecioTotal` int(40) NOT NULL,
  `ImportTotal` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla de pedidos';

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`Id`, `FechaPedido`, `Cantidad`, `PrecioUnit`, `CodigoProd`, `PrecioTotal`, `ImportTotal`) VALUES
(1, '2001-01-01', 20, 100, 1, 10000, 100000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `prod_id` int(15) NOT NULL,
  `Tipo` varchar(30) NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  `Vencimiento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla de productos';

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`prod_id`, `Tipo`, `Nombre`, `Vencimiento`) VALUES
(1, 'Alimenticio', 'Fideos Marolio', '2002-01-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id` int(15) NOT NULL,
  `Telefono` int(15) NOT NULL,
  `Correo` varchar(30) NOT NULL,
  `Nombre` varchar(40) NOT NULL,
  `codigoPedido` int(15) NOT NULL,
  `compañiaEnvio` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla de los proveedores';

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id`, `Telefono`, `Correo`, `Nombre`, `codigoPedido`, `compañiaEnvio`) VALUES
(1, 283823, 'ejemplo@ejemplo.com', 'Proveedores internacionales', 1, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `compañia de envios`
--
ALTER TABLE `compañia de envios`
  ADD PRIMARY KEY (`id_compañia`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `CodigoProd` (`CodigoProd`),
  ADD UNIQUE KEY `CodigoProd_2` (`CodigoProd`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD UNIQUE KEY `Codigo` (`prod_id`),
  ADD UNIQUE KEY `Codigo_2` (`prod_id`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigoPedido` (`codigoPedido`),
  ADD UNIQUE KEY `compañiaEnvio` (`compañiaEnvio`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `compañia de envios`
--
ALTER TABLE `compañia de envios`
  MODIFY `id_compañia` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `Id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `Id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `prod_id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compañia de envios`
--
ALTER TABLE `compañia de envios`
  ADD CONSTRAINT `compañia de envios_ibfk_1` FOREIGN KEY (`id_compañia`) REFERENCES `proveedores` (`compañiaEnvio`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`Id`) REFERENCES `proveedores` (`codigoPedido`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `pedidos` (`CodigoProd`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
