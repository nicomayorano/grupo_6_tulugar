const { Router } = require('express');
const multer = require('../middlewares/multerProducts');
const productController = require('../controllers/productController');
const productValidation = require('../middlewares/productValidation');

const productRouter = new Router();

productRouter.get('/', productController.index);
productRouter.get('/search', productController.search);
productRouter.get('/create', productController.newForm);
productRouter.get('/:id', productController.detail);
productRouter.post('/', productValidation, multer.array('image', 6), productController.new);
productRouter.get('/cart/:id', productController.carrito);
productRouter.get('/:id/edit', productController.editForm);
productRouter.put('/:id', productValidation, multer.array('image', 6), productController.edit);
productRouter.delete('/:id', productController.delete);

module.exports = productRouter;
