module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(9,2),
    urlImage: DataTypes.STRING,
  }, { timestamps: false, underscored: true, tableName: 'products'});

  return products;
};