'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ShopHero', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tokenId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      rarity: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      power: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      magic: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      weapon: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      price: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      owner: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isInShop: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ShopHero');
  }
};
