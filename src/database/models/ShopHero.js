const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ShopHero extends Model {
  }
  ShopHero.init(
    {
      tokenId: DataTypes.STRING,
      name: DataTypes.STRING,
      rarity: DataTypes.STRING,
      power: DataTypes.STRING,
      magic: DataTypes.STRING,
      weapon: DataTypes.STRING,
      price: DataTypes.STRING,
      category: DataTypes.STRING,
      owner: DataTypes.STRING,
      isInShop: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'ShopHero',
      timestamps: false,
      freezeTableName: true,
      indexes: [
        {
          fields: ['owner'],
        },
      ],
    }
  );
  return ShopHero;
};
