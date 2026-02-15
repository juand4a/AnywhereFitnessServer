module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define(
    "Exercise",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      video_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      }
    },
    {
      tableName: "exercises",
      timestamps: false,
      underscored: true,
    }
  );

  // Comenta esto temporalmente si no tienes la columna type_id en la DB
  Exercise.associate = (models) => {
    Exercise.belongsTo(models.ExerciseType, {
      foreignKey: "type_id",
      as: "type",
    });
  };

  return Exercise;
};