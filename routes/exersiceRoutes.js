const express = require('express');
const router = express.Router();

const { createExercise } = require('./../controllers/exersiceController')
router.post('/exercise', createExercise)


module.exports = router;