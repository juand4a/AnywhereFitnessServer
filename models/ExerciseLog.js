// models/ExerciseLog.js
module.exports = (sequelize, DataTypes) => {
  const ExerciseLog = sequelize.define(
    "ExerciseLog",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },

      routine_exercise_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },

      weight: DataTypes.STRING,
      sets: DataTypes.INTEGER,
      reps: DataTypes.INTEGER,
      note: DataTypes.TEXT,
    },
    {
      tableName: "exercise_logs",
      timestamps: true,
      underscored: true,
    }
  );

  ExerciseLog.associate = (models) => {
    ExerciseLog.belongsTo(models.RoutineExercise, {
      foreignKey: "routine_exercise_id",
      onDelete: "CASCADE",
    });
  };

  return ExerciseLog;
};
