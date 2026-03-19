// routes/onboardingRoutes.js
const express = require('express');
const router = express.Router();
const { 
  save, 
  get, 
  getOnboardingDaysByUser, 
  addNutritionEntry, 
  getNutritionDay, 
  getNutritionHistory, 
  getDailyCalories, 
  searchFood // Asegúrate de que esté exportado en tu controlador
} = require('../controllers/onboardingController');

// --- ONBOARDING & PERFIL ---
router.post('/users/:id/onboarding', save);
router.get('/users/:id/onboarding', get);
router.get('/users/:userId/onboarding-days', getOnboardingDaysByUser);

// --- BIBLIOTECA DE ALIMENTOS ---
// Nueva ruta para buscar en la tabla 'foods'
router.get('/foods/search', searchFood); 

// --- NUTRICIÓN DIARIA ---
// Registro de comida (POST)
router.post('/users/:userId/nutrition', addNutritionEntry);

// Obtener detalle de un día específico (GET)
// Se recomienda usarlo así: /api/users/1/nutrition?date=2023-10-27
router.get('/users/:userId/nutrition', getNutritionDay);

// Obtener objetivo de calorías y macros (GET)
router.get('/users/:userId/nutrition/daily-kcal', getDailyCalories);

// --- HISTORIAL & GRÁFICAS ---
// Ajustada para recibir parámetros de rango por query string (?range=week)
router.get('/users/:userId/nutrition/history', getNutritionHistory);

module.exports = router;