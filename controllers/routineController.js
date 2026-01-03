// Import limpio y seguro con Sequelize
const models = require("../models");

const Routine = models.Routine;
const RoutineDay = models.RoutineDay;
const RoutineExercise = models.RoutineExercise;
const ExerciseLog = models.ExerciseLog;
const OnboardingProfile = models.OnboardingProfile;
const OnboardingDay = models.OnboardingDay;

/**
 * POST /routine/init
 * Crear rutina si no existe (1 rutina por usuario)
 */
exports.initRoutine = async (req, res) => {
  try {
    const userId = req.user.id;

    const existingRoutine = await Routine.findOne({
      where: { user_id: userId },
    });

    if (existingRoutine) {
      return res.json(existingRoutine);
    }

    const onboarding = await OnboardingProfile.findOne({
      where: { user_id: userId },
    });

    if (!onboarding) {
      return res.status(400).json({ message: "Onboarding incompleto" });
    }

    const days = await OnboardingDay.findAll({
      where: { user_id: userId },
    });

    const routine = await Routine.create({
      user_id: userId,
      title: "Mi rutina",
      goal: onboarding.goal,
    });

    for (const d of days) {
      await RoutineDay.create({
        routine_id: routine.id,
        day_code: d.day_code,
      });
    }

    return res.status(201).json(routine);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al inicializar rutina" });
  }
};

/**
 * GET /routine
 * Obtener la rutina del usuario
 */
exports.getRoutine = async (req, res) => {
  try {
    const routine = await Routine.findOne({
      where: { user_id: req.user.id },
      include: {
        model: RoutineDay,
        include: {
          model: RoutineExercise,
          order: [["position", "ASC"]],
        },
      },
    });

    if (!routine) {
      return res.status(404).json({ message: "Rutina no creada" });
    }

    // Transformar a formato UI
    const days = {};
    routine.RoutineDays.forEach((day) => {
      days[day.day_code] = day.RoutineExercises.sort(
        (a, b) => a.position - b.position
      );
    });

    return res.json({
      id: routine.id,
      title: routine.title,
      goal: routine.goal,
      days,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener rutina" });
  }
};

/**
 * POST /routine/days/:dayCode/exercises
 * Agregar ejercicio y crear primer log
 */
exports.addExercise = async (req, res) => {
  try {
    const { dayCode } = req.params;
    const { name, weight, sets, reps, rest, note } = req.body;

    const routine = await Routine.findOne({
      where: { user_id: req.user.id },
    });

    if (!routine) {
      return res.status(404).json({ message: "Rutina no encontrada" });
    }

    const routineDay = await RoutineDay.findOne({
      where: {
        routine_id: routine.id,
        day_code: dayCode,
      },
    });

    if (!routineDay) {
      return res.status(400).json({ message: "Día no válido" });
    }

    const position =
      (await RoutineExercise.count({
        where: { routine_day_id: routineDay.id },
      })) + 1;

    const exercise = await RoutineExercise.create({
      routine_day_id: routineDay.id,
      name,
      weight,
      sets,
      reps,
      rest,
      note,
      position,
    });

    // Crear primer log de progreso
    await ExerciseLog.create({
      routine_exercise_id: exercise.id,
      weight,
      sets,
      reps,
      note,
    });

    return res.status(201).json(exercise);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al agregar ejercicio" });
  }
};

/**
 * PUT /exercises/:id
 * Actualizar ejercicio + guardar progreso
 */
exports.updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, weight, sets, reps, rest, note } = req.body;

    const exercise = await RoutineExercise.findByPk(id, {
      include: {
        model: RoutineDay,
        include: {
          model: Routine,
          where: { user_id: req.user.id },
        },
      },
    });

    if (!exercise) {
      return res.status(404).json({ message: "Ejercicio no encontrado" });
    }

    await exercise.update({ name, weight, sets, reps, rest, note });

    // Guardar progreso en historial
    await ExerciseLog.create({
      routine_exercise_id: exercise.id,
      weight,
      sets,
      reps,
      note,
    });

    return res.json(exercise);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al actualizar ejercicio" });
  }
};

/**
 * DELETE /exercises/:id
 * Eliminar ejercicio
 */
exports.deleteExercise = async (req, res) => {
  try {
    const exercise = await RoutineExercise.findByPk(req.params.id, {
      include: {
        model: RoutineDay,
        include: {
          model: Routine,
          where: { user_id: req.user.id },
        },
      },
    });

    if (!exercise) {
      return res.status(404).json({ message: "Ejercicio no encontrado" });
    }

    await exercise.destroy();
    return res.json({ message: "Ejercicio eliminado" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar ejercicio" });
  }
};
