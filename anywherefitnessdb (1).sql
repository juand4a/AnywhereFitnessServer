-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-11-2025 a las 16:02:06
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
-- Base de datos: `anywherefitnessdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `onboarding_days`
--

CREATE TABLE `onboarding_days` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `day_code` enum('lun','mar','mie','jue','vie','sab','dom') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `onboarding_profiles`
--

CREATE TABLE `onboarding_profiles` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `goal` enum('fuerza','masa_muscular','bajar_peso','resistencia','salud_general') NOT NULL,
  `experience` enum('principiante','intermedio','avanzado') NOT NULL,
  `location` enum('casa','gimnasio') NOT NULL,
  `frequency_per_week` tinyint(3) UNSIGNED NOT NULL CHECK (`frequency_per_week` between 1 and 7),
  `injuries` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `celular` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('usuario','entrenador','admin') DEFAULT 'usuario',
  `tipo_plan` enum('gratuito','premium') DEFAULT 'gratuito',
  `peso` decimal(5,2) DEFAULT NULL,
  `altura` decimal(5,2) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  `onboarded` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `celular`, `password`, `rol`, `tipo_plan`, `peso`, `altura`, `fecha_nacimiento`, `creado_en`, `onboarded`) VALUES
(2, 'Juan David Lopez', 'juandavidlopezp2004@gmail.com', '3054576150', '$2b$10$sBawAaQPGS3W9GK8vFj/2.Te/.Bq3egTKBp1TrlBRli6J7JFYc8rG', 'admin', 'premium', 75.50, 1.73, '2004-12-06', '2025-10-16 02:54:17', 0),
(5, 'Sebastián Alvarez ', 'sebas@gmail.com', '305214544', '$2b$10$nInjGiQ5fQdiYYFWu8E7LOBis/t096DapDfHvHuA3JqmHA5.qLHgy', 'admin', 'premium', 100.00, 180.00, '2000-01-01', '2025-11-04 01:18:47', 0),
(6, 'Brayan patiño', 'dahianateamo@gmail.com', '3207167602', '$2b$10$jag0SUetGF0P7xAMdsazpe7szLkObfcfZfUNboebP4i1byKjt9lrK', 'admin', 'premium', 50.00, 180.00, '2000-01-01', '2025-11-05 02:17:04', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `onboarding_days`
--
ALTER TABLE `onboarding_days`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_user_day` (`user_id`,`day_code`),
  ADD UNIQUE KEY `onboarding_days_user_id_day_code` (`user_id`,`day_code`);

--
-- Indices de la tabla `onboarding_profiles`
--
ALTER TABLE `onboarding_profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_onb_user` (`user_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `onboarding_days`
--
ALTER TABLE `onboarding_days`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `onboarding_profiles`
--
ALTER TABLE `onboarding_profiles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `onboarding_days`
--
ALTER TABLE `onboarding_days`
  ADD CONSTRAINT `fk_days_user` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `onboarding_profiles`
--
ALTER TABLE `onboarding_profiles`
  ADD CONSTRAINT `fk_onb_user` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
