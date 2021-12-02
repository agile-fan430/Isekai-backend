const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Salemagicitem extends Model {
  }
  Salemagicitem.init(
    {
      type: DataTypes.STRING,
      level: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Salemagicitem',
      timestamps: false,
      freezeTableName: true,
      indexes: [
      ],
    }
  );
  return Salemagicitem;
};