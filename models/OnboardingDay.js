// models/OnboardingDay.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OnboardingDay = sequelize.define('OnboardingDay', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  day_code: { type: DataTypes.ENUM('lun','mar','mie','jue','vie','sab','dom'), allowNull: false },
}, {
  tableName: 'onboarding_days',
  timestamps: false,
  indexes: [{ unique: true, fields: ['user_id', 'day_code'] }]
});

module.exports = OnboardingDay;
