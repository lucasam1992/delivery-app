const { sales, salesProducts, users, products } = require('../../database/models');

const include = [
  { model: users, as: 'user', attributes: { exclude: ['password'] } },
  { model: users, as: 'seller', attributes: { exclude: ['password'] } },
  { model: products, as: 'products', through: { attributes: ['quantity'] } },
];

const err = (code, message) => ({ code, message });
const saleNotFound = '"sale" not found';

const create = async ({ cart, ...sale }) => {
  const data = await sales.create(sale);

  const saleId = data.id;

  const saleProduct = cart.map(async ({ id, quantity }) => {
    const register = await salesProducts.create({ productId: id, saleId, quantity });
    return register;
    });

    await Promise.all(saleProduct);
  
  return data;
};

const findAll = async () => {
  const data = await sales.findAll({ include });

  return data;
};

const findAllSalesByUserId = async (id) => {
  const getId = Object.values(id)[0];

  const userId = 'userId';
  const query = { where: { [userId]: parseInt(getId, 10) } };

  const allSales = await sales.findAll(query);

  return allSales;
};

const findOne = async ({ id }) => {
  const data = await sales.findOne({ where: { id }, include });
  
  if (!data) throw err('notFound', saleNotFound);

  return data;
};

const update = async (sale, { id }) => {
  const data = await sales.update(sale, { where: { id } });

  if (!data) throw err('notFound', saleNotFound);

  return data;
};

const destroy = async ({ id }) => {
  const data = await sales.destroy({ where: { id } });

  if (!data) throw err('notFound', saleNotFound);
  
  return data;
};

module.exports = { create, findAll, findOne, update, destroy, findAllSalesByUserId };