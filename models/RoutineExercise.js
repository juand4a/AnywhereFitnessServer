// models/RoutineExercise.js
module.exports = (sequelize, DataTypes) => {
  const RoutineExercise = sequelize.define(
    "RoutineExercise",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },

      routine_day_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },

      name: DataTypes.STRING,
      weight: DataTypes.STRING,
      sets: DataTypes.INTEGER,
      reps: DataTypes.INTEGER,
      rest: DataTypes.INTEGER,
      note: DataTypes.TEXT,
      position: DataTypes.INTEGER,
    },
    {
      tableName: "routine_exercises",
      timestamps: true,
      underscored: true,
    }
  );

  RoutineExercise.associate = (models) => {
    RoutineExercise.belongsTo(models.RoutineDay, {
      foreignKey: "routine_day_id",
      onDelete: "CASCADE",
    });

    RoutineExercise.hasMany(models.ExerciseLog, {
      foreignKey: "routine_exercise_id",
      onDelete: "CASCADE",
    });
  };

  return RoutineExercise;
};
