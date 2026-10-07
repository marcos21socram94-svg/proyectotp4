-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-10-2026 a las 20:20:46
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
  `NombreYApellido` int(11) NOT NULL,
  `Telefono` int(11) NOT NULL,
  `DNI` int(11) NOT NULL,
  `Correo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla de clientes';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compañia de envios`
--

CREATE TABLE `compañia de envios` (
  `id_compañia` int(11) NOT NULL,
  `correo` text NOT NULL,
  `telefono` int(11) NOT NULL,
  `nombre` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Compañia de envios';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `Id` int(11) NOT NULL,
  `DNI` int(11) NOT NULL,
  `FechNacimiento` date NOT NULL,
  `NombreYApellido` text NOT NULL,
  `Correo` text NOT NULL,
  `Telefono` int(11) NOT NULL,
  `ObraSocial` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla de Empleados';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `Id` int(11) NOT NULL,
  `FechaPedido` date NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `PrecioUnit` int(11) NOT NULL,
  `CodigoProd` int(11) NOT NULL,
  `PrecioTotal` int(11) NOT NULL,
  `ImportTotal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla de pedidos';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `prod_id` int(11) NOT NULL,
  `Tipo` text NOT NULL,
  `Nombre` text NOT NULL,
  `Vencimiento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla de productos';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id` int(11) NOT NULL,
  `Telefono` int(11) NOT NULL,
  `Correo` text NOT NULL,
  `Nombre` text NOT NULL,
  `codigoPedido` int(11) NOT NULL,
  `compañiaEnvio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla de los proveedores';

--
-- Índices para tablas volcadas
--

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
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `prod_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
