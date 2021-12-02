const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Collector extends Model {}
  Collector.init(
    {
        nfts: DataTypes.STRING,
        totalAttributes: DataTypes.INTEGER,
        rank: DataTypes.STRING,
    },
    {
        sequelize,
        modelName: 'Collector',
        timestamps: false,
        freezeTableName: true,
        indexes: [
            {
              fields: ['nfts'],
            },
        ],
    }
  );
  return Collector;
};