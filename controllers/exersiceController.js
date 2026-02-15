const { Exercise,ExerciseType } = require('../models');
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
exports.getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.findAll({
      include: [{
        model: ExerciseType,
        as: 'type', // Asegúrate que en models/Exercise.js la relación diga as: 'type'
        attributes: ['name']
      }],
      attributes: ['id', 'name', 'video_url', 'description'],
      order: [
        [{ model: ExerciseType, as: 'type' }, 'id', 'ASC'],
        ['name', 'ASC']
      ]
    });

    // Formateamos para que el frontend reciba "category"
    const result = exercises.map(ex => ({
      id: ex.id,
      name: ex.name,
      category: ex.type ? ex.type.name : 'Otros',
      video_url: ex.video_url,
      description: ex.description
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ejercicios", error: error.message });
  }
};