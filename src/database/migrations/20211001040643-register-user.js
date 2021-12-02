'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()")
      },
      name: {
        type: Sequelize.STRING
      },
      wallet_addr: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING(1000)
      },
      email: {
        type: Sequelize.STRING(1000),
        unique: true
      },

      coin_collected: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      common_silver_shard: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      common_gold_shard: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      powered_silver_shard: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      powered_gold_shard: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User');
  }
};
