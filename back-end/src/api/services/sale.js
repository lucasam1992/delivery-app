const { sales, salesProducts, users, products } = require('../../database/models');

const include = [
  { model: users, as: 'user', attributes: { exclude: ['password'] } },
  { model: users, as: 'seller', attributes: { exclude: ['password'] } },
  { model: products, as: 'products', through: { attributes: ['quantity'] } },
];

const err = (code, message) => ({ code, message });
const saleNotFound = '"sale" not found';

const create = async ({ cart, ...sale }) => {
  console.log(sale);
  const data = await sales.create(sale);
  
  cart.forEach(async ({ productId, quantity }) =>
  salesProducts.create({ saleId: data.id, productId, quantity }));

  return data;
};

const findAll = async () => {
  const data = await sales.findAll({ include });

  return data;
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

module.exports = { create, findAll, findOne, update, destroy };