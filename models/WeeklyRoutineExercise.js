module.exports = (sequelize, DataTypes) => {
  const WeeklyRoutineExercise = sequelize.define('WeeklyRoutineExercise', {
    routine_day_id: { type: DataTypes.INTEGER, allowNull: false },
    exercise_id: { type: DataTypes.INTEGER, allowNull: false },
    weight: DataTypes.STRING,
    sets: { type: DataTypes.INTEGER, defaultValue: 0 },
    reps: DataTypes.STRING,
    rest_seconds: { type: DataTypes.INTEGER, defaultValue: 60 },
    note: DataTypes.TEXT,
    position: { type: DataTypes.INTEGER, defaultValue: 0 }
  });

  WeeklyRoutineExercise.associate = (models) => {
    WeeklyRoutineExercise.belongsTo(models.WeeklyRoutineDay, { foreignKey: 'routine_day_id' });
    WeeklyRoutineExercise.belongsTo(models.Exercise, { foreignKey: 'exercise_id' });
  };
  return WeeklyRoutineExercise;
};