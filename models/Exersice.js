module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define(
    "Exercise",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      type_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(120),
        allowNull: false,
        unique: true,
      },
      video_url: {
        type: DataTypes.STRING(500),
        allowNull: true, // en tu tabla está NOT NULL
      },
    },
    {
      tableName: "exercises",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: true,
    }
  );

  Exercise.associate = (models) => {
    Exercise.belongsTo(models.ExerciseType, {
      foreignKey: "type_id",
      as: "type",
    });
  };
  Exercise.associate = (models) => {
    Exercise.hasMany(models.WeeklyRoutineExercise, {
      foreignKey: 'exercise_id',
    });
  }
  return Exercise;
};
