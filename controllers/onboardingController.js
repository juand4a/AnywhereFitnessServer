const { Op } = require('sequelize');
const {
  Usuario,
  OnboardingProfile,
  OnboardingDay,
  OnboardingNutrition,
  NutritionDay,
  NutritionEntry,
  Food
} = require('../models');

/* ======================================================
   HELPERS
====================================================== */

function calculateDailyCalories(user, activity, goal) {
  const age =
    new Date().getFullYear() -
    new Date(user.fecha_nacimiento).getFullYear();

  const bmr =
    10 * user.peso +
    6.25 * (user.altura * 100) -
    5 * age +
    5;

  let kcal =
    bmr *
    (activity === 'alta'
      ? 1.75
      : activity === 'media'
      ? 1.55
      : 1.2);

  if (goal === 'bajar_peso') kcal -= 400;
  if (goal === 'subir_masa') kcal += 400;

  return Math.round(kcal);
}

function calculateMacroTargets(dailyKcal, nutritionGoal) {
  let ratios;

  switch (nutritionGoal) {
    case 'bajar_peso':
      ratios = { protein: 0.35, carbs: 0.4, fat: 0.25 };
      break;
    case 'subir_masa':
      ratios = { protein: 0.3, carbs: 0.5, fat: 0.2 };
      break;
    default: // mantener
      ratios = { protein: 0.3, carbs: 0.45, fat: 0.25 };
  }

  const proteinTarget = Math.round((dailyKcal * ratios.protein) / 4);
  const carbsTarget = Math.round((dailyKcal * ratios.carbs) / 4);
  const fatTarget = Math.round((dailyKcal * ratios.fat) / 9);

  return {
    protein_target: proteinTarget,
    carbs_target: carbsTarget,
    fat_target: fatTarget,
  };
}

/* ======================================================
   ONBOARDING SAVE
====================================================== */

exports.save = async (req, res) => {
  const userId = Number(req.params.id);
  const {
    goal,
    experience,
    location,
    frequency_per_week,
    days = [],
    injuries,
    notes,

    // nutrición
    nutrition_goal,
    activity_level,
  } = req.body;

  if (!userId)
    return res.status(400).json({ message: 'userId inválido' });

  if (!goal || !experience || !location || !frequency_per_week)
    return res.status(400).json({ message: 'Faltan campos obligatorios' });

  try {
    const user = await Usuario.findByPk(userId);
    if (!user)
      return res.status(404).json({ message: 'Usuario no encontrado' });

    /* ======================================================
       PERFIL ENTRENAMIENTO
    ====================================================== */
    await OnboardingProfile.upsert({
      user_id: userId,
      goal,
      experience,
      location,
      frequency_per_week,
      injuries: injuries || null,
      notes: notes || null,
      updated_at: new Date(),
    });

    /* ======================================================
       DÍAS ENTRENAMIENTO
    ====================================================== */
    await OnboardingDay.destroy({ where: { user_id: userId } });

    if (Array.isArray(days) && days.length) {
      await OnboardingDay.bulkCreate(
        days.map((d) => ({
          user_id: userId,
          day_code: d,
        })),
        { ignoreDuplicates: true }
      );
    }

    /* ======================================================
       PERFIL NUTRICIONAL
    ====================================================== */
    let dailyKcal = null;
    let macroTargets = null;

    if (nutrition_goal && activity_level) {
      // calorías
      dailyKcal = calculateDailyCalories(
        user,
        activity_level,
        nutrition_goal
      );

      // macros
      macroTargets = calculateMacroTargets(
        dailyKcal,
        nutrition_goal
      );

      await OnboardingNutrition.upsert({
        user_id: userId,
        nutrition_goal,
        activity_level,
        daily_kcal: dailyKcal,
        protein_target: macroTargets.protein_target,
        carbs_target: macroTargets.carbs_target,
        fat_target: macroTargets.fat_target,
      });
    }

    /* ======================================================
       USUARIO ONBOARDED
    ====================================================== */
    await Usuario.update(
      { onboarded: true },
      { where: { id: userId } }
    );

    return res.json({
      ok: true,
      daily_kcal: dailyKcal,
      macros: macroTargets,
    });
  } catch (error) {
    console.error('onboarding save error:', error);
    return res.status(500).json({
      message: 'Error al guardar onboarding',
    });
  }
};

