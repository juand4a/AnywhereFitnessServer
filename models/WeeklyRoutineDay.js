module.exports = (sequelize, DataTypes) => {
  const WeeklyRoutineDay = sequelize.define('WeeklyRoutineDay', {
    weekly_routine_id: { type: DataTypes.INTEGER, allowNull: false },
    day_code: { type: DataTypes.STRING, allowNull: false },
    is_rest_day: { type: DataTypes.BOOLEAN, defaultValue: false }
  });
  WeeklyRoutineDay.associate = (models) => {
    WeeklyRoutineDay.belongsTo(models.WeeklyRoutine, { foreignKey: 'weekly_routine_id' });
    WeeklyRoutineDay.hasMany(models.WeeklyRoutineExercise, {
      foreignKey: 'routine_day_id',
      as: 'WeeklyRoutineExercises'
    });
  };
  return WeeklyRoutineDay;
};