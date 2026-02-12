// controllers/onboardingController.js
const { Op } = require('sequelize');
const { Usuario } = require('../models');
const {OnboardingProfile} = require('../models');
const {OnboardingDay} = require('../models');

exports.save = async (req, res) => {
  const userId = Number(req.params.id);
  const { goal, experience, location, frequency_per_week, days = [], injuries, notes } = req.body;

  if (!userId) return res.status(400).json({ message: 'userId inválido' });
  if (!goal || !experience || !location || !frequency_per_week)
    return res.status(400).json({ message: 'Faltan campos obligatorios' });

  try {
    // upsert del perfil
    const [profile] = await OnboardingProfile.upsert({
      user_id: userId,
      goal,
      experience,
      location,
      frequency_per_week,
      injuries: injuries || null,
      notes: notes || null,
      updated_at: new Date(),
    });

    // reset de días
    await OnboardingDay.destroy({ where: { user_id: userId } });
    if (Array.isArray(days) && days.length) {
      const rows = days.map(d => ({ user_id: userId, day_code: d }));
      await OnboardingDay.bulkCreate(rows, { ignoreDuplicates: true });
    }

    // marcar usuario como onboarded
    await Usuario.update({ onboarded: true }, { where: { id: userId } });

    return res.json({ ok: true });
  } catch (error) {
    console.error('onboarding save error:', error);
    return res.status(500).json({ message: 'Error al guardar onboarding' });
  }
};

exports.get = async (req, res) => {
  const userId = Number(req.params.id);
  try {
    const profile = await OnboardingProfile.findOne({ where: { user_id: userId } });
    const days = await OnboardingDay.findAll({ where: { user_id: userId } });
    return res.json({
      profile,
      days: days.map(d => d.day_code),
    });
  } catch (error) {
    console.error('onboarding get error:', error);
    return res.status(500).json({ message: 'Error al obtener onboarding' });
  }
};
exports.getOnboardingDaysByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const days = await OnboardingDay.findAll({
      where: { user_id: userId },
      attributes: ['day_code'],
    });

    return res.status(200).json({
      days: days.map(d => d.day_code),
    });

  } catch (error) {
    console.error('Error al obtener onboarding days:', error);
    return res.status(500).json({
      message: 'Error al obtener días de entrenamiento',
    });
  }
};