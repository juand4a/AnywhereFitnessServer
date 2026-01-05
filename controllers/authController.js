// controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { Usuario } = require('../models');

// 🔹 Registro
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Datos inválidos', errors: errors.array() });
    }

    try {
        const {
            nombre, email, celular, password, tipo_plan, rol, peso, altura, fecha_nacimiento
        } = req.body;

        const userExists = await Usuario.findOne({ where: { email } });
        if (userExists) {
            return res.status(409).json({ message: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Usuario.create({
            nombre,
            email,
            celular: celular || null,
            password: hashedPassword,
            tipo_plan: tipo_plan || 'gratuito',
            rol: rol || 'usuario', // Asigna 'usuario' por defecto
            peso: peso || null,
            altura: altura || null,
            fecha_nacimiento: fecha_nacimiento || null,
        });

        return res.status(201).json({
            message: 'Usuario registrado correctamente',
            user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

// 🔹 Login
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Datos inválidos', errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        const user = await Usuario.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });

        const token = jwt.sign(
            { id: user.id, email: user.email, rol: user.rol, tipo_plan: user.tipo_plan },
            process.env.JWT_SECRET, // Asegúrate de definir JWT_SECRET en tu archivo .env
            { expiresIn: '2h' }
        );

        return res.status(200).json({
            message: 'Login exitoso',
            token,
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
                tipo_plan: user.tipo_plan,
                onboarded: !!user.onboarded,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

// 🔹 Logout (Puede ser una función simple, ya que el cliente solo tiene que descartar el token)
exports.logout = (req, res) => {
    // En el backend, el logout se maneja simplemente eliminando el token del lado del cliente.
    // Aquí puedes realizar cualquier limpieza de sesión si es necesario, pero generalmente solo devuelve éxito.
    return res.status(200).json({ message: 'Logout exitoso. El token debe ser descartado por el cliente.' });
};

