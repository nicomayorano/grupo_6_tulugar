const { Router } = require('express');
const productController = require('../../controllers/productsApi');

const productRouter = new Router();

productRouter.get('/:id', productController.detail);

module.exports = productRouter;
