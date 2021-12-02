const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FixedPriceSale extends Model {}
  FixedPriceSale.init(
    {
        saleId: DataTypes.INTEGER,
        tokenID: DataTypes.STRING,
        fixedArtworkSale: DataTypes.STRING,
        fixedPrice: DataTypes.INTEGER,
        startingDateTime: DataTypes.INTEGER,
        status: DataTypes.STRING,
    },
    {
        sequelize,
        modelName: 'FixedPriceSale',
        timestamps: false,
        freezeTableName: true,
        indexes: [
          {
            fields: ['saleId'],
          },
        ],
    }
  );
  return FixedPriceSale;
};