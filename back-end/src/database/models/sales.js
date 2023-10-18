module.exports = (sequelize, DataTypes) => {
  const sales = sequelize.define('sales', {
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL(9, 2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: DataTypes.STRING,
  }, { timestamps: false, tableName: 'sales', underscored: true });

  sales.associate = (models) => {
    sales.belongsTo(models.users, { foreignKey: 'userId', as: 'user' });
    sales.belongsTo(models.users, { foreignKey: 'sellerId', as: 'seller' });
  };

  return sales;
};