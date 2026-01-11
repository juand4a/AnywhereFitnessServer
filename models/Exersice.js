module.exports = (sequelize, DataTypes) => {
    const Exersice = sequelize.define(
        "Exersice   ",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            type_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            video_url: {
                type: DataTypes.STRING,
            }

        },
        {
            tableName: "exercises",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    //   Exersice.associate = (models) => {
    //     Usuario.hasOne(models.OnboardingProfile, {
    //       foreignKey: "user_id",
    //       onDelete: "CASCADE",
    //     });



    //   };

    return Exersice;
};
