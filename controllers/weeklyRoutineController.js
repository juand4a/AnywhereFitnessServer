const {
  WeeklyRoutine,
  WeeklyRoutineDay,
  WeeklyRoutineExercise,
  OnboardingDay,
  Exercise,
  sequelize,
} = require('../models');

/* =====================================================
   CREATE / UPDATE WEEKLY ROUTINE
===================================================== */
exports.upsertWeeklyRoutine = async (req, res) => {
  const { userId } = req.params;
  const { title, days } = req.body;

  const transaction = await sequelize.transaction();

  try {
    /* ======================
       1️⃣ ONBOARDING DAYS
    ====================== */
    const onboardingDays = await OnboardingDay.findAll({
      where: { user_id: userId },
      attributes: ['day_code'],
      transaction,
    });

    if (!onboardingDays.length) {
      await transaction.rollback();
      return res.status(400).json({
        message: 'El usuario no tiene onboarding completado',
      });
    }

    const allowedDays = onboardingDays.map(d => d.day_code);

    /* ======================
       2️⃣ VALIDAR DÍAS
    ====================== */
    const sentDays = Object.keys(days || {});
    const invalidDays = sentDays.filter(d => !allowedDays.includes(d));

    if (invalidDays.length > 0) {
      await transaction.rollback();
      return res.status(400).json({
        message: 'Se enviaron días no permitidos según onboarding',
        invalidDays,
      });
    }

    /* ======================
       3️⃣ BUSCAR / CREAR RUTINA
    ====================== */
    let routine = await WeeklyRoutine.findOne({
      where: { user_id: userId },
      transaction,
    });

    const isNew = !routine;

    if (!routine) {
      routine = await WeeklyRoutine.create(
        {
          user_id: userId,
          title,
          week_index: 1,
        },
        { transaction }
      );
    } else {
      await routine.update({ title }, { transaction });

      // 🔥 BORRADO TOTAL (esto arregla el bug de eliminar ejercicios)
      await WeeklyRoutineDay.destroy({
        where: { weekly_routine_id: routine.id },
        transaction,
      });
    }

    /* ======================
       4️⃣ CREAR DÍAS Y EJERCICIOS
    ====================== */
    for (const dayCode of sentDays) {
      const exercises = Array.isArray(days[dayCode]) ? days[dayCode] : [];

      const routineDay = await WeeklyRoutineDay.create(
        {
          weekly_routine_id: routine.id,
          day_code: dayCode,
          is_rest_day: exercises.length === 0,
        },
        { transaction }
      );

      for (let i = 0; i < exercises.length; i++) {
        const ex = exercises[i];

        if (!ex.name || !ex.name.trim()) continue;

        /* 🔑 SIEMPRE resolver Exercise */
        const [exercise] = await Exercise.findOrCreate({
          where: { name: ex.name.trim() },
          defaults: {
            name: ex.name.trim(),
            video_url: ex.videoUrl || null,
          },
          transaction,
        });

        await WeeklyRoutineExercise.create(
          {
            routine_day_id: routineDay.id,
            exercise_id: exercise.id, // ✅ NUNCA NULL
            weight: ex.weight || null,
            sets: Number(ex.sets) || 0,
            reps: Number(ex.reps) || 0,
            rest_seconds: ex.rest ? Number(ex.rest) : null,
            note: ex.note || null,
            position: i + 1,
          },
          { transaction }
        );
      }
    }

    await transaction.commit();

    return res.status(isNew ? 201 : 200).json({
      message: isNew
        ? 'Rutina creada correctamente'
        : 'Rutina actualizada correctamente',
    });

  } catch (error) {
    await transaction.rollback();
    console.error('Error al guardar rutina:', error);

    return res.status(500).json({
      message: 'Error al guardar la rutina',
      error: error.message,
    });
  }
};

/* =====================================================
   GET WEEKLY ROUTINE BY USER (FORMATO FRONT)
===================================================== */
exports.getWeeklyRoutineByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const routine = await WeeklyRoutine.findOne({
      where: { user_id: userId },
      include: [
        {
          model: WeeklyRoutineDay,
          include: [
            {
              model: WeeklyRoutineExercise,
              include: [
                {
                  model: Exercise,
                  attributes: ['id', 'name', 'video_url'],
                },
              ],
              order: [['position', 'ASC']],
            },
          ],
        },
      ],
    });

    if (!routine) {
      return res.status(200).json({ routine: null });
    }

    /* 🔁 FORMATO EXACTO PARA TU FRONT */
    const days = {};

    routine.WeeklyRoutineDays.forEach(day => {
      days[day.day_code] = day.WeeklyRoutineExercises.map(ex => ({
        id: ex.id,
        name: ex.Exercise?.name ?? 'Ejercicio',
        weight: ex.weight ?? '',
        sets: ex.sets,
        reps: ex.reps,
        rest: ex.rest_seconds,
        note: ex.note,
        videoUrl: ex.Exercise?.video_url || null,
      }));
    });

    return res.status(200).json({
      id: routine.id,
      title: routine.title,
      days,
    });

  } catch (error) {
    console.error('Error al obtener rutina:', error);
    return res.status(500).json({
      message: 'Error al obtener la rutina',
      error: error.message,
    });
  }
};
