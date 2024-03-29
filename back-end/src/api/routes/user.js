const express = require('express');
const User = require('../controllers/user');
const JoiValidate = require('../middlewares/joivalidate');
const { register, user } = require('../schemas/joischema');
const validate = require('../middlewares/validators');

const route = express.Router({ mergeParams: true });

route.post('/register', JoiValidate(register), validate.userExists, User.create);

route.use(validate.token);

route.post('/', JoiValidate(user), validate.admin, validate.userExists, User.create);
route.get('/', User.findAll);
route.get('/:id', User.findOne);
route.put('/:id', JoiValidate(user), User.update);
route.delete('/:email', User.destroy);

module.exports = route;