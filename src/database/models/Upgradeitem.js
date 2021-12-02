const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Upgradeitem extends Model {
  }
  Upgradeitem.init(
    {
      owner: DataTypes.STRING,
      type: DataTypes.STRING,
      level: DataTypes.STRING,
      amount: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Upgradeitem',
      timestamps: false,
      freezeTableName: true,
      indexes: [
        {
          fields: ['owner'],
        },
      ],
    }
  );
  return Upgradeitem;
};