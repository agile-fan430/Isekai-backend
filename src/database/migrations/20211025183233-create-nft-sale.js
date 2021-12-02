'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('NftSale', {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
      },
      soldPrice: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      fixedPriceSale: {
        type: Sequelize.STRING,
      },
      nft: {
        type: Sequelize.STRING,
      },
      dateListed: {
        type: Sequelize.INTEGER,
      },
      amountOnSale: {
        type: Sequelize.INTEGER,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
  }
};
