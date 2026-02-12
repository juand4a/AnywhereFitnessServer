module.exports = (sequelize, DataTypes) => {
  const WeeklyRoutineExercise = sequelize.define(
    'WeeklyRoutineExercise',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      routine_day_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      exercise_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      weight: DataTypes.STRING(40),
      sets: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
      },
      reps: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
      },
      rest_seconds: DataTypes.SMALLINT.UNSIGNED,
      note: DataTypes.STRING(255),
      position: {
        type: DataTypes.SMALLINT.UNSIGNED,
        defaultValue: 1,
      },
    },
    {
      tableName: 'weekly_routine_exercises',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
WeeklyRoutineExercise.associate = (models) => {
  WeeklyRoutineExercise.belongsTo(models.Exercise, {
    foreignKey: 'exercise_id',
  });

  WeeklyRoutineExercise.belongsTo(models.WeeklyRoutineDay, {
    foreignKey: 'routine_day_id',
  });
};
  return WeeklyRoutineExercise;
};
