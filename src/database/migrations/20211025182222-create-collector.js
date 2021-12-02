'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Collector', {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
      },
      nfts: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      totalAttributes: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      rank: {
        type: Sequelize.STRING,
      }

    });
  },

  down: async (queryInterface, Sequelize) => {
  }
};
