'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const productTable = queryInterface.createTable('products', {
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
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(4,2),
      },
      urlImage: {
        allowNull: false,
        type: Sequelize.STRING(200),
        defaultValue: '',
        field: 'url_image'
      },
    });

    return productTable;
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};