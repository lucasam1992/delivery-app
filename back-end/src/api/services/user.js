const md5 = require('md5');
const { users } = require('../../database/models');
const generateToken = require('./generatetoken');

const err = (code, message) => ({ code, message });
const userNotFound = '"user" not found';

const create = async ({ name, email, password, role = 'customer' }) => {
  await users.create({ name, email, password: md5(password), role });

  const data = generateToken({ email, password });

  return data;
};

const findAll = async ({ role }) => {
  const where = (role === undefined || role === '') ? {} : { role };
  const data = await users.findAll({
      where,
    attributes: {
        exclude: ['password'],
    },
  });

  return data.filter((user) => user.role !== 'administrator');
};

const findOne = async ({ id }) => {
  const data = await users.findOne({ where: { id }, 
    attributes: {
      exclude: ['password'],
  } });

  if (!data) throw err('notFound', userNotFound);

  return data;
};

const update = async (user, { id }) => {
  const [data, wasCreated] = await users.upsert(user, { where: { id } });

  if (!wasCreated) throw err('notFound', userNotFound);

  return data;
};

const destroy = async ({ email }) => {
  const data = await users.destroy({ where: { email } });
  
  if (!data) throw err('notFound', userNotFound);
  
  const message = 'Usuário deletado com sucesso';

  const currentUsers = await users.findAll();

  return { message, data: currentUsers };
};

module.exports = { create, findAll, findOne, update, destroy };