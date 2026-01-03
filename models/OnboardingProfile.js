module.exports = (sequelize, DataTypes) => {
  const OnboardingProfile = sequelize.define(
    "OnboardingProfile",
    {
      goal: {
        type: DataTypes.ENUM(
          "fuerza",
          "masa_muscular",
          "bajar_peso",
          "resistencia",
          "salud_general"
        ),
        allowNull: false,
      },
      experience: {
        type: DataTypes.ENUM("principiante", "intermedio", "avanzado"),
        allowNull: false,
      },
      location: {
        type: DataTypes.ENUM("casa", "gimnasio"),
        allowNull: false,
      },
      frequency_per_week: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      injuries: DataTypes.TEXT,
      notes: DataTypes.TEXT,
    },
    {
      tableName: "onboarding_profiles",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  OnboardingProfile.associate = (models) => {
    OnboardingProfile.belongsTo(models.Usuario, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
  };

  return OnboardingProfile;
};
