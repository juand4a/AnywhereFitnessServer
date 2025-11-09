// models/Usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
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
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo_plan: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'usuario',
  },
  altura: {            // si los guardas por registro
    type: DataTypes.DECIMAL(5,2),
    allowNull: true,
  },
  peso: {            // si los guardas por registro
    type: DataTypes.DECIMAL(5,2),
    allowNull: true,
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  onboarded: {            // 👈 NUEVO
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  tableName: 'usuarios',
  timestamps: false, // tu dump no usa createdAt/updatedAt en usuarios
});

module.exports = Usuario;
