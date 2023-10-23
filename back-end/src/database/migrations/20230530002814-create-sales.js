'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const saleTable = queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      total_price: {
        allowNull: false,
        type: Sequelize.DECIMAL(9,2)
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      seller_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      delivery_address: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      delivery_number: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      sale_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
    });

    return saleTable;
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('sales');
  }
};