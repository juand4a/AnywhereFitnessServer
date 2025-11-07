const { body } = require('express-validator');

exports.registerValidator = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
  
  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido'),

  body('celular')
    .optional()
    .isString().withMessage('El celular debe ser texto')
    .isLength({ min: 6, max: 20 }).withMessage('El celular debe tener entre 6 y 20 caracteres'),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

  body('tipo_plan')
    .optional()
    .isIn(['gratuito', 'premium']).withMessage('Tipo de plan inválido'),

  body('rol')
    .optional()
    .isIn(['usuario', 'entrenador', 'admin']).withMessage('Rol inválido'),

  body('peso')
    .optional()
    .isFloat({ min: 0 }).withMessage('Peso inválido'),

  body('altura')
    .optional()
    .isFloat({ min: 0 }).withMessage('Altura inválida'),

  body('fecha_nacimiento')
    .optional()
    .isDate().withMessage('La fecha de nacimiento debe tener formato YYYY-MM-DD'),
];

exports.loginValidator = [
  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido'),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];
