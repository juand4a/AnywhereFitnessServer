module.exports = (sequelize, DataTypes) => {
  const RoutineDay = sequelize.define(
    "RoutineDay",
    {
      day_code: {
        type: DataTypes.ENUM("lun", "mar", "mie", "jue", "vie", "sab", "dom"),
        allowNull: false,
      },
    },
    {
      tableName: "routine_days",
      timestamps: false,
    }
  );

  RoutineDay.associate = (models) => {
    RoutineDay.belongsTo(models.Routine, {
      foreignKey: "routine_id",
      onDelete: "CASCADE",
    });

    RoutineDay.hasMany(models.RoutineExercise, {
      foreignKey: "routine_day_id",
    });
  };

  return RoutineDay;
};
