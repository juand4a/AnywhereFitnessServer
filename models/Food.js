module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define(
    'Food',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      kcal: DataTypes.FLOAT,      // Base 100g
      protein: DataTypes.FLOAT,   // Base 100g
      carbs: DataTypes.FLOAT,     // Base 100g
      fat: DataTypes.FLOAT,       // Base 100g
    },
    {
      tableName: 'foods',
      timestamps: false,
    }
  );

  return Food;
};