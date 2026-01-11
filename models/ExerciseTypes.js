module.exports = (sequelize, DataTypes) => {
    const ExersiceType = sequelize.define(
        "ExersiceType   ",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            }
        },
        {
            tableName: "exercises",
            timestamps: true,
            createdAt: "created_at",
        }
    );

    //   ExersiceType.associate = (models) => {
    //     ExersiceType.hasOne(models.OnboardingProfile, {
    //       foreignKey: "user_id",
    //       onDelete: "CASCADE",
    //     });



    //   };

    return ExersiceType;
};
