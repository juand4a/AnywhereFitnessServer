// routes/onboardingRoutes.js
const express = require('express');
const router = express.Router();
const { save, get } = require('../controllers/onboardingController');
const authMiddleware = require('../middleware/authMiddleware'); // ya existe

router.post('/users/:id/onboarding', authMiddleware, save);
router.get('/users/:id/onboarding', authMiddleware, get);

module.exports = router;
