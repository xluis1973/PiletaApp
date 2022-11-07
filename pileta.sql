-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-10-2022 a las 16:13:40
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pileta`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `idEmpresa` int(11) NOT NULL,
  `nroEmpresa` int(11) NOT NULL,
  `razonSocial` varchar(60) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `familiar`
--

CREATE TABLE `familiar` (
  `idFamiliar` int(11) NOT NULL,
  `dni` int(11) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `parentesco` varchar(1) NOT NULL,
  `nroAfiliado` int(11) NOT NULL,
  `foto` varchar(200) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `titular`
--

CREATE TABLE `titular` (
  `idTitular` int(11) NOT NULL,
  `nroAfiliado` int(11) NOT NULL,
  `dni` int(11) NOT NULL,
  `nroEmpresa` int(11) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `foto` varchar(300) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`idEmpresa`),
  ADD UNIQUE KEY `nroEmpresa` (`nroEmpresa`);

--
-- Indices de la tabla `familiar`
--
ALTER TABLE `familiar`
  ADD PRIMARY KEY (`idFamiliar`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD KEY `nroAfiliado` (`nroAfiliado`);

--
-- Indices de la tabla `titular`
--
ALTER TABLE `titular`
  ADD PRIMARY KEY (`idTitular`),
  ADD UNIQUE KEY `nroAfiliado` (`nroAfiliado`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD KEY `idEmpresa` (`nroEmpresa`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `idEmpresa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `familiar`
--
ALTER TABLE `familiar`
  MODIFY `idFamiliar` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `titular`
--
ALTER TABLE `titular`
  MODIFY `idTitular` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `familiar`
--
ALTER TABLE `familiar`
  ADD CONSTRAINT `familiar_ibfk_1` FOREIGN KEY (`nroAfiliado`) REFERENCES `titular` (`nroAfiliado`);

--
-- Filtros para la tabla `titular`
--
ALTER TABLE `titular`
  ADD CONSTRAINT `titular_ibfk_1` FOREIGN KEY (`nroEmpresa`) REFERENCES `empresa` (`nroEmpresa`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
