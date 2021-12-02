const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CollectorNFTs extends Model {}
  CollectorNFTs.init(
    {
        collector: DataTypes.STRING,
        nft: DataTypes.INTEGER,
    },
    {
        sequelize,
        modelName: 'CollectorNFTs',
        timestamps: false,
        freezeTableName: true,
        indexes: [
            {
              fields: ['nft'],
            },
        ],
    }
  );
  return CollectorNFTs;
};