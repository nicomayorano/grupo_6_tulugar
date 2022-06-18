const { Router } = require('express');
const productController = require('../controllers/productController');
const multer = require('../middlewares/multer');
const productValidation = require('../middlewares/productValidation');
const imageValidation = require('../middlewares/imageValidation');
const authRequired = require('../middlewares/authRequired');

const productRouter = new Router();

productRouter.get('/', productController.index);
productRouter.get('/search', productController.search);
productRouter.get('/new', authRequired, productController.newForm);
productRouter.get('/:id', productController.detail);
productRouter.post('/', authRequired, multer('productsImages', { size: 500_000, files: 6 }), productValidation, imageValidation, productController.new);
productRouter.get('/cart/:id', authRequired, productController.cart);
productRouter.get('/:id/edit', authRequired, productController.editForm);
productRouter.put('/:id', authRequired, multer('productsImages', { size: 500_000, files: 6 }), productValidation, imageValidation, productController.edit);
productRouter.delete('/:id', authRequired, productController.delete);

module.exports = productRouter;
