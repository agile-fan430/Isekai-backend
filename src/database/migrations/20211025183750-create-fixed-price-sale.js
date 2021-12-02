'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FixedPriceSale', {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
      },
      saleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      tokenID: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fixedArtworkSale: {
        type: Sequelize.STRING,
      },
      fixedPrice: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      startingDateTime: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
  }
};
