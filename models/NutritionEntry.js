module.exports = (sequelize, DataTypes) => {
  const NutritionEntry = sequelize.define(
    'NutritionEntry',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nutrition_day_id: { type: DataTypes.INTEGER, allowNull: false },
      name: DataTypes.STRING,
      grams: DataTypes.FLOAT,
      kcal: DataTypes.FLOAT,
      protein: DataTypes.FLOAT,
      carbs: DataTypes.FLOAT,
      fat: DataTypes.FLOAT,
      source: DataTypes.ENUM('manual','barcode'),
      time: DataTypes.STRING,
    },
    {
      tableName: 'nutrition_entries',
      timestamps: false,
      underscored: true,
    }
  );
  NutritionEntry.associate = (models) => {
  NutritionEntry.belongsTo(models.NutritionDay, {
    foreignKey: 'nutrition_day_id',
    as: 'day',
  });
};

  return NutritionEntry;
};