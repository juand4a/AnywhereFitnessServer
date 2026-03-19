module.exports = (sequelize, DataTypes) => {
  const OnboardingNutrition = sequelize.define(
    'OnboardingNutrition',
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
      nutrition_goal: {
        type: DataTypes.ENUM('bajar_peso','mantener','subir_masa'),
        allowNull: false,
      },
      activity_level: {
        type: DataTypes.ENUM('baja','media','alta'),
        allowNull: false,
      },
      daily_kcal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      protein_target: DataTypes.INTEGER,
      carbs_target: DataTypes.INTEGER,
      fat_target: DataTypes.INTEGER,
    },
    {
      tableName: 'onboarding_nutrition',
      timestamps: true,
      underscored: true,
    }
  );

  OnboardingNutrition.associate = (models) => {
    OnboardingNutrition.belongsTo(models.Usuario, {
      foreignKey: 'user_id',
    });
  };

  return OnboardingNutrition;
};