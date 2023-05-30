'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userTable =  queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(100),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(32),
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
    });

    return userTable;
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};