module.exports = (sequelize, DataTypes) => {
  const WeeklyRoutineDay = sequelize.define(
    'WeeklyRoutineDay',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      weekly_routine_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      day_code: {
        type: DataTypes.ENUM('lun','mar','mie','jue','vie','sab','dom'),
        allowNull: false,
      },
      is_rest_day: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'weekly_routine_days',
      timestamps: false,
    }
  );

  WeeklyRoutineDay.associate = (models) => {
    WeeklyRoutineDay.hasMany(models.WeeklyRoutineExercise, {
      foreignKey: 'routine_day_id',
      onDelete: 'CASCADE',
    });
  };
WeeklyRoutineDay.associate = (models) => {
  WeeklyRoutineDay.hasMany(models.WeeklyRoutineExercise, {
    foreignKey: 'routine_day_id',
    onDelete: 'CASCADE',
  });
};
  return WeeklyRoutineDay;
};
