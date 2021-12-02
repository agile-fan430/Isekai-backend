const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Magicitem extends Model {
  }
  Magicitem.init(
    {
      owner: DataTypes.STRING,
      type: DataTypes.STRING,
      level: DataTypes.STRING,
      amount: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Magicitem',
      timestamps: false,
      freezeTableName: true,
      indexes: [
        {
          fields: ['onwer'],
        },
      ],
    }
  );
  return Magicitem;
};