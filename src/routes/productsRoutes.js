const { Router } = require('express');
const productController = require('../controllers/productController');

const productRouter = new Router();

productRouter.get('/', productController.index);
productRouter.get('/detail/:id', productController.detail);
productRouter.get('/cart', productController.cart);
productRouter.get('/cart/add', productController.add);

module.exports = productRouter;
