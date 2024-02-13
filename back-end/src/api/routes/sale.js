const express = require('express');
const Sale = require('../controllers/sale');
const JoiValidate = require('../middlewares/joivalidate');
const { sale } = require('../schemas/joischema');
const validate = require('../middlewares/validators');

const route = express.Router();

route.use(validate.token);

route.post('/', JoiValidate(sale), Sale.create);
route.get('/', Sale.findAll);
route.get('/:id', Sale.findOne);
route.get('/findallsalesbyuserid/:id', Sale.findAllSalesByUserId);
route.patch('/:id', Sale.update);
route.delete('/:id', Sale.destroy);

module.exports = route;