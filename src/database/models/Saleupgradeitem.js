const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Saleupgradeitem extends Model {
  }
  Saleupgradeitem.init(
    {
      type: DataTypes.STRING,
      level: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Saleupgradeitem',
      timestamps: false,
      freezeTableName: true,
      indexes: [
      ],
    }
  );
  return Saleupgradeitem;
};