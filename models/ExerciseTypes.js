module.exports = (sequelize, DataTypes) => {
  const ExerciseType = sequelize.define(
    "ExerciseType",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "exercise_types",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false, // tu tabla no tiene updated_at
      underscored: true,
    }
  );

  ExerciseType.associate = (models) => {
    ExerciseType.hasMany(models.Exercise, {
      foreignKey: "type_id",
      as: "exercises",
    });
  };

  return ExerciseType;
};
