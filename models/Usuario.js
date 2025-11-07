// models/Usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    celular: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rol: {
        type: DataTypes.ENUM('usuario', 'entrenador', 'admin'),
        defaultValue: 'usuario',
    },
    tipo_plan: {
        type: DataTypes.ENUM('gratuito', 'premium'),
        defaultValue: 'gratuito',
    },
    peso: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    altura: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'usuarios',
    timestamps: false,
});

module.exports = Usuario;
