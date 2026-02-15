module.exports = (sequelize, DataTypes) => {
  const WeeklyRoutine = sequelize.define('WeeklyRoutine', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // ESTA ES LA PIEZA QUE FALTABA
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // Cambiado a false para obligar a tener un dueño
      field: 'user_id'  // Asegura que use minúsculas con guion bajo
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: 'Mi Rutina'
    },
    week_index: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      field: 'week_index'
    },
    source_type: { 
      type: DataTypes.ENUM('free_manual', 'pro_template', 'premium_ai', 'coach_custom'),
      allowNull: false,
      defaultValue: 'free_manual',
      field: 'source_type' 
    },
    is_template: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      field: 'is_template'
    }
  }, {
    tableName: 'WeeklyRoutines',
    // IMPORTANTE: Si tu tabla tiene createdAt/updatedAt con mayúsculas, 
    // Sequelize lo maneja mejor así:
    timestamps: true 
  });

  WeeklyRoutine.associate = (models) => {
    WeeklyRoutine.hasMany(models.WeeklyRoutineDay, { 
      foreignKey: 'weekly_routine_id', 
      as: 'WeeklyRoutineDays' 
    });
  };

  return WeeklyRoutine;
};