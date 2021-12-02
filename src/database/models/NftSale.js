const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class NftSale extends Model {}
  NftSale.init(
    {
        soldPrice: DataTypes.INTEGER,
        fixedPriceSale: DataTypes.STRING,
        nft: DataTypes.STRING,
        dateListed: DataTypes.INTEGER,
        amountOnSale: DataTypes.INTEGER,
    },
    {
        sequelize,
        modelName: 'NftSale',
        timestamps: false,
        freezeTableName: true,
        indexes: [
          {
            fields: ['nft'],
          },
        ],
    }
  );
  return NftSale;
};