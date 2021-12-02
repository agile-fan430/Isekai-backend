const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.RefreshToken, {
        foreignKey: "userId",
        as: "refreshTokens",
        onDelete: "CASCADE"
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      wallet_addr: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,

      coin_collected: DataTypes.INTEGER,
      common_silver_shard: DataTypes.INTEGER,
      common_gold_shard: DataTypes.INTEGER,
      powered_silver_shard: DataTypes.INTEGER,
      powered_gold_shard: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: false,
      freezeTableName: true,
      indexes: [
        {
          fields: ['wallet_addr'],
        },
      ],
    }
  );
  return User;
};