/* ======================================================
   ONBOARDING GET
====================================================== */

exports.get = async (req, res) => {
  const userId = Number(req.params.id);

  try {
    const profile = await OnboardingProfile.findOne({
      where: { user_id: userId },
    });

    const nutrition = await OnboardingNutrition.findOne({
      where: { user_id: userId },
    });

    const days = await OnboardingDay.findAll({
      where: { user_id: userId },
      attributes: ['day_code'],
    });

    return res.json({
      profile,
      nutrition,
      days: days.map((d) => d.day_code),
    });
  } catch (error) {
    console.error('onboarding get error:', error);
    return res.status(500).json({
      message: 'Error al obtener onboarding',
    });
  }
};

/* ======================================================
   SOLO DÍAS DE ENTRENAMIENTO
====================================================== */

exports.getOnboardingDaysByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const days = await OnboardingDay.findAll({
      where: { user_id: userId },
      attributes: ['day_code'],
    });

    return res.status(200).json({
      days: days.map((d) => d.day_code),
    });
  } catch (error) {
    console.error('Error al obtener onboarding days:', error);
    return res.status(500).json({
      message: 'Error al obtener días de entrenamiento',
    });
  }
};

/* ======================================================
   NUTRICIÓN – REGISTRAR ALIMENTO
====================================================== */

exports.addNutritionEntry = async (req, res) => {
  const { userId, date, name, grams, kcal, protein, carbs, fat, time } = req.body;

  try {
    // 1. Buscar o Crear el registro del día
    let [day] = await NutritionDay.findOrCreate({
      where: { user_id: userId, date }
    });

    // 2. Crear la entrada individual
    await NutritionEntry.create({
      nutrition_day_id: day.id,
      name,
      grams,
      kcal,
      protein,
      carbs,
      fat,
      time: time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'manual'
    });

    // 3. Recalcular los totales del día automáticamente
    const totals = await NutritionEntry.findAll({
      where: { nutrition_day_id: day.id },
      attributes: [
        [NutritionEntry.sequelize.fn('SUM', NutritionEntry.sequelize.col('kcal')), 'total_kcal'],
        [NutritionEntry.sequelize.fn('SUM', NutritionEntry.sequelize.col('protein')), 'total_protein'],
        [NutritionEntry.sequelize.fn('SUM', NutritionEntry.sequelize.col('carbs')), 'total_carbs'],
        [NutritionEntry.sequelize.fn('SUM', NutritionEntry.sequelize.col('fat')), 'total_fat'],
      ],
      raw: true
    });

    // 4. Actualizar el resumen del día
    await NutritionDay.update({
      total_kcal: totals[0].total_kcal || 0,
      total_protein: totals[0].total_protein || 0,
      total_carbs: totals[0].total_carbs || 0,
      total_fat: totals[0].total_fat || 0,
    }, { where: { id: day.id } });

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al guardar el alimento' });
  }
};

/* ======================================================
   NUTRICIÓN – OBTENER DÍA
====================================================== */

exports.getNutritionDay = async (req, res) => {
  // Sacamos el userId de los parámetros de la URL, no de la query
  const userId = Number(req.params.userId); 
  const { date } = req.query; // La fecha sí viene por query (?date=YYYY-MM-DD)

  if (!userId || !date) {
    return res.status(400).json({ message: 'Faltan parámetros: userId o date' });
  }

  try {
    const day = await NutritionDay.findOne({
      where: { user_id: userId, date },
      include: [
        {
          model: NutritionEntry,
          as: 'entries',
        },
      ],
    });

    // Si no existe el día, devolvemos un objeto vacío con la estructura esperada
    if (!day) {
      return res.json({
        total_kcal: 0,
        total_protein: 0,
        total_carbs: 0,
        total_fat: 0,
        entries: []
      });
    }

    return res.json(day);
  } catch (error) {
    console.error('nutrition day error:', error);
    return res.status(500).json({ message: 'Error al obtener día nutricional' });
  }
};

