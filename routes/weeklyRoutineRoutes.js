const express = require('express');
const router = express.Router();

const {
  getWeeklyRoutineByUser,
  upsertWeeklyRoutine
} = require('../controllers/weeklyRoutineController');

router.get('/routines/user/:userId', getWeeklyRoutineByUser);
router.put('/routines/user/:userId', upsertWeeklyRoutine);


module.exports = router;
