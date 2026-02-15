const express = require('express');
const router = express.Router();

const {
  getRoutine,
  updateMetadata,
  upsertRoutine
} = require('../controllers/weeklyRoutineController');

router.get('/:userId', getRoutine);
router.post('/:userId', upsertRoutine);
router.patch('/:userId/metadata', updateMetadata);


module.exports = router;
