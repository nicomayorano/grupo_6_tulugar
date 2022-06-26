const { Router } = require('express');
const productController = require('../../controllers/api/products');

const productRouter = new Router();

productRouter.get('/:id', productController.detail);

module.exports = productRouter;
