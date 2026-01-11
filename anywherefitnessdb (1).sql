-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-01-2026 a las 00:26:14
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

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
  `id` int(10) UNSIGNED NOT NULL,
  `type_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(120) NOT NULL,
  `video_url` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `exercises`
--

INSERT INTO `exercises` (`id`, `type_id`, `name`, `video_url`, `created_at`, `updated_at`) VALUES
(1, 1, 'Press banca', 'https://youtu.be/iv_-e7nSMTg', '2026-01-11 22:24:27', '2026-01-11 22:24:27'),
(2, 1, 'Fondos', 'https://youtu.be/iv_-e7nSMTg', '2026-01-11 22:24:27', '2026-01-11 22:24:27'),
(3, 3, 'Sentadilla', 'https://tusitio.com/videos/sentadilla.mp4', '2026-01-11 22:45:45', '2026-01-11 22:45:45'),
(4, 2, 'Dominadas', 'https://tusitio.com/videos/dominadas.mp4', '2026-01-11 22:45:45', '2026-01-11 22:45:45');

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
(1, 2, 'lun'),
(2, 2, 'mar'),
(3, 2, 'mie'),
(4, 2, 'jue'),
(5, 2, 'vie');

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
(1, 2, 'masa_muscular', 'intermedio', 'gimnasio', 5, 'small dick', NULL, '2026-01-11 21:27:24', '2026-01-11 21:27:24');

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
(2, 'Juan David Lopez', 'juandavidlopezp2004@gmail.com', '3054576150', '$2b$10$sBawAaQPGS3W9GK8vFj/2.Te/.Bq3egTKBp1TrlBRli6J7JFYc8rG', 'admin', 'premium', 75.50, 1.73, '2004-12-06', '2025-10-16 02:54:17', 1),
(5, 'Sebastián Alvarez ', 'sebas@gmail.com', '305214544', '$2b$10$nInjGiQ5fQdiYYFWu8E7LOBis/t096DapDfHvHuA3JqmHA5.qLHgy', 'admin', 'premium', 100.00, 180.00, '2000-01-01', '2025-11-04 01:18:47', 0),
(6, 'Brayan patiño', 'dahianateamo@gmail.com', '3207167602', '$2b$10$jag0SUetGF0P7xAMdsazpe7szLkObfcfZfUNboebP4i1byKjt9lrK', 'admin', 'premium', 50.00, 180.00, '2000-01-01', '2025-11-05 02:17:04', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `weekly_routines`
--

CREATE TABLE `weekly_routines` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `week_index` tinyint(3) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `weekly_routines`
--

INSERT INTO `weekly_routines` (`id`, `user_id`, `title`, `week_index`, `created_at`, `updated_at`) VALUES
(1, 2, 'Semana 1', 1, '2026-01-11 22:46:11', '2026-01-11 22:46:11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `weekly_routine_days`
--

CREATE TABLE `weekly_routine_days` (
  `id` int(10) UNSIGNED NOT NULL,
  `weekly_routine_id` int(10) UNSIGNED NOT NULL,
  `day_code` enum('lun','mar','mie','jue','vie','sab','dom') NOT NULL,
  `is_rest_day` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `weekly_routine_days`
--

INSERT INTO `weekly_routine_days` (`id`, `weekly_routine_id`, `day_code`, `is_rest_day`) VALUES
(1, 1, 'lun', 0),
(2, 1, 'mar', 0),
(3, 1, 'mie', 0),
(4, 1, 'jue', 0),
(5, 1, 'vie', 0),
(6, 1, 'sab', 1),
(7, 1, 'dom', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `weekly_routine_exercises`
--

CREATE TABLE `weekly_routine_exercises` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `routine_day_id` int(10) UNSIGNED NOT NULL,
  `exercise_id` int(10) UNSIGNED NOT NULL,
  `weight` varchar(40) DEFAULT NULL,
  `sets` tinyint(3) UNSIGNED NOT NULL,
  `reps` tinyint(3) UNSIGNED NOT NULL,
  `rest_seconds` smallint(5) UNSIGNED DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `position` smallint(5) UNSIGNED NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `weekly_routine_exercises`
--

INSERT INTO `weekly_routine_exercises` (`id`, `routine_day_id`, `exercise_id`, `weight`, `sets`, `reps`, `rest_seconds`, `note`, `position`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '20kg', 4, 8, 90, NULL, 1, '2026-01-11 22:46:11', '2026-01-11 22:46:11'),
(2, 1, 2, NULL, 3, 12, 60, NULL, 2, '2026-01-11 22:46:11', '2026-01-11 22:46:11'),
(4, 3, 3, '40kg', 4, 8, 120, 'profunda', 1, '2026-01-11 22:46:11', '2026-01-11 22:46:11'),
(5, 5, 4, NULL, 4, 6, 120, NULL, 1, '2026-01-11 22:46:11', '2026-01-11 22:46:11');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `exercises`
--
ALTER TABLE `exercises`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_exercises_name` (`name`),
  ADD KEY `idx_exercises_type` (`type_id`);

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
-- Indices de la tabla `weekly_routines`
--
ALTER TABLE `weekly_routines`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_user_week` (`user_id`,`week_index`),
  ADD KEY `idx_wr_user` (`user_id`);

--
-- Indices de la tabla `weekly_routine_days`
--
ALTER TABLE `weekly_routine_days`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_routine_day` (`weekly_routine_id`,`day_code`),
  ADD KEY `idx_wrd_routine` (`weekly_routine_id`);

--
-- Indices de la tabla `weekly_routine_exercises`
--
ALTER TABLE `weekly_routine_exercises`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_wre_day` (`routine_day_id`),
  ADD KEY `idx_wre_day_pos` (`routine_day_id`,`position`),
  ADD KEY `idx_wre_exercise` (`exercise_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `exercises`
--
ALTER TABLE `exercises`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `exercise_types`
--
ALTER TABLE `exercise_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `onboarding_days`
--
ALTER TABLE `onboarding_days`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `onboarding_profiles`
--
ALTER TABLE `onboarding_profiles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `weekly_routines`
--
ALTER TABLE `weekly_routines`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `weekly_routine_days`
--
ALTER TABLE `weekly_routine_days`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `weekly_routine_exercises`
--
ALTER TABLE `weekly_routine_exercises`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `exercises`
--
ALTER TABLE `exercises`
  ADD CONSTRAINT `fk_exercises_type` FOREIGN KEY (`type_id`) REFERENCES `exercise_types` (`id`) ON UPDATE CASCADE;

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
-- Filtros para la tabla `weekly_routines`
--
ALTER TABLE `weekly_routines`
  ADD CONSTRAINT `fk_wr_user` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `weekly_routine_days`
--
ALTER TABLE `weekly_routine_days`
  ADD CONSTRAINT `fk_wrd_routine` FOREIGN KEY (`weekly_routine_id`) REFERENCES `weekly_routines` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `weekly_routine_exercises`
--
ALTER TABLE `weekly_routine_exercises`
  ADD CONSTRAINT `fk_wre_day` FOREIGN KEY (`routine_day_id`) REFERENCES `weekly_routine_days` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_wre_exercise` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
