const { Exercise } = require('../models');

exports.createExercise = async (req, res) => {
  try {
    const { type_id, name, video_url } = req.body;

    // Validaciones básicas
    if (!type_id || !name || !video_url) {
      return res.status(400).json({
        message: 'Nombre, email y password son obligatorios',
      });
    }
   
    // Crear usuario
    const exercise = await Exercise.create({
      type_id,
      name,
      video_url, // idealmente ya hasheado (bcrypt)
    });

    // Respuesta sin campos sensibles
    return res.status(201).json({
      message: 'Ejercicio creado correctamente',
      user: {
        id: exercise.id,
        type_id: exercise.type_id,
        name: exercise.name,
        video_url:exercise.video_url
      },
    });

  } catch (error) {
    console.error('Error al crear Ejercicio:', error);
    res.status(500).json({
      message: 'Error en el servidor',
      error: error.message,
    });
  }
};
