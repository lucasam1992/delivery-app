const { products } = require('../../database/models');

const err = (code, message) => ({ code, message });
const productNotFound = '"product" not found';
const productDuplicated = '"product" is already in the database';

const create = async (product) => {
  let data;
  try {
    data = await products.create(product);
  } catch (error) {
   throw err('conflict', productDuplicated);
  }
  
  return data;
};

const findAll = async () => {
  const data = await products.findAll();
  return data;
};

const findOne = async ({ id }) => {
  const data = await products.findOne({ where: { id } });

  if (!data) throw err('notFound', productNotFound);

  return data;
};

const update = async (product, { id }) => {
  const data = await products.update(product, { where: { id } });

  if (!data) throw err('notFound', productNotFound);

  return data;
};

const destroy = async ({ id }) => {
  const data = await products.destroy({ where: { id } });

  if (!data) throw err('notFound', productNotFound);
  
  return data;
};

module.exports = { create, findAll, findOne, update, destroy };