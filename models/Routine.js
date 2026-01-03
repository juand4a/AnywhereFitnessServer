module.exports = (sequelize, DataTypes) => {
  const Routine = sequelize.define(
    "Routine",
    {
      title: {
        type: DataTypes.STRING,
        defaultValue: "Mi rutina",
      },
      goal: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "routines",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  Routine.associate = (models) => {
    Routine.belongsTo(models.Usuario, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });

    Routine.hasMany(models.RoutineDay, {
      foreignKey: "routine_id",
    });
  };

  return Routine;
};
