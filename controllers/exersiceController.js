const { Exercise } = require('../models');
const { Op } = require('sequelize');

exports.createExercise = async (req, res) => {
  const { name, video_url } = req.body;

  if (!name.trim()) {
    return res.status(400).json({ message: 'Nombre requerido' });
  }

  try {
    const [exercise, created] = await Exercise.findOrCreate({
      where: { name: name.trim() },
      defaults: { video_url },
    });

    return res.status(created ? 201 : 200).json(exercise);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear ejercicio' });
  }
};
exports.searchExercises = async (req, res) => {
  const { q } = req.query;

  if (!q || !q.trim()) {
    return res.json({ exercises: [] });
  }

  const exercises = await Exercise.findAll({
    where: {
      name: {
        [Op.like]: `%${q}%`,
      },
    },
    attributes: ['id', 'name'],
    limit: 10,
  });

  res.json({ exercises });
};