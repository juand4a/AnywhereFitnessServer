// models/OnboardingProfile.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OnboardingProfile = sequelize.define('OnboardingProfile', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  goal: { type: DataTypes.ENUM('fuerza','masa_muscular','bajar_peso','resistencia','salud_general'), allowNull: false },
  experience: { type: DataTypes.ENUM('principiante','intermedio','avanzado'), allowNull: false },
  location: { type: DataTypes.ENUM('casa','gimnasio'), allowNull: false },
  frequency_per_week: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false },
  injuries: { type: DataTypes.TEXT, allowNull: true },
  notes: { type: DataTypes.TEXT, allowNull: true },
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
}, {
  tableName: 'onboarding_profiles',
  timestamps: false,
});

module.exports = OnboardingProfile;
