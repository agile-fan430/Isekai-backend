const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Heromodel extends Model {
  }
  Heromodel.init(
    {
      tokenId: DataTypes.STRING,
      owner: DataTypes.STRING,
      name: DataTypes.STRING,
      rarity: DataTypes.STRING,
      power: DataTypes.STRING,
      magic: DataTypes.STRING,
      weapon: DataTypes.STRING,
      price: DataTypes.STRING,
      category: DataTypes.STRING,
      isInShop: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Heromodel',
      timestamps: false,
      freezeTableName: true,
      indexes: [
        {
          fields: ['owner'],
        },
      ],
    }
  );
  return Heromodel;
};
