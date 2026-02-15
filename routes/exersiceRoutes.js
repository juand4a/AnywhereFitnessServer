const express = require('express');
const router = express.Router();

const { createExercise,getAllExercises } = require('./../controllers/exersiceController')
router.post('/exercise', createExercise)
router.get('/exercise/search', getAllExercises)


module.exports = router;