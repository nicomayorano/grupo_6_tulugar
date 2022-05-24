const { Router } = require('express');
const multer = require('../middlewares/multerProducts');
const productController = require('../controllers/productController');
const productValidation = require('../middlewares/productValidation');

const productRouter = new Router();

productRouter.get('/', productController.index);
productRouter.get('/search', productController.search);
productRouter.get('/new', productController.newForm);
productRouter.get('/:id', productController.detail);
productRouter.post('/', multer.array('image', 6), productValidation, productController.new);
productRouter.get('/cart/:id', productController.cart);
productRouter.get('/:id/edit', productController.editForm);
productRouter.put('/:id', multer.array('image', 6), productValidation, productController.edit);
productRouter.delete('/:id', productController.delete);

module.exports = productRouter;
