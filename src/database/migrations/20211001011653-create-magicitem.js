'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.sequelize.query('');
    await queryInterface.createTable('Magicitem', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      owner: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      level: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      amount: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      // createdAt: {
      //   type: Sequelize.DATE,
      // },
      // updatedAt: {
      //   type: Sequelize.DATE,
      // },
      // deletedAt: {
      //   type: Sequelize.DATE,
      // },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Magicitem');
  }
};
