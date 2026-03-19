module.exports = (sequelize, DataTypes) => {
  const NutritionDay = sequelize.define(
    'NutritionDay',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      date: { type: DataTypes.DATEONLY, allowNull: false },
      total_kcal: DataTypes.FLOAT,
      total_protein: DataTypes.FLOAT,
      total_carbs: DataTypes.FLOAT,
      total_fat: DataTypes.FLOAT,
    },
    {
      tableName: 'nutrition_days',
      timestamps: true,
      underscored: true,
    }
  );

  NutritionDay.associate = (models) => {
  NutritionDay.hasMany(models.NutritionEntry, {
    foreignKey: 'nutrition_day_id',
    as: 'entries', // Este alias DEBE coincidir con el del controlador
  });
};

  return NutritionDay;
};