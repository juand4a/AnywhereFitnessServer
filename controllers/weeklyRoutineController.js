const { 
  WeeklyRoutine, 
  WeeklyRoutineDay, 
  WeeklyRoutineExercise, 
  Exercise, 
  sequelize 
} = require('../models');

/* GET: Obtener rutina formateada para el Front-end */
exports.getRoutine = async (req, res) => {
  const { userId } = req.params;
  try {
    const routine = await WeeklyRoutine.findOne({
      where: { user_id: userId },
      include: [{
        model: WeeklyRoutineDay,
        include: [{
          model: WeeklyRoutineExercise,
          include: [{ model: Exercise, attributes: ['name', 'video_url'] }]
        }]
      }],
      order: [
        [WeeklyRoutineDay, 'id', 'ASC'], // O por day_code si prefieres
        [WeeklyRoutineDay, WeeklyRoutineExercise, 'position', 'ASC']
      ]
    });

    if (!routine) return res.status(200).json({ routine: null });

    const days = {};
    routine.WeeklyRoutineDays.forEach(day => {
      days[day.day_code] = day.WeeklyRoutineExercises.map(ex => ({
        id: ex.id,
        name: ex.Exercise?.name || 'Ejercicio',
        weight: ex.weight || '',
        sets: ex.sets,
        reps: ex.reps,
        rest: ex.rest_seconds,
        note: ex.note,
        videoUrl: ex.Exercise?.video_url,
        position: ex.position
      }));
    });

    res.status(200).json({ id: routine.id, title: routine.title, sourceType: routine.source_type, days });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener rutina', error: error.message });
  }
};

/* UPSERT: Crear o Reemplazar rutina completa */
exports.upsertRoutine = async (req, res) => {
  const { userId } = req.params;
  const { title, days, sourceType } = req.body; 
  const transaction = await sequelize.transaction();

  try {
    // 1. Manejar la cabecera de la rutina
    let [routine, created] = await WeeklyRoutine.findOrCreate({
      where: { user_id: userId },
      defaults: { title: title || 'Mi Rutina', source_type: sourceType },
      transaction
    });

    if (!created) {
      await routine.update({ title, source_type: sourceType }, { transaction });
      // LIMPIEZA: Borramos los días existentes para reescribir la nueva estructura
      await WeeklyRoutineDay.destroy({ where: { weekly_routine_id: routine.id }, transaction });
    }

    // 2. Insertar Días y sus Ejercicios
    for (const dayCode of Object.keys(days)) {
      const exercisesInput = days[dayCode];

      const routineDay = await WeeklyRoutineDay.create({
        weekly_routine_id: routine.id,
        day_code: dayCode,
        is_rest_day: !exercisesInput || exercisesInput.length === 0
      }, { transaction });

      if (exercisesInput && exercisesInput.length > 0) {
        const exercisesToBulk = [];

        for (let i = 0; i < exercisesInput.length; i++) {
          const ex = exercisesInput[i];
          
          // Asegurar existencia del ejercicio en catálogo
          const [exerciseBase] = await Exercise.findOrCreate({
            where: { name: ex.name.trim() },
            defaults: { name: ex.name.trim() },
            transaction
          });

          exercisesToBulk.push({
            routine_day_id: routineDay.id,
            exercise_id: exerciseBase.id,
            weight: String(ex.weight || ''),
            sets: parseInt(ex.sets) || 0,
            reps: String(ex.reps || '0'),
            rest_seconds: parseInt(ex.rest) || 60,
            note: ex.note || '',
            position: i + 1
          });
        }
        await WeeklyRoutineExercise.bulkCreate(exercisesToBulk, { transaction });
      }
    }

    await transaction.commit();
    res.status(200).json({ message: 'Rutina actualizada correctamente', routineId: routine.id });
  } catch (error) {
    if (transaction) await transaction.rollback();
    res.status(500).json({ message: 'Error al guardar rutina', error: error.message });
  }
};

/* PATCH: Actualizar solo metadatos (por ejemplo, el título) */
exports.updateMetadata = async (req, res) => {
  try {
    const { userId } = req.params;
    const { title } = req.body;
    await WeeklyRoutine.update({ title }, { where: { user_id: userId } });
    res.status(200).json({ message: 'Título actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};