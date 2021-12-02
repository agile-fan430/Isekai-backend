'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('NFT', {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
      },
      tokenID: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      amountMinted: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      contractAddress: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      tokenMetadataUri: {
        type: Sequelize.STRING,
      },
      creator: {
        type: Sequelize.STRING,
      },
      dateMinted: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      // owners: {
      //   allowNull: false,
      //   type: Sequelize.STRING,
      // },
      erc721_owner: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isOnSale: {
        type: Sequelize.BOOLEAN,
      },
      type: {
        type: Sequelize.STRING,
      },
      isERC721: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      isPublicAlllowed: {
        type: Sequelize.BOOLEAN,
      },
      transfers: {
        type: Sequelize.STRING,
      },
      allSales: {
        type: Sequelize.STRING,
      }

    });
  },

  down: async (queryInterface, Sequelize) => {
  }
};
