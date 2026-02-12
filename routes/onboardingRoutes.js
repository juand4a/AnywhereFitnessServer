// routes/onboardingRoutes.js
const express = require('express');
const router = express.Router();
const { save, get,getOnboardingDaysByUser } = require('../controllers/onboardingController');
const authMiddleware = require('../middleware/authMiddleware'); // ya existe

router.post('/users/:id/onboarding', save);
router.get('/users/:id/onboarding',  get);
router.get('/users/:userId/onboarding-days', getOnboardingDaysByUser);

module.exports = router;
