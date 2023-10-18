const express = require('express');
const User = require('../controllers/user');
const JoiValidate = require('../middlewares/joivalidate');
const { login } = require('../schemas/joischema');

const route = express.Router();

route.post('/', JoiValidate(login), User.login);

module.exports = route;