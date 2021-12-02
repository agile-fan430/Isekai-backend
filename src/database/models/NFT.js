const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class NFT extends Model {
  }
  NFT.init(
    {
        tokenID: DataTypes.STRING,
        amountMinted: DataTypes.INTEGER,
        contractAddress: DataTypes.STRING,
        tokenMetadataUri: DataTypes.STRING,
        creator: DataTypes.STRING,
        dateMinted: DataTypes.STRING,
        // owners: DataTypes.STRING,
        erc721_owner: DataTypes.STRING,
        isOnSale: DataTypes.BOOLEAN,
        type: DataTypes.STRING,
        isERC721: DataTypes.BOOLEAN,
        // isPublicAlllowed: DataTypes.BOOLEAN,
        // transfers: DataTypes.STRING,
        // allSales: DataTypes.STRING,
    },
    {
        sequelize,
        modelName: 'NFT',
        timestamps: false,
        freezeTableName: true,
        indexes: [
            {
            fields: ['tokenID'],
            },
        ],
    }
  );
  return NFT;
};