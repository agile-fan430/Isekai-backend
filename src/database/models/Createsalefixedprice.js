const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Createsalefixedprice extends Model {
  }
  Createsalefixedprice.init(
    {
        nft_addr: DataTypes.STRING,
        token_id: DataTypes.STRING,
        amount: DataTypes.STRING,
        fixed_price: DataTypes.STRING,
        start_time: DataTypes.STRING,
    },
    {
        sequelize,
        modelName: 'Createsalefixedprice',
        timestamps: false,
        freezeTableName: true,
        indexes: [
            {
            fields: ['nft_addr'],
            },
        ],
    }
  );
  return Createsalefixedprice;
};