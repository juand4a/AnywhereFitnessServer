module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      celular: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rol: {
        type: DataTypes.ENUM("usuario", "entrenador", "admin"),
        defaultValue: "usuario",
      },
      tipo_plan: {
        type: DataTypes.ENUM("gratuito", "premium"),
        defaultValue: "gratuito",
      },
      peso: DataTypes.DECIMAL(5, 2),
      altura: DataTypes.DECIMAL(5, 2),
      fecha_nacimiento: DataTypes.DATEONLY,
      onboarded: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "usuarios",
      timestamps: false,
    }
  );

  Usuario.associate = (models) => {
    Usuario.hasOne(models.OnboardingProfile, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });

    Usuario.hasMany(models.OnboardingDay, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });

  };

  return Usuario;
};
