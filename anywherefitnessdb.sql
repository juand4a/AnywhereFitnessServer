-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-02-2026 a las 17:23:27
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
-- Estructura de tabla para la tabla `exercises`
--

CREATE TABLE `exercises` (
  `id` int(11) NOT NULL,
  `type_id` int(10) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `video_url` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `exercises`
--

INSERT INTO `exercises` (`id`, `type_id`, `name`, `video_url`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Press de Banca', 'https://video.link/press-banca', 'Ejercicio básico para pectoral mayor.', '2026-02-12 19:49:45', '2026-02-12 19:49:45'),
(2, 1, 'Aperturas con Mancuernas', 'https://video.link/aperturas', 'Aislamiento para la parte media del pecho.', '2026-02-12 19:49:45', '2026-02-12 19:49:45'),
(3, 1, 'Flexiones (Push ups)', NULL, 'Ejercicio de peso corporal para pecho y tríceps.', '2026-02-12 19:49:45', '2026-02-12 19:49:45'),
(4, 2, 'Remo con Barra', 'https://video.link/remo-barra', 'Construye grosor en la espalda media.', '2026-02-12 19:49:45', '2026-02-12 19:49:45'),
(5, 2, 'Dominadas', NULL, 'Ejercicio fundamental de tracción.', '2026-02-12 19:49:45', '2026-02-12 19:49:45'),
(6, 2, 'Jalón al Pecho', 'https://video.link/jalon', 'Alternativa a las dominadas en polea.', '2026-02-12 19:49:45', '2026-02-12 19:49:45'),
(7, 3, 'Sentadilla Libre', 'https://video.link/squat', 'El rey de los ejercicios de pierna.', '2026-02-12 19:49:45', '2026-02-12 19:49:45'),
(8, 3, 'Prensa de Piernas', NULL, 'Trabajo pesado de cuádriceps sin carga en espalda.', '2026-02-12 19:49:45', '2026-02-12 19:49:45'),
(9, 3, 'Peso Muerto Rumano', 'https://video.link/rdl', 'Enfoque principal en femorales y glúteos.', '2026-02-12 19:49:45', '2026-02-12 19:49:45'),
(10, 4, 'Press Militar', 'https://video.link/press-militar', 'Fuerza de empuje vertical para deltoides.', '2026-02-12 19:49:45', '2026-02-12 19:49:45'),
(11, 4, 'Vuelos Laterales', NULL, 'Aislamiento de la cabeza lateral del hombro.', '2026-02-12 19:49:45', '2026-02-12 19:49:45'),
(12, 5, 'Curl con Barra Z', 'https://video.link/curl-z', 'Clásico constructor de bíceps.', '2026-02-12 19:49:45', '2026-02-12 19:49:45'),
(13, 5, 'Curl Martillo', NULL, 'Enfoque en braquial y antebrazo.', '2026-02-12 19:49:45', '2026-02-12 19:49:45'),
(14, 6, 'Press Francés', 'https://video.link/french-press', 'Extensión de codo para masa de tríceps.', '2026-02-12 19:49:45', '2026-02-12 19:49:45'),
(15, 6, 'Extensiones en Polea', NULL, 'Aislamiento con tensión constante.', '2026-02-12 19:49:45', '2026-02-12 19:49:45'),
(16, 7, 'Burpees', NULL, 'Ejercicio metabólico de alta intensidad.', '2026-02-12 19:49:45', '2026-02-12 19:49:45'),
(17, 7, 'Salto de Cuerda', NULL, 'Coordinación y resistencia cardiovascular.', '2026-02-12 19:49:45', '2026-02-12 19:49:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exercise_types`
--

CREATE TABLE `exercise_types` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(60) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `exercise_types`
--

INSERT INTO `exercise_types` (`id`, `name`, `created_at`) VALUES
(1, 'Pecho', '2026-01-11 22:21:16'),
(2, 'Espalda', '2026-01-11 22:21:16'),
(3, 'Pierna', '2026-01-11 22:21:16'),
(4, 'Hombro', '2026-01-11 22:21:16'),
(5, 'Bíceps', '2026-01-11 22:21:16'),
(6, 'Tríceps', '2026-01-11 22:21:16'),
(7, 'Cardio', '2026-01-11 22:21:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `onboarding_days`
--

CREATE TABLE `onboarding_days` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `day_code` enum('lun','mar','mie','jue','vie','sab','dom') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `onboarding_days`
--

INSERT INTO `onboarding_days` (`id`, `user_id`, `day_code`) VALUES
(6, 2, 'lun'),
(7, 2, 'mar'),
(8, 2, 'mie'),
(9, 2, 'jue'),
(10, 2, 'vie');

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

--
-- Volcado de datos para la tabla `onboarding_profiles`
--

INSERT INTO `onboarding_profiles` (`id`, `user_id`, `goal`, `experience`, `location`, `frequency_per_week`, `injuries`, `notes`, `created_at`, `updated_at`) VALUES
(1, 2, 'masa_muscular', 'avanzado', 'gimnasio', 5, 'Dick pain', NULL, '2026-01-11 21:27:24', '2026-02-12 17:18:33');

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
  `tipo_plan` enum('gratuito','premium','pro','personalizado') DEFAULT 'gratuito',
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
(2, 'Juan David Lopez', 'juandavidlopezp2004@gmail.com', '3054576150', '$2b$10$sBawAaQPGS3W9GK8vFj/2.Te/.Bq3egTKBp1TrlBRli6J7JFYc8rG', 'usuario', 'gratuito', 75.50, 1.73, '2004-12-06', '2025-10-16 02:54:17', 1),
(5, 'Sebastián Alvarez ', 'sebas@gmail.com', '305214544', '$2b$10$nInjGiQ5fQdiYYFWu8E7LOBis/t096DapDfHvHuA3JqmHA5.qLHgy', 'admin', 'premium', 100.00, 180.00, '2000-01-01', '2025-11-04 01:18:47', 0),
(6, 'Brayan patiño', 'dahianateamo@gmail.com', '3207167602', '$2b$10$jag0SUetGF0P7xAMdsazpe7szLkObfcfZfUNboebP4i1byKjt9lrK', 'admin', 'premium', 50.00, 180.00, '2000-01-01', '2025-11-05 02:17:04', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `weeklyroutinedays`
--

CREATE TABLE `weeklyroutinedays` (
  `id` int(11) NOT NULL,
  `weekly_routine_id` int(11) NOT NULL,
  `day_code` varchar(20) NOT NULL,
  `is_rest_day` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `weeklyroutinedays`
--

INSERT INTO `weeklyroutinedays` (`id`, `weekly_routine_id`, `day_code`, `is_rest_day`, `createdAt`, `updatedAt`) VALUES
(5, 5, 'Lun', 0, '2026-02-12 19:31:30', '2026-02-12 19:31:30'),
(6, 5, 'Mar', 0, '2026-02-12 19:31:30', '2026-02-12 19:31:30'),
(7, 5, 'Mié', 0, '2026-02-12 19:31:30', '2026-02-12 19:31:30'),
(8, 6, 'Lun', 0, '2026-02-12 20:32:47', '2026-02-12 20:32:47'),
(9, 6, 'Mar', 0, '2026-02-12 20:32:47', '2026-02-12 20:32:47');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `weeklyroutineexercises`
--

CREATE TABLE `weeklyroutineexercises` (
  `id` int(11) NOT NULL,
  `routine_day_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  `weight` varchar(50) DEFAULT NULL,
  `sets` int(11) DEFAULT 0,
  `reps` varchar(50) DEFAULT NULL,
  `rest_seconds` int(11) DEFAULT 60,
  `note` text DEFAULT NULL,
  `position` int(11) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `weeklyroutineexercises`
--

INSERT INTO `weeklyroutineexercises` (`id`, `routine_day_id`, `exercise_id`, `weight`, `sets`, `reps`, `rest_seconds`, `note`, `position`, `createdAt`, `updatedAt`) VALUES
(1, 5, 1, '0', 3, '12', 60, '', 1, '2026-02-12 19:31:30', '2026-02-12 19:31:30'),
(2, 5, 2, '0', 3, '12', 60, '', 2, '2026-02-12 19:31:30', '2026-02-12 19:31:30'),
(3, 5, 3, '0', 3, '12', 60, '', 3, '2026-02-12 19:31:30', '2026-02-12 19:31:30'),
(4, 5, 4, '0', 3, '12', 60, '', 4, '2026-02-12 19:31:30', '2026-02-12 19:31:30'),
(5, 5, 5, '0', 3, '12', 60, '', 5, '2026-02-12 19:31:30', '2026-02-12 19:31:30'),
(6, 5, 6, '0', 3, '12', 60, '', 6, '2026-02-12 19:31:30', '2026-02-12 19:31:30'),
(7, 6, 7, '0', 3, '12', 60, '', 1, '2026-02-12 19:31:30', '2026-02-12 19:31:30'),
(8, 6, 8, '0', 3, '12', 60, '', 2, '2026-02-12 19:31:30', '2026-02-12 19:31:30'),
(9, 6, 9, '0', 3, '12', 60, '', 3, '2026-02-12 19:31:30', '2026-02-12 19:31:30'),
(10, 6, 10, '0', 3, '12', 60, '', 4, '2026-02-12 19:31:30', '2026-02-12 19:31:30'),
(11, 6, 11, '0', 3, '12', 60, '', 5, '2026-02-12 19:31:30', '2026-02-12 19:31:30'),
(12, 6, 12, '0', 3, '12', 60, '', 6, '2026-02-12 19:31:30', '2026-02-12 19:31:30'),
(13, 7, 13, '0', 3, '12', 60, '', 1, '2026-02-12 19:31:30', '2026-02-12 19:31:30'),
(14, 7, 14, '0', 3, '12', 60, '', 2, '2026-02-12 19:31:30', '2026-02-12 19:31:30'),
(15, 7, 15, '0', 3, '12', 60, '', 3, '2026-02-12 19:31:30', '2026-02-12 19:31:30'),
(16, 7, 16, '0', 3, '12', 60, '', 4, '2026-02-12 19:31:30', '2026-02-12 19:31:30'),
(17, 7, 17, '0', 3, '12', 60, '', 5, '2026-02-12 19:31:30', '2026-02-12 19:31:30'),
(18, 8, 2, '0', 3, '12', 60, '', 1, '2026-02-12 20:32:47', '2026-02-12 20:32:47'),
(19, 8, 3, '0', 3, '12', 60, '', 2, '2026-02-12 20:32:47', '2026-02-12 20:32:47'),
(20, 8, 5, '0', 3, '12', 60, '', 3, '2026-02-12 20:32:47', '2026-02-12 20:32:47'),
(21, 8, 6, '0', 3, '12', 60, '', 4, '2026-02-12 20:32:47', '2026-02-12 20:32:47'),
(22, 9, 9, '0', 3, '12', 60, '', 1, '2026-02-12 20:32:47', '2026-02-12 20:32:47'),
(23, 9, 8, '0', 3, '12', 60, '', 2, '2026-02-12 20:32:47', '2026-02-12 20:32:47'),
(24, 9, 7, '0', 3, '12', 60, '', 3, '2026-02-12 20:32:47', '2026-02-12 20:32:47');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `weeklyroutines`
--

CREATE TABLE `weeklyroutines` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT 'Mi Rutina',
  `week_index` int(11) DEFAULT 1,
  `source_type` enum('free_manual','pro_template','premium_ai','coach_custom') NOT NULL DEFAULT 'free_manual',
  `is_template` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `weeklyroutines`
--

INSERT INTO `weeklyroutines` (`id`, `user_id`, `title`, `week_index`, `source_type`, `is_template`, `createdAt`, `updatedAt`) VALUES
(5, NULL, 'Mi Rutina', 1, 'free_manual', 0, '2026-02-12 19:31:30', '2026-02-12 19:31:30'),
(6, 1, 'Mi Rutina: HIPERTROFIA', 1, 'free_manual', 0, '2026-02-12 20:32:47', '2026-02-12 20:32:47');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `exercises`
--
ALTER TABLE `exercises`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `exercise_types`
--
ALTER TABLE `exercise_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_exercise_types_name` (`name`);

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
-- Indices de la tabla `weeklyroutinedays`
--
ALTER TABLE `weeklyroutinedays`
  ADD PRIMARY KEY (`id`),
  ADD KEY `weekly_routine_id` (`weekly_routine_id`);

--
-- Indices de la tabla `weeklyroutineexercises`
--
ALTER TABLE `weeklyroutineexercises`
  ADD PRIMARY KEY (`id`),
  ADD KEY `routine_day_id` (`routine_day_id`),
  ADD KEY `exercise_id` (`exercise_id`);

--
-- Indices de la tabla `weeklyroutines`
--
ALTER TABLE `weeklyroutines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `exercises`
--
ALTER TABLE `exercises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `exercise_types`
--
ALTER TABLE `exercise_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `onboarding_days`
--
ALTER TABLE `onboarding_days`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `onboarding_profiles`
--
ALTER TABLE `onboarding_profiles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `weeklyroutinedays`
--
ALTER TABLE `weeklyroutinedays`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `weeklyroutineexercises`
--
ALTER TABLE `weeklyroutineexercises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `weeklyroutines`
--
ALTER TABLE `weeklyroutines`
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

--
-- Filtros para la tabla `weeklyroutinedays`
--
ALTER TABLE `weeklyroutinedays`
  ADD CONSTRAINT `fk_routine_day` FOREIGN KEY (`weekly_routine_id`) REFERENCES `weeklyroutines` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `weeklyroutineexercises`
--
ALTER TABLE `weeklyroutineexercises`
  ADD CONSTRAINT `fk_base_exercise` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_day_exercise` FOREIGN KEY (`routine_day_id`) REFERENCES `weeklyroutinedays` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
