const express = require('express');
const router = express.Router();

const { createExercise,searchExercises } = require('./../controllers/exersiceController')
router.post('/exercise', createExercise)
router.get('/exercise/search', searchExercises)


module.exports = router;