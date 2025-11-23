const express = require('express');
const router = express.Router();

// Importaciones de Controladores y Validadores
const { register, login, logout } = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../validators/authValidator');
const {getAllUsers}= require('./../controllers/usercontroller')
// Importaciones de Middlewares (Asegúrate de que estas rutas son correctas)
const authMiddleware = require('../middleware/authMiddleware'); 
const adminMiddleware = require('../middleware/adminMiddleware');

// Rutas de Autenticación
// 1. Registro
router.post('/register', registerValidator, register);
// 2. Login
router.post('/login', loginValidator, login);
// 3. Logout
router.post('/logout', logout);
// 4. Obtener todos los usuarios (Ruta Admin)

module.exports = router;