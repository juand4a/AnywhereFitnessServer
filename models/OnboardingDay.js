module.exports = (sequelize, DataTypes) => {
  const OnboardingDay = sequelize.define(
    "OnboardingDay",
    {
      day_code: {
        type: DataTypes.ENUM("lun", "mar", "mie", "jue", "vie", "sab", "dom"),
        allowNull: false,
      },
    },
    {
      tableName: "onboarding_days",
      timestamps: false,
    }
  );

  OnboardingDay.associate = (models) => {
    OnboardingDay.belongsTo(models.Usuario, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
  };

  return OnboardingDay;
};
