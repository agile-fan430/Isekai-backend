const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {}
  Artist.init(
    {
        nftMinted: DataTypes.STRING        
    },
    {
        sequelize,
        modelName: 'Artist',
        timestamps: false,
        freezeTableName: true,
        indexes: [
            {
              fields: ['nftMinted'],
            },
        ],
    }
  );
  return Artist;
};