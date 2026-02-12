module.exports = (sequelize, DataTypes) => {
  const WeeklyRoutine = sequelize.define(
    'WeeklyRoutine',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      week_index: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
      },
    },
    {
      tableName: 'weekly_routines',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  WeeklyRoutine.associate = (models) => {
    WeeklyRoutine.hasMany(models.WeeklyRoutineDay, {
      foreignKey: 'weekly_routine_id',
      onDelete: 'CASCADE',
    });
  };

  return WeeklyRoutine;
};