exports.getNutritionHistory = async (req, res) => {
  // CORRECCIÓN: Usamos userId porque así lo definiste en el router
  const userId = Number(req.params.userId || req.params.id); 
  const { range = 'week' } = req.query; // Por defecto semana para la gráfica

  if (!userId) {
    return res.status(400).json({ message: 'userId inválido' });
  }

  try {
    const today = new Date();
    let startDate = new Date();

    /* ======================
       RANGO FECHAS CORREGIDO
    ====================== */
    if (range === 'week') {
      startDate.setDate(today.getDate() - 6);
    } else if (range === 'month') {
      startDate.setDate(today.getDate() - 29);
    } else if (range === 'day') {
      // Si es solo hoy, startDate es igual a today
      startDate = today;
    } else {
      return res.status(400).json({ message: 'range inválido' });
    }

    // Formatear fechas a YYYY-MM-DD para evitar problemas de zona horaria
    const formatDate = (date) => date.toISOString().split('T')[0];

    /* ======================
       QUERY SQL
    ====================== */
    const days = await NutritionDay.findAll({
      where: {
        user_id: userId,
        date: {
          [Op.between]: [formatDate(startDate), formatDate(today)],
        },
      },
      order: [['date', 'ASC']],
      raw: true,
    });

    /* ======================
       FORMATO PARA LA GRÁFICA
    ====================== */
    const result = days.map((d) => {
      // Ajuste para evitar que la fecha se mueva un día atrás por el GMT
      const [year, month, day] = d.date.split('-');
      const dateObj = new Date(year, month - 1, day);

      let label;
      if (range === 'week') {
        // Lun, Mar, Mié...
        label = dateObj.toLocaleDateString('es-ES', { weekday: 'short' }).replace('.', '');
      } else if (range === 'month') {
        // 01, 05, 12...
        label = dateObj.getDate().toString();
      } else {
        label = dateObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
      }

      return {
        label: label.charAt(0).toUpperCase() + label.slice(1), // Capitalizar (Ej: "Mar")
        date: d.date,
        kcal: Math.round(Number(d.total_kcal || 0)), // Redondear para la gráfica
        protein: Number(Number(d.total_protein || 0).toFixed(1)),
        carbs: Number(Number(d.total_carbs || 0).toFixed(1)),
        fat: Number(Number(d.total_fat || 0).toFixed(1)),
      };
    });

    return res.json(result);
  } catch (error) {
    console.error('nutrition history error:', error);
    return res.status(500).json({
      message: 'Error al obtener historial nutricional',
    });
  }
};
exports.getDailyCalories = async (req, res) => {
  const userId = Number(req.params.userId);

  if (!userId || Number.isNaN(userId)) {
    return res.status(400).json({
      message: 'userId inválido',
    });
  }

  try {
    const nutrition = await OnboardingNutrition.findOne({
      where: { user_id: userId },
      attributes: [
        'daily_kcal',
        'protein_target',
        'carbs_target',
        'fat_target',
      ],
    });

    if (!nutrition) {
      return res.json({
        daily_kcal: null,
        protein_target: null,
        carbs_target: null,
        fat_target: null,
      });
    }

    return res.json({
      daily_kcal: nutrition.daily_kcal,
      protein_target: nutrition.protein_target,
      carbs_target: nutrition.carbs_target,
      fat_target: nutrition.fat_target,
    });
  } catch (error) {
    console.error('get daily kcal error:', error);
    return res.status(500).json({
      message: 'Error al obtener calorías diarias',
    });
  }
};
exports.searchFood = async (req, res) => {
  const { query } = req.query;
  try {
    const foods = await Food.findAll({
      where: { name: { [Op.like]: `%${query}%` } },
      limit: 10
    });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Error en la búsqueda' });
  }
};  